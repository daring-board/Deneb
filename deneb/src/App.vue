<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand @click="$router.push('/')">AppZoo</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/pic-obj-det">物体検知：静止画</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/mov-obj-det">物体検知：動画</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/posenet">姿勢推定</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/deneb">人工無能チャット</router-link>
          </b-nav-item>
          <b-nav-item @click="toDenebChat">
            <a>雑談チャット</a>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/code_search">CodeSearch</router-link>
          </b-nav-item>
         <b-nav-item @click="toAutoML">
            <a>AutoML</a>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/ml1">賢くなるAI</router-link>
          </b-nav-item>
          <!-- <b-nav-item>
            <router-link to="/attendance">バイト勤怠</router-link>
          </b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
