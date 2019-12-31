<template>
  <div
    v-if="(prop.isShowSet == false || prop.isShowSet == undefined)"
    class="zm-edit-slider zm-edit-item zm-edit-vTimeBox"
    @mouseleave="addleave"
    ref="time"
  >
    <div class="zm-edit-text">{{fTitle}}</div>
    <div class="zm-edit-components-img-proportion">
      <span
        v-bind:class="[{'zm-edit-select':isSelect},changSelect.type]"
        @click.self.prevent="addClick"
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
      <ul :style="{height:isheight}">
        <div :style="{height:isheight}">
          <li
            v-for="(ite,index) in dataType"
            :key="index"
            v-bind:class="ite.type"
            @click.self.prevent="addSelectChang(ite)"
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
  line-height: 29px;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #797979;
}
.zm-edit-components-img-proportion span.icon-end {
  font-size: 14px;
}
.zm-edit-components-img-proportion span.icon-shenglvehao {
  font-size: 20px;
}
.zm-edit-components-img-proportion span i {
  color: #bcbcbc;
  font-size: 13px;
  float: right;
  margin-right: 4px;
  margin-top: 2px;
}
.zm-edit-components-img-proportion .zm-edit-select i {
  /* color: #3089d5; */
  margin-top: 2px;
  border: none;
  box-shadow: none;
}
.zm-edit-Vtime {
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
  padding: 0 16px 0 14px;
  font-size: 12px;
}
.zm-edit-Vtime li.icon-shenglvehao,
.zm-edit-Vtime li.icon-yuanjiantou,
.zm-edit-Vtime li.icon-shuangjiantou {
  font-size: 14px;
}
.zm-edit-Vtime li.icon-shenglvehao {
  font-size: 20px;
  padding-left: 10px;
}
</style>
<script>
export default {
  name: "setTime",
  props: ["prop"],
  data() {
    return {
      fTitle: "查看详情",
      isSelect: false,
      isShow: false,
      isheight: "150px",
      myBarOption: {
        barOpacityMin: 0,
        railColor: "transparent",
        barWidth: 10
      },
      dataType: [
        {
          name: "无",
          type: "iconfont"
        },
        {
          name: "[查看详情]",
          type: "iconfont"
        },
        {
          name: "查看详情",
          type: "iconfont"
        },
        {
          name: "阅读",
          type: "iconfont"
        },
        {
          name: "现在阅读",
          type: "iconfont"
        },
        {
          name: "more...",
          type: "iconfont"
        },
        {
          name: "",
          type: "iconfont icon-shuangjiantou"
        },
        {
          name: "",
          type: "iconfont icon-shenglvehao"
        },
        {
          name: "",
          type: "iconfont icon-jiantou1"
        },
        {
          name: "",
          type: "iconfont icon-end"
        },
        {
          name: "",
          type: "iconfont icon-yuanjiantou"
        }
      ],
      changSelect: {
        name: "查看详情",
        type: "iconfont"
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
    if (this.prop.label) {
      this.dataType = this.prop.label;
      this.isheight = parseInt(this.dataType.length) * 30 + "px";
    }
    if (typeof this.curSelectedCom.settingData[attr].value == "string" || typeof this.curSelectedCom.settingData[attr].value == "number") {
      this.curSelectedCom.settingData[attr].value == 1
        ? (this.changSelect.name = "单行文本")
        : (this.changSelect.name = "两行文本");
      this.changSelect.type = "iconfont";
    } else {
      this.curSelectedCom.settingData[attr].value.text == "" &&
      this.curSelectedCom.settingData[attr].value.iconClass == "iconfont"
        ? (this.changSelect.name = "无")
        : (this.changSelect.name = this.curSelectedCom.settingData[
            attr
          ].value.text);

      this.changSelect.type = this.curSelectedCom.settingData[
        attr
      ].value.iconClass;
    }
  },
  methods: {
    Trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
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
      let notName;
      let newNum;
      this.isSelect = false;
      this.isShow = false;
      ite.name == "无" ? (notName = "") : (notName = ite.name);
      this.changSelect.name = ite.name;
      this.changSelect.type = ite.type;
      if (typeof this.curSelectedCom.settingData[attr].value == "string" || typeof this.curSelectedCom.settingData[attr].value == "number") {
        ite.name == "单行文本" ? (newNum = 1) : (newNum = 2);
        this.curSelectedCom.settingData[attr].value = newNum;
        if (this.prop.callback) {
          this.prop.callback(newNum, this); //当前选中组件要改变的设置项属性值;
        }
      } else {
        this.curSelectedCom.settingData[attr].value.iconClass = this.changSelect.type;
        this.curSelectedCom.settingData[attr].value.text = notName;
        if (this.prop.callback) {
          this.prop.callback(notName, ite.type, this); //当前选中组件要改变的设置项属性值;
        }
      }
    },
    addleave() {
      this.isSelect = false;
      this.isShow = false;
    }
  }
};
</script>


