<template>
  <div id="home">
      <b-card @click="$router.push('/pic-obj-det')">
        <b-card-header>
            物体検知：静止画
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
      <b-card @click="$router.push('/mov-obj-det')">
        <b-card-header>
            物体検知：動画
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
      <b-card @click="$router.push('/posenet')">
        <b-card-header>
            姿勢推定
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
      <b-card @click="$router.push('/deneb')">
        <b-card-header>
            人工無能チャット
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
      <b-card @click="$router.push('/code_search')">
        <b-card-header>
            CodeSearch(工事中)
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
      <b-card @click="$router.push('/attendance')">
        <b-card-header>
            バイト勤怠
        </b-card-header>
        <b-card-body>
        </b-card-body>
      </b-card>
  </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style>
</style>
