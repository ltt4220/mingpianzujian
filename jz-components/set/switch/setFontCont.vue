<template>
  <div class="setFont zm-product-setDetail zm-edit-item">
    <div
      class="tit"
      v-text="prop.title"
      v-show="showTitle"
    ></div>
    <div
      class="tit titArea"
      v-show="showInput"
    >
      <input
        id="demo"
        :maxlength="prop.style.maxLength"
        rows="1"
        v-bind:class="{'zm-edit-select':isSelect}"
        v-model="titlt"
        @keyup.enter="addenter"
        @focus="addFocus"
        @input="addInput"
        @blur="addBlur"
      />
    </div>
    <div class="conF">
      <setFontFamily :prop="this.prop"></setFontFamily>
      <setFontSize :prop="this.prop"></setFontSize>
      <setColor :prop="prop"></setColor>
      <setFontWeight :prop="prop"></setFontWeight>
      <setFontStyle
        :prop="prop"
        v-if="!this.prop.u"
      ></setFontStyle>
      <setFontUnd
        :prop="prop"
        v-if="this.prop.u"
      ></setFontUnd>
    </div>
  </div>
</template>

<script>
import setFontFamily from "./fontSet/setFontFamily";
import setFontSize from "./fontSet/setFontSize";
import setColor from "./fontSet/setColor";
import setFontWeight from "./fontSet/setFontWeight";
import setFontStyle from "./fontSet/setFontStyle";
import setFontUnd from "./fontSet/setFontUnd";
export default {
  name: "set-font",
  props: ["prop"],
  data() {
    return {
      title: "",
      isSelect: false,
      showInput: true,
      showTitle: true,
      text: false,
      titlt: "",
      comVue: null
    };
  },
  created() {
    this.titlt = this.prop.style.placeholder;
    this.comVue = zmEditor.$store.state.component.selectList[0];
  },
  methods: {
    addInput(e) {
      let event = window.event || e;
      let nowVue = this.nowVue();
      this.titlt = event.currentTarget.value;
      nowVue.settingData[this.prop.attr2].value != undefined
        ? (nowVue.settingData[this.prop.attr2].value = this.titlt)
        : (nowVue.settingData[this.prop.attr2] = this.titlt);
      let arr = event.currentTarget.value.split("");
      let unIcode = 0,
        pageName = "";
        console.log(arr)
      let maxLength = this.prop.style.maxLength;
      for (let i = 0; i < arr.length; i++) {
        unIcode = unIcode + this.fileGetLength(arr[i]);
        if (unIcode >= maxLength) {
          this.titlt = pageName;
          nowVue.settingData[this.prop.attr2].value != undefined
            ? (nowVue.settingData[this.prop.attr2].value = this.titlt)
            : (nowVue.settingData[this.prop.attr2] = this.titlt);
          break;
        }
        pageName += arr[i];
      }
    },
    //重命名获取字符位数;
    fileGetLength(v) {
      var len = 0;
      for (var i = 0; i < v.length; i++) {
        var a = v.charAt(i);
        len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
      }
      return len;
    },
    Trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    nowVue() {
      return zmEditor.$store.state.component.selectList[0];
    },
    addFocus(e) {
      let event = window.event || e;
      this.$store.commit("removeComKeyEvent");
      this.isSelect = true;
      event.currentTarget.select();
    },
    addBlur() {
      let nowVue = this.nowVue() ? this.nowVue() : this.comVue;
      this.$store.commit("addComKeyEvent");
      this.isSelect = false;
      if (this.titlt == "") {
        this.titlt = this.prop.style.placeholder;
        nowVue.settingData[this.prop.attr2].value != undefined
          ? (nowVue.settingData[this.prop.attr2].value = this.titlt)
          : (nowVue.settingData[this.prop.attr2] = this.titlt);
      }
    },
    addenter(e) {
      let event = window.event || e;
      this.isSelect = false;
      event.currentTarget.blur();
    }
  },
  components: {
    setFontFamily,
    setFontSize,
    setFontWeight,
    setFontStyle,
    setColor,
    setFontUnd
  },
  destroyed() {
    let nowVue = this.comVue;
    nowVue.settingData[this.prop.attr2].value != undefined
      ? (nowVue.settingData[this.prop.attr2].value = this.titlt)
      : (nowVue.settingData[this.prop.attr2] = this.titlt);
  }
};
</script>
<style scoped lang="less">
.setFont {
  width: 245px; // height: 95px;
  margin: 0 20px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 12px;
  padding-top: 5px;
}
input::-webkit-input-placeholder {
  color: #bbb;
}
input:-moz-placeholder {
  color: #bbb;
}
input::-moz-placeholder {
  color: #bbb;
}
input::-ms-input-placeholder {
  color: #bbb;
}
.zm-product-setDetail {
  .tit {
    height: 35px;
    line-height: 36px;
    text-align: left;
    color: #797979;
    width: 62px;
    float: left;
  }
  .titArea {
    height: 35px;
    width: 178px;
    input {
      display: block;
      width: 100%;
      height: 82%;
      resize: none;
      border: none;
      border: 1px solid #bcbcbc;
      border-radius: 3px;
      outline: medium;
      overflow: hidden;
      padding: 7px 5px;
      color: #797979;
      word-break: break-all;
      font-size: 12px;
    }
    .zm-edit-select {
      // border: 1px solid #3089d5;
      // box-shadow: 0 0 10px #3089d5;
      background-color: white;
    }
  }
}
.conF {
  width: 100%;
  height: 49px;
  margin-top: -4px;
}
.setFont::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
</style>