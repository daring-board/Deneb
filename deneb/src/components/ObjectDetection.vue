<template>
  <div id="object-detection">
    <b-card header="Step1 画像選択">
        <label class="file-upload">
            ラベリングする画像を選択
            <input type="file" @change="onFileChange"/>
        </label>
    </b-card>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
// import * as tf from '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default {
    name: 'ObjectDetection',
    data: function(){
        return {
            model: null,
            ctx: null,
            img: new Image(),
            canvas: null,
        }
    },
    mounted: async function(){
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.img.src = 'test.jpg'
        var self = this
        this.img.onload = function(){
            self.canvas.width = self.img.width
            self.canvas.height = self.img.height
            self.ctx.drawImage(self.img, 0, 0)
        }
        this.loadModel()
    },
    methods: {
        loadModel(){
            cocoSsd.load().then(model => {
                this.model = model
                this.predict(model)
            })
        },
        predict(model){
            model.detect(this.canvas).then(res => {
                res.forEach(el => {
                    this.drawRect(el.bbox)
                    this.drawLabel(el.class +' : '+ el.score.toFixed(2), el.bbox)
                })
            })
        },
        onFileChange(event){
            const files = event.target.files || event.dataTransfer.files
            const reader = new FileReader()
            reader.onload = e => {
                this.img.src = e.target.result
            }
            reader.readAsDataURL(files[0])
            this.ctx.drawImage(this.img, 0, 0)
            this.loadModel()
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
            this.ctx.rect(x -5, y-15, 140, 15)
            this.ctx.fillStyle = "rgb(50, 240, 60)"
            this.ctx.fill()
            this.ctx.closePath()

            this.ctx.beginPath()
            this.ctx.font = "18px 'ＭＳ Ｐゴシック'"
            this.ctx.fillStyle = "black"
            this.ctx.fillText(text, parseInt(x, 10), parseInt(y, 10))
            this.ctx.closePath()
        }
    }
}
</script>

<style>
</style>
