<template>
    <div class="pN">
        <div class="n">{{name}}</div>
        <textarea @blur="tBlur" @focus="tFocus" @input="nameC" :class="{nT2:ntS}"  class="nT" name="" id="" maxlength="200" v-model="list[0].advertisementText"></textarea>
        <div class="bottomW"></div>
    </div>
</template>
<script>
    export default {
        name:'productName',
        props: ["prop","list","oldText"],
        data(){
            return {
                ntS:false,
                name:"广告语",
                advertisementText:"夏季促销特接",
                oldProductName:null,
                initList:[
                    {
                        name:"",
                        advertisementText:"",
                        fLabel:""
                    }
                ]
            }
        },
        created(){
            this.list = this.list[0]?this.list:this.initList
        },
        methods:{
            nameC(e){
                let event = window.event || e;
                if(event.currentTarget.value.trim().length == 0){
                    this.list[0].advertisementText = this.oldText.oldadver
                }else{
                    this.list[0].advertisementText = event.currentTarget.value
                }
                this.$emit('tagb',this.list[0].advertisementText)
            },
            tBlur(){
                this.ntS = false
            },
            tFocus(){
                this.ntS = true
            }
        },
    }
</script>
<style scoped>
    .bottomW{
        position: absolute;
        bottom: 0px;
        width: 260px;
        height: 1px;
        background-color: #d7d7d7;
    }
    .pN{
        width:100%;
        height: 90px;
        padding: 0px 20px;
        font-size: 14px;
        color:#797979;
        position: relative;
    }
    .n{
        padding-top: 10px;
        font-size: 12px;
    }
    textarea{
        font-size: 12px;
    }
    .nT{
        width: 260px;
        height: 42px;
        margin-top: 10px;
        padding: 5px;
        resize: none;
        border: none;
    }
    .nT:hover{
        border:1px solid #3089D5;
        border-radius:2px;
        /* box-shadow: 0px 0px 5px #3089D5; */
    }
    .nT2{
        border:1px solid #3089D5;
        border-radius:2px;
        box-shadow: 0px 0px 5px #3089D5;
    }

</style>

