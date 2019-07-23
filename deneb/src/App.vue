<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>物体検出</b-navbar-brand>
    </b-navbar>
    <ObjectDetection/>
  </div>
</template>

<script>
import ObjectDetection from './components/ObjectDetection.vue'

export default {
  name: 'app',
  components: {
    ObjectDetection
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
