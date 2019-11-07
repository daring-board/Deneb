<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>AppZoo</b-navbar-brand>
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
          <b-nav-item>
            <router-link to="/code_search">CodeSearch(工事中)</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
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
