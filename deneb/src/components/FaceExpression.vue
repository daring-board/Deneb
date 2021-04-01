<template>
	<div id="face-expression">
		<b-container fluid>
			<b-card header="スマイルメーター">
				<b-card-body>
					<div class="disp-video">
						<video
							class="size"
							ref="video"
							autoplay
							@loadeddata="loadModel()"
						></video>
						<canvas class="size" ref="canvas"></canvas>
						<div id="emoticonBar">
							<span
								id="emoticon"
								v-bind:style="{
									bottom: bottom,
									backgroundColor: backgroundColor,
								}"
							>
								{{ emoticonTxt }}
							</span>
						</div>
					</div>
				</b-card-body>
			</b-card>
		</b-container>
	</div>
</template>

<script>
import * as faceapi from "face-api.js";

export default {
	name: "FaceExpression",
	data: function () {
		return {
			video: null,
			model: null,
			ctx: null,
			canvas: null,
			emoticonTxt: ":|",
			bottom: 0,
			backgroundColor: "#CCC",
		};
	},
	mounted: function () {
		this.canvas = this.$refs.canvas;
		this.canvas.width = 800;
		this.canvas.height = 500;
		this.video = this.$refs.video;
		this.video.width = 800;
		this.video.height = 500;
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: { facingMode: "user" } })
				.then((stream) => {
					this.video.srcObject = stream;
				});
		}
	},
	methods: {
		async loadModel() {
			await faceapi.nets.tinyFaceDetector.load("weights/");
			await faceapi.nets.faceExpressionNet.load("weights/");
			this.predict();
		},
		predict() {
			this.ctx = this.canvas.getContext("2d");
			this.checkFace();
			requestAnimationFrame(() => {
				this.predict();
			});
		},
		async checkFace() {
			let faceData = await faceapi
				.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
				.withFaceExpressions();
			if (faceData.length) {
				const setDetection = () => {
						let box = faceData[0].detection.box,
							x = box.x + 80,
							y = box.y,
							w = box.width,
							h = box.height;

						this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
						this.ctx.beginPath();
						this.ctx.rect(x, y, w, h);
						this.ctx.strokeStyle = "#76FF03";
						this.ctx.lineWidth = 2;
						this.ctx.stroke();
					},
					setExpressions = () => {
						let happy = faceData[0].expressions.happy,
							color = happy * 150 + 100;
						this.bottom = (this.canvas.height - 40) * happy + "px";
						this.backgroundColor = `rgb(${color}, ${color}, 100)`;
						if (happy > 0.5) {
							this.emoticonTxt = ":)";
						} else {
							this.emoticonTxt = ":|";
						}
					};
				setDetection();
				setExpressions();
			}
		},
	},
};
</script>

<style>
.disp-video {
	position: relative;
	left: 1.25em;
}
.size {
	position: absolute;
	top: 0;
	left: 0;
	width: 800px;
	height: 500px;
}

.row {
	margin-top: 15px;
	margin-bottom: 15px;
}
.card {
	background-color: gray;
	color: whitesmoke;
}
#emoticonBar {
	position: absolute;
	top: 0;
	right: -30px;
	width: 40px;
	height: 480px;
	border-right: #ddd solid 6px;
}
#emoticon {
	position: absolute;
	bottom: 0;
	right: -24px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #ccc;
	text-align: center;
	font-size: 24px;
	line-height: 40px;
	transform: rotate(90deg);
	transition: bottom 0.3s;
}
</style>