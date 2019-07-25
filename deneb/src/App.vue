<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>AppZoo</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item>
          <b-button variant="outline-primary">
            <router-link to="/pic-obj-det">物体検知：静止画</router-link>
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="outline-primary">
            <router-link to="/mov-obj-det">物体検知：動画</router-link>
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="outline-primary">
            <router-link to="/posenet">姿勢推定</router-link>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  data: function(){
    return {
      img_page: true,
      mov_page: false,
    }
  },
  methods: {
    imgPage(){
      this.img_page = true
      this.mov_page = false
    },
    movPage(){
      this.img_page = false
      this.mov_page = true
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
