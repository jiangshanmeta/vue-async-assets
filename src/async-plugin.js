import isPromise from 'is-promise'

function handleAsyncPluginOption(asyncPlugin){
    // 支持数组和对象两种形式的asyncPlugin,统一成数组形式
    if(!Array.isArray(asyncPlugin)){
        asyncPlugin = Object.keys(asyncPlugin).map((name)=>{
            let plugin = asyncPlugin[name];
            let config;
            // 检验是否是promise
            if(!isPromise(plugin)){
                if(plugin.hasOwnProperty('name')){
                    name = plugin.name;
                }
                if(plugin.hasOwnProperty('config')){
                    config = plugin.config;
                }
                plugin = plugin.plugin;
            }

            return {
                plugin,
                name,
                config,
            }
        });
    }

    asyncPlugin.forEach((item,index,array)=>{

        if(isPromise(item)){
            array[index] = {
                plugin:item,
                name:index,
                config:[],
            }
            return;
        }

        // 序号作为默认索引
        if(!item.hasOwnProperty('name')){
            item.name = index;
        }

        // config最终处理成为数组的形式
        if(!item.config){
            item.config = [];
        }else if(typeof item.config === 'object' && !Array.isArray(item.config)){
            item.config = [item.config];
        }
    });

    return asyncPlugin;
}

const dataName = 'async$plugin';


export default function(Vue){
    // 混合策略，采用后者覆盖前者
    Vue.config.optionMergeStrategies.asyncPlugin = Vue.config.optionMergeStrategies.computed;

    Vue.mixin({
        beforeCreate(){

            const optionData = this.$options.data || {};
            this.$options.data = function(){
                let data = typeof optionData === 'function'?optionData.call(this):optionData;

                data[dataName] = {};

                return data;
            }
        },
        created(){
            this.$resetAsyncPlugin(this.$options.asyncPlugin);
        },
    });

    Object.defineProperty(Vue.prototype,'$resetAsyncPlugin',{
        value(asyncPluginOption){
            if(!asyncPluginOption || typeof asyncPluginOption !== 'object'){
                return;
            }

            asyncPluginOption = handleAsyncPluginOption(asyncPluginOption);
            this[dataName] = {
                $all:false
            };

            asyncPluginOption.forEach((item)=>{
                this.$set(this[dataName],item.name,false);
                item.plugin.then((plugin)=>{
                    console.log(plugin)
                    this[dataName][item.name] = true;
                    this.constructor.use(plugin,...item.config);
                });
            });

            Promise.all(asyncPluginOption.map((item)=>{
                return item.plugin;
            })).then(()=>{
                this[dataName].$all = true;
            });
        },
    })

    Object.defineProperty(Vue.prototype,'$asyncPlugin',{
        get(){
            return this[dataName];
        },
    })

}