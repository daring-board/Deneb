<template>
  <div id="deneb">
    <b-container fluid>
        <b-card header="人工無能チャット">
            <b-card-text>
                {{r_text}}
            </b-card-text>
            <b-card-body>
                <b-form-input v-model="text" placeholder="Enter words"></b-form-input>
                <b-button pill variant="primary" @click="request">送信</b-button>
            </b-card-body>
        </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
    name: 'Deneb',
    data: function(){
        return {
            text: '',
            host: 'https://m2vajnoqb5.execute-api.ap-northeast-1.amazonaws.com/dev/talk',
            r_text: '',
        }
    },
    methods: {
        onMessageSubmit: function(message){
            /* eslint-disable */
            console.log(message)
        },
        request(){
            var header = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
            var data = {
                text: this.text
            }
            let vm = this
            this.$axios.post(this.host, data, header)
                .then(function(response){
                    /* eslint-disable */
                    console.log(response.data.text)
                    vm.r_text = response.data.text
                })
        }
    }
}
</script>

<style>
</style>
