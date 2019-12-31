<template>
  <!-- PC端 -->
  <div
    @dblclick.stop.prevent="openSetPane"
    v-if="isComputer"
    :data-title="typeC"
    :id="id"
    class="zm-product-shuff"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <div
      :class="{'isOverflow':isOverflow}"
      class="zm-component-product-carousel"
      ref='procuctcarousel'
      :style="{paddingTop:settingData.productCarousel.paddingTop+'px'}"
    >
      <div :style="{backgroundColor:this.settingData.productCarousel.value,width:settingData.ulBoxW.width+'px',position:'relative',height:style.height+'px',margin:'0 auto',paddingLeft:settingData.ProductViewCarousel.liMarginLeft+'px', paddingRight:settingData.ProductViewCarousel.liMarginLeft+'px',paddingTop:settingData.ProductViewCarousel.liMarginLeft+'px'}">
        <div
          class="zm-component-product-carousel-ul-box"
          ref='procuctbox'
          :style="{width:  (settingData.ulBoxW.width-2*settingData.ProductViewCarousel.liMarginLeft)+'px',position:'relative',height:'100%'}"
        >
          <div
            class="zm-component-product-wapBanner"
            :style="{left:0 +'px',width:'1000000000000000px',height:'auto',position:'absolute'}"
          >
            <ul
              class="zm-component-product-carousel-ul procuctBanner"
              ref='procuctUl'
              :style="{width:ulWidth+'px'}"
            >
              <li
                ref='procuctLi'
                class="procuctLi"
                v-for="(item,index) in assignData"
                :key='index'
                :productId="item.id"
                :style="{marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px'}"
              >
                <div
                  class="zm-component-product-carousel-imgbox1"
                  ref='imgHeight'
                  @click.stop='productLink(item.url)'
                  :style=" {overflow:'hidden',width:settingData.ProductViewCarousel.imgWidth+'px', height:settingData.ProductViewCarousel.imgHeight+'px'}"
                >
                  <div
                    class="zm-component-product-carousel-imgbox2"
                    :style="{width:'100%',height:'100%'}"
                  >
                    <div
                      class="imgbox3"
                      ref='imgbox3'
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize, backgroundPosition:settingData.ProductViewCarousel.backgroundPosition}"
                    >
                    </div>
                    <div
                      v-html="vienH"
                      class="zm-component-product-carousel-vien"
                      v-show='settingData.carouselVien.show'
                      @mouseout.stop="vienMouseout(index)"
                      @mousemove="vienMousemove(index)"
                      :class=" {image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundColor:'rgba(255,255,255,0)',width:settingData.carouselVien.width,height:settingData.carouselVien.height,position:settingData.carouselVien.position,left:settingData.carouselVien.left,top:settingData.carouselVien.top}"
                    >
                    </div>
                    <div
                      v-show="item.isSwitchOn"
                      class="zm-component-product-carousel-sale"
                      v-if="(item.mfLabel != null) && (item.mfLabel.trim() !='') && (item.mfLabel !=' ')"
                    >
                      <svg
                        :style="{fill:item.backgroundColor,width:'34px',height:'54px'}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 135 204"
                      >
                        <defs> </defs>
                        <title>产品标签</title>
                        <g
                          id="图层_2"
                          data-name="图层 2"
                        >
                          <g
                            id="图层_1-2"
                            data-name="图层 1"
                          >
                            <polygon points="135 204 67.5 158 0 204 0 0 135 0 135 204" />
                          </g>
                        </g>
                      </svg>
                      <div
                        class="zm-component-product-hot"
                        :style="{color:item.color}"
                      >{{item.mfLabel}}</div>
                    </div>
                  </div>
                </div>
                <div
                  class="zm-component-product-carousel-text"
                  ref='textHeight'
                  :style="{paddingRight:settingData.carouselTitleT.value,paddingLeft:settingData.carouselTitleT.value,height:'auto',width:settingData.ProductViewCarousel.imgWidth+'px',}"
                >
                  <div
                    class="zm-component-product-carousel-title"
                    @click.stop='productLink(item.url)'
                    :style="{height:settingData.titH+'px',textAlign:settingData.carouselTitAlign,lineHeight:parseFloat(settingData.NamelineHeight.value)<=1.3?1.3:settingData.NamelineHeight.value+'em',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',marginTop:(parseFloat(settingData.carouselTitlePT.value)-settingData.titLineH)+'px',marginBottom:settingData.carouselTitlePB.value,fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle}"
                  >
                    {{item.comTitName}}</div>
                  <div
                    class="zm-component-product-carousel-price"
                    v-show="settingData.retailSwitchShow.value"
                    :style="{marginLeft:'-2px',height:settingData.priceH+'px',lineHeight:'1em',lineClamp:['-webkit',1],boxOrient:'vertical',marginRight:settingData.retailmarginRight.value,textAlign:settingData.retailtit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',marginBottom:settingData.retailmarginBottom.value,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
                  >
                    <span style="font-size:12px;">{{item.currencyType}}</span><span>{{item.priceStr}}</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="zm-component-product-carousel-arrowleft arrowBtn"
      ref="arrowR"
      :style="{left:settingData.BtnTextIndent.value+'px',width:settingData.carouselArrow.width +'px',top:(style.height/2)+'px',marginLeft:(-parseInt(settingData.carouselArrow.width)/2) +'px'}"
    >
      <i
        class="arrowHoverC"
        v-html="svgHtml"
      ></i>
    </div>
    <div
      class="zm-component-product-carousel-arrowright arrowBtn"
      ref="arrowR"
      :style="{right:settingData.BtnTextIndent.value+'px',width:settingData.carouselArrow.width +'px',top:(style.height/2)+'px',marginRight:(-parseInt(settingData.carouselArrow.width)/2) +'px'}"
    >
      <i
        class="arrowHoverC"
        v-html="svgHtml"
      ></i>
    </div>
  </div>
  <!-- 移动端 -->
  <div
    :class="{'isOverflow':isOverflow}"
    :data-title="typeC"
    @dblclick.stop.prevent="openSetPane"
    v-else-if="(!isComputer && settingData.mobileComIsHide)"
    :id="id"
    class="zm-product-shuff"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',backgroundColor:this.settingData.productCarousel.value}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
    ondragstart="return false"
  >
    <ul
      class="zm-component-product-carousel-ul"
      ref='procuctUl'
      :style="{overflow:'hidden',width:mobileStyle.width+'px',padding:'0 4px',paddingTop:'4px'}"
    >
      <li
        class='procuctLi'
        ref='procuctLi'
        v-for="(item,index) in assignDataM"
        :key='index'
        :productId="item.id"
        :style="{float:'left',width:(mobileStyle.width-16)/2 +'px',marginLeft:(index%2==0?0:8)+'px'}"
      >
        <div
          class="zm-component-product-carousel-imgbox1"
          :style="{overflow:'hidden',width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px'}"
        >
          <div
            class="zm-component-product-carousel-imgbox2"
            :style="{position: 'relative',width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px'}"
          >
            <div
              class="imgbox3"
              ref='imgbox3'
              :style="{width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px',backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize,backgroundPosition:settingData.ProductViewCarousel.backgroundPosition,}"
            >
            </div>
            <div
              v-show="item.isSwitchOn"
              class="zm-component-product-carousel-sale"
              v-if="(item.mfLabel != null) && (item.mfLabel.trim() !='') && (item.mfLabel !=' ')"
            >
              <svg
                :style="{fill:item.backgroundColor,width:'34px',height:'54px'}"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 135 204"
              >
                <defs> </defs>
                <title>产品标签</title>
                <g
                  id="图层_2"
                  data-name="图层 2"
                >
                  <g
                    id="图层_1-2"
                    data-name="图层 1"
                  >
                    <polygon points="135 204 67.5 158 0 204 0 0 135 0 135 204" />
                  </g>
                </g>
              </svg>
              <div
                class="zm-component-product-hot"
                :style="{color:item.color}"
              >{{item.mfLabel}}</div>
            </div>
          </div>
        </div>
        <div
          class="zm-component-product-carousel-text"
          ref='textHeight'
          :style="{width:(mobileStyle.width-16)/2+'px',padding:'0px 3px',paddingBottom:'20px'}"
        >
          <div
            class="zm-component-product-carousel-title"
            @click.stop='productLink(item.wapurl)'
            :style="{height:settingData.carouselHitleHM+'px',textAlign:settingData.carouselTitAlign,lineHeight:'1.5em',lineClamp:['-webkit',settingData.MtextRowNum],boxOrient:'vertical',marginTop:parseFloat(12-settingData.titLineH)+'px',fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:parseInt(settingData.bannerfont3.value.fontSize)>=16?'16px':settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle}"
          >{{item.comTitName}}</div>
          <div
            class="zm-component-product-carousel-price"
            v-show="settingData.retailSwitchShowM.value"
            :style="{height:parseInt(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,textAlign:settingData.retailtit,lineHeight:'1',lineClamp:['-webkit',1],boxOrient:'vertical',marginTop:parseFloat(12-settingData.titLineH)+'px',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseInt(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
          >
            <span :style="{fontSize:'12px'}">{{item.currencyType}}</span><span>{{item.priceStr}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="otherP"
      :style="{fontFamily:settingData.bannerfont3.value.fontFamily,width:mobileStyle.width+'px',position:'absolute',bottom:0}"
    >
      <span v-html="rotateN"></span>
      <div class="otherPT">换一批
        <div
          class="iconfont icon-loop"
          :class="{'rotateC':isRotateP}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import productShuffConfig from "./productShuff/productShuffConfig.js";
import callback from "./productShuff/callBackFunction.js";
export default {
  mixins: [productShuffConfig, callback],
  name: "com-productShuffling",
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
      createType: this.prop.createType || "",
      normalSpecialBot: true, //编辑框的下拉按钮功能同编辑框5的功能回弹功能;
      isHoverColor: false, //调整组件宽度时无hover效果;
      disableToolH: true, //禁止工具栏修改组件高度
      isRotateP: false,
      keepScale: true, //编辑器zcm要求
      comName: this.prop.comName, //编辑器zcs要求
      id: this.prop.id,
      type: "product",
      typeC: "产品",
      mold: "commonUnit",
      style: this.prop.style,
      settingData: this.prop.settingData,
      lists: [],
      pattern: [1, 1, 1, 1, 1, 1, 1, 1],
      isShowRotateBtn: false, //是否显示旋转按钮
      fullPageSet: true, //组件是否有全屏（宽度）功能 //编辑器ssm要求
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
            }); //弹窗标题;;
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
      prodcutList: [
        //商品类型设置项下的产品数据
        {
          fId: "556566121",
          fTitle: "韩版修身连衣裙韩版修身韩版修身",
          productImg: ""
        }
      ],
      mobileButtonList: [
        //手机版设置项按钮
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
          paneHeight: 400,
          paneInfo: "通过设置项编辑商品组件样式"
        }
      ],
      mobileChildData: this.prop.mobileChildData, //手机版子组件信息
      mobileStyle: this.prop.mobileStyle, //手机版样式
      productSet: new Set(), //子级产品类目id
      productCheck: new Set(), //选中所有产品类目id
      serverSet: new Set(), //子级服务类目id
      serverCheck: new Set(), //选中所有服务类目id
      oldImgW: 0,
      nStyle: {
        width: 0,
        ulwidth: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0,
        dw2: 0,
        dw3: 0
      },
      oldCss: {
        vuePadding: 0, //记录旧的组件的边距缩进
        arrowPadding: 0 //记录旧的箭头缩进量
      },
      otherSetVue: null,
      isOverflow: false,
      ProductViewCarousel2: {
        imgWidth: 0,
        imgHeight: 0,
        ulWidth: 0,
        StyleW: 0
      },
      minIs: false
    };
  },
  created() {
    this.settingData.rotateDeg = 0;
    this.settingData.firstIndex = 0;
    this.settingData.rotateCount = 0;
    if (this.isComputer) {
      if (this.settingData.fullScreen.value) {
        this.pattern = [0, 1, 0, 0, 0, 1, 0, 0];
      } else {
        this.pattern = [1, 1, 1, 1, 1, 1, 1, 1];
        this.settingData.assignProductData != 0
          ? (this.style.width = this.settingData.ProductViewCarousel.oldMainWidth)
          : (this.settingData.ProductViewCarousel.oldMainWidth = this.style.width);
      }
    } else {
      this.pattern = [0, 1, 0, 1, 0, 1, 0, 1];
    }
    let shop =
      zmEditor.$store.state.menu.webType == "template" ||
      zmEditor.$store.state.menu.webType == "component"
        ? 71
        : this.fEntrepId;
    let typeName = this.settingData.defauletTypeName.value;
    let url, fid, type;
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
            (this.style.height = this.ComponentsOfCalculated()),
            this.$store.commit("set_push_com_list", this))
          : (this.pattern = [1, 1, 1, 1, 1, 1, 1, 1]);
      }
    },
    "style.left": {
      handler() {
        if (this.settingData["fullScreen"].value) {
        } else {
          // this.settingData.ProductViewCarousel.oldMainWidth =  this.style.width
          //  this.settingData.oldLeft = this.style.left;
          let fath = ["headRow", "bodyRow", "footRow"].every(
            item => item != this.$parent.type
          );
          if (fath) {
            this.settingData._splice
              ? this.settingData.oldLeft = this.$store.state.otherStore.fullPage_coms.get(this.id)
              : (this.settingData.oldLeft = this.posX);
          } else {
            this.settingData.oldLeft = this.style.left;
          }
        }
      },
      immediate: true
    },
    getNowWinWidth(val) {
      if (this.settingData["fullScreen"].value) {
        // this.style.width = zmEditor.$store.state.page.nowWinWidth;
        this.style.height = this.ComponentsOfCalculated();
        this.$store.commit("set_push_com_list", this);
      }
    },
    getMarginLeft: {
      handler(val) {
        if (this.settingData["fullScreen"].value) {
          // const _left = zmEditor.$store.state.page.marginLeft;
          // if (_left >= 0) {
          //   this.style.left = -_left + parseFloat(this.settingData.boxPaddingLR.value);
          // } else {
          //   this.style.left = 0;
          // }
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
.isOverflow {
  overflow: hidden;
}
.otherP {
  height: 38px;
  background-color: #f2f2f2;
  text-align: center;
  overflow: hidden;
  /* cursor: pointer; */
}
.otherPT {
  line-height: 38px;
  font-size: 12px;
  color: #898798;
  display: inline-block;
  /* cursor: pointer; */
}
.otherPT div {
  transition: 1s all;
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  -webkit-transform-origin: center center;
  transform-origin: center center;
}
.zm-component-product-carousel {
  position: relative;
  /* background-color: #A1A1A1; */
  height: auto;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.zm-component-product-carousel .zm-component-product-carousel-ul-box {
  width: auto;
  height: auto;
  overflow: hidden;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul {
  height: auto;
  /* width: 1000px; */
  /*overflow: hidden;*/
  box-sizing: border-box;
  display: flex;
  position: relative;
  transition: all 0.5s;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li:hover {
  /* z-index: 12; */
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li {
  /*float: left;*/
  /* width: 200px; */
  height: auto;
  /*background-color: coral;*/
  text-decoration: none;
  list-style: none;
  /* cursor: pointer; */
  box-sizing: border-box;
  /* margin-left: 10px; */
  color: #fff;
  font-size: 16px;
  font-family: "仿宋";
  /*position: relative;*/
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1 {
  /* cursor:pointer; */
  /* z-index: 12; */
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1
  > .zm-component-product-carousel-imgbox2:hover
  > .imgbox3 {
  /* transform: scale(1.5); */
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1
  > .zm-component-product-carousel-imgbox2 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.imgbox3 {
  /* width: 200px; */
  /* height: auto; */
  /* border: 1px solid #e0eee0; */
  /* box-sizing: border-box; */
  /* transition: all 0.5s; */
  /* background-size: cover; */
  width: 100%;
  /* liu */
  height: 100%;
  /* liu */
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1
  > .zm-component-product-carousel-imgbox2
  .zm-component-product-carousel-vien {
  position: absolute;
  left: 0px;
  top: 0;
  /* transition: all 0.5s; */
}
.zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1
  > .zm-component-product-carousel-imgbox2
  > .zm-component-product-carousel-sale {
  position: absolute;
  left: 16px;
  top: -1px;
  width: 36px;
  min-height: 42px;
  display: table;
  box-sizing: border-box;
  color: white;
  vertical-align: middle;
  z-index: 0;
}
.zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1
  > .zm-component-product-carousel-imgbox2
  > .zm-component-product-carousel-sale
  .zm-component-product-hot {
  width: 34px;
  font-size: 12px;
  height: 42px;
  text-align: center;
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -50%;
  top: 0;
  overflow: hidden;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-imgbox1:after {
  content: "";
  display: block;
  height: 0;
  width: 0;
  clear: both;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-text
  .zm-component-product-carousel-title {
  /* padding-top: 10px; */
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
}
.zm-component-product-carousel-title {
  /* cursor:pointer; */
}
.zm-component-product-carousel-title,
.zm-component-product-carousel-sku,
.zm-component-product-carousel-price {
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-text
  .zm-component-product-carousel-sku {
  /* padding-top: 10px; */
  /* word-break: break-all; */
  /* word-wrap: break-word; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li
  > .zm-component-product-carousel-text
  .zm-component-product-carousel-price {
  /* padding-top: 10px;
                              color: red;
                              font-weight: 600; */
  /* word-break: break-all; */
  /* word-wrap: break-word; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.zm-component-product-carousel
  .zm-component-product-carousel-ul-box
  .zm-component-product-carousel-ul
  > li:first-child {
  margin-left: 0px !important;
}
.zm-component-product-carousel-arrowleft,
.zm-component-product-carousel-arrowright {
  /* background-color: #fff; */
  position: absolute;
  /* margin-top: -20px; */
  /* width: 20px; */
  /* height: 40px; */
  /* top: 50%; */
  /* cursor: pointer; */
  text-align: center;
  /* z-index: 100; */
  /* font-size: 18px; */
  overflow: hidden;
  height: 120px;
  line-height: 120px;
  margin-top: -60px;
  /* cursor: pointer; */
}
.zm-component-product-carousel-arrowleft i,
.zm-component-product-carousel-arrowright i {
  /* width: 100%;
                              height: 100%;
                              transform: scale(0.5, 0.5); */
  font-size: 18px;
  font-weight: 700;
}
.zm-component-product-carousel-arrowleft {
  left: 0;
  /* margin-left: -4px; */
  transform: rotateY(180deg);
}
.zm-component-product-carousel-arrowright {
  right: 0;
  transform: rotateY(0deg);
  /* margin-right: -3px; */
}
.arrowHoverC {
  transition: all 0.3s;
}
/* //商品轮播图片悬浮效果=======start */
.image_magnify2 {
  transition: All 0.3s;
}
.image_magnify2:hover {
  transform: scale(1.1);
}
.image_shiftLeft2 {
  /* transform: translate(-2.5%, -2.5%); */
  /* liu */
  width: 110%;
  height: 110%;
  position: absolute;
  left: -5%;
  top: -5%;
  transition: All 0.3s;
}
.image_shiftLeft2:hover {
  transform: translateX(-2.5%);
  /* liu */
}
.image_shiftTop2 {
  /* transform: translate(-2.5%, -2.5%); */
  /* liu */
  width: 110%;
  height: 110%;
  position: absolute;
  left: -5%;
  top: -5%;
  transition: All 0.3s;
}
.image_shiftTop2:hover {
  transform: translateY(-2.5%);
  /* liu */
}
.image_emptiness2 {
  width: 110%;
  height: 110%;
  position: absolute;
  left: -5%;
  top: -5%;
  transition: All 0.3s;
}
.image_emptiness2:hover {
  filter: blur(1px);
}
/* //商品轮播图片悬浮效果=======end */
</style>



