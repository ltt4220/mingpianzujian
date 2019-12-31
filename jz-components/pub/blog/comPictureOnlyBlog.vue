<template>
  <div class="zm-component-main-blog" :id="id" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}">
    <div class="zm-component-blog-content leftPic" data-type="words" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in setList" :key="i">
        <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle" :style="{backgroundColor:settingData.BoxBackgroundColor.value,padding:settingData.paddingLeftRight.value}">
          <div class="zm-component-blog-mediaBox medialBoxOne" :style="{padding:settingData.pictureLRPadding.value,width:settingData.pictureWidth.value,height:settingData.pictureHeight.value}">
            <a class="zm-component-blog-bgImg" @click.stop="detailUrl(item)" :data-sortid="item.fId" :data-show="item.ahref" :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
            </a>
            <a class="zm-component-blog-bgVideo" @click.stop="detailUrl(item)" :style="{display:item.videoDis}">
              <span class="zm-component-videoControls" :style="{width:settingData.playWidth.value,height:settingData.playWidth.value}">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                  <!--<g>
                    <g class="st0">
                      <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                    <g>
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                  </g>-->
                  <g class="st2">
                    <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                  </g>
                </svg>
              </span>
              <video :poster="item.bgUrl" :src="item.source"></video>
            </a>
          </div>
          <div class="zm-component-blog-detail">
            <div class="zm-component-blog-upcont" :style="{width:settingData.contWidth.value+'px'}">
              <div class="zm-component-blog-title" :style="{textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}">
                <a class="zm-component-blog-title-a" @click.stop="detailUrl(item)" :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                  {{item.fTitle}}
                </a>
              </div>
              <div class="zm-component-blog-date" :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.blogTimeAlign.value,paddingTop:settingData.blogTimeTop.value,paddingBottom:settingData.ContmarginTop.value,marginBottom:settingData.firstHeight.value}">{{item.fTime}}
              </div>
              <div class="zm-component-blog-mediaBox mediaBoxTwo">
                <div class="zm-component-blog-bgImg" :data-sortid="item.fId" :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">

                </div>
                <div class="zm-component-blog-bgVideo" :style="{display:item.videoDis}">
                  <span class="zm-component-videoControls">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                      <!--<g>
                        <g class="st0">
                          <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                        <g>
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                      </g>-->
                      <g class="st2">
                        <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                      </g>

                    </svg>
                  </span>
                  <video :poster="item.bgUrl" :src="item.source" loop></video>
                </div>
              </div>
              <div class="zm-component-blog-word" v-html="item.fContentText" :style="{height:settingData.lineHeightNum.num,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,lineHeight:settingData.ContLineHeight.num,textAlign:settingData.ContcontrolRowAlign.value}">
              </div>
              <div class="zm-component-blog-viewMore" :style="{display:settingData.blogDetailsShow.num,textAlign:settingData.DiscontrolRowAlign.value,paddingTop:settingData.DismarginTop.value,paddingBottom:settingData.DismarginBottom.value,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,marginTop:settingData.lastHeight.value}">
                <a class="zm-component-details" @click.stop="detailUrl(item)" v-bind:class="settingData.blogDetails.value.iconClass">
                  {{settingData.blogDetails.value.text}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
    <span v-html="changemsg"></span>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
import computed from "./leftBlog/computed.js";
export default {
  name: "com-picture-left-blog",
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
      siteHost: this.$store.state.menu.siteHost,
      id: this.prop.id, //随机ID;
      style: this.prop.style, //组件样式;
      settingData: this.prop.settingData, //组件设置项数据;
      lists: [] //后台前10条数据及选择数据;
    };
  },
  created() {
    let url = "/blog_api/shopBlogApi/queryByBlogIds"; //指定id查询信息;
    let newUrl = "/blog_api/shopBlogApi/queryByPage"; //最新blog数据;
    let typeName = this.settingData.defauletTypeName.value;
    let shop;
    let webType = zmEditor.$store.state.menu.webType;
    webType == "component" || webType == "template"
      ? (shop = "-888888")
      : (shop = this.fShopId);
    if (typeName == "最新发布的博客") {
      this.newAxios(newUrl, shop);
    } else {
      if (this.settingData.listsID.length != 0) {
        let arr = [];
        this.settingData.listsID.forEach(ite => {
          arr.push(ite.id);
        });
        let ads = JSON.stringify(arr);
        let fid = ads.slice(1, -1).replace(/\"/g, "");
        this.assignAxios(url, fid, shop);
      } else {
        this.assignAxios(url, "", shop);
      }
    }
  },
  methods: {
    detailUrl(item) {
      let typeName = this.settingData.defauletTypeName.value;
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "&fShopId=" + "-888888")
        : (shop = "&fShopId=" + this.fShopId);
      this.$store.commit("editorPreDetailUrl", item.Detail + shop);
    },
    newAxios(url, shop) {
      this.$axios
        .get(
          url,
          { params: { fShopId: shop } },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          let data = response.data.data;
          this.lists = data;
        })
        .catch(response => {
          // 这里是处理错误的回调
          console.log(response);
        });
    },
    assignAxios(url, fid, shop) {
      this.$axios
        .get(
          url,
          {
            params: {
              ids: fid,
              fShopId: shop
            }
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          let data = response.data.data;
          let falg = this.settingData.listsID.some(item => {
            return item.type == true;
          });
          if (!falg) {
          } else {
            let fid = JSON.parse(JSON.stringify(this.settingData.listsID));
            data.forEach(ele => {
              fid.forEach(item => {
                let id1 = "1-" + ele.fId;
                let id2 = "2-" + ele.fId;
                id1 == item.id && (ele.fId = id1);
                id2 == item.id && (ele.fId = id2);
              });
            });
            this.lists = data;
          }
        })
        .catch(response => {
          // 这里是处理错误的回调
          console.log(response);
        });
    },
    /*
         * transformation(): 转换时间;
         *           time: 转换时间;
         *           formar: 时间转换格式(暂用原始格式);
         * */
    transformation(time, format) {
      let Y = new Date(time).getFullYear();
      let M = new Date(time).getMonth() + 1;
      let D = new Date(time).getDate();
      let h = new Date(time).getHours();
      let m = new Date(time).getMinutes();
      let s = new Date(time).getSeconds();
      let timeFormat = "";
      switch (format) {
        case "YYYY/M/D":
          timeFormat = Y + "/" + M + "/" + D;
          break;
        case "YYYY-MM-DD":
          timeFormat =
            Y + "-" + this.autoAddZero(M) + "-" + this.autoAddZero(D);
          break;
        case "YYYY年M月D日":
          timeFormat = Y + "年" + M + "月" + D + "日";
          break;
        case "YYYY_str年M_str月D_str日":
          timeFormat =
            this.numAutoStr(Y) +
            "年" +
            this.numAutoStr(M) +
            "月" +
            this.numAutoStr(D) +
            "日";
          break;
        case "YYYY_str年M_str月":
          timeFormat = this.numAutoStr(Y) + "年" + this.numAutoStr(M) + "月";
          break;
        case "M_str月D_str日":
          timeFormat = M + "月" + D + "日";
          break;
        case "YYYY年M月":
          timeFormat = Y + "年" + M + "月";
          break;
        case "YYYY/M/D H:SPM(12)":
          timeFormat =
            Y +
            "/" +
            M +
            "/" +
            D +
            " " +
            (h > 12 ? h - 12 : h) +
            ":" +
            this.autoAddZero(m) +
            (h > 12 ? " PM" : " AM");
          break;
        case "YYYY/M/D H:S(24)":
          timeFormat =
            Y + "/" + M + "/" + D + " " + h + ":" + this.autoAddZero(m);
          break;
        case "YY/M/D":
          timeFormat = Y.toString().slice(2, 4) + "/" + M + "/" + D;
          break;
        case "M/D/YY":
          timeFormat = M + "/" + D + "/" + Y.toString().slice(2, 4);
          break;
        case "D-M_e":
          timeFormat = D + "-" + this.monthEnglish(M);
          break;
        case "D-M_e-YY":
          timeFormat =
            D + "-" + this.monthEnglish(M) + "-" + Y.toString().slice(2, 4);
          break;
        case "M_e-YY":
          timeFormat = this.numAutoEnglish(M) + "-" + Y.toString().slice(2, 4);
          break;
        default:
          console.log("参数formar传入的时间格式不正确！");
          break;
      }
      return timeFormat;
    },
    /*
         * autoAddZero(): 不足两位，自动补0;
         *
         */
    autoAddZero(num) {
      return num >= 10 ? num : "0" + num;
    },
    /*
         * numAutoStr(): 日期类型转换，数字转字符串;
         *          num: 要转换的数值;
         */
    numAutoStr(num) {
      var numStr = num.toString();
      var newStr = "";
      for (var i = 0; i < numStr.length; i++) {
        switch (numStr[i]) {
          case "0":
            newStr += "零";
            break;
          case "1":
            newStr += "一";
            break;
          case "2":
            newStr += "二";
            break;
          case "3":
            newStr += "三";
            break;
          case "4":
            newStr += "四";
            break;
          case "5":
            newStr += "五";
            break;
          case "6":
            newStr += "六";
            break;
          case "7":
            newStr += "七";
            break;
          case "8":
            newStr += "八";
            break;
          case "9":
            newStr += "九";
            break;
          default:
            console.log(numStr[i] + "非数字！");
            break;
        }
      }
      //判断是否为月份,中间加"十"(例:二十三)
      if (newStr.length == 2) {
        var arr = newStr.split("");
        if (arr[0] == "零") {
          arr.splice(0, 1);
        }
        {
          if (arr[0] !== "零") {
            if (arr.length >= 2) {
              arr.splice(1, 0, "十");
              if (arr[0] == "一") {
                arr.splice(0, 1, "");
              }
              if (arr[2] == "零") {
                arr.splice(2, 1);
              }
            }
          } else {
            arr.splice(0, 1, "");
          }
        }
        arr = arr.join("");
        return arr;
      } else {
        return newStr;
      }
    },
    /*
         * numAutoEnglish() : 将月份转换为English形式;
         * 			  month	: int类型，月份数值;
         */
    numAutoEnglish(month) {
      var month_Englist = "";
      switch (month) {
        case 1:
          month_Englist = "January";
          break;
        case 2:
          month_Englist = "February";
          break;
        case 3:
          month_Englist = "March";
          break;
        case 4:
          month_Englist = "April";
          break;
        case 5:
          month_Englist = "May";
          break;
        case 6:
          month_Englist = "June";
          break;
        case 7:
          month_Englist = "July";
          break;
        case 8:
          month_Englist = "August";
          break;
        case 9:
          month_Englist = "September";
          break;
        case 10:
          month_Englist = "October";
          break;
        case 11:
          month_Englist = "November";
          break;
        case 12:
          month_Englist = "December";
          break;
        default:
          alert("月份转换失败，参数不正确！");
          break;
      }
      return month_Englist;
    },
    /*
         * monthEnglish() : 将月份转换为English简写形式;
         * 			  month	: int类型，月份数值;
         */
    monthEnglish(month) {
      var month_Englist = "";
      switch (month) {
        case 1:
          month_Englist = "Jan";
          break;
        case 2:
          month_Englist = "Feb";
          break;
        case 3:
          month_Englist = "Mar";
          break;
        case 4:
          month_Englist = "Apr";
          break;
        case 5:
          month_Englist = "May";
          break;
        case 6:
          month_Englist = "Jun";
          break;
        case 7:
          month_Englist = "Jul";
          break;
        case 8:
          month_Englist = "Aug";
          break;
        case 9:
          month_Englist = "Sep";
          break;
        case 10:
          month_Englist = "Oct";
          break;
        case 11:
          month_Englist = "Nov";
          break;
        case 12:
          month_Englist = "Dec";
          break;
        default:
          alert("月份转换失败，参数不正确！");
          break;
      }
      return month_Englist;
    }
  }
};
</script>
