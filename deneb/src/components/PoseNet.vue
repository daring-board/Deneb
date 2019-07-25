<template>
  <div id="pose-net">
    <b-alert :show="model == null">モデルファイルをダウンロードしています。</b-alert>
    <b-container fluid>
        <b-card header="姿勢推定">
            <b-card-body class="disp-video">
                <video
                    class="size"
                    ref="video"
                    autoplay
                    @loadeddata="loadModel()"
                ></video>
                <canvas 
                    class="size"
                    ref="canvas"
                ></canvas>
            </b-card-body>
        </b-card>
    </b-container>
  </div>
</template>

<script>
import * as posenet from '@tensorflow-models/posenet'

export default {
    name: 'PoseNet',
    data: function(){
        return {
            video: null,
            model: null,
            ctx: null,
            canvas: null,
        }
    },
    mounted: function(){
        this.canvas = this.$refs.canvas
        this.canvas.width = 800
        this.canvas.height = 500
        this.video = this.$refs.video
        this.video.width = 800
        this.video.height = 500
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: {facingMode: "user"} }).then(stream => {
                this.video.srcObject = stream
            })
        }
    },
    methods: {
        loadModel(){
            posenet.load({
                architecture: 'ResNet50',
                outputStride: 16,
            }).then(model => {
                this.model = model
                this.predict()
            })
        },
        predict(){
            this.ctx = this.canvas.getContext('2d')
            this.model.estimateSinglePose(this.video, ).then(res => {
                this.drawKeyPoint(res)
            })
            requestAnimationFrame(() => {
                this.predict()
            })
        },
        drawKeyPoint(data){
            var startAngle = 0;
            var endAngle = 2 * Math.PI
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            /* eslint-disable */
            console.log(data)
            data.keypoints.forEach(el => {
                if(el.score < 0.7) return
                const x = parseInt(el.position.x, 10)
                const y = parseInt(el.position.y, 10)
                this.ctx.beginPath()
                this.ctx.fillStyle = "rgb(50, 240, 60)"
                this.ctx.arc(x, y, 5, startAngle, endAngle, true)
                this.ctx.closePath()
                this.ctx.fill()
            })
            const points = data.keypoints
            this.ctx.beginPath()
            this.ctx.moveTo(points[9].position.x, points[9].position.y)
            this.ctx.lineTo(points[7].position.x, points[7].position.y)
            this.ctx.closePath()
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(points[7].position.x, points[7].position.y)
            this.ctx.lineTo(points[5].position.x, points[5].position.y)
            this.ctx.closePath()
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(points[6].position.x, points[6].position.y)
            this.ctx.lineTo(points[8].position.x, points[8].position.y)
            this.ctx.closePath()
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(points[8].position.x, points[8].position.y)
            this.ctx.lineTo(points[10].position.x, points[10].position.y)
            this.ctx.closePath()
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(points[5].position.x, points[5].position.y)
            this.ctx.lineTo(points[6].position.x, points[6].position.y)
            this.ctx.closePath()
            this.ctx.stroke()

            // this.ctx.beginPath()
            // this.ctx.moveTo(points[15].position.x, points[15].position.y)
            // this.ctx.lineTo(points[13].position.x, points[13].position.y)
            // this.ctx.lineTo(points[11].position.x, points[11].position.y)
            // this.ctx.lineTo(points[12].position.x, points[12].position.y)
            // this.ctx.lineTo(points[14].position.x, points[14].position.y)
            // this.ctx.lineTo(points[16].position.x, points[16].position.y)
            // this.ctx.closePath()
            // this.ctx.stroke()

            // this.ctx.beginPath()
            // this.ctx.moveTo(points[5].position.x, points[5].position.y)
            // this.ctx.lineTo(points[11].position.x, points[11].position.y)
            // this.ctx.closePath()
            // this.ctx.stroke()

            // this.ctx.beginPath()
            // this.ctx.moveTo(points[6].position.x, points[6].position.y)
            // this.ctx.lineTo(points[12].position.x, points[12].position.y)
            // this.ctx.closePath()
            // this.ctx.stroke()
        }
    }
}
</script>

<style>
.disp-video{
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
</style>
