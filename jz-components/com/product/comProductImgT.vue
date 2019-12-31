<template>
  <!-- PC端 -->
  <div
    :class="{'isOverflow':isOverflow}"
    @dblclick.stop.prevent="openSetPane"
    :data-title="typeC"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    v-if="isComputer"
    :id="id"
    class="zm-component-single"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,boxShadow:settingData.boxShadow}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    ondragstart="return false"
    :data-status="visData"
  >
    <!-- 单一商品图片在上 -->
    <div
      v-for="(item,index) in mylists"
      :key="index"
      v-if='settingData.productLayout==1'
      :productId='settingData.productId'
      ref='product1'
      class="zm-component-product"
      :style="{backgroundColor:settingData.backgroundColor.value,width:style.width+'px',paddingTop:settingData.MarginIn.value,paddingLeft:settingData.MarginIn.value,paddingRight:settingData.MarginIn.value}"
    >
      <div
        class="imgBox"
        ref='img'
        :style="{overflow:'hidden',width:settingData.imgCss.imgW,height:settingData.imgCss.imgH}"
      >
        <div :style="{width:'100%',height:'100%',overflow:'hidden',position: 'relative'}">
          <div
            class="zm-component-product-img"
            @click.stop='productLink(item.url)'
            :class="{image_magnify2:settingData.enlarge,image_shiftLeft2:settingData.leftMove,image_shiftTop2:settingData.topMove,image_emptiness2:settingData.blur}"
            :style="{cursor:'all-scroll',backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,backgroundImage:'url('+item.mainImage+')'}"
          >
          </div>
        </div>
      </div>
      <div
        class="zm-component-product-title"
        ref='textHeight'
        :style="{height:'auto',paddingBottom:settingData.btnSwitchShow.value?settingData.btnmarginBottom.value:settingData.retailmarginBottom.value}"
      >
        <div
          class="zm-component-product-title-text"
          ref='titleH'
          :style="{cursor:'all-scroll',height:settingData.titH+'px',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',textAlign:settingData.tit,lineHeight:parseFloat(settingData.lineHeight.value)<=1.2?1.2:parseFloat(settingData.lineHeight.value)+'em',marginTop:(parseFloat(settingData.TitmarginTop.value)-settingData.titLineH)+'px',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}"
        >
          <span v-html="NameHC"></span>{{item.name}}</div>
        <div
          class="zm-component-product-title-price"
          v-show="settingData.retailSwitchShow.value"
          :style="{marginBottom:settingData.btnSwitchShow.value?settingData.retailmarginBottom.value:0,marginLeft:'-3px',lineHeight:'1em',height:settingData.retailfont3.value.fontSize,boxOrient:'vertical',textAlign:settingData.tit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}"
        ><span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span></div>
        <div
          class="zm-component-product-title-details"
          v-show="settingData.btnSwitchShow.value"
          :style="{cursor:'all-scroll',textAlign:settingData.tit,height:settingData.btnheight.value,paddingLeft:settingData.TitTextIndent.value,paddingRight:settingData.TitTextIndent.value}"
        >
          <span
            @click.stop='productLink(item.url)'
            class="zm-component-product-title-detailsp"
            :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,margin:settingData.btnP.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle,height:settingData.btnheight.value}"
          >{{settingData.btnText}}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 移动端 -->
  <div
    :class="{'isOverflow':isOverflow}"
    :data-title="typeC"
    v-else-if="(!isComputer && settingData.mobileComIsHide)"
    :id="id"
    class="zm-component-single"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height:mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <!-- 单一商品图片在上 -->
    <div
      v-for="(item,index) in mylists"
      :key="index"
      ref='product1'
      class="zm-component-product"
      :style="{backgroundColor:settingData.backgroundColor.value,width:mobileStyle.width+'px',paddingTop:'10px',paddingBottom:'20px',paddingLeft:'10px',paddingRight:'10px'}"
    >
      <div
        class="imgBox"
        ref='img'
        :style="{overflow:'hidden',width:settingData.imgCss.MimgW,height:settingData.imgCss.MimgH}"
      >
        <div
          class="zm-component-product-img"
          @click.stop='productLink(item.wapurl)'
          :style="{cursor:'default',backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,width:'100%',height:'100%',backgroundImage:'url('+item.mainImage+')'}"
        >
        </div>
      </div>
      <div
        class="zm-component-product-title"
        ref='textHeightM'
        :style="{height:'auto',paddingTop:'10px'}"
      >
        <div
          class="zm-component-product-title-text"
          ref='titleH'
          @click.stop='productLink(item.wapurl)'
          :style="{cursor:'default',height:(settingData.textRowNum*1.2*(parseFloat(parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize)))+'px',boxOrient:'vertical',textAlign:'left',marginBottom:'6px',lineHeight:'1.2',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}"
        >{{item.name}}</div>
        <div
          class="zm-component-product-title-price"
          v-show="settingData.retailSwitchShow.value"
          :style="{marginLeft:'-3px',lineHeight:'1',boxOrient:'vertical',textIndent:settingData.retailTitTextIndent.value,textAlign:'left',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
        >
          <span :style="{fontSize:'12px'}">{{item.currencyType}}</span><span>{{item.priceStr}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import configy from "./productImgT/configSingleP.js";
import singleProduct from "./productImgT/singleProduct.js";
export default {
  name: "com-product",
  mixins: [configy, singleProduct],
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
      normalSpecialBot: true, //编辑框的下拉按钮功能同编辑框5的功能回弹功能;
      setChang: false,
      isHoverColor: false, //调整组件宽度时无hover效果;
      disableToolH: true,
      //   mDisableToolH:true,
      keepScale: true,
      comName: this.prop.comName,
      prodcutList: [
        //商品类型设置项下的产品数据
        {
          fId: null,
          fTitle: "",
          productImg: ""
        }
      ],
      chooseBtn1: true,
      chooseBtn2: false,
      chooseBtnText1: "选择产品",
      chooseBtnText2: "替换产品",
      dailogProductL: [],
      productType: "product",
      RandomSN: "产品",
      compositeDataL: "产品",
      dataSource: "", //数据来源类型，分产品(productData)和服务(serviceData)
      typeIndex: 0,
      id: this.prop.id,
      type: "product",
      typeC: "产品",
      mold: "commonProduct",
      style: this.prop.style,
      lists: [],
      mylists: [],
      settingData: this.prop.settingData,
      pattern: [1, 1, 1, 1, 1, 1, 1, 1],
      isShowRotateBtn: false,
      buttonList: [
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "商品设置",
          paneInfo: "通过设置项调整商品组件样式"
        },
        {
          type: "style",
          title: "变更样式",
          icon: "icon-style",
          paneTitle: "商品样式",
          paneInfo: "选择和替换商品样式"
        },
        {
          type: "del",
          title: "删除",
          icon: "icon-delete"
        }
      ],
      isHideLevel: false, //是否显示分割线
      oldProductIfo: {
        //记录旧的产品数据
        productImg: "",
        productHref: "",
        wapurl: "",
        productName: "",
        productId: 1,
        productBanner: "",
        productPrice: null
      },
      newArr: [],
      mobileButtonList: [
        //手机版设置项按钮
        {
          type: "hide",
          title: "隐藏",
          icon: "icon-hide",
          paneInfo: "通过设置项编辑商品组件样式"
        }
      ],
      mobileChildData: this.prop.mobileChildData, //手机版子组件信息
      mobileStyle: this.prop.mobileStyle, //手机版样式
      nStyle: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0
      },
      oldProductLayout: 0,
      isOverflow: false,
      minObj: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    //创建之后进行数据请求
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
      this.$set(this.settingData, "hasZuma", {value:false,type:'product'});
      url = "/product-api/getProductListByIds";
    } else if (that.productType == "service") {
      this.$set(this.settingData, "hasZuma", {value:false,type:'server'});
      //指定服务
      url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
    }
    if (fid.length != 0) {
      //存在指定数据;
      this.ValidData(url, fid, shop);
    } else {
      this.ValidData(url, "", "");
    }
  },
  mounted() {
    if (this.$store.state.pane.isRenderSelect) {
      this.$store.commit("changeSelectList", this);
    } else {
      this.id == this.$store.state.component.oldComID &&
        this.$store.commit("changeSelectList", this);
    }
  }
};
</script>
<style scoped less="css">
@import url("./style/singleProduct.css");
</style>
