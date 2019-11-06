<template>
  <div id="code_search">
    <b-container fluid>
        <b-card header="CodeSearch">
            <b-card-text style="white-space: pre-line; text-align: left;">
                <div>{{r_text}}</div>
                <div v-if='urls != null'>
                    <div v-for="(url, key) in urls" :key="key">
                        {{key}}. <a :href=url>{{url}}</a> 
                    </div>
                </div>
            </b-card-text>
            <b-card-body>
                <b-form-input v-model="text" placeholder="Enter search words: ex. pythonの使い方"></b-form-input>
                <b-button pill variant="primary" @click="request">送信</b-button>
            </b-card-body>
        </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
    name: 'code_search',
    data: function(){
        return {
            text: '',
            host: 'https://m2vajnoqb5.execute-api.ap-northeast-1.amazonaws.com/dev/search',
            r_text: '',
            memory: null,
            urls: null,
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
                text: this.text,
                memory: this.memory
            }
            let vm = this
            this.$axios.post(this.host, data, header)
                .then(function(response){
                    /* eslint-disable */
                    console.log(response.data.text)
                    vm.r_text = response.data.text
                    console.log(response.data.memory)
                    if(response.data.memory == null){
                        console.log('aaaa')
                        vm.urls = null
                    }else{
                        console.log('bbb')
                        vm.memory = response.data.memory
                        vm.urls = response.data.memory.urls
                    }
                })
        }
    }
}
</script>

<style>
</style>
