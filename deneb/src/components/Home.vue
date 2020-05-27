<template>
  <div id="home">
    <b-row>
      <b-col>
        <b-card @click="$router.push('/pic-obj-det')">
          <b-card-header>
              物体検知：静止画
          </b-card-header>
          <b-card-body>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/mov-obj-det')">
          <b-card-header>
              物体検知：動画
          </b-card-header>
          <b-card-body>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/posenet')">
          <b-card-header>
              姿勢推定
          </b-card-header>
          <b-card-body>
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
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="toDenebChat">
          <b-card-header>
            雑談チャット
          </b-card-header>
          <b-card-body>
            停止中
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/code_search')">
          <b-card-header>
              CodeSearch
          </b-card-header>
          <b-card-body>
            工事中
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="toAutoML">
          <b-card-header>
            AutoML
          </b-card-header>
          <b-card-body>
            工事中
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card @click="$router.push('/ml1')">
          <b-card-header>
            賢くなるAI
          </b-card-header>
          <b-card-body>
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
</style>
