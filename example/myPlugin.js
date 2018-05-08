function install(Vue,...args){
    console.log(args);

    Vue.prototype.naive = "too young too simple"
}


export {
    install
}