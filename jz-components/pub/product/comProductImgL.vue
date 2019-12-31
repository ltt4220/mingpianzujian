<template>
  <div
    :id="id"
    class="zm-component-single"
    :style="{overflow:'hidden',position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,boxShadow:settingData.boxShadow}"
  >
    <!-- 单一商品图片在左 -->
    <div
      v-for="(item,index) in mylists"
      :key="index"
      ref='product2'
      class="zm-component-product-imgX"
      :style="{backgroundColor:settingData.backgroundColor.value,width:'100%',height:'100%',cursor: 'pointer'}"
      @click.stop.prevent='productLink(item)'
    >
      <div
        class="imgBox"
        ref="Ximg"
        :style="{overflow:'hidden',height:style.height+'px',width:settingData.imgCss.imgPer+'%',float:settingData.imgCss.float1,position: 'relative'}"
      >
        <div
          class="zm-component-product-img"
          :style="{backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,backgroundImage:'url('+item.mainImage+')'}"
          :class="{image_magnify2:settingData.enlarge,image_shiftLeft2:settingData.leftMove,image_shiftTop2:settingData.topMove,image_emptiness2:settingData.blur}"
        >
        </div>
      </div>
      <div
        class="zm-component-product-title"
        ref='textHeight'
        :style="{overflow:'hidden',height:style.height+'px',width:settingData.imgCss.titPer+'%',float:settingData.imgCss.float2}"
      >
        <div
          class="titleArea"
          ref='titleArea2'
          :style="{width:'100%',height:'auto'}"
        >
          <span v-html="titPadding"></span>
          <!-- <div class="zm-component-product-title-text" ref='titleH' @click.stop.prevent='productLink(item.url)' :style="{marginBottom:settingData.marginBottom.value,boxOrient:'vertical',textAlign:settingData.tit,lineHeight:(parseFloat(settingData.lineHeight.value)<=1.2?1.2:settingData.lineHeight.value)+'em',marginTop:parseFloat(settingData.TitmarginTop.value)-parseFloat(settingData.marginBottom.value)+'px',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}">{{item.name}}</div> -->
          <div
            class="zm-component-product-title-text"
            ref='titleH'
            :style="{height:1.2*parseFloat(settingData.font3.value.fontSize)+'px',marginBottom:settingData.DivisionSwitchShow.value?settingData.marginBottom.value:0,lineHeight:'1.2',textAlign:settingData.tit,fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}"
          >{{titleName}}</div>
          <div
            class="title-line"
            v-show="settingData.DivisionSwitchShow.value"
            :style="{textAlign:settingData.tit,width:'100%',height:settingData.lineH.value}"
          >
            <div
              class="zm-component-product-title-line"
              :style="{margin:settingData.lineM,float:settingData.lineF,height:settingData.lineH.value,backgroundColor:settingData.lineBg.value,width:settingData.lineWidth.value +'%'}"
            ></div>
          </div>
          <div
            class="zm-component-product-title-price"
            v-show="settingData.retailSwitchShow.value"
            :style="{height:settingData.retailfont3.value.fontSize,marginTop:settingData.marginBottom.value,marginLeft:'-3px',lineHeight:'1',boxOrient:'vertical',textAlign:settingData.tit,marginBottom:parseFloat(settingData.btnmarginTop.value)+'px',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
          >
            <span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
          <div
            class="zm-component-product-title-details"
            v-show="settingData.btnSwitchShow.value"
            :style="{height:settingData.btnheight.value,textAlign:settingData.tit}"
          >
            <span :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle}">{{settingData.btnText}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import singleProduct2 from "./productImgL/singleProduct2.js";
export default {
  name: "com-product",
  mixins: [singleProduct2],
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
    } else {
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
@import url("./style/singleProduct2.css");
</style>