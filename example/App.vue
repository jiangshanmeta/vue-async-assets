<template>
    <section>
        主页蛤

        <div v-if="$asyncPlugin.elementUi">
            <el-button type="primary">element-ui</el-button>
        </div>

        <div v-if="$asyncPlugin.myPlugin">
            {{naive}}
        </div>

        <div v-if="$asyncPlugin.$all">
            异步插件加载完成
        </div>
    </section>
</template>

<script>
export default{
    asyncPlugin:{
        'elementUi':import("element-ui"),
        'myPlugin':{
            plugin:import("./myPlugin").then((rst)=>{
                
                return rst
            }),
            config:{"abc":"def","qqq":"ppp"},
        }
    },
}
</script>