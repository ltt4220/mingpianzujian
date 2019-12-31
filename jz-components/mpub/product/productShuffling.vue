<template>
  <div v-if="settingData.mobileComIsHide" :id="id" class="zm-product-shuff" :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',backgroundColor:this.settingData.productCarousel.value}">
    <ul class="zm-component-product-carousel-ul" ref='procuctUl' :style="{backgroundColor:this.settingData.productCarousel.value,overflow:'hidden',width:mobileStyle.width+'px',padding:'0 4px',paddingTop:'4px'}">
      <li class='procuctLi' ref='procuctLi' v-for="(item,index) in assignDataM" :key='index' :productId="item.id" :style="{float:'left',width:(mobileStyle.width-16)/2 +'px',marginLeft:(index%2==0?0:8)+'px'}">
        <div class="zm-component-product-carousel-imgbox1" @click.stop='productLink(item.wapurl)' :style="{overflow:'hidden',width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px',cursor:'pointer'}">
          <div class="zm-component-product-carousel-imgbox2" :style="{position: 'relative',width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px'}">
            <div class="imgbox3" ref='imgbox3' :style="{width:(mobileStyle.width-16)/2+'px',height:(mobileStyle.width-16)/2+'px',backgroundImage:'url('+item.mainImage+')',backgroundSize:settingData.ProductViewCarousel.backgroundSize,backgroundPosition:settingData.ProductViewCarousel.backgroundPosition,}"></div>
            <div v-show="item.isSwitchOn" class="zm-component-product-carousel-sale" v-if="(item.mfLabel != null) && (item.mfLabel.trim() !='') && (item.mfLabel !=' ')">
              <svg :style="{fill:item.backgroundColor,width:'34px',height:'54px'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 204">
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
              <div class="zm-component-product-hot" :style="{color:item.color}">{{item.mfLabel}}</div>
            </div>
          </div>
        </div>
        <div class="zm-component-product-carousel-text" ref='textHeight' :style="{width:(mobileStyle.width-16)/2+'px',padding:'0px 3px',paddingBottom:'20px'}">
          <div class="zm-component-product-carousel-title" @click.stop='productLink(item.wapurl)' :style="{height:settingData.carouselHitleHM+'px',textAlign:settingData.carouselTitAlign,lineHeight:'1.5em',lineClamp:['-webkit',settingData.MtextRowNum],boxOrient:'vertical',marginTop:parseFloat(12-settingData.titLineH)+'px',fontWeight:settingData.bannerfont3.value.fontWeight,fontFamily:settingData.bannerfont3.value.fontFamily,fontSize:parseInt(settingData.bannerfont3.value.fontSize)>=16?'16px':settingData.bannerfont3.value.fontSize,color:settingData.bannerfont3.value.color,fontStyle:settingData.bannerfont3.value.fontStyle,cursor:'pointer'}">{{item.comTitName}}</div>
          <!-- <div class="zm-component-product-carousel-sku" v-show="settingData.skuSwitchShowM.value" :style="{textAlign:settingData.skutit,lineHeight:'1.3em',lineClamp:['-webkit',1],boxOrient:'vertical',marginTop:'12px',fontWeight:settingData.skufont3.value.fontWeight,fontFamily:settingData.skufont3.value.fontFamily,fontSize:parseInt(settingData.skufont3.value.fontSize)>=14?'14px':settingData.skufont3.value.fontSize,color:settingData.skufont3.value.color,fontStyle:settingData.skufont3.value.fontStyle}">{{item.productSku}}</div> -->
          <div class="zm-component-product-carousel-price" v-show="settingData.retailSwitchShowM.value" :style="{height:parseInt(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,textAlign:settingData.retailtit,lineHeight:'1',lineClamp:['-webkit',1],boxOrient:'vertical',marginTop:parseFloat(12-settingData.titLineH)+'px',fontWeight:settingData.retailfont3.value.fontWeight,fontFamily:settingData.retailfont3.value.fontFamily,fontSize:parseInt(settingData.retailfont3.value.fontSize)>=20?'20px':settingData.retailfont3.value.fontSize,color:settingData.retailfont3.value.color,fontStyle:settingData.retailfont3.value.fontStyle}"><span :style="{fontSize:'12px'}">{{item.currencyType}}</span>{{item.priceStr}}</div>
        </div>
      </li>
    </ul>
    <div class="otherP" @click.stop="rotateC" :style="{fontFamily:settingData.bannerfont3.value.fontFamily,width:mobileStyle.width+'px',position:'absolute',bottom:0}">
      <span v-html="rotateN"></span>
      <div class="otherPT">换一批
        <div class="iconfont icon-loop" :class="{'rotateC':isRotateP}"></div>
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
        mold: "commonContainer",
        style: this.prop.style,
        settingData: this.prop.settingData,
        lists: this.prop.lists,
        mobileChildData: this.prop.mobileChildData, //手机版子组件信息
        mobileStyle: this.prop.mobileStyle, //手机版样式
        prodcutList: [
          //商品类型设置项下的产品数据
          {
            fId: "556566121",
            fTitle: "韩版修身连衣裙韩版修身韩版修身",
            productImg: ""
          }
        ],
        minIs: false,
        oldMainH: 0
      };
    },
    created() {
      this.settingData.rotateDeg = 0;
      this.settingData.firstIndex = 0;
      this.settingData.rotateCount = 0;
      let shop =
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component" ?
        71 :
        this.fEntrepId;
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
    methods: {
      rotateC() {
        //移动端换一批按钮事件
        this.isRotateP = true;
        this.settingData.rotateCount += 1; //旋转的次数;
        this.settingData.rotateDeg += 360; //旋转的度数;
        if (this.lists.length < 4) {
          // this.settingData.spliceNum = 2
          // this.settingData.firstIndex += 2
          this.settingData.spliceNum = 4; //一屏展示4个;
          this.settingData.firstIndex += 4; //一屏截取最后一个数;
        } else {
          if (this.lists.length == 4) {
            this.settingData.firstIndex += 4;
            this.settingData.spliceNum = 4;
          } else {
            // if(!this.minIs){
            //     this.settingData.firstIndex += 4
            // }
            this.settingData.firstIndex += 4;
            this.settingData.spliceNum = 4;
            // if(this.lists.length-this.settingData.firstIndex < 4){
            //     if(this.settingData.rotateCount >= Math.ceil(this.lists.length/4)){
            //         this.settingData.firstIndex += 2
            //     }
            //     this.minIs = true
            //     this.settingData.spliceNum = 2
            // }else{
            //     this.minIs = false
            // }
          }
        }
        if (this.lists.length - this.settingData.firstIndex <= 0) {
          this.settingData.firstIndex = 0;
          this.settingData.rotateCount = 0;
          this.minIs = false;
          // if(this.lists.length < 4){
          //     this.settingData.spliceNum = 2
          // }else{
          //     this.settingData.spliceNum = 4
          // }
        }
        //   this.mobileStyle.height = this.mobileGetDom();
        //   setTimeout(() => {
        //     this.$store.commit("updateComStyle", {
        //       id: this.id,
        //       style: this.style,
        //       mobileStyle: this.mobileStyle
        //     }); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
        //     return;
        //   }, 50);
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
                  el.comTitName != undefined && el.comTitName.length != 0 ?
                    (element.comTitName = el.comTitName) :
                    (element.comTitName = element.name);
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
                  el.comTitName == "" && el.comTitName == undefined ?
                    (element.comTitName = element.name) :
                    (element.comTitName = el.comTitName);
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
        //点击查看详情
        // location.href = url//当前页打开新页面
        // window.open(url, "_blank")//保存当前页，打开新页面
        zmEditor.$store.commit("openInfoDialog", {
          content: "该链接只能在发布的网站进行浏览"
        });
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
            "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop, {
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
          .post(url, "fCateId=" + mode + "&fEntrepId=" + shop, {
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
              //
              ValidIDArr.forEach((ele, i) => {
                let oldId = ele;
                if (element.id == ele.substr(2, ele.length - 1)) {
                  element.id = oldId;
                  // console.log('element.id---------------',element.id)
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

<style scoped>
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
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul {
    height: auto;
    /* width: 1000px; */
    /*overflow: hidden;*/
    box-sizing: border-box;
    display: flex;
    position: relative;
    transition: all 0.5s;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li:hover {
    /* z-index: 12; */
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li {
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
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul .zm-component-product-carousel-imgbox1 {
    cursor: pointer;
    /* z-index: 12; */
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2 {
    /* transform: scale(1.5); */
    cursor: pointer;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2 {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2>.imgbox3 {
    /* width: 200px; */
    /* height: auto; */
    /* border: 1px solid #e0eee0; */
    /* box-sizing: border-box; */
    /* transition: all 0.5s; */
    /* background-size: cover; */
    width: 105%;
    height: 105%;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2 .zm-component-product-carousel-vien {
    position: absolute;
    left: 0px;
    top: 0;
    /* transition: all 0.5s; */
  }
  .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2>.zm-component-product-carousel-sale {
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
  .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1>.zm-component-product-carousel-imgbox2>.zm-component-product-carousel-sale .zm-component-product-hot {
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
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-imgbox1:after {
    content: "";
    display: block;
    height: 0;
    width: 0;
    clear: both;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-text .zm-component-product-carousel-title {
    /* padding-top: 10px; */
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    /* display: -webkit-box; */
    /* -webkit-line-clamp: 2; */
    -webkit-box-orient: vertical;
  }
  .zm-component-product-carousel-title {
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
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-text .zm-component-product-carousel-sku {
    /* padding-top: 10px; */
    /* word-break: break-all; */
    /* word-wrap: break-word; */
    overflow: hidden;
    text-overflow: ellipsis;
    /* display: -webkit-box; */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li>.zm-component-product-carousel-text .zm-component-product-carousel-price {
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
  .zm-component-product-carousel .zm-component-product-carousel-ul-box .zm-component-product-carousel-ul>li:first-child {
    margin-left: 0px !important;
  }
  .zm-component-product-carousel .zm-component-product-carousel-arrowleft,
  .zm-component-product-carousel .zm-component-product-carousel-arrowright {
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
    pointer-events: all;
    cursor: pointer;
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
    margin-left: -4px;
  }
  .zm-component-product-carousel .zm-component-product-carousel-arrowright {
    right: 0;
    transform: rotateY(0deg);
    margin-right: -3px;
  }
</style>



