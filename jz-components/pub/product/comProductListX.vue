<template>
  <div
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}"
  >
    <div
      class="zm-product-content"
      :data-num="settingData.proNum.value"
      :style="{paddingLeft:settingData.boxPaddingLR.value+'px',paddingRight:settingData.boxPaddingLR.value+'px',display:'flex',flexDirection: 'row',flexWrap: 'wrap'}"
    >
      <div
        class="zm-product-mobileBox"
        v-for="(item,index) in setLists"
        :key="index"
        :data-sortid="item.id"
        :style="{width:settingData.boxWidth.value,backgroundColor:settingData.ContBackgroundColor.value,flex:settingData.ranksNum,cursor:'pointer'}" @click.stop.prevent='productLink(item)'
      >
        <div
          class="zm-product-imgBox zm-product-imgLRBox"
          :style="{ width:settingData.boxImgWidth.value + '%',height:settingData.boxHeight.value,float:settingData.imgFloat,display:'flex',justifyContent: settingData.justifyContent}"
        >
          <div :style="{width:'calc(100% - '+settingData.picturePadding.value +')',height:settingData.pictureHeight.value,overflow:'hidden',marginTop:settingData.picturePadding.value,marginBottom:settingData.picturePadding.value}">
            <div
              class="zm-product-img"
              :style="{backgroundImage:'url('+item.mainImage+')',backgroundPosition:settingData.pictureSize.num}"
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
              <span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}
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
</template>
<style scoped>
@import "../../../style/component-product/productList.css";
</style>
<script>
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
  mixins: [computed], //callBack----设置项回调;computd----设置项;
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
  methods: {
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
