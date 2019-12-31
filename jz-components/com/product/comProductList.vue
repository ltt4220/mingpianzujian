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
      class="zm-product-content"
      :data-num="settingData.proNum.value"
      :style="{height: settingData.skuPaddingLRight +'px'}"
    >
      <div
        class="zm-product-box"
        v-for="(item,index) in setLists"
        :key="index"
        :data-sortid="item.id"
        :style="{width:settingData.boxWidth.value,boxShadow:settingData.boxShadow.num,backgroundColor:settingData.BoxBackgroundColor.value,  borderStyle: settingData.borderShow.num,borderWidth:settingData.boxBorderWidth.value,paddingLeft:settingData.picturePadding.value,paddingRight:settingData.picturePadding.value}"
      >
        <div
          class="zm-product-imgBox"
          :style="{paddingTop:settingData.picturePadding.value}"
        >
          <div :style="{width:'100%',height:settingData.pictureHeight.value,overflow:'hidden'}">
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
                :style="{fill:item.backgroundColor,width:'34px',height:'54px'}"
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
        <div>
          <a
            class="zm-product-title"
            :style="{textAlign:settingData.titleAlign.value,fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.titleFont.value.fontSize,color:settingData.titleFont.value.color,lineHeight:settingData.titleLineHeight.value,height:settingData.titleLineHeight.num,marginTop:setfirstH}"
          >{{item.comTitName}}</a>
        </div>
        <div
          class="zm-product-price"
          :style="{marginTop:setLastH,paddingBottom:settingData.priceMarginBottom.value,textAlign:settingData.priceAlign.value,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,fontSize:settingData.priceFont.value.fontSize,color:settingData.priceFont.value.color}"
        >
          <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span>
        </div>
      </div>
      <pagination
        v-if="settingData.pageShow.value"
        :total="settingData.total"
        :current.sync="settingData.current"
        :display="settingData.display"
        @pagechange="pagechangeA($event)"
        :style="{marginTop:settingData.pageMarginTop.value,marginBottom:settingData.pageMarginBottom.value,position:'absolute',bottom:0,height:this.settingData.pageShow.value?'23px':0,overflow:'hidden'}"
        :color="settingData.paginColor.value"
        :id="id"
        :isHover="isHoverPage"
        :showPage="settingData.current"
      ></pagination>
    </div>
    <span v-html="productStyle"></span>
  </div>
  <div
    v-else-if="(!isComputer && settingData.mobileComIsHide)"
    :data-title="typeName"
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute',width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex,overflow:'hidden'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @dblclick.stop.prevent="openSetPane"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <div
      class="zm-product-content"
      :data-num="settingData.mobNum.num"
      :style="{height: setMobH +'px',paddingTop:'5px',backgroundColor:settingData.BoxBackgroundColor.value}"
    >
      <div
        class="zm-product-list"
        style="padding: 0 5px;"
      >
        <div
          class="zm-product-box"
          ref="box"
          v-for="(item,index) in setMobLists"
          :key="index"
          :data-sortid="item.id"
          :style="{paddingBottom:'10px'}"
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
          <a
            class="zm-product-title"
            :style="{fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.mobTit.value,color:settingData.titleFont.value.color,height:settingData.mobTitNum.num,lineHeight:'1.5em'}"
          >{{item.comTitName}}</a>
          <div
            class="zm-product-price"
            :style="{marginTop:settingData.mobPageH.value,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,color:settingData.priceFont.value.color,textAlign:settingData.priceAlign.value,fontSize:settingData.mobPic.value}"
          >
            <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span>
          </div>
        </div>
      </div>
      <div v-if="settingData.pageShow.value">
        <div :style="{fontFamily:settingData.titleFont.value.fontFamily,color:'#6B6B6B',textAlign:'center',height:'38px',lineHeight:'38px',fontSize:'12px',width:'100%',backgroundColor:'#F2F2F2',marginTop:'20px',marginBottom:'10px',position:'absolute',bottom:0}">{{text}}</div>
      </div>
    </div>
    <span v-html="productStyle"></span>
  </div>
</template>
<style scoped>
@import "../../../style/component-product/productList.css";
</style>
<script>
import callBack from "./productList/callBackFunction.js";
import computed from "./productList/computed.js";
import pagination from "../../../components/set/switch/pagination.vue";
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
  components: {
    pagination
  },
  mixins: [computed, callBack], //callBack----设置项回调;computd----设置项;
  data() {
    return {
      normalSpecialBot: true, //编辑框的下拉按钮功能同编辑框5的功能回弹功能;
      isHoverPage: 0, //编辑模式下分页禁用，无hover
      isHoverColor: false, //调整组件宽度时无hover效果;
      comName: this.prop.comName,
      id: this.prop.id, //随机ID;
      type: "product", //组件类别;
      typeName: "商品列表",
      mold: "commonUnit", //组件类型（普通组件：commonUnit)(普通容器：commonContainer) (特殊容器：multipleContainer)(其他自定义)
      fullPageSet: true, //工具栏有全屏功能设置该属性,没有则删除该属性;
      keepScale: true,
      style: this.prop.style, //组件样式;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      settingData: this.prop.settingData, //组件设置项数据;
      pattern: [1, 1, 1, 1, 1, 1, 1, 1],
      isRotate: false,
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
        {
          type: "del",
          title: "删除",
          icon: "icon-delete"
        }
      ],
      mobileButtonList: [
        {
          type: "hide",
          title: "隐藏",
          icon: "icon-hide"
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
      items: [], //后台所有数据;
      lists: [],
      text: "加载更多",
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
      disableToolH: true, //禁止组件工具条的高;
      setPageShow: 0,
      setMobH: 0
    };
  },
  created() {
    let typeName = this.settingData.defauletTypeName.value;
    let webType = this.$store.state.menu.webType;
    let url, fid, type, shop;
    if (this.isComputer) {
      if (this.settingData.fullScreen.value) {
        this.pattern = [0, 1, 0, 0, 0, 1, 0, 0];
      } else {
        this.pattern = [1, 1, 1, 1, 1, 1, 1, 1];
        this.settingData.assignProductData != 0
          ? (this.style.width = this.settingData.initWidth)
          : (this.settingData.initWidth = this.style.width);
      }
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
        this.$set(this.settingData,'hasZuma',{value:false,type:'product'});
        break;
      case "指定服务":
        url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
        let sId = JSON.stringify(this.settingData.serverAssId);
        fid = sId.slice(1, -1).replace(/\"/g, "");
        this.ValidData(url, fid, shop);
        this.$set(this.settingData,'hasZuma',{value:false,type:'server'});
        break;
      default:
        break;
    }
    this.settingData._splice = false;
  },
  watch: {
    "settingData.fullScreen.value": {
      handler(val) {
        val
          ? ((this.pattern = [0, 1, 0, 0, 0, 1, 0, 0]),
            (this.style.height = this.setPcHeight()),
            this.$store.commit("set_push_com_list", this))
          : (this.pattern = [1, 1, 1, 1, 1, 1, 1, 1]);
        //整体产品列表的高度，并且计算单个产品的宽度;
      }
    },
    "style.left": {
      handler() {
        if (this.settingData["fullScreen"].value) {
        } else {
          // this.settingData.initLeft = this.style.left;
          let fath = ["headRow", "bodyRow", "footRow"].every(
            item => item != this.$parent.type
          );
          if (fath) {
            this.settingData._splice
              ? (this.settingData.initLeft = this.$store.state.otherStore.fullPage_coms.get(
                  this.id
                ))
              : (this.settingData.initLeft = this.posX);
          } else {
            this.settingData.initLeft = this.style.left;
          }
        }
      },
      immediate: true
    },
    getMarginLeft: {
      handler(val) {
        if (this.settingData["fullScreen"].value) {
          let fath = ["headRow", "bodyRow", "footRow"].every(
            item => item != this.$parent.type
          );
          if (fath) {
            if (
              this.$parent.isFullPage ||
              (this.$parent.type == "carousel" &&
                this.$parent.settingData.fullScreen.value)
            ) {
              const _left = this.$store.state.page.marginLeft;
              if (_left >= 0) {
                this.style.left = parseFloat(
                  this.settingData.boxPaddingLR.value
                );
              } else {
                this.style.left = 0;
              }
            }
          } else {
            const _left = this.$store.state.page.marginLeft;
            if (_left >= 0) {
              this.style.left =
                -_left + parseFloat(this.settingData.boxPaddingLR.value);
            } else {
              this.style.left = 0;
            }
          }
        }
      },
      immediate: true
    },
    getNowWinWidth(val) {
      if (this.settingData.fullScreen.value) {
        //判断设置项全屏属性
        // this.style.width = this.$store.state.page.nowWinWidth;
        this.style.height = this.setPcHeight(); //整体产品列表的高度，并且计算单个产品的宽度;
        this.$store.commit("set_push_com_list", this);
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
  }
};
</script>