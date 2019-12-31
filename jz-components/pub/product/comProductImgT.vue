<template>
    <div :id="id" class="zm-component-single" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,boxShadow:settingData.boxShadow}">
        <!-- 单一商品图片在上 -->
        <div v-for="(item,index) in mylists" :key="index" v-if='settingData.productLayout==1' :productId='settingData.productId' ref='product1' class="zm-component-product" :style="{backgroundColor:settingData.backgroundColor.value,width:style.width+'px',paddingTop:settingData.MarginIn.value,paddingLeft:settingData.MarginIn.value,paddingRight:settingData.MarginIn.value,cursor:'pointer'}" @click.stop.prevent='productLink(item)'>
            <div class="imgBox" ref='img' :style="{overflow:'hidden',width:settingData.imgCss.imgW,height:settingData.imgCss.imgH,}">
                <div :style="{width:'100%',height:'100%',overflow:'hidden',position: 'relative'}">
                    <div class="zm-component-product-img" :class="{image_magnify2:settingData.enlarge,image_shiftLeft2:settingData.leftMove,image_shiftTop2:settingData.topMove,image_emptiness2:settingData.blur}" :style="{backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,backgroundImage:'url('+item.mainImage+')'}">
                    </div>
                </div>
            </div>
            <div class="zm-component-product-title" ref='textHeight' :style="{height:'auto',paddingBottom:settingData.btnSwitchShow.value?settingData.btnmarginBottom.value:settingData.retailmarginBottom.value}">
                <div class="zm-component-product-title-text" ref='titleH' :style="{height:settingData.titH+'px',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',textAlign:settingData.tit,lineHeight:parseFloat(settingData.lineHeight.value)<=1.2?1.2:parseFloat(settingData.lineHeight.value)+'em',marginTop:(parseFloat(settingData.TitmarginTop.value)-settingData.titLineH)+'px',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}">
                    <span v-html="NameHC"></span>{{item.name}}</div>
                <div class="zm-component-product-title-price" v-show="settingData.retailSwitchShow.value" :style="{marginBottom:settingData.btnSwitchShow.value?settingData.retailmarginBottom.value:0,marginLeft:'-3px',lineHeight:'1',height:settingData.retailfont3.value.fontSize,boxOrient:'vertical',textAlign:settingData.tit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}"><span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
                <div class="zm-component-product-title-details" v-show="settingData.btnSwitchShow.value" :style="{height:settingData.btnheight.value,textAlign:settingData.tit,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}">
                    <span class="zm-component-product-title-detailsp" :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,margin:settingData.btnP.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle,height:settingData.btnheight.value}">{{settingData.btnText}}</span>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import singleProduct from "./productImgT/singleProduct.js";
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
    }
  },
  methods: {
    productLink(item) {
      this.$store.commit("editorPreDetailUrl", item.url);
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
@import url("./style/singleProduct.css");
</style>
