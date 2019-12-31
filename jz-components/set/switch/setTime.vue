<template>
  <div
    class="zm-edit-slider zm-edit-item zm-edit-vTimeBox"
    @mouseleave="addleave"
    ref="time"
  >
    <div class="zm-edit-text">{{fTitle}}</div>
    <div class="zm-edit-components-img-proportion">
      <span
        v-bind:class="{'zm-edit-select':isSelect}"
        @click.self.prevent="addClick"
        :data-type="changSelect.type"
      >{{changSelect.name}}
        <i
          class="iconfont icon-sanjiao-copy"
          @click.self.prevent="addClick"
        ></i>
      </span>
    </div>
    <div
      class="zm-edit-Vtime"
      v-show="isShow"
      @mouseleave="addleave"
    >
      <ul>
        <div>
          <li
            v-for="(ite,index) in dataType"
            :key="index"
            :data-type="ite.type"
            @click="addSelectChang(ite)"
          >{{ite.name}}</li>
        </div>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.zm-edit-item {
  display: table;
  vertical-align: middle;
  position: relative;
  font-size: 12px;
  color: #797979;
}
.zm-edit-text {
  width: 62px;
  text-align: left;
  padding-right: 9px;
  display: inline-block;
  vertical-align: middle;
}
.zm-edit-components-img-proportion {
  display: inline-block;
  width: 180px;
  height: 55px;
  line-height: 55px;
  vertical-align: middle;
}
.zm-edit-components-img-proportion span {
  width: 100%;
  height: 30px;
  line-height: 30px;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #797979;
}
.zm-edit-components-img-proportion span i {
  color: #d7d7d7;
  font-size: 13px;
  float: right;
  line-height: 26px;
  margin-right: 4px;
  margin-top: 4px;
}
.zm-edit-components-img-proportion .zm-edit-select,
.zm-edit-components-img-proportion > span:hover {
  /* border: 1px solid  #3089d5; */
  font-size: 12px;
  /* box-shadow: 0 0 10px #3089d5; */
}
.zm-edit-components-img-proportion .zm-edit-select,
.zm-edit-components-img-proportion > span:hover i {
  /* color: #3089d5; */
}
.zm-edit-components-img-proportion .zm-edit-select i {
  /* color: #3089d5; */
  margin-top: 4px;
  border: none;
  box-shadow: none;
}
.zm-edit-Vtime {
  /* display: none; */
  position: absolute;
  top: 50px;
  left: 62px;
  z-index: 1000;
  width: 180px;
  background: #fff;
  box-shadow: 0 0 5px #bcbcbc;
  border-radius: 3px;
}
.zm-edit-Vtime ul {
  height: 150px;
}
.zm-edit-Vtime ul div {
  height: 150px;
  overflow-x: hidden;
}
.zm-edit-Vtime .nicescroll-cursors {
  /* background-color: #3098d5 !important; */
}
.zm-edit-Vtime li {
  height: 30px;
  line-height: 30px;
  padding: 0 14px;
}
.zm-edit-Vtime li:hover {
  background-color: #eff6fc;
  cursor: pointer;
}
</style>
<script>
export default {
  name: "setTime",
  props: ["prop"],
  data() {
    return {
      fTitle: "时间样式",
      isSelect: false,
      isShow: false,
      myBarOption: {
        barOpacityMin: 0,
        railColor: "transparent",
        barWidth: 10
      },
      dataType: [
        {
          name: "2012/3/14",
          type: "YYYY/M/D"
        },
        {
          name: "2012-03-14",
          type: "YYYY-MM-DD"
        },
        {
          name: "2012年3月14日",
          type: "YYYY年M月D日"
        },
        {
          name: "二零一二年三月十四日",
          type: "YYYY_str年M_str月D_str日"
        },
        {
          name: "二零一二年三月",
          type: "YYYY_str年M_str月"
        },
        {
          name: "三月十四日",
          type: "M_str月D_str日"
        },
        {
          name: "2012年3月",
          type: "YYYY年M月"
        },
        {
          name: "2012/3/14 1:30 PM",
          type: "YYYY/M/D H:SPM(12)"
        },
        {
          name: "2012/3/14 13:30",
          type: "YYYY/M/D H:S(24)"
        },
        {
          name: "12/3/14",
          type: "YY/M/D"
        },
        {
          name: "3/14/12",
          type: "M/D/YY"
        },
        {
          name: "14-Mar",
          type: "D-M_e"
        },
        {
          name: "14-Mar-12",
          type: "D-M_e-YY"
        },
        {
          name: "March-12",
          type: "M_e-YY"
        }
      ],
      changSelect: {
        name: "2012/3/14",
        type: "YYYY/M/D"
      }
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    }
  },
  created() {
    let attr = this.prop.attr;
    this.fTitle = this.prop.title;
    this.changSelect.name = this.curSelectedCom.settingData[attr].value;
  },
  methods: {
    addClick() {
      this.isSelect = !this.isSelect;
      this.isShow = !this.isShow;
      let sizeDiv = this.$refs.time
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("div")[0];
      let $sizeDiv = $(sizeDiv);
      $sizeDiv.niceScroll({
        cursorcolor: "#6eace2",
        boxzoom: true,
        cursorwidth: "6px",
        cursorborder: "0px solid #fff",
        cursorborderradius: "3px",
        railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
        preventmultitouchscrolling: true,
        autohidemode: false,
        cursordragspeed: 0.5,
        oneaxismousemode: false,
        enablescrollonselection: true
      });
    },
    addSelectChang(ite) {
      let attr = this.prop.attr;
      if (this.curSelectedCom.lists) {
        this.curSelectedCom.lists.forEach(element => {
          element.fTime = this.transformation(element.fUpdateTime, ite.type);
        }); //当前选中组件要改变的设置项属性值
        this.curSelectedCom.lists = Object.assign(
          [],
          this.curSelectedCom.lists
        );
      }
      if (this.prop.callback) {
        this.prop.callback(ite.type); //当前选中组件要改变的设置项属性值;
      }
      this.isSelect = false;
      this.isShow = false;
      this.changSelect.name = ite.name;
      this.changSelect.type = ite.type;
      this.curSelectedCom.settingData[attr].value = this.changSelect.name;
      this.curSelectedCom.settingData[attr].type = this.changSelect.type;
    },
    addleave() {
      this.isSelect = false;
      this.isShow = false;
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


