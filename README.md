# vue-async-assets

vue异步加载插件/组件/指令/过滤器

vue中插件一般是同步加载然后使用的，我想实现的是异步加载然后使用。

声明式使用方法：

```
asyncPlugin:{
    'elementUi':import("element-ui"),
    'myPlugin':{
        plugin:import("./myPlugin").then((rst)=>{

            return rst
        }),
        config:{"abc":"def","qqq":"ppp"},
    }
},
```

对于每一个异步使用的插件，需要配置以下参数：唯一标识(name)，加载的promise(plugin)，以及插件使用的配置参数(config)。

对于对象语法，键名就是name。如果没有配置项，键值可以直接是加载的promise，如果有配置项config，则键值需要是包含plugin和config两项的对象。

对于数组语法，每一项可以直接是promise，这意味着在数组中的索引会被当成唯一标识name，同时没有插件的配置参数config。每一项如果是对象，plugin就是加载插件的promise，name是唯一标识(依然会采用索引作为默认值),config是插件配置项。

声明了异步加载的插件后，我们需要知道什么时候插件被加载好了，$asyncPlugin这个参数就是为此设计的,它是响应式的。

```html
<div v-if="$asyncPlugin.elementUi">
    <el-button type="primary">element-ui</el-button>
</div>
```

在$asyncPlugin下有一个参数$all，表示所有的异步插件是否被加载完成，使用实例如下：

```html
<div v-if="$asyncPlugin.$all">
    全部异步插件加载完成
</div>
```

另外还支持编程式异步使用插件，每一个vue实例上可以访问到$resetAsyncPlugin方法，其入参和asyncPlugin选项一致，返回一个promise，当所有插件被异步加载完成后这个promise被resolve。


类似于异步plugin，也有对应的异步component/filter/directive。声明式异步component似乎没有什么用途，因为vue本身就支持异步组件，但是编程式异步组件是有用的，[我的通用管理后台项目就遇到了一个应用场景](https://github.com/jiangshanmeta/vue-admin/blob/master/src/components/common/operators/operators.vue)。