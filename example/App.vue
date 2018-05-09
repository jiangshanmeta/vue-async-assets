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

        <div v-if="$asyncComponent['vue-quill-editor']">
            <vue-quill-editor></vue-quill-editor>
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
    asyncComponent:{
        'vue-quill-editor':import("vue-quill-editor").then((component)=>{
            return component.quillEditor;
        })
    },
}
</script>