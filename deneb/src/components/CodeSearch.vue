<template>
  <div id="code_search">
    <b-container fluid>
        <b-card header="CodeSearch">
            <b-card-text style="white-space: pre-line; text-align: left;">
                <div v-if="memory != null">
                    <div v-if="memory.code != null">
                        <div v-for="(value, key) in objects" :key=key>
                            {{value['text']}}
                            <b-card header='Example'>
                                <div v-html="value['code']"></div>
                            </b-card>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div>{{r_text}}</div>
                </div>
            </b-card-text>
            <b-card-body>
                <b-form-input v-model="text" placeholder="Enter search words: ex. サポートベクターマシンの使い方"></b-form-input>
                <b-button pill variant="primary" @click="request">送信</b-button>
            </b-card-body>
        </b-card>
    </b-container>
  </div>
</template>

<script>
import hljs from 'highlightjs'

export default {
    name: 'code_search',
    data: function(){
        return {
            text: '',
            host: 'https://m2vajnoqb5.execute-api.ap-northeast-1.amazonaws.com/dev/search',
            r_text: '',
            memory: null,
            objects: [],
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
                        vm.memory = null
                        vm.objects = []
                    }else{
                        console.log('bbb')
                        vm.memory = response.data.memory
                        if(vm.memory.code != null){
                            for(var i = 0; i < vm.memory.code.length; i++){
                                vm.objects[i] =  {
                                    'code': hljs.highlightAuto(vm.memory.code[i], ['python']).value,
                                    'text': vm.memory.text[i],
                                }
                            }
                        }
                    }
                })
        }
    }
}
</script>

<style src='highlightjs/styles/github-gist.css'>
</style>
