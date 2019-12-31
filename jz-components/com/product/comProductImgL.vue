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
    <!-- 单一商品图片在左 -->
    <div
      v-for="(item,index) in mylists"
      :key="index"
      ref='product2'
      class="zm-component-product-imgX"
      :style="{backgroundColor:settingData.backgroundColor.value,width:'100%',height:'100%'}"
    >
      <div
        class="imgBox"
        ref="Ximg"
        :style="{overflow:'hidden',height:style.height+'px',width:settingData.imgCss.imgPer+'%',float:settingData.imgCss.float1,position: 'relative'}"
      >
        <div
          class="zm-component-product-img"
          :style="{cursor:'all-scroll',backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,backgroundImage:'url('+item.mainImage+')'}"
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
          <div
            class="zm-component-product-title-text"
            ref='titleH'
            :style="{cursor:'all-scroll',height:1.2*parseFloat(settingData.font3.value.fontSize)+'px',marginBottom:settingData.DivisionSwitchShow.value?settingData.marginBottom.value:0,lineHeight:'1.2',textAlign:settingData.tit,fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}"
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
            <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span></div>
          <div
            class="zm-component-product-title-details"
            v-show="settingData.btnSwitchShow.value"
            :style="{cursor:'all-scroll',height:settingData.btnheight.value,textAlign:settingData.tit}"
          >
            <span :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle}">{{settingData.btnText}}</span>
          </div>
        </div>
      </div>
    </div>
    <span v-html="titPadding"></span>
  </div>
  <!-- 移动端 -->
  <div
    :class="{'isOverflow':isOverflow}"
    @dblclick.stop.prevent="openSetPane"
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
      :style="{overflow:'hidden',backgroundColor:settingData.backgroundColor.value,width:mobileStyle.width+'px'}"
    >

      <div
        class="imgBox"
        ref='img'
        :style="{overflow:'hidden',height:parseFloat(settingData.imgCss.MimgH)+'px'}"
      >
        <div
          class="zm-component-product-img"
          :style="{cursor:'default',backgroundSize:settingData.bgSize.value,backgroundPosition:settingData.bgPosition.value,width:'100%',height:'100%',backgroundImage:'url('+item.mainImage+')'}"
        >
        </div>
      </div>

      <div
        class="zm-component-product-title"
        ref='textHeightM'
        :style="{height:'auto',paddingTop:'10px',paddingBottom:settingData.btnSwitchShow.value?'18px':'0px'}"
      >
        <span v-html="titPadding"></span>
        <div
          class="zm-component-product-title-text"
          ref='titleH'
          :style="{cursor:'default',height:1.2*parseFloat(parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize)+'px',boxOrient:'vertical',textAlign:settingData.tit,marginBottom:'18px',lineHeight:'1.2em',fontWeight:settingData.font3.value.fontWeight,fontFamily:settingData.font3.value.fontFamily,fontSize:parseFloat(settingData.font3.value.fontSize)>=16?'16px':settingData.font3.value.fontSize,color:settingData.font3.value.color,fontStyle:settingData.font3.value.fontStyle}"
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
          :style="{marginTop:'18px',marginBottom:'18px',height:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,lineHeight:'1',boxOrient:'vertical',marginLeft:'-3px',textAlign:settingData.tit,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseFloat(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
        >
          <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span></div>
        <div
          class="zm-component-product-title-details"
          v-if="settingData.btnSwitchShow.value"
          :style="{cursor:'default',height:settingData.btnheight.value,textAlign:settingData.tit}"
        >
          <span :style="{lineHeight:settingData.btnheight.value,backgroundColor:settingData.btnBg.value,width:settingData.btnWidth.value +'%',fontWeight:settingData.btnfont3.value.fontWeight,fontFamily:settingData.btnfont3.value.fontFamily,fontSize:settingData.btnfont3.value.fontSize,color:settingData.btnfont3.value.color,fontStyle:settingData.btnfont3.value.fontStyle}">{{settingData.btnText}}</span>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
import configy from "./productImgL/configSingleP2.js";
import singleProduct from "./productImgL/singleProduct2.js";
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
      // prohibitH:true,//禁止工具栏修改组件高度
      normalSpecialBot: true, //编辑框的下拉按钮功能同编辑框5的功能回弹功能;
      singleType: "horizontalPro", ////编辑框的下拉按钮功能同编辑框5的功能改变高度;
      mDisableToolH: true,
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
        { type: "del", title: "删除", icon: "icon-delete" }
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
        },
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "商品管理",
          paneInfo: "通过设置项编辑商品组件样式",
          paneHeight: 410
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
        dw: 0,
        imgH: 0
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
      //指定服务
       this.$set(this.settingData, "hasZuma", {value:false,type:'server'});
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
<style scoped>
@import url("./style/singleProduct2.css");
</style>