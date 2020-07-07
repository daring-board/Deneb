<template>
  <div id="mov-obj-det">
    <b-alert :show="model == null">モデルファイルをダウンロードしています。</b-alert>
    <b-container fluid>
        <b-row>
            <b-col>
                <b-card header="動画選択">
                    <label class="file-upload">
                        物体検出する動画を選択してください
                        <input type="file" @change="onFileChange"/>
                    </label>
                </b-card>
            </b-col>
            <b-col>
                <b-card header="表示">
                    <b-card-body class="disp-video">
                        <video
                            class="size"
                            ref="video"
                            v-bind:src="videopath"
                            v-video="play"
                            @loadeddata="loadModel()"
                            @ended="stopDetect()"
                        ></video>
                        <canvas
                            class="size"
                            ref="canvas"
                        />
                    </b-card-body>
                    <div><button @click="play=!play">{{button}}</button></div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default {
    name: 'MovObjDet',
    data: function(){
        return {
            play: false,
            videopath: 'videotest.mp4',
            video: null,
            model: null,
            is_animation: null,
            ctx: null,
            canvas: null,
        }
    },
    directives: {
        video(el, binding){
            binding.value? el.play() : el.pause();
        }
    },
    computed: {
        button(){
            if(this.play){
                this.predict(this.model)
            }
            return this.play ? '停止': '再生'
        }
    },
    mounted: function(){
        this.canvas = this.$refs.canvas
        this.canvas.width = 800
        this.canvas.height = 500
        this.ctx = this.canvas.getContext('2d')
        this.video = this.$refs.video
        this.video.width = 800
        this.video.height = 500
    },
    methods: {
        loadModel(){
            cocoSsd.load().then(model => {
                this.model = model
                this.predict(model)
            })
        },
        predict(model){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            model.detect(this.video).then(res => {
                res.forEach(el => {
                    /* eslint-disable */
                    console.log(el)
                    this.drawRect(el.bbox)
                    this.drawLabel(el.class +' : '+ el.score.toFixed(2), el.bbox)
                })
                if(this.play){
                    this.is_animation = requestAnimationFrame(() => {
                        this.predict(model)
                    })
                }
            })
        },
        stopDetect(){
            cancelAnimationFrame(this.is_animation)
        },
        onFileChange(event){
            const files = event.target.files || event.dataTransfer.files
            this.video.src = URL.createObjectURL(files[0])
        },
        drawRect(box) {
            const x = box[0]
            const y = box[1]
            const w = box[2]
            const h = box[3]
            this.ctx.beginPath();
            this.ctx.rect(
                parseInt(x, 10), 
                parseInt(y, 10),
                parseInt(w, 10),
                parseInt(h, 10)
            )
            this.ctx.strokeStyle = "rgb(50, 240, 60)"
            this.ctx.lineWidth = 4
            this.ctx.stroke()
            this.ctx.closePath()
        },
        drawLabel(text, box) {
            const x = box[0]
            const y = box[1]
            this.ctx.beginPath()
            this.ctx.rect(x, y+15, 140, -15)
            this.ctx.fillStyle = "rgb(50, 240, 60)"
            this.ctx.fill()
            this.ctx.closePath()

            this.ctx.beginPath()
            this.ctx.font = "18px 'ＭＳ Ｐゴシック'"
            this.ctx.fillStyle = "black"
            this.ctx.fillText(text, parseInt(x, 10), parseInt(y+15, 10))
            this.ctx.closePath()
        }
    }
}
</script>

<style>
.disp-video{
    position: relative;
    width: 800px;
    height: 500px;
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
</style>
