<template>
  <div class="setFont zm-edit-item" :style="{height:height+'px'}">
    <div class="tit" v-text="prop.title" v-show="showTitle"></div>
    <div class="tit titArea" v-show="showInput">
      <input class="inputC" @keyup.enter="addenter" @focus="inputFocus" @blur="inputBlur" id="demo" :style="{padding:'7px'}" maxlength="20"  @input="textChange" rows="2" v-model="prop.style.inputText" :placeholder="prop.style.placeholder">
    </div>
    <div class="conF">
      <setFontFamily :prop="this.prop"></setFontFamily>
      <setFontSize :prop="this.prop"></setFontSize>
      <setColor :prop="prop"></setColor>
      <setFontWeight :prop="prop"></setFontWeight>
      <setFontStyle :prop="prop" v-if="!this.prop.u"></setFontStyle>
      <setFontUnd :prop="prop" v-if="this.prop.u"></setFontUnd>
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
    data() {
      return {
        title: "",
        showInput: true,
        showTitle: true,
        text: false,
        textCon: "",
        textOldValue: "",
        textOldValue2: "",
        textOldValue3: "",
        height: 50,
        padding: 5,
        padding2: 11,
        comVue: null
      };
    },
    props: ["prop"],
    watch: {
      getNewName(val) {
        this.prop.style.inputText = this.fileGetLength2(val);
        this.textOldValue = this.prop.style.inputText;
      }
    },
    computed: {
      getNewName() {
        return zmEditor.$store.state.component.selectList[0].settingData
          .productName;
      }
    },
    methods: {
      addenter() {
        event.currentTarget.blur();
      },
      inputFocus() {
        this.$store.commit("removeComKeyEvent");
        event.currentTarget.select();
      },
      inputBlur() {
        this.$store.commit("addComKeyEvent");
        let nowVue = this.nowVue() ? this.nowVue() : this.comVue;
        let fid = nowVue.mylists[0].id;
        let textCount = this.fileGetLength(this.prop.style.inputText.trim());
        if (textCount <= 0) {
          this.prop.style.inputText = this.textOldValue;
        }
         nowVue.settingData[this.prop.attr2] = this.prop.style.inputText;
        // this.emptyC();
      },
      updateProData(ValidID, name) {
        //指定数据过滤下架数据及更新最新数据信息;
        let that = this.nowVue() ? this.nowVue() : this.comVue;
        let url;
        if (that.productType == "product") {
          url = "/product-api/updateProductInfoByParam";
        } else {
          url =
            "/service/webbuilder-api/serviceNote/updateShopServiceInfoByParam";
        }
        let shop =
          zmEditor.$store.state.menu.webType == "template" ||
          zmEditor.$store.state.menu.webType == "component" ?
          71 :
          this.fShopId;
        this.$axios
          .post(url, "id=" + ValidID + "&fEntrepId=" + shop + "&newName=" + name, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          })
          .then(response => {
            that.mylists[0].name = name;
            this.textOldValue = name;
            that.settingData[this.prop.attr2] = this.prop.style.inputText;
          })
          .catch(err => {
            console.log("数据请求失败----------");
          });
      },
      emptyC() {
        console.log("点击了空白处-------------------------------");
        let _this = this;
        let nowVue = this.nowVue() ? this.nowVue() : this.comVue;
        let fid = nowVue.mylists[0].id;
        let fname;
        if (this.prop.attr2 == "productName") {
          fname = this.prop.style.inputText;
          nowVue.settingData[this.prop.attr2] = fname;
        }
        if (this.prop.attr2 == "productBanner") {
          newAdvertisementText = this.prop.style.inputText;
        }
        // this.updateProData(fid,fname)
      },
      enterF(event, myKd) {
        let nowVue = this.nowVue();
        let kd = myKd ? myKd : event.keyCode;
        if (kd == 13 || kd == 38 || kd == 40) {
          if (kd == 13) {
            // event.returnValue = false;
            let _this = this;
            let nowVue = zmEditor.$store.state.component.selectList[0];
            let fid = nowVue.mylists[0].id;
            let fname;
            if (this.prop.attr2 == "productName") {
              fname = this.prop.style.inputText;
              nowVue.settingData[this.prop.attr2] = fname;
            }
            if (this.prop.attr2 == "productBanner") {
              newAdvertisementText = this.prop.style.inputText;
            }
            // this.updateProData(fid,fname)
            event.returnValue = false;
          }
          event.currentTarget.blur();
          event.returnValue = false;
        }
      },
      textChange() {
        let nowVue = this.nowVue();
        let fid = nowVue.mylists[0].id;
        let textCount = this.fileGetLength(this.prop.style.inputText.trim());
        if (textCount <= this.prop.style.maxlength && textCount > 0) {
          this.textOldValue2 = this.prop.style.inputText;
          // nowVue.settingData[this.prop.attr2] = this.textOldValue2;
        } else if (textCount > this.prop.style.maxlength) {
          this.prop.style.inputText = this.textOldValue2;
          // nowVue.settingData[this.prop.attr2] = this.prop.style.inputText;
        }
        if (this.prop.callback) {
          this.prop.callback(this.prop.style.inputText);
        }
        if (this.prop.title == "按钮文字") {
          nowVue.settingData.btnText = this.prop.style.inputText;
        }
        zmEditor.$store.commit('saveOperationToHistory')
      },
      fileGetLength(v) {
        //重命名获取字符位数;
        var len = 0;
        for (var i = 0; i < v.length; i++) {
          var a = v.charAt(i);
          len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
        }
        return len;
      },
      fileGetLength2(v) {
        var len = 0;
        let nowStr = "";
        for (var i = 0; i < v.length; i++) {
          var a = v.charAt(i);
          nowStr += a;
          len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
          if (len >= 20) break;
        }
        return nowStr;
      },
      nowVue() {
        return zmEditor.$store.state.component.selectList[0];
      }
    },
    destroyed() {
      let nowVue = this.nowVue() ? this.nowVue() : this.comVue;
      let fid = nowVue.mylists[0].id;
      // let textCount = this.fileGetLength(this.prop.style.inputText.trim())
      // let textCount = this.fileGetLength(this.textOldValue.trim())
      //   this.prop.style.inputText = this.textOldValue
      //   this.updateProData(fid,this.prop.style.inputText)
      // if(textCount <= 0){
      //     this.prop.style.inputText = this.textOldValue
      //     this.updateProData(fid,this.prop.style.inputText)
      // }else{
      //     this.emptyC()
      // }
      this.emptyC();
    },
    components: {
      setFontFamily,
      setFontSize,
      setFontWeight,
      setFontStyle,
      setColor,
      setFontUnd
    },
    created() {
      this.comVue = zmEditor.$store.state.component.selectList[0];
      this.prop.style.inputText = this.fileGetLength2(this.prop.style.inputText);
    },
    mounted() {
      if (this.prop.style.input && this.prop.title) {
        this.showInput = true;
        this.showTitle = true;
        this.textOldValue = this.prop.style.inputText;
        this.height = 100;
      } else if (this.prop.style.input) {
        this.showInput = true;
        this.showTitle = false;
        this.textOldValue = this.prop.style.inputText;
        this.height = 95;
      } else if (this.prop.title) {
        this.showInput = false;
        this.showTitle = true;
        this.height = 85;
      } else {
        this.showInput = false;
        this.showTitle = false;
        this.height = 50;
      }
    }
  };
</script>
<style scoped lang="less">
  .setFont {
    width: 245px; // height: 95px;
    // margin: 0 20px ;
    // border-bottom: 1px solid #D7D7D7 ;
    font-size: 12px;
    color: #797979;
  }
  .tit {
    // height: 35px;
    height: 37px;
    line-height: 37px;
    text-align: left;
    font-size: 12px;
    display: inline-block;
    vertical-align: bottom;
  }
  .inputC::-webkit-input-placeholder {
    color: #c9c9c9;
  }
  .inputC:-moz-placeholder {
    color: #c9c9c9;
  }
  .inputC::-moz-placeholder {
    color: #c9c9c9;
  }
  .inputC:-ms-input-placeholder {
    color: #c9c9c9;
  }
  .titArea {
    margin-left: 15px;
    margin-top: 10px;
    height: 37px;
    .inputC {
      display: block;
      width: 178px;
      height: 30px;
      resize: none;
      border: none;
      border: 1px solid #ddd;
      border-radius: 3px;
      outline: medium;
      overflow: hidden; // padding-left: 5px ;
      // padding-right: 5px ;
      padding: 7px 7px;
      word-break: break-all;
      color: #797979;
    } // .inputC:hover{
    //     box-shadow: 0 0 10px #3089D5;
    //     border: 1px solid #3089D5 ;
    // }
  }
  .conF {
    width: 100%;
    height: 49px;
  }
</style>