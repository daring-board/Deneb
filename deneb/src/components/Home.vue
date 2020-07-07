<template>
  <div id="home">
    <b-row>
      <b-col>
        <b-card @click="$router.push('/pic-obj-det')">
          <b-card-header>
              物体検知：静止画
          </b-card-header>
          <b-card-body>
            静止画に写っている物体を検出します。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/mov-obj-det')">
          <b-card-header>
              物体検知：動画
          </b-card-header>
          <b-card-body>
            動画に写っている物体を検出します。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/posenet')">
          <b-card-header>
              姿勢推定
          </b-card-header>
          <b-card-body>
            Webカメラに写った人の体のキーポイントを検出し、<br/>
            スティックピクチャを生成します。
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card @click="$router.push('/deneb')">
          <b-card-header>
              人工無能チャット
          </b-card-header>
          <b-card-body>
            入力されたテキストに対して、単純な自然言語生成器を<br/>
            用いてそれらしい応答テキストを生成します。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="toDenebChat">
          <b-card-header>
            雑談チャット
          </b-card-header>
          <b-card-body>
            停止中<br/>
            人工無能チャットよりも入力に対してそれらしい<br/>
            応答テキストを生成します。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/code_search')">
          <b-card-header>
              CodeSearch
          </b-card-header>
          <b-card-body>
            工事中<br/>
            プログラミング言語の文法やライブラリの使い方を<br/>
            対話的に検索する。
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card @click="toAutoML">
          <b-card-header>
            AutoML
          </b-card-header>
          <b-card-body>
            工事中<br/>
            表形式のデータに対して、予測を行う機械学習モデルを<br/>
            生成するためのサービス。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/ml1')">
          <b-card-header>
            賢くなるAI
          </b-card-header>
          <b-card-body>
            Webカメラに写った物体が何かをAIに学習させるアプリ。
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/webvr')">
          <b-card-header>
            WebVR Test
          </b-card-header>
          <b-card-body>
            WebVR技術によりVR空間を生成。
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card @click="$router.push('webvr_and_ml')">
          <b-card-header>
            WebVRxML
          </b-card-header>
          <b-card-body>
            WebVRと機械学習を組み合わせたアプリ例。<br/>
            鼻と左右の手首を検出すると、VR空間に変化が起こります。
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
      <!-- <b-card @click="$router.push('/attendance')">
        <b-card-header>
            バイト勤怠
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card> -->
  </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
      toDenebChat: function(){
        window.location = "https://deneb-chat.firebaseapp.com/"
      },
      toAutoML: function(){
        window.location = "http://hosting-test.tasdg.s3-website.us-east-2.amazonaws.com/#/login"
      }
    }
}
</script>

<style>
.row {
  margin-top: 15px;
  margin-bottom: 15px;
}
.card {
  background-color: gray;
  color: whitesmoke;
}
.card-body {
  background-color: gray;
}
.card-header {
  background-color: darkgray !important;
}
</style>
