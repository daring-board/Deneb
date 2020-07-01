<template>
  <a-scene>
    <a-entity id="sphere" geometry="primitive: sphere"
      material="color: #EFEFEF; shader: flat"
      position="0 0.15 -5"
      light="type: point; intensity: 5"
      animation="property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: 0 -0.10 -5; loop: true"></a-entity>
    <a-entity id="rain" particle-system="preset: rain; color: #24CAFF; particleCount: 5000"></a-entity>
    <a-entity id="ocean" ocean="density: 20; width: 50; depth: 50; speed: 4"
      material="color: #9CE3F9; opacity: 0.75; metalness: 0; roughness: 1"
      rotation="-90 0 0"></a-entity>
    <a-entity id="light" light="type: ambient; color: #888"></a-entity>
    <a-sky material="shader: gradient; topColor: 185 185 210; bottomColor: 50 50 80"></a-sky>
  </a-scene>
</template>

<script>
export default {
  name: 'WebVR',
  data() {
    return {
      planePositionSrc: {x: 0, y: 0, z: -1}
    }
  },
  computed: {
    planePosition () {
      const pos = this.planePositionSrc
      return `${pos.x} ${pos.y} ${pos.z}`
    }
  },
  methods: {
    // クリックすると平面が遠のく
    onClickPlane() {
      this.planePositionSrc.z += 0.5
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
