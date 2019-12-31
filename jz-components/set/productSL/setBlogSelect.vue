<template>
    <div class="zm-dialog-sortord2" @mouseleave="pageSetLeave">
        <span class="zm-dialog-Icon-titleType">商品类型:</span>
        <!-- <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmicon_hover':isHover}"> -->
        <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmiconHover':isShow}">
            <span class="number2">{{RandomSN}}</span>
            <i class="number2 iconfont icon-sanjiao-copy icon_triangle"></i>
        </div>
        <div class="bline" style="width:256px;height:1px;background-color:#f2f2f2;position:absolute;top:52px;"></div>
        <ul class="zm-dialog-random" v-show="isShow" @mouseleave="pageSetLeave" @mouseenter="pageSetEnter">
            <li data-type="random" @click.stop="selectF(0)"><span class="random">产品</span></li>
            <li data-type="time" @click.stop="selectF(1)"><span class="time">服务</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"set-blog-select",
    props:['prop'],
    data(){
        return {
            isShow:false,
            isHover:false,
            RandomSN:"",
            oldRandomSN:"",
            type:"mySelectType2"
        }
    },
    created(){
        let nowVue = zmEditor.$store.state.component.selectList[0]
        // let index = nowVue.typeIndex
        let index = nowVue.settingData.typeIndex
        if(index == 0){
            this.RandomSN = "产品"
        }else if(index == 1){
            this.RandomSN = "服务"
        }
        // this.RandomSN = nowVue.RandomSN
        this.oldRandomSN = this.RandomSN
    },
    methods:{
        pageSetLeave(){
            this.isShow = false
        },
        pageSetEnter(){
            this.isShow = true
        },
        selectF(index,str){
            let nowVue = zmEditor.$store.state.component.selectList[0]
            nowVue.typeIndex = index;
            nowVue.settingData.typeIndex = index;
            this.$emit("selectProduct",index)
            this.oldRandomSN = this.RandomSN
            if(index == 0){
                this.RandomSN = "产品"
            }else if(index == 1){
                this.RandomSN = "服务"
            }
            if(str && str == 'noSelset') return
            nowVue.RandomSN = this.RandomSN
            this.isShow = false
            this.$emit("productType",nowVue.RandomSN)


            let sibilVue
            this.$parent.$children.forEach((element,index)=>{
                if(element.type == 'mySelectType'){
                    sibilVue = element
                }
            })
            if(this.RandomSN == "产品"){
                this.$parent.compositeDataL = "选择产品"
                sibilVue.checkBlog(this.oldRandomSN,'product')
            }else if(this.RandomSN == "服务"){
                this.$parent.compositeDataL = "选择服务"
                sibilVue.checkBlog(this.oldRandomSN,'service')
            }
        },
        addSelClass(){
            let _this = this;
                _this.isShow = !_this.isShow;
                _this.isHover = ! _this.isHover;
        },
        
    }
}
</script>

