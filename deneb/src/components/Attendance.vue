<template>
  <div id="attendance">
    <b-container>
      <b-card>
        <b-card-header>バイト勤怠</b-card-header>
        <b-card-body>
          <b-container>
            <b-row>
              <b-col><b-button @click="syukkin">出勤</b-button></b-col>
              <b-col><b-button @click="taikin">退勤</b-button></b-col>
            </b-row>
            <b-row>
              <b-col>{{syukkin_dt}}</b-col>
              <b-col>{{taikin_dt}}</b-col>
            </b-row>
          </b-container>
        </b-card-body>
      </b-card>
      <b-card>
        <b-card-header>コメント記入</b-card-header>
        <b-card-body>
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-card-body>
      </b-card>
      <b-button>確定</b-button>
    </b-container>
  </div>
</template>

<script>
export default {
    name: 'Attendance',
    data(){
      return{
        syukkin_dt: '',
        taikin_dt: '',
      }
    },
    methods: {
      syukkin: function(){
        var now = new Date()
        this.syukkin_dt = now
      },
      taikin: function(){
        var now = new Date()
        this.taikin_dt = now
      }
    }

}
</script>

<style>
/* .btn-secondary, .card{
  margin-top:20px;
} */
</style>
