<template>
 <!-- zm-edit-item -->
    <div class="zm-edit-component-product-productLayout zm-edit-item">
        <div class="zm-edit-component-product-productLayout-title">布局样式</div>
        <div class="zm-edit-component-product-productLayout-style">
            <!-- <div @click.stop='btnClick(1)' :class="{layoutActive:layoutActive == 1}" class="zm-edit-productLayout-bottom" v-html='svgImgfun'></div> -->
            <!-- <div @click.stop='btnClick(2)' :class="{layoutActive:layoutActive == 2}" class="zm-edit-productLayout-top" v-html='svgImgfun'></div> -->
            <div @click.stop='btnClick(3)' :class="{layoutActive:layoutActive == 3}" class="zm-edit-productLayout-left" v-html='svgImgfun'></div>
            <div @click.stop='btnClick(4)' :class="{layoutActive:layoutActive == 4}" class="zm-edit-productLayout-right" v-html='svgImgfun'></div>
        </div>
    </div>
</template>
<script>
export default {
    name:"set-product-productLayout",
    props: ['prop'], 
    data(){
        return {
            layoutActive:this.prop.value,
            hideOne:false
        }
    },
    computed:{
        svgImgfun(){
            return `<svg style="width:41px;height:41px;" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                        x="0px" y="0px" width="41px" height="41px" viewBox="0 0 100 160" style="enable-background:new 0 0 100 160;"
                        xml:space="preserve">
                    <rect y="60" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 100 219.9986)" class="st0" width="100" height="100" style="fill:#3089D5;"/>
                    <g style="fill:#363636;">
                        <path class="st1" d="M70.3,44.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5l4.1-6.3h4.3L82,34.7
                            l6.9,10.1h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H70.3z"/>
                        <path class="st1" d="M50.5,44.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5H60c0-0.1,0.3-0.6,1-1.5L65,25h4.3l-7.2,9.8
                            L69,44.9h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H50.5z"/>
                        <path class="st1" d="M30.7,44.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5l4.1-6.3h4.3l-7.2,9.8
                            l6.9,10.1h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H30.7z"/>
                        <path class="st1" d="M10.8,44.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5l4.1-6.3h4.3l-7.2,9.8
                            l6.9,10.1H25l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H10.8z"/>
                        <path class="st1" d="M70.3,19.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5L84.9,0h4.3L82,9.8
                            l6.9,10.1h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H70.3z"/>
                        <path class="st1" d="M50.5,19.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5H60c0-0.1,0.3-0.6,1-1.5L65,0h4.3l-7.2,9.8
                            L69,19.9h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H50.5z"/>
                        <path class="st1" d="M30.7,19.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5L45.2,0h4.3l-7.2,9.8
                            l6.9,10.1h-4.4l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H30.7z"/>
                        <path class="st1" d="M10.8,19.9l7.1-10l-7-9.9h4.4l4,6.3c0.2,0.3,0.5,0.9,0.9,1.5h0.1c0-0.1,0.3-0.6,1-1.5L25.4,0h4.3l-7.2,9.8
                            l6.9,10.1H25l-4-6.7c-0.2-0.4-0.5-0.9-0.9-1.6h-0.1l-5.1,8.2H10.8z"/>
                    </g>
                    </svg>`
        }
    },
    methods:{
        btnClick(index){
            let that = this;
            let attr = this.prop.attr;
            zmEditor.$store.state.component.selectList[0].settingData[attr] = index;
            this.layoutActive = index
            this.prop.callback(index,that)
        }
    },
    created(){
        if(this.prop.witchH && this.prop.witchH==1){
            this.hideOne = false
        }else{
            this.hideOne = true
        }

    }
}
</script>
<style scoped>
    .zm-edit-component-product-productLayout{
        width:auto !important;
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-title {
        height: 40px;
        line-height: 40px;
        /* text-indent: 20px; */
        text-indent: -1px;
        color:#797979;
        font-size: 12px
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style {
        height: 66px;
        /* margin-left: 20px; */
        margin-left: 6px;
        width: 100%;
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div {
        /* padding-top: 3px; */
        padding: 5px;
        width: 53px;
        height: 53px;
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        float: left;
        cursor: pointer;
        margin-right: 11px;
        margin-right: 7px;
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div > svg {
        width: 100%;
        height: 100%;
    }
    /* .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div:nth-child(1) {
        transform: rotateX(-180deg);
    } */
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div:nth-child(1) {
        transform: rotateZ(-270deg);
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div:nth-child(2) {
        transform: rotateZ(-90deg);
    }
    .zm-edit-component-product-productLayout .zm-edit-component-product-productLayout-style > div.layoutActive {
        /*border: 1px solid #3089d5;*/
    }
</style>


