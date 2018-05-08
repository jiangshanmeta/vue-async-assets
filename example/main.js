import Vue from 'vue'

import asyncAssets from "src/index"
Vue.use(asyncAssets);

import App from './App'

new Vue({
    el:"#app",
    render(h){
        return h('App');
    },
    components:{
        App,
    },
})