<template>
    <!-- 移动端 -->
    <div v-if="settingData.mobileComIsHide" :id="id" class="zm-component-single" :style="{position: 'absolute', width: mobileStyle.width+'px',height:mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px'}">
        <!-- 单一商品图片在上 -->
        <div v-for="(item,index) in mylists" @click.stop='productLink(item.wapurl)' :key="index" ref='product1' class="zm-component-product" :style="{overflow:'hidden',backgroundColor:settingData.backgroundColor.value,width:mobileStyle.width+'px'}">

            <div class="imgBox" ref='img' :style="{overflow:'hidden',height:parseFloat(settingData.imgCss.MimgH)+'px'}">
                <div class="zm-component-product-img" @click.stop='productLink(item.wapurl)' :style="{cursor:'pointer',backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,width:'100%',height:'100%',backgroundImage:'url('+item.mainImage+')'}">
                </div>
            </div>

            <div class="zm-component-product-title" ref='textHeightM' :style="{height:'auto',paddingTop:'10px',paddingBottom:settingData.btnSwitchShow.value?'18px':'0px',}">
                <span v-html="titPadding"></span>
                <div class="zm-component-product-title-text" ref='titleH' @click.stop='productLink(item.wapurl)' :style="{cursor:'pointer',height:1.2*parseFloat(parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize)+'px',boxOrient:'vertical',textAlign:settingData.tit,marginBottom:'18px',lineHeight:'1.2',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}">{{titleName}}</div>
                <div class="title-line" v-show="settingData.DivisionSwitchShow.value" :style="{textAlign:settingData.tit,width:'100%',height:settingData.lineH.value}">
                    <div class="zm-component-product-title-line" :style="{margin:settingData.lineM,float:settingData.lineF,height:settingData.lineH.value,backgroundColor:settingData.lineBg.value,width:settingData.lineWidth.value +'%'}"></div>
                </div>
                <div class="zm-component-product-title-price" v-show="settingData.retailSwitchShow.value" :style="{marginTop:'18px',marginBottom:'18px',height:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,lineHeight:'1',boxOrient:'vertical',marginLeft:'-3px',textAlign:settingData.tit,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"><span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
                <div class="zm-component-product-title-details" v-if="settingData.btnSwitchShow.value" :style="{cursor:'pointer',height:settingData.btnheight.value,textAlign:settingData.tit}">
                    <span @click.stop='productLink(item.wapurl)' :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle}">{{settingData.btnText}}</span>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
// import configy from './configSingleP.js'
import singleProduct from "./productImgL/singleProduct2.js";
export default {
  name: "com-product",
  mixins: [singleProduct],
  props: {
    prop: {
      type: Object,
      required: true
    },
    index: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      id: this.prop.id,
      type: "product",
      style: this.prop.style,
      settingData: this.prop.settingData,
      mobileStyle: this.prop.mobileStyle, //手机版样式
      mylists: []
    };
  },
  created() {
    let shop =
      zmEditor.$store.state.menu.webType == "template" ||
      zmEditor.$store.state.menu.webType == "component"
        ? 71
        : this.fEntrepId;
    let that = this.settingData;
    let assId = JSON.stringify(that.ValidData);
    let fid = assId.slice(1, -1).replace(/\"/g, "");
    let url;
    if (that.productType == "product") {
      //指定产品
      url = "/product-api/getProductListByIds";
    } else if (that.productType == "service") {
      //指定服务
      url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
    }
    if (fid.length != 0) {
      //存在指定数据;
      this.ValidData(url, fid, shop);
    } else {
    }
  },
  methods: {
    productLink(href) {
      //点击查看详情
      // location.href = href
      // window.open(href, "_blank")
      zmEditor.$store.commit("openInfoDialog", {
        content: "该链接只能在发布的网站进行浏览"
      });
    },
    ValidData(url, ValidID, shop) {
      //指定数据过滤下架数据及更新最新数据信息;
      let nowVue = this;
      this.$axios
        .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          var data = response.data.data;
          nowVue.mylists = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
@import url("./style/singleProduct2.css");
</style>