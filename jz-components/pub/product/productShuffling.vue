<template>
  <div
    :id="id"
    class="zm-product-shuff"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px'}"
  >
    <!-- <div class="zm-component-product-carousel" ref='procuctcarousel' :style="{paddingLeft:settingData.productCarousel.paddingLeft+'px',paddingRight:settingData.productCarousel.paddingRight+'px',paddingTop:settingData.productCarousel.paddingTop+'px'}"> -->
    <div
      class="zm-component-product-carousel"
      ref='procuctcarousel'
      :style="{paddingTop:settingData.productCarousel.paddingTop+'px'}"
    >
      <div :style="{backgroundColor:this.settingData.productCarousel.value,width:settingData.ulBoxW.width+'px',position:'relative',height:style.height+'px',margin:'0 auto',paddingLeft:settingData.ProductViewCarousel.liMarginLeft+'px',paddingRight:settingData.ProductViewCarousel.liMarginLeft+'px',paddingTop:settingData.ProductViewCarousel.liMarginLeft+'px'}">
        <div
          class="zm-component-product-carousel-ul-box"
          ref='procuctbox'
          :style="{width:  (settingData.ulBoxW.width-2*settingData.ProductViewCarousel.liMarginLeft)+'px',position:'relative',height:'100%'}"
        >
          <div
            class="zm-component-product-wapBanner"
            :style="{width:'1000000000000000px',height:'auto',position:'absolute',left:(blean?-settingData.ProductViewCarousel.translateX:'none') + 'px'}"
          >
            <ul
              class="zm-component-product-carousel-ul"
              ref='procuctUl'
              :style="{width:ulWidth+'px',float:'left'}"
              v-if="lists.length > 0"
            >
              <li
                ref='procuctLi'
                class="procuctLi"
                v-for="(item,index) in assignData"
                :key='index'
                :productId="item.id"
                :style="{marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px',cursor:'pointer'}"
                @click.stop.prevent='productLink(item.url)'
              >
                <div
                  class="zm-component-product-carousel-imgbox1"
                  ref='imgHeight'
                  :style="{overflow:'hidden',width:settingData.ProductViewCarousel.imgWidth+'px',height:settingData.ProductViewCarousel.imgHeight+'px'}"
                >
                  <div
                    class="zm-component-product-carousel-imgbox2"
                    :style="{width:'100%',height:'100%'}"
                  >
                    <div
                      class="imgbox3"
                      ref='imgbox3'
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize,backgroundPosition:settingData.ProductViewCarousel.backgroundPosition}"
                    ></div>
                    <div
                      v-html="vienH"
                      class="zm-component-product-carousel-vien"
                      v-show='settingData.carouselVien.show'
                      @mouseout.stop="vienMouseout(index)"
                      @mousemove="vienMousemove(index)"
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundColor:'rgba(255,255,255,0)',width:settingData.carouselVien.width,height:settingData.carouselVien.height,position:settingData.carouselVien.position,left:settingData.carouselVien.left,top:settingData.carouselVien.top}"
                    ></div>
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
                    :style="{height:settingData.titH+'px',textAlign:settingData.carouselTitAlign,lineHeight:parseFloat(settingData.NamelineHeight.value)<=1.3?1.3:settingData.NamelineHeight.value+'em',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',marginTop:(parseFloat(settingData.carouselTitlePT.value)-settingData.titLineH)+'px',marginBottom:settingData.carouselTitlePB.value,fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle}"
                  >
                    {{item.comTitName}}</div>
                  <div
                    class="zm-component-product-carousel-price"
                    v-show="settingData.retailSwitchShow.value"
                    :style="{marginLeft:'-2px',height:settingData.priceH+'px',lineHeight:'1',lineClamp:['-webkit',1],boxOrient:'vertical',marginRight:settingData.retailmarginRight.value,textAlign:settingData.retailtit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',marginBottom:settingData.retailmarginBottom.value,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
                  ><span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
                </div>
              </li>
            </ul>
            <ul
              class="zm-component-product-carousel-ul"
              ref='procuctUl'
              :style="{width:ulWidth+'px',float:'left',marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px'}"
              v-if="lists.length > 0"
            >
              <li
                ref='procuctLi'
                class="procuctLi"
                v-for="(item,index) in assignData"
                :key='index'
                :productId="item.id"
                :style="{marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px',cursor:'pointer'}"
                @click.stop.prevent='productLink(item.url)'
              >
                <div
                  class="zm-component-product-carousel-imgbox1"
                  ref='imgHeight'
                  :style="{overflow:'hidden',width:settingData.ProductViewCarousel.imgWidth+'px',height:settingData.ProductViewCarousel.imgHeight+'px'}"
                >
                  <div
                    class="zm-component-product-carousel-imgbox2"
                    :style="{width:'100%',height:'100%'}"
                  >
                    <div
                      class="imgbox3"
                      ref='imgbox3'
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize,backgroundPosition:settingData.ProductViewCarousel.backgroundPosition}"
                    ></div>
                    <div
                      v-html="vienH"
                      class="zm-component-product-carousel-vien"
                      v-show='settingData.carouselVien.show'
                      @mouseout.stop="vienMouseout(index)"
                      @mousemove="vienMousemove(index)"
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundColor:'rgba(255,255,255,0)',width:settingData.carouselVien.width,height:settingData.carouselVien.height,position:settingData.carouselVien.position,left:settingData.carouselVien.left,top:settingData.carouselVien.top}"
                    ></div>
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
                    :style="{height:settingData.titH+'px',textAlign:settingData.carouselTitAlign,lineHeight:parseFloat(settingData.NamelineHeight.value)<=1.3?1.3:settingData.NamelineHeight.value+'em',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',marginTop:(parseFloat(settingData.carouselTitlePT.value)-settingData.titLineH)+'px',marginBottom:settingData.carouselTitlePB.value,fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle}"
                  >
                    {{item.comTitName}}</div>
                  <div
                    class="zm-component-product-carousel-price"
                    v-show="settingData.retailSwitchShow.value"
                    :style="{marginLeft:'-2px',height:settingData.priceH+'px',lineHeight:'1',lineClamp:['-webkit',1],boxOrient:'vertical',marginRight:settingData.retailmarginRight.value,textAlign:settingData.retailtit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',marginBottom:settingData.retailmarginBottom.value,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
                  ><span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
                </div>
              </li>
            </ul>
            <ul
              class="zm-component-product-carousel-ul"
              ref='procuctUl'
              :style="{width:ulWidth+'px',float:'left',marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px'}"
              v-if="lists.length > this.settingData.ProductViewCarousel.num"
            >
              <li
                ref='procuctLi'
                class="procuctLi"
                v-for="(item,index) in assignData"
                :key='index'
                :productId="item.id"
                :style="{marginLeft:settingData.ProductViewCarousel.liMarginLeft+'px',cursor:'pointer'}"
                @click.stop.prevent='productLink(item.url)'
              >
                <div
                  class="zm-component-product-carousel-imgbox1"
                  ref='imgHeight'
                  :style="{overflow:'hidden',width:settingData.ProductViewCarousel.imgWidth+'px',height:settingData.ProductViewCarousel.imgHeight+'px'}"
                >
                  <div
                    class="zm-component-product-carousel-imgbox2"
                    :style="{width:'100%',height:'100%'}"
                  >
                    <div
                      class="imgbox3"
                      ref='imgbox3'
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize,backgroundPosition:settingData.ProductViewCarousel.backgroundPosition}"
                    ></div>
                    <div
                      v-html="vienH"
                      class="zm-component-product-carousel-vien"
                      v-show='settingData.carouselVien.show'
                      @mouseout.stop="vienMouseout(index)"
                      @mousemove="vienMousemove(index)"
                      :class="{image_magnify2:settingData.imgLayout.enlarge,image_shiftLeft2:settingData.imgLayout.leftMove,image_shiftTop2:settingData.imgLayout.topMove,image_emptiness2:settingData.imgLayout.blur}"
                      :style="{backgroundColor:'rgba(255,255,255,0)',width:settingData.carouselVien.width,height:settingData.carouselVien.height,position:settingData.carouselVien.position,left:settingData.carouselVien.left,top:settingData.carouselVien.top}"
                    ></div>
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
                    :style="{height:settingData.titH+'px',textAlign:settingData.carouselTitAlign,lineHeight:parseFloat(settingData.NamelineHeight.value)<=1.3?1.3:settingData.NamelineHeight.value+'em',lineClamp:['-webkit',settingData.textRowNum],boxOrient:'vertical',marginTop:(parseFloat(settingData.carouselTitlePT.value)-settingData.titLineH)+'px',marginBottom:settingData.carouselTitlePB.value,fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle}"
                  >
                    {{item.comTitName}}</div>
                  <div
                    class="zm-component-product-carousel-price"
                    v-show="settingData.retailSwitchShow.value"
                    :style="{marginLeft:'-2px',height:settingData.priceH+'px',lineHeight:'1',lineClamp:['-webkit',1],boxOrient:'vertical',marginRight:settingData.retailmarginRight.value,textAlign:settingData.retailtit,marginTop:(parseFloat(settingData.retailTitmarginTop.value)-settingData.titLineH-2)+'px',marginBottom:settingData.retailmarginBottom.value,fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"
                  ><span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="zm-component-product-carousel-arrowleft arrowBtn"
          ref="arrowR"
          @click.stop.prevent='arrowRight($event)'
          :style="{left:settingData.BtnTextIndent.value+'px',width:settingData.carouselArrow.width+'px',top:(style.height/2)+'px',marginLeft:(-parseInt(settingData.carouselArrow.width)/2) +'px'}"
        >
          <i
            class="arrowHoverC"
            v-html="svgHtml"
          ></i>
        </div>
        <div
          class="zm-component-product-carousel-arrowright arrowBtn"
          ref="arrowR"
          @click.stop.prevent='arrowLeft($event)'
          :style="{right:settingData.BtnTextIndent.value+'px',width:settingData.carouselArrow.width+'px',top:(style.height/2)+'px',marginRight:(-parseInt(settingData.carouselArrow.width)/2) +'px'}"
        >
          <i
            class="arrowHoverC"
            v-html="svgHtml"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productShuffConfig from "./productShuff/productShuffConfig.js";
export default {
  mixins: [productShuffConfig],
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
      id: this.prop.id,
      type: "product",
      style: this.prop.style,
      settingData: this.prop.settingData,
      lists: [],
      oldDate: 0,
      blean: true,
      oldleft: 0,
      oldWidth: 0
    };
  },
  created() {
    this.settingData.ProductViewCarousel.moveLeftNum = 0;
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
        break;
      case "指定服务":
        url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
        let sId = JSON.stringify(this.settingData.serverAssId);
        fid = sId.slice(1, -1).replace(/\"/g, "");
        this.ValidData(url, fid, shop);
        break;
      default:
        break;
    }
  },
  watch: {
    "settingData.fullScreen.value": {
      handler() {
        // this.settingData.ProductViewCarousel.translateX = 0;
        this.settingData.ProductViewCarousel.moveLeftNum = 0;
        if (this.settingData["fullScreen"].value) {
          // this.style.width = this.$store.state.page.nowWinWidth;
          this.style.height = this.ComponentsOfCalculated();
        }
      }
    },
    getNowWinWidth: {
      handler(val) {
        this.blean = true;
        if (this.settingData["fullScreen"].value) {
          // this.style.width = this.$store.state.page.nowWinWidth;
          this.style.height = this.ComponentsOfCalculated();
          this.$store.commit("set_preview_push_com_list", this);
        }
        let ulWidth =
          parseFloat(this.settingData.ProductViewCarousel.imgWidth) *
            this.lists.length +
          parseFloat(
            (this.lists.length - 1) *
              this.settingData.ProductViewCarousel.liMarginLeft
          );
        let liMove = parseInt(
          this.settingData.ProductViewCarousel.imgWidth +
            this.settingData.ProductViewCarousel.liMarginLeft
        );
        this.settingData.ProductViewCarousel.translateX =
          ulWidth -
          liMove * this.settingData.ProductViewCarousel.moveLeftNum +
          this.settingData.ProductViewCarousel.liMarginLeft;
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
              (this.$parent.type == "carousel" ||
                this.$parent.type == "banner") &&
              this.$parent.settingData.fullScreen.value
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
  methods: {
    ComponentsOfCalculated(val) {
      //计算组件宽高，计算图片和文字区域宽高函数
      let sub = val ? val : this.style.width;
      let have = val ? 0 : 1;
      let num = this.settingData.ProductViewCarousel.num;
      let paddingLeft = this.settingData.fullScreen.value
        ? this.settingData.productCarousel.paddingLeft
        : 0;
      let liMarginLeft = this.settingData.ProductViewCarousel.liMarginLeft;
      // if (parseFloat(this.settingData.BtnTextIndent.value) <= 0) {
      this.settingData.ulBoxW.width =
        sub -
        Math.abs(parseFloat(this.settingData.productCarousel.paddingLeft) * 2);
      if (this.settingData["fullScreen"].value) {
        // if (!this.settingData.isShow2.value) {
        // this.settingData.ulBoxW.width =
        //   this.$store.state.page.nowWinWidth -
        //   Math.abs(
        //     parseFloat(this.settingData.productCarousel.paddingLeft) * 2
        //   ) -
        //   Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;
        let fath = ["headRow", "bodyRow", "footRow"].every(
          item => item != this.$parent.type
        );
        if (fath) {
          if (
            (this.$parent.type == "carousel" ||
              this.$parent.type == "banner") &&
            this.$parent.settingData.fullScreen.value
          ) {
            this.settingData.ulBoxW.width =
              this.$parent.style.width -
              Math.abs(
                parseFloat(this.settingData.productCarousel.paddingLeft) * 2
              ) -
              Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;
            this.style.left = parseFloat(this.settingData.boxPaddingLR.value);
          }
        } else {
          this.settingData.ulBoxW.width =
            this.$store.state.page.nowWinWidth -
            Math.abs(
              parseFloat(this.settingData.productCarousel.paddingLeft) * 2
            ) -
            Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;
          let _left = this.$store.state.page.marginLeft;
          this.style.left =
            -_left + parseFloat(this.settingData.boxPaddingLR.value);
        }
        this.style.width = this.settingData.ulBoxW.width;
        // }
      }
      this.settingData.ProductViewCarousel.imgWidth = parseFloat(
        (this.settingData.ulBoxW.width -
          2 * liMarginLeft -
          liMarginLeft * (num - 1)) /
          num
      );
      this.settingData.ProductViewCarousel.imgHeight = parseFloat(
        this.settingData.ProductViewCarousel.imgWidth *
          (this.settingData.ProductViewCarousel.heightPer /
            this.settingData.ProductViewCarousel.widthPer)
      );
      this.settingData.titH =
        this.settingData.textRowNum *
        (parseFloat(this.settingData.NamelineHeight.value) <= 1.3
          ? 1.3
          : this.settingData.NamelineHeight.value) *
        parseFloat(this.settingData.bannerfont3.value.fontSize);
      this.settingData.titLineH =
        (1.3 * parseFloat(this.settingData.bannerfont3.value.fontSize) -
          parseFloat(this.settingData.bannerfont3.value.fontSize)) /
        2;
      this.settingData.priceH = parseFloat(
        this.settingData.retailfont3.value.fontSize
      );
      let titH =
        this.settingData.titH +
        parseFloat(this.settingData.carouselTitlePT.value) +
        parseFloat(this.settingData.carouselTitlePB.value);
      let priceH =
        this.settingData.priceH +
        parseFloat(this.settingData.retailTitmarginTop.value);
      let contHeight =
        parseFloat(this.settingData.ProductViewCarousel.imgHeight) +
        parseFloat(titH) +
        parseFloat(priceH) +
        parseFloat(
          this.settingData.ProductViewCarousel.liMarginLeft -
            this.settingData.titLineH -
            5
        ) +
        parseFloat(this.settingData.retailmarginBottom.value);
      contHeight = Number(contHeight.toFixed(2));
      return contHeight;
    },
    ValidDataL(arr) {
      //给每一个添加列标签
      let typeName = this.settingData.defauletTypeName.value;
      switch (typeName) {
        case "指定产品":
          if (this.settingData.productLabelId.length <= 0) return;
          arr.forEach((element, index) => {
            this.settingData.productLabelId.forEach((el, i) => {
              if (element.id == el.id) {
                element.isSwitchOn = el.isSwitchOn;
                element.float = el.float;
                element.backgroundColor = el.backgroundColor;
                element.mfLabel = el.mfLabel;
                element.color = el.color;
                el.comTitName != undefined && el.comTitName.length != 0
                  ? (element.comTitName = el.comTitName)
                  : (element.comTitName = element.name);
              }
            });
          });
          break;
        case "指定服务":
          if (this.settingData.serverLabelId.length <= 0) return;
          arr.forEach((element, index) => {
            this.settingData.serverLabelId.forEach((el, i) => {
              if (element.id == el.id) {
                element.isSwitchOn = el.isSwitchOn;
                element.float = el.float;
                element.backgroundColor = el.backgroundColor;
                element.mfLabel = el.mfLabel;
                element.color = el.color;
                el.comTitName == "" && el.comTitName == undefined
                  ? (element.comTitName = element.name)
                  : (element.comTitName = el.comTitName);
              }
            });
          });
          break;
        case "产品类目":
        case "服务类目":
        case "最新发布的产品":
        case "最新发布的服务":
          arr.forEach(element => {
            element.comTitName = element.name;
          });
          break;
        default:
          break;
      }
    },
    productLink(url) {
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "&fEntrepId=" + "71")
        : (shop = "&fEntrepId=" + this.fEntrepId);
      //点击查看详情
      // location.href = url//当前页打开新页面
      // window.open(url, "_blank")//保存当前页，打开新页面
      this.$store.commit("editorPreDetailUrl", url);
    },
    vienMousemove(index) {
      //图片遮罩层移入事件
      // this.settingData.carouselVien.show = true
      if (this.settingData.imgLayout.enlarge == true) {
        $(this.$refs.imgbox3)
          .eq(index)
          .css("transform", "scale(1.04)");
      } else if (this.settingData.imgLayout.leftMove == true) {
        $(this.$refs.imgbox3)
          .eq(index)
          .css("transform", "translateX(-3%)");
      } else if (this.settingData.imgLayout.topMove == true) {
        $(this.$refs.imgbox3)
          .eq(index)
          .css("transform", "translateY(-3%)");
      } else if (this.settingData.imgLayout.blur == true) {
        $(this.$refs.imgbox3)
          .eq(index)
          .css("filter", "blur(1px)");
      }
    },
    vienMouseout(index) {
      //图片遮罩层移出事件
      // this.settingData.carouselVien.show = false
      $(this.$refs.imgbox3)
        .eq(index)
        .css("transition", "");
      $(this.$refs.imgbox3)
        .eq(index)
        .css("transform", "");
      $(this.$refs.imgbox3)
        .eq(index)
        .css("transform", "");
      $(this.$refs.imgbox3)
        .eq(index)
        .css("transform", "");
      $(this.$refs.imgbox3)
        .eq(index)
        .css("filter", "");
    },
    startMove(obj, attr, iTarget, newCulX, moveXDirection) {
      //obj 改变的对象，attr  style样式left  iTarget 旧Left位置  newCulX新目标Left,moveXDirection  判断向左或右移动位置;
      var mark = moveXDirection;
      var timer = null;
      var speed = 0;
      clearTimeout(timer);
      curData(obj, attr, iTarget, newCulX, moveXDirection);
      function curData(obj, attr, iTarget, newCulX, moveXDirection) {
        var cul = newCulX; // 目标位置
        var currLeft = iTarget;
        speed += 10;
        if (mark) {
          if (currLeft - speed <= cul) {
            obj.style[attr] = -cul + "px";
            clearTimeout(timer);
          } else {
            if (currLeft - speed <= cul) {
              obj.style[attr] = -cul + "px";
              currLeft = -cul + "px";
              clearTimeout(timer);
            } else {
              timer = setTimeout(() => {
                curData(obj, attr, iTarget, newCulX, moveXDirection);
              }, 5);
              currLeft = currLeft - speed;
            }
            obj.style[attr] = -currLeft + "px";
          }
        } else {
          if (currLeft + speed >= cul) {
            obj.style[attr] = -cul + "px";
            clearTimeout(timer);
          } else {
            if (currLeft + speed >= cul) {
              obj.style[attr] = -cul + "px";
              currLeft = -cul + "px";
              clearTimeout(timer);
            } else {
              timer = setTimeout(() => {
                curData(obj, attr, iTarget, newCulX, moveXDirection);
              }, 5);
              currLeft = currLeft + speed;
            }
            obj.style[attr] = -currLeft + "px";
          }
        }
      }
    },
    arrowLeft(event) {
      let len = this.lists.length;
      setInterval;
      //数据不足时 阻止
      if (len <= this.settingData.ProductViewCarousel.num) return;
      //防止多次点击  阻止
      var startTime = Number(new Date());
      if (startTime - this.oldDate < 500) return;
      this.oldDate = startTime;
      this.blean = false;
      let ulBox = this.$refs.procuctbox.querySelector(
        ".zm-component-product-wapBanner"
      );
      let imgWidth = parseFloat(this.settingData.ProductViewCarousel.imgWidth); //图片宽度
      let liMarginLeft = this.settingData.ProductViewCarousel.liMarginLeft; //图片间距
      let liMove = imgWidth + liMarginLeft; //li的width;
      let ulWidth = imgWidth * len + (len - 1) * liMarginLeft; //ulBox的初始位置;
      let num = this.settingData.ProductViewCarousel.moveLeftNum; // 轮播下标（位置）
      this.settingData.ProductViewCarousel.moveLeftNum--;
      if (Math.abs(this.settingData.ProductViewCarousel.moveLeftNum) > len) {
        this.settingData.ProductViewCarousel.translateX =
          ulWidth + liMarginLeft;
        this.settingData.ProductViewCarousel.moveLeftNum = -1;
      }
      let oldleft = this.settingData.ProductViewCarousel.translateX;
      this.settingData.ProductViewCarousel.translateX =
        ulWidth -
        liMove * this.settingData.ProductViewCarousel.moveLeftNum +
        liMarginLeft;
      this.startMove(
        ulBox,
        "left",
        oldleft,
        this.settingData.ProductViewCarousel.translateX,
        false
      );
    },
    arrowRight() {
      let len = this.lists.length;
      //数据不足时 阻止
      if (len <= this.settingData.ProductViewCarousel.num) return;
      //防止多次点击  阻止
      var startTime = Number(new Date());
      if (startTime - this.oldDate < 500) return;
      this.oldDate = startTime;
      this.blean = false;
      let ulBox = this.$refs.procuctbox.querySelector(
        ".zm-component-product-wapBanner"
      );
      let imgWidth = parseFloat(this.settingData.ProductViewCarousel.imgWidth); //图片宽度
      let liMarginLeft = this.settingData.ProductViewCarousel.liMarginLeft; //图片间距
      let num = this.settingData.ProductViewCarousel.moveLeftNum; // 轮播下标（位置）
      let liMove = imgWidth + liMarginLeft;
      let ulWidth = imgWidth * len + (len - 1) * liMarginLeft;
      this.settingData.ProductViewCarousel.moveLeftNum++;
      if (Math.abs(this.settingData.ProductViewCarousel.moveLeftNum) > len) {
        this.settingData.ProductViewCarousel.translateX =
          ulWidth + liMarginLeft;
        this.settingData.ProductViewCarousel.moveLeftNum = 1;
      }
      let oldleft = this.settingData.ProductViewCarousel.translateX; //记录当前轮播的初始位置 X
      this.settingData.ProductViewCarousel.translateX =
        ulWidth -
        liMove * this.settingData.ProductViewCarousel.moveLeftNum +
        liMarginLeft;
      this.startMove(
        ulBox,
        "left",
        oldleft,
        this.settingData.ProductViewCarousel.translateX,
        true
      );
    },
    typeData(url, type, fid, shop) {
      //类目id数据;
      let _that = this.settingData.defauletTypeName[type + "SortName"];
      let sort;
      _that == "按发布时间排序" ? (sort = "2") : (sort = "1");
      if (fid.length == 0) {
        this.lists = [];
        return;
      }
      this.$axios
        .post(
          url,
          "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(response => {
          var data = response.data.data;
          this.lists = data;
          let ulWidth =
            parseFloat(this.settingData.ProductViewCarousel.imgWidth) *
              this.lists.length +
            parseFloat(
              (this.lists.length - 1) *
                this.settingData.ProductViewCarousel.liMarginLeft
            );
          this.settingData.ProductViewCarousel.translateX =
            ulWidth + this.settingData.ProductViewCarousel.liMarginLeft;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    newData(url, mode, shop) {
      //最新数据;
      this.$axios
        .post(url, "fCateId=" + mode + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(response => {
          var data = response.data.data;
          this.lists = data;
          let ulWidth =
            parseFloat(this.settingData.ProductViewCarousel.imgWidth) *
              this.lists.length +
            parseFloat(
              (this.lists.length - 1) *
                this.settingData.ProductViewCarousel.liMarginLeft
            );
          this.settingData.ProductViewCarousel.translateX =
            ulWidth + this.settingData.ProductViewCarousel.liMarginLeft;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    ValidData(url, ValidID, shop) {
      //指定数据过滤下架数据
      this.$axios
        .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          var data = response.data.data;
          this.lists = data;
          let ValidIDArr = ValidID.split(",");
          this.lists.forEach((element, index) => {
            //
            ValidIDArr.forEach((ele, i) => {
              let oldId = ele;
              if (element.id == ele.substr(2, ele.length - 1)) {
                element.id = oldId;
              }
            });
          });
          let ulWidth =
            parseFloat(this.settingData.ProductViewCarousel.imgWidth) *
              this.lists.length +
            parseFloat(
              (this.lists.length - 1) *
                this.settingData.ProductViewCarousel.liMarginLeft
            );
          this.settingData.ProductViewCarousel.translateX =
            ulWidth + this.settingData.ProductViewCarousel.liMarginLeft;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped less="css">
.isOverflow {
  overflow: hidden;
}
.otherP {
  height: 38px;
  background-color: #f2f2f2;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
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
  cursor: pointer;
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
  width: 105%;
  /* liu*/
  height: 105%;
  /*liu*/
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
  top: -2px;
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
  /* pub------------------------- */
  cursor: pointer;
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
  cursor: pointer;
  height: 120px;
  line-height: 120px;
  margin-top: -60px;
}
.zm-component-product-carousel .zm-component-product-carousel-arrowleft i,
.zm-component-product-carousel .zm-component-product-carousel-arrowright i {
  /* width: 100%;
                                    height: 100%;
                                    transform: scale(0.5, 0.5); */
  font-size: 18px;
  font-weight: 700;
}
.zm-component-product-carousel .zm-component-product-carousel-arrowleft {
  left: 0;
  /* margin-left: -4px; */
  transform: rotateY(180deg);
}
.zm-component-product-carousel .zm-component-product-carousel-arrowright {
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



