<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>物体検出</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item @click="imgPage">静止画</b-nav-item>
        <b-nav-item  @click="movPage">動画</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <ObjectDetection v-if="img_page"/>
    <Movie v-if="mov_page"/>
  </div>
</template>

<script>
import ObjectDetection from './components/ObjectDetection.vue'
import Movie from './components/ObjectDetection_movie.vue'

export default {
  name: 'app',
  components: {
    ObjectDetection,
    Movie
  },
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
