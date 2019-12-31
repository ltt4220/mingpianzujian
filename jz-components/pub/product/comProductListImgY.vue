<template>
  <div
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}"
  >
    <div
      class="zm-product-content"
      :data-num="settingData.proNum.value"
      :style="{height: setPageShow +'px'}"
    >
      <div
        class="zm-product-mobileBox"
        v-for="(item,index) in setLists"
        :key="index"
        :data-sortid="item.id"
        :style="{width:settingData.boxWidth.value,backgroundColor:settingData.ContBackgroundColor.value,cursor:'pointer'}"
        @click.stop.prevent='productLink(item)'
      >
        <div
          class="zm-product-imgBox"
          :style="{height:settingData.pictureHeight.value,paddingLeft:settingData.picturePadding.value,paddingRight:settingData.picturePadding.value,paddingTop:settingData.picturePadding.value}"
        >
          <div :style="{width:'100%',height:settingData.pictureHeight.value,overflow:'hidden'}">
            <div
              class="zm-product-img"
              :style="{backgroundImage:'url('+item.mainImage+')',backgroundPosition:settingData.pictureSize.num,width:'100%',height:'100%'}"
            >
            </div>
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
        <div
          class="zm-product-cont"
          :style="{paddingLeft:settingData.picturePadding.value,paddingRight:settingData.picturePadding.value}"
        >
          <a
            class="zm-product-title"
            :style="{marginTop:setfirstH,textAlign:settingData.skuAlign.value,fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.titleFont.value.fontSize,lineHeight:settingData.titleLineHeight.value,height:settingData.titleLineHeight.num,paddingLeft:settingData.titlePaddingLRight.value,paddingRight:settingData.titlePaddingLRight.value}"
          >{{item.comTitName}}</a>
          <div
            class="zm-product-price"
            :style="{marginTop:setLastH,paddingBottom:settingData.priceMarginBottom.value,textAlign:settingData.skuAlign.value,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,fontSize:settingData.priceFont.value.fontSize,color:settingData.priceFont.value.color,paddingLeft:settingData.titlePaddingLRight.value,paddingRight:settingData.titlePaddingLRight.value}"
          >
            <span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}
          </div>
          <div
            class="zm-product-details"
            :style="{display:settingData.skuShow.num,textAlign:settingData.skuAlign.value,marginBottom:settingData.skuMarginBottom.value,height:settingData.skuHeight.value,lineHeight:settingData.skuHeight.value,paddingLeft:settingData.titlePaddingLRight.value,paddingRight:settingData.titlePaddingLRight.value}"
          >
            <a
              class="zm-product-sku"
              :style="{fontFamily:settingData.skuFont.value.fontFamily,fontStyle:settingData.skuFont.value.fontStyle,fontWeight:settingData.skuFont.value.fontWeight,fontSize:settingData.skuFont.value.fontSize,color:settingData.skuFont.value.color,backgroundColor:settingData.skuBackgroundColor.value,width:settingData.skuWidth.value,height:settingData.skuHeight.value,lineHeight:settingData.skuHeight.value}"
            >{{settingData.productDetails.value}}</a>
          </div>
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
        :showPage="settingData.current"
      >
      </pagination>
    </div>
    <span v-html="productStyle"></span>
  </div>
</template>
<style scoped>
@import "../../../style/component-product/productList.css";
</style>
<script>
import computed from "./productListImgY/computed.js";
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
  mixins: [computed], //computd----设置项;
  data() {
    return {
      id: this.prop.id, //随机ID;
      style: this.prop.style, //组件样式;
      settingData: this.prop.settingData, //组件设置项数据;
      lists: []
    };
  },
  created() {
    let typeName = this.settingData.defauletTypeName.value;
    let url, fid, type, shop;
    let webType = zmEditor.$store.state.menu.webType;
    webType == "component" || webType == "template"
      ? (shop = "71")
      : (shop = this.fEntrepId);
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
    },
    getNowWinWidth(val) {
      if (this.settingData.fullScreen.value) {
        // this.style.width = zmEditor.$store.state.page.nowWinWidth;
        this.style.height = this.setPcHeight();
        this.$store.commit("set_preview_push_com_list", this);
      }
    }
  },
  methods: {
    setPcHeight(val) {
      //pc产品高度计算;
      let sub = val ? val : this.style.width;
      this.setPicH(sub); //计算图片的高度;
      // let imgTop = parseInt(this.settingData.picturePadding.value); //图片上部边距;
      let imgHeight = parseFloat(this.settingData.pictureHeight.value); //图片高度;
      let titTop = parseFloat(this.setfirstH); //标题上部边距;
      let titHeight = parseFloat(this.settingData.titleLineHeight.num); //标题高度;
      let titleFontSize = parseInt(this.settingData.titleFont.value.fontSize); //标题字体大小;
      let priceTop = parseFloat(this.setLastH); //价格上部边距;
      let priceHeight = parseInt(this.settingData.priceFont.value.fontSize); //价格字体高度;
      let priceBottom = parseInt(this.settingData.priceMarginBottom.value); //价格下部边距;
      let detailsHeight = this.settingData.skuShow.value
        ? parseInt(this.settingData.skuHeight.value)
        : 0; //查看详情高度;
      let detailsBottom = this.settingData.skuShow.value
        ? parseInt(this.settingData.skuMarginBottom.value)
        : 0; //查看详情的下边距;
      let boxBottom = parseInt(this.settingData.BoxMarginBottom.value); //产品行间距;
      let pageTitHeight = 23; //分页字体高度;
      let pageTop = parseInt(this.settingData.pageMarginTop.value); //分页上部高度;
      let pageBottom = parseInt(this.settingData.pageMarginBottom.value); //分页下部高度;
      let pageHeight; //分页高度;
      let rowsVal = parseInt(this.settingData.ranksNum.rowsVal); //产品行数;
      this.settingData.titleDBHeight.value.text == "单行文本"
        ? (titHeight = parseFloat(titHeight * titleFontSize))
        : ""; //区分单双行标题的字体高度;
      this.settingData.pageShow.value
        ? (pageHeight = pageTitHeight + pageTop + pageBottom)
        : (pageHeight = 0); //区分显示隐藏分页的高度;
      let cont;
      cont =
        parseFloat(
          parseFloat(
            imgHeight +
              titTop +
              titHeight +
              priceTop +
              priceHeight +
              priceBottom +
              detailsHeight +
              detailsBottom
          ) * rowsVal
        ) +
        (rowsVal - 1) * boxBottom +
        pageHeight; //产品总高度包括分页;
      cont = Number(cont.toFixed(2));
      return cont;
    },
    setPicH(val) {
      //计算图片的高度;
      let rows = this.settingData["ranksNum"].rowsVal;
      let cols = this.settingData["ranksNum"].colsVal;
      let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
      let LR = parseInt(this.settingData["boxPaddingLR"].value) * 2;
      let fath = ["headRow", "bodyRow", "footRow"].every(
        item => item != this.$parent.type
      );
      //判断当前父容器是不是不包含'headRow', 'bodyRow', 'footRow'，不是说明为容器嵌套,返回值为true为容器嵌套;
      this.settingData.fullScreen.value
        ? fath
          ? (this.settingData.newWidth = this.$parent.style.width - LR)
          : (this.settingData.newWidth =
              zmEditor.$store.state.page.nowWinWidth - LR)
        : (this.settingData.newWidth = val);
      let _width =
        (parseFloat(this.settingData.newWidth) - (cols - 1) * _left) / cols;
      this.settingData["boxWidth"].value = _width + "px";
      let boxWidth =
        parseFloat(this.settingData["boxWidth"].value) -
        parseFloat(this.settingData.boxBorderWidth.value) * 2 -
        parseFloat(this.settingData["picturePadding"].value) * 2 -
        parseFloat(this.settingData.pictureWidth.value) * 2;
      let r = this.settingData["pictureScale"].row;
      let l = this.settingData["pictureScale"].col;
      this.settingData["pictureHeight"].value =
        parseFloat((boxWidth / r) * l) + "px";
      if (this.settingData.fullScreen.value) {
        if (fath) {
          if (
            (this.$parent.type == "carousel" ||
              this.$parent.type == "banner") &&
            this.$parent.settingData.fullScreen.value
          ) {
            this.style.left = parseFloat(this.settingData.boxPaddingLR.value);
          }
        } else {
          let _left = this.$store.state.page.marginLeft;
          this.style.left =
            -_left + parseFloat(this.settingData.boxPaddingLR.value);
        }
        this.style.width = this.settingData.newWidth;
      }
    },
    productLink(item) {
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "&fEntrepId=" + "71")
        : (shop = "&fEntrepId=" + this.fEntrepId);
      this.$store.commit("editorPreDetailUrl", item.url);
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
    pagechangeA(val) {
      // 页码改变event ， p 为新的 current
      this.settingData.current = parseInt(val);
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
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    newData(url, mode, shop) {
      //最新数据;
      this.$axios
        .post(url, "fCateId=" + mode + "&pageSize=64" + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(response => {
          var data = response.data.data;
          this.lists = data;
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
            ValidIDArr.forEach((ele, i) => {
              let oldId = ele;
              if (element.id == ele.substr(2, ele.length - 1)) {
                element.id = oldId;
              }
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
