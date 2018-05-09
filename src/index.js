import asyncPlugin from "./async-plugin"
import asyncAssets from "./async-assets"

export default{
    install(Vue){
        asyncPlugin(Vue);
        asyncAssets(Vue);
    },
}