<template>
    <!-- 移动端 -->
    <div v-if="settingData.mobileComIsHide" :id="id" class="zm-component-single" :style="{paddingBottom:'20px',position: 'absolute', width: mobileStyle.width+'px',height:mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px'}">
        <!-- 单一商品图片在上 -->
        <div v-for="(item,index) in mylists" :key="index" ref='product1' class="zm-component-product" :style="{backgroundColor:settingData.backgroundColor.value,width:mobileStyle.width+'px',paddingTop:'10px',paddingBottom:'20px',paddingLeft:'10px',paddingRight:'10px'}">

            <div class="imgBox" ref='img' :style="{overflow:'hidden',width:settingData.imgCss.MimgW,height:settingData.imgCss.MimgH,cursor:'pointer'}">
                <div class="zm-component-product-img" @click.stop='productLink(item.wapurl)' :style="{backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,width:'100%',height:'100%',backgroundImage:'url('+item.mainImage+')'}">
                </div>
            </div>
            <div class="zm-component-product-title" ref='textHeightM' :style="{height:'auto',paddingTop:'10px',cursor:'pointer'}">
                <div class="zm-component-product-title-text" ref='titleH' @click.stop='productLink(item.wapurl)' :style="{height:(settingData.textRowNum*1.2*(parseFloat(parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize)))+'px',boxOrient:'vertical',textAlign:'left',marginBottom:'6px',lineHeight:'1.2',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}">{{item.name}}</div>
                <div class="zm-component-product-title-price" v-show="settingData.retailSwitchShow.value" :style="{marginLeft:'-3px',lineHeight:'1',boxOrient:'vertical',textIndent:settingData.retailTitTextIndent.value,textAlign:'left',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}">
                    <span :style="{fontSize:'12px'}">{{item.currencyType}}</span>{{item.priceStr}}</div>
            </div>

        </div>
    </div>

</template>
<script>
// import configy from './configSingleP.js'
import singleProduct from "./productImgT/singleProduct.js";
export default {
  name: "com-product",
  //   mixins:[configy,singleProduct],
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
@import url("./style/singleProduct.css");
</style>
