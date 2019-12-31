<template>
  <div
    v-if="isComputer"
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,overflow:isHoverColor?'hidden':''}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @dblclick.stop.prevent="openSetPane"
    :data-title="typeName"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <div
      ref="content"
      class="zm-product-content"
      :data-num="settingData.proNum.value"
      :style="{paddingLeft:settingData.boxPaddingLR.value+'px',paddingRight:settingData.boxPaddingLR.value+'px',display:'flex',flexDirection: settingData.ranksNum.colsVal ==1 ?'column':'row',flexWrap: 'wrap'}"
    >
      <div
        class="zm-product-mobileBox"
        v-for="(item,index) in setLists"
        :key="index"
        :data-sortid="item.id"
        :style="{width:settingData.boxWidth.value,backgroundColor:settingData.ContBackgroundColor.value}"
      >
        <div
          class="zm-product-imgBox zm-product-imgLRBox"
          :style="{ width:settingData.boxImgWidth.value + '%',height:settingData.boxHeight.value,float:settingData.imgFloat,display:'flex',justifyContent: settingData.justifyContent}"
        >
          <div :style="{width:'calc(100% - '+settingData.picturePadding.value +')',height:settingData.pictureHeight.value,overflow:'hidden',marginTop:settingData.picturePadding.value,marginBottom:settingData.picturePadding.value}">
            <a
              class="zm-product-img"
              :style="{backgroundImage:'url('+item.mainImage+')',backgroundPosition:settingData.pictureSize.num}"
            >
            </a>
            <span
              class="zm-product-news"
              v-show="item.isSwitchOn"
              v-if="(item.mfLabel != null) && (item.mfLabel !='') && (item.mfLabel !=' ')"
            >
              <svg
                class="zm-product-svg"
                data-v-cd81a84c=""
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 135 204"
                :style="{fill: item.backgroundColor,width:'34px',height:'54px'}"
              >
                <defs data-v-cd81a84c=""></defs>
                <title data-v-cd81a84c="">产品标签</title>
                <g
                  data-v-cd81a84c=""
                  id="图层_2"
                  data-name="图层 2"
                >
                  <g
                    data-v-cd81a84c=""
                    id="图层_1-2"
                    data-name="图层 1"
                  >
                    <polygon
                      data-v-cd81a84c=""
                      points="135 204 67.5 158 0 204 0 0 135 0 135 204"
                    ></polygon>
                  </g>
                </g>
              </svg>
              <i :style="{color:item.color}">{{item.mfLabel}}</i>
            </span>
          </div>
        </div>
        <div
          class="zm-product-cont"
          :style="{height:settingData.boxHeight.value,overflow:'hidden',position:'relative',display:'flex'}"
        >
          <div
            class="zm-product-contBOX"
            :style="{paddingLeft:settingData.titlePaddingLRight.value + '%',paddingRight:settingData.titlePaddingLRight.value + '%'}"
          >
            <a
              class="zm-product-title"
              :style="{textAlign:settingData.priceAlign.value,fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.titleFont.value.fontSize,lineHeight:settingData.titleLineHeight.value,height:settingData.titleLineHeight.num}"
            >{{item.comTitName}}</a>
            <div
              class="zm-product-price"
              :style="{marginTop:setLastH,paddingBottom:settingData.skuShow.value?settingData.priceMarginBottom.value:0,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,fontSize:settingData.priceFont.value.fontSize,color:settingData.priceFont.value.color,textAlign:settingData.priceAlign.value}"
            >
              <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span>
            </div>
            <div
              class="zm-product-details"
              :style="{display:settingData.skuShow.num,lineHeight:settingData.skuHeight.value,textAlign:settingData.priceAlign.value}"
            >
              <a
                class="zm-product-sku"
                :style="{fontFamily:settingData.skuFont.value.fontFamily,fontStyle:settingData.skuFont.value.fontStyle,fontWeight:settingData.skuFont.value.fontWeight,fontSize:settingData.skuFont.value.fontSize,color:settingData.skuFont.value.color,backgroundColor:settingData.skuBackgroundColor.value,width:settingData.skuWidth.value,height:settingData.skuHeight.value,lineHeight:settingData.skuHeight.value}"
              >{{settingData.productDetails.value}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span v-html="productStyle"></span>
  </div>
  <div
    v-else-if="(!isComputer && settingData.mobileComIsHide)"
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex,overflow:'hidden'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @dblclick.stop.prevent="openSetPane"
    :data-title="typeName"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <div
      class="zm-product-content"
      :data-num="settingData.mobNum.num"
    >
      <div class="zm-product-list">
        <div
          class="zm-product-mobileBox"
          v-for="(item,index) in setMobLists"
          :key="index"
          :data-sortid="item.id"
          :style="{display:'block',paddingLeft:settingData.picturePadding.value,paddingRight:settingData.picturePadding.value,paddingTop:settingData.picturePadding.value,backgroundColor:settingData.ContBackgroundColor.value}"
        >
          <div
            class="zm-product-imgBox"
            :style="{marginBottom:settingData.mobPageH.value}"
          >
            <div style="width:100%;height:100%;overflow:hidden;">
              <a
                class="zm-product-img"
                :style="{backgroundImage:'url('+item.mainImage+')',height:settingData.mobPicHeight.value}"
              >
              </a>
              <span
                class="zm-product-news"
                v-show="item.isSwitchOn"
                v-if="(item.mfLabel != null) && (item.mfLabel !='') && (item.mfLabel !=' ')"
              >
                <svg
                  class="zm-product-svg"
                  data-v-cd81a84c=""
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 135 204"
                  :style="{fill: item.backgroundColor,width:'34px',height:'54px'}"
                >
                  <defs data-v-cd81a84c=""></defs>
                  <title data-v-cd81a84c="">产品标签</title>
                  <g
                    data-v-cd81a84c=""
                    id="图层_2"
                    data-name="图层 2"
                  >
                    <g
                      data-v-cd81a84c=""
                      id="图层_1-2"
                      data-name="图层 1"
                    >
                      <polygon
                        data-v-cd81a84c=""
                        points="135 204 67.5 158 0 204 0 0 135 0 135 204"
                      ></polygon>
                    </g>
                  </g>
                </svg>
                <i :style="{color:item.color}">{{item.mfLabel}}</i>
              </span>
            </div>
          </div>
          <div
            class="zm-product-cont"
            :style="{paddingLeft:'5px',paddingRight:'5px',paddingBottom: settingData.skuShow.value?'20px':'0'}"
          >
            <a
              class="zm-product-title"
              :style="{fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.mobTit.value,height:settingData.mobTitNum.num,textAlign:settingData.priceAlign.value,color:settingData.titleFont.value.color,lineHeight:'1.5em'}"
            >{{item.comTitName}}</a>
            <div
              class="zm-product-price"
              :style="{marginTop:settingData.mobPageH.value,paddingBottom:'12px',fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,fontSize:settingData.mobPic.value,color:settingData.priceFont.value.color,textAlign:settingData.priceAlign.value}"
            >
              <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span>
            </div>
            <div
              class="zm-product-details"
              :style="{display:settingData.skuShow.num,textAlign:settingData.priceAlign.value,height:settingData.skuHeight.value,lineHeight:settingData.skuHeight.value}"
            >
              <a
                class="zm-product-sku"
                :style="{fontFamily:settingData.skuFont.value.fontFamily,fontStyle:settingData.skuFont.value.fontStyle,fontWeight:settingData.skuFont.value.fontWeight,fontSize:settingData.skuFont.value.fontSize,color:settingData.skuFont.value.color,backgroundColor:settingData.skuBackgroundColor.value,width:settingData.skuWidth.value,height:settingData.skuHeight.value,lineHeight:settingData.skuHeight.value}"
              >{{settingData.productDetails.value}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span v-html="productStyle"></span>
  </div>
</template>
<style scoped>
@import "../../../style/component-product/productList.css";
</style>
<script>
import callBack from "./productListX/callBackFunction.js";
import computed from "./productListX/computed.js";
export default {
  name: "com-product-list",
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
  mixins: [computed, callBack], //callBack----设置项回调;computd----设置项;
  data() {
    return {
      normalSpecialBot: true, //编辑框的下拉按钮功能同编辑框5的功能回弹功能;
      isHoverColor: false, //调整组件宽度时无hover效果;
      comName: this.prop.comName,
      id: this.prop.id, //随机ID;
      type: "product", //组件类别;
      typeName: "商品列表",
      // fullPageSet: true,//工具栏有全屏功能设置该属性,没有则删除该属性;
      mold: "commonUnit", //组件类型（普通组件：commonUnit)(普通容器：commonContainer) (特殊容器：multipleContainer)(其他自定义)
      style: this.prop.style, //组件样式;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      settingData: this.prop.settingData, //组件设置项数据;
      pattern: [1, 1, 1, 1, 1, 1, 1, 1],
      isRotate: false,
      keepScale: true,
      comName: this.prop.comName, //组件列表中要显示组件名称
      buttonList: [
        {
          type: "manage",
          title: "商品",
          icon: "icon-gouwuche",
          callback: () => {
            zmEditor.$store.commit("changePaneData", {
              key: "paneType",
              value: true
            }); //打开弹窗;
            zmEditor.$store.commit("changePaneData", {
              key: "paneTitle",
              value: "商品管理"
            }); //弹窗标题;
            zmEditor.$store.commit("changePaneData", {
              key: "paneHelpInfo",
              value: "选择要显示的商品(产品或服务)"
            }); //问号图标hover显示内容;
            zmEditor.$store.commit("changePaneData", {
              key: "paneMode",
              value: "/com/product/productManage/productManage.vue"
            }); //弹窗内容应加载的组件路径;
          }
        },
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
      mobileButtonList: [
        { type: "hide", title: "隐藏", icon: "icon-hide" },
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "商品管理",
          paneInfo: "通过设置项编辑商品组件样式",
          paneHeight: 410
        }
      ],
      items: [], //后台所有数据;
      lists: this.prop.lists,
      productSet: new Set(), //子级产品类目id
      productCheck: new Set(), //选中所有产品类目id
      serverSet: new Set(), //子级服务类目id
      serverCheck: new Set(), //选中所有服务类目id
      nStyle: {
        //存取初始值;
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0
      },
      mStyle: {
        //存取初始值;
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0
      },
      oldWidth: 0,
      oldLeft: 0,
      oldMobWidth: 0,
      oldMobLeft: 0,
      disableToolH: true
    };
  },
  created() {
    let typeName = this.settingData.defauletTypeName.value;
    let webType = zmEditor.$store.state.menu.webType;
    let url, fid, type, shop;
    if (this.isComputer) {
      this.settingData.fullScreen.value
        ? (this.pattern = [0, 1, 0, 0, 0, 1, 0, 0])
        : (this.pattern = [1, 1, 1, 1, 1, 1, 1, 1]);
    } else {
      this.pattern = [0, 1, 0, 1, 0, 1, 0, 1];
    }
    if (webType == "component" || webType == "template") {
      shop = "71";
    } else {
      shop = this.fEntrepId;
    }
    switch (typeName) {
      case "服务类目":
        url =
          "/service/webbuilder-api/serviceNote/getServiceByCatesAndSortForSite"; //获取多个类目服务数据;
        fid = this.settingData.serverTypeId;
        type = "server";
        this.typeData(url, type, fid, shop);
        break;
      case "产品类目":
        url = "/product-api/getCheapestProductByCategorys"; //获取多个类目产品数据;
        fid = this.settingData.productTypeId;
        type = "product";
        this.typeData(url, type, fid, shop);
        break;
      case "最新发布的产品":
        url = "/product-api/getCheapestProductList"; //获取最新产品数据;
        this.newData(url, -3, shop);
        break;
      case "最新发布的服务":
        url = "/service/webbuilder-api/serviceNote/getNewServiceList"; //获取最新服务数据;
        this.newData(url, -3, shop);
        break;
      case "指定产品":
        url = "/product-api/getProductListByIds";
        let assId = JSON.stringify(this.settingData.productAssId);
        fid = assId.slice(1, -1).replace(/\"/g, "");
        this.ValidData(url, fid, shop);
        this.$set(this.settingData, "hasZuma", {
          value: false,
          type: "product"
        });
        break;
      case "指定服务":
        url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
        let sId = JSON.stringify(this.settingData.serverAssId);
        fid = sId.slice(1, -1).replace(/\"/g, "");
        this.ValidData(url, fid, shop);
        this.$set(this.settingData, "hasZuma", {
          value: false,
          type: "server"
        });
        break;
      default:
        break;
    }
    let file = "/set/switch/pagination.vue";
    const component = () => import("../../../components" + file);
    this.settingData.pageUrl = component;
  },
  watch: {
    style: {
      handler(val, oldval) {
        setTimeout(() => {
          if (this.style.width == zmEditor.$store.state.page.nowWinWidth) {
          } else {
            this.settingData.initWidth = this.style.width;
            this.settingData.initLeft = this.style.left;
          }
        }, 0);
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    getMarginLeft(val) {
      if (this.settingData.fullScreen.value) {
        const _left = zmEditor.$store.state.page.marginLeft;
        if (_left >= 0) {
          this.style.left = -_left;
        } else {
          this.style.left = 0;
        }
      }
    },
    getNowWinWidth(val) {
      if (this.settingData.fullScreen.value) {
        this.style.width = zmEditor.$store.state.page.nowWinWidth;
      }
    }
  },
  mounted() {
    if (this.$store.state.pane.isRenderSelect) {
      this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
    } else {
      this.id == this.$store.state.component.oldComID &&
        this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
    }
    this.settingData.initWidth = this.style.width;
    this.settingData.initLeft = this.style.left;
  }
};
</script>
