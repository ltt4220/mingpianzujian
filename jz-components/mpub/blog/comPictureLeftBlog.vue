<template>
  <div
    v-if="settingData.mobileComIsHide"
    class="zm-component-main-blog"
    :id="id"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex,background:'white'}"
  >
    <div
      ref="content"
      class="zm-component-blog-content mobileLeft"
      :data-num="settingData.mobBlogNum.value"
    >
      <a
        v-for="(item,i) in setMobList"
        @click.stop="detaileWapurl"
        :key="i"
        class="zm-component-blog-box"
        :data-sortid="item.fId"
        :data-show="true"
        :data-time="item.fUpdateTime"
        :data-title="item.fTitle"
        style="cursor:pointer;"
      >
        <div
          class="zm-component-blog-mediaBox medialBoxOne"
          :style="{width:settingData.mobileHeight.value,margin:'12px'}"
        >
          <div
            class="zm-component-blog-bgImg"
            :data-sortid="item.fId"
            :data-show="item.ahref"
            :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}"
          >
          </div>
          <div
            class="zm-component-blog-bgVideo"
            :style="{display:item.videoDis,backgroundImage:'url('+item.bgUrl+')'}"
          >
            <span class="iconfont icon-bofang1"></span>
            <!-- <video
              :poster="item.bgUrl"
              :src="item.source"
            ></video> -->
          </div>
        </div>
        <div class="zm-component-blog-detail">
          <div class="zm-component-blog-upcont">
            <a
              class="zm-component-blog-title"
              :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.mobTitle.value,lineHeight:'1.3',height:parseFloat(parseInt(settingData.mobTitle.value)*1.3)*2 +'px'}">
              {{item.fTitle}}
            </a>
            <div
              class="zm-component-blog-date"
             :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.mobDate.value,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,display:settingData.mobBlogShow.num,height:settingData.mobDate.value}"
            >{{item.fTime}}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
import computed from "./leftBlog/computed.js";
export default {
  name: "com-Picture-left-blog",
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
      mobileStyle: this.prop.mobileStyle, //手机版样式
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
    detaileWapurl() {
      zmEditor.$store.commit("openInfoDialog", {
        content: "该链接只能在发布的网站进行浏览"
      });
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
          timeFormat = this.numAutoStr(M) + "月" + this.numAutoStr(D) + "日";
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
          console.log("月份转换失败，参数不正确！");
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
          console.log("月份转换失败，参数不正确！");
          break;
      }
      return month_Englist;
    }
  }
};
</script>
