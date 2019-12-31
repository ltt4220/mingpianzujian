<template>
  <div
    v-if="settingData.mobileComIsHide"
    class="zm-product-main"
    :id="id"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex}"
  >
    <div
      class="zm-product-content"
      :data-num="settingData.mobNum.num"
      :style="{height: setPageShow +'px',paddingTop:'5px',overflow:'hidden',backgroundColor:settingData.BoxBackgroundColor.value}"
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
          style="paddingBottom:10px;"
        >
          <div
            class="zm-product-imgBox"
            :style="{marginBottom:settingData.mobPageH.value,cursor:'pointer'}"
          >
            <div style="width:100%;height:100%;overflow:hidden;">
              <div
                class="zm-product-img"
                @click.stop="detaileWapurl"
                target="_blank"
                :style="{backgroundImage:'url('+item.mainImage+')',height:settingData.mobPicHeight.value}"
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
          <a
            class="zm-product-title"
            @click.stop="detaileWapurl"
            :style="{fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.mobTit.value,color:settingData.titleFont.value.color,height:settingData.mobTitNum.num,lineHeight:'1.5em',cursor:'pointer'}"
          >{{item.comTitName}}</a>
          <div
            class="zm-product-price"
            :style="{marginTop:settingData.mobPageH.value,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,color:settingData.priceFont.value.color,textAlign:settingData.priceAlign.value,fontSize:settingData.mobPic.value}"
          >
            <span style="font-size:12px;">{{item.currencyType}}</span>{{item.priceStr}}
          </div>
        </div>
      </div>
      <div v-if="settingData.pageShow.value">
        <div
          :style="{fontFamily:settingData.titleFont.value.fontFamily,color:setText.color,textAlign:'center',height:'38px',lineHeight:'38px',fontSize:'12px',width:'100%',backgroundColor:'#F2F2F2',marginTop:'20px',marginBottom:'10px',position:'absolute',bottom:0,cursor:'pointer'}"
          @click.stop="loadProduct"
        >{{setText.text}}</div>
      </div>
    </div>
    <span v-html="productStyle"></span>
  </div>
</template>
<style scoped>
@import "../../../style/component-product/productList.css";
</style>
<script>
import computed from "./productList/computed.js";
import configSingleP2 from "../../com/product/productImgL/configSingleP2.js";
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
  mixins: [computed], //computd----设置项;
  data() {
    return {
      id: this.prop.id, //随机ID;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      settingData: this.prop.settingData, //组件设置项数据;
      lists: [],
      setText: {
        text: "加载更多",
        color: "#6B6B6B"
      }
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
    detaileWapurl() {
      zmEditor.$store.commit("openInfoDialog", {
        content: "该链接只能在发布的网站进行浏览"
      });
    },
    setMobHeight(val) {
      //计算mobile高度;
      let sub = val ? val : this.mobileStyle.width;
      let _left = 10; //BOX边距
      let boxWidth = parseFloat(sub);
      let imgHeight = parseFloat(parseFloat((boxWidth - _left) / 2).toFixed(9)); //2:指两列;---------图片高度;
      let imgTop = 5; //图片上部边距;
      let titTop = parseFloat(this.settingData.mobPageH.value); //标题上部边距;
      let titHeight = parseFloat(this.settingData.mobTitNum.num); //标题高度;
      let priceTop = parseFloat(this.settingData.mobPageH.value); //价格上部边距;
      let priceHeight = parseInt(this.settingData.mobPic.value); //价格字体高度;
      let priceBottom = 10; //价格下部边距;
      let boxBottom = parseInt(this.settingData.mobLineH.value); //产品行间距;
      let boxNum = Math.ceil(parseInt(this.settingData.mobNum.num) / 2);
      let pageTop = 20; //分页的上边距;
      let pageTitHeight = 38; //分页的字体高度;
      let pageBottom = 10; //分页的下边距;
      let pageHeight; //分页高度;
      let cont; //mobile高度;
      this.settingData.pageShow.value
        ? (pageHeight = pageTop + pageTitHeight + pageBottom)
        : (pageHeight = 0); //区分显示隐藏分页的高度;
      this.settingData.mobPicHeight.value = imgHeight + "px"; // 赋值给图片设置项;
      cont =
        parseFloat(
          imgHeight + titTop + titHeight + priceTop + priceHeight + priceBottom
        ) *
          boxNum +
        boxBottom * (boxNum - 1) +
        pageHeight +
        imgTop; //产品总高度包括分页;
      return cont;
    },
    loadProduct(event) {
      //加载更多产品
      // let num = this.settingData.mobNum.num;
      // if (this.lists.length > this.settingData["mobNum"].num) {
      //   num += 8;
      //   this.lists.length > num
      //     ? (this.settingData.mobNum.num = num)
      //     : (this.settingData.mobNum.num = this.lists.length,this.setText.color = "#BCBCBC",this.setText.text = "没有更多了！");
      // } else {
      //   this.setText.color = "#BCBCBC";
      //   this.setText.text = "没有更多了！";
      // }
      let mobHeight = parseFloat(this.mobileStyle.height);
      let newHeight = this.setMobHeight();
      let D_value = parseFloat(newHeight - mobHeight);
      this.$store.commit("updatePrePageHeight", {
        nowThis: this,
        value: D_value
      });
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
          this.lists.length > this.settingData.mobNum.num
            ? ""
            : ((this.setText.color = "#BCBCBC"),
              (this.setText.text = "没有更多了！"));
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
          this.lists.length > this.settingData.mobNum.num
            ? ""
            : ((this.setText.color = "#BCBCBC"),
              (this.setText.text = "没有更多了！"));
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
          this.lists.length > this.settingData.mobNum.num
            ? ""
            : ((this.setText.color = "#BCBCBC"),
              (this.setText.text = "没有更多了！"));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
