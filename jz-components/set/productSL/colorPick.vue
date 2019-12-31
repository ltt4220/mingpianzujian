<template>
    <div class="color-pick-box">
        <span class="colrr-pick-box-title">{{this.title}}</span>
        <component  :is="com" :prop='{value:colorVal}' @syncColor='syncColorToComponent'></component>
    </div>
</template>
<script>
export default {
    name:"colorPick",
    props:['prop'],
    data(){
        return {
            com:null,
            colorVal:this.prop.value
        }
    },
    computed:{
        title(){
            return this.prop.title
        },
        curSelectedCom(){
            return zmEditor.$store.state.component.selectList;//当前选中的组件
        },
    },
    methods:{
        syncColorToComponent(_newColor,changedStatus){
            if(changedStatus == "previewStatus" && this.prop.mode == "preview") return
            let attr = this.prop.attr;
            // this.colorVal=this.prop.value;
            
            this.curSelectedCom[0].settingData[attr].value=_newColor
            this.colorVal=_newColor;
            if(this.prop.callback){
                this.prop.callback({color:_newColor})
            }
        }
    },
    created:function(){
        let url = "/set/colorPicker.vue";
        const com = ()=> import ("../../../components" + url);
        this.com = com;
    },
    
}
</script>
<style lang='less' scoped>
.color-pick-box{
   border-bottom: 1px solid #f2f2f2;
    margin: 0 20px;
    min-height: 55px;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width:246px;
    padding-top:11px;
    .colrr-pick-box-title{
        display: inline-block;
        width: 65px;
        text-align: left;
        vertical-align: middle;
        padding-right: 9px;
        font-size: 12px;
        color: #797979;
        
    }
}

</style>

