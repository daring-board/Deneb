<template>
  <a-scene>
    <a-box 
      position="-1 0.5 -3"
      rotation="0 45 0"
      @mouseenter="boxMouseEnter"
      @mouseleave="boxMouseLeave"
    ></a-box>
    <a-sphere id="sphere" position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    <a-cylinder id="cylinder" position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
    <a-sky color="#555555" radius="30" ></a-sky>
    <a-sphere id="nose" position="0 1.25 -5" radius="0.3" color="#0000FF"></a-sphere>

    <a-assets>
      <video
        id="myVideo"
        ref="video"
        width="400"
        height="300"
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
import * as posenet from '@tensorflow-models/posenet'

export default {
  name: 'WebVRAndML',
  data: function(){
    return {
      posenet: null,
      video: null,
      box_material: '{color: blue}',
      size: {w: 257, h: 200},
    }
  },
  mounted: function(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const front = "user";
      const rear = { exact: "environment" };
      const mode = (navigator.userAgent.match(/iPhone|Android.+Mobile/))? rear: front;

      this.video = this.$refs.video
      navigator.mediaDevices.getUserMedia({ video: {facingMode: mode} }).then(stream => {
          this.video.srcObject = stream;
      })
    }
  },
  methods: {
    boxMouseEnter: function(evt){
      var el = evt.srcElement;  // <a-box>
      el.setAttribute('color', 'red');
    },
    boxMouseLeave: function(evt){
      var el = evt.srcElement;  // <a-box>
      el.setAttribute('color', 'blue');
    },
    processing: function() {
      this.main();
    },
    main: async function main(){
      const model = await posenet.load({
              architecture: 'ResNet50',
              outputStride: 32,
              inputResolution: { width: this.size.w, height: this.size.h },
              quantBytes: 2
          });
      var sphere = document.getElementById('sphere');
      var cylinder = document.getElementById('cylinder');
      var noseObj = document.getElementById('nose');
      while(true) {
          // console.log('estimate!!');
          const predict = await model.estimateSinglePose(this.video);

          const keypoints = predict.keypoints;
          // console.log(keypoints)
          const right_wrist = keypoints[10];
          const left_wrist = keypoints[9];
          const nose = keypoints[0];

          if (right_wrist.score > 0.5) {
              // console.log(right_wrist.score);
              sphere.setAttribute('visible', false);
          } else {
              sphere.setAttribute('visible', true);
          }

          if (left_wrist.score > 0.5) {
              // console.log(left_wrist.score);
              cylinder.setAttribute('visible', false);
          } else {
              cylinder.setAttribute('visible', true);
          }

          if (nose.score > 0.8) {
              //var camera = document.getElementById('myCamera');
              //var rotate = camera.getAttribute('rotation');
              //console.log(rotate);
              const ctr_x = -0.75;
              const ctr_y = 1.6;
              var x = 2 * (nose.position.x / this.size.w + ctr_x);
              var y = 2 * (- nose.position.y / this.size.h + ctr_y);

              noseObj.setAttribute('visible', true);
              noseObj.setAttribute('position', `${x} ${y} -2`);
              //var pos = noseObj.getAttribute('position');
              //console.log(pos);
          } else {
              noseObj.setAttribute('visible', false);
          }
      }
    }
  }
}
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
