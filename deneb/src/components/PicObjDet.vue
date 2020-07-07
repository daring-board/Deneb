<template>
  <div id="pic-obj-det">
    <b-alert :show="model == null">モデルファイルをダウンロードしています。</b-alert>
     <b-container fluid>
      <b-row>
        <b-col>
            <b-card header="画像選択">
                <label class="file-upload">
                    物体検出する画像を選択してください
                    <input type="file" @change="onFileChange"/>
                </label>
            </b-card>
        </b-col>
        <b-col>
            <b-card header="表示">
                <canvas ref="canvas"></canvas>
            </b-card>
        </b-col>
      </b-row>
     </b-container>
  </div>
</template>

<script>
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default {
    name: 'PicObjDet',
    data: function(){
        return {
            model: null,
            ctx: null,
            img: new Image(),
            canvas: null,
        }
    },
    mounted: function(){
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
canvas {
    max-width: 100%;
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
