<template>
	<a-scene>
		<a-box
			position="-1 0.5 -3"
			rotation="0 45 0"
			@mouseenter="boxMouseEnter"
			@mouseleave="boxMouseLeave"
		></a-box>
		<a-sphere
			id="sphere"
			position="0 1.25 -5"
			radius="1.25"
			color="#EF2D5E"
		></a-sphere>
		<a-cylinder
			id="cylinder"
			position="1 0.75 -3"
			radius="0.5"
			height="1.5"
			color="#FFC65D"
		></a-cylinder>
		<a-plane
			position="0 0 -4"
			rotation="-90 0 0"
			width="4"
			height="4"
			color="#7BC8A4"
		></a-plane>
		<a-sky color="#555555" radius="30"></a-sky>
		<a-sphere
			id="nose"
			position="0 1.25 -5"
			radius="0.3"
			color="#0000FF"
		></a-sphere>

		<a-assets>
			<video
				id="myVideo"
				ref="video"
				width="640"
				height="500"
				autoplay="1"
				crossorigin="anonymous"
				@loadeddata="processing()"
			></video>
		</a-assets>
		<a-video src="#myVideo" width="16" height="9" position="0 10 -20"></a-video>

		<a-camera id="myCamera">
			<a-cursor id="myCursor"></a-cursor>
		</a-camera>
	</a-scene>
</template>

<script>
import * as facemesh from "@tensorflow-models/facemesh";

export default {
	name: "WebVRAndML",
	data: function () {
		return {
			posenet: null,
			video: null,
			box_material: "{color: blue}",
			size: { w: 257, h: 200 },
		};
	},
	mounted: function () {
		/* eslint-disable */
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const front = "user";
			const rear = { exact: "environment" };
			const mode = navigator.userAgent.match(/iPhone|Android.+Mobile/)
				? rear
				: front;

			this.video = this.$refs.video;
			navigator.mediaDevices
				.getUserMedia({ video: { facingMode: mode } })
				.then((stream) => {
					this.video.srcObject = stream;
				});
		}
	},
	methods: {
		boxMouseEnter: function (evt) {
			var el = evt.srcElement; // <a-box>
			el.setAttribute("color", "red");
		},
		boxMouseLeave: function (evt) {
			var el = evt.srcElement; // <a-box>
			el.setAttribute("color", "blue");
		},
		processing: function () {
			this.main();
			// tf.setBackend('wasm').then(() => this.main())
		},
		main: async function main() {
			const model = await facemesh.load({
				detectionConfidence: 0.25,
				scoreThreshold: 0.2,
			});
			var noseObj = document.getElementById("nose");
			while (true) {
				// console.log('estimate!!');
				const predict = await model.estimateFaces(this.video);
				if (predict.length > 0) {
					const keypoints = predict[0].mesh;
					const camera = document.getElementById("myCamera");
					const rotate = camera.getAttribute("rotation");
					const radius = 2;
					var position = { x: 0, y: 0, z: 0 };
					const radian = (rotate.y / 180) * Math.PI;
					const x = keypoints[0][0];
					const y = keypoints[0][1];

					position.x =
						-Math.sin(radian) -
						((x - this.size.w / 2) / this.size.w) * 2 * Math.cos(radian);
					position.y += (y + this.size.h / 2) / this.size.h;
					position.z =
						-Math.cos(radian) +
						((x - this.size.w / 2) / this.size.w) * 2 * Math.sin(radian);
					console.log(position);

					noseObj.setAttribute(
						"position",
						`${radius * position.x} ${radius * position.y} ${
							radius * position.z
						}`
					);
					noseObj.setAttribute("visible", true);
				} else {
					noseObj.setAttribute("visible", false);
				}
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
