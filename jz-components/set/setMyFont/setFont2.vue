<template>
  <div class="setFont zm-edit-item" :style="{height:height+'px'}">
    <div class="tit" v-text="prop.title" v-show="showTitle"></div>
    <div class="tit titArea" v-show="showInput">
      <!-- <textarea @focus="inputFocus" @blur="inputBlur" v-if="prop.center" id="demo" :style="{padding:padding2 + 'px'}" maxlength="40" @keydown="enterF" @input="textChange" rows="2" v-model="prop.style.inputText" :placeholder="prop.style.placeholder"></textarea> -->
      <input class="inputC" @keyup.enter="addenter" @focus="inputFocus" @blur="inputBlur" id="demo" :style="{padding:'7px'}" maxlength="40" @keydown="enterF" @input="textChange" rows="2" v-model="prop.style.inputText" :placeholder="prop.style.placeholder">
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
        let textCount = this.fileGetLength(this.prop.style.inputText.trim());
        if (textCount <= 0) {
          this.prop.style.inputText = this.textOldValue;
          nowVue.settingData[this.prop.attr2] = this.textOldValue;
        } else {}
      },
      enterF(event) {
        let nowVue = this.nowVue();
        let kd = event.keyCode;
        if (kd == 13 || kd == 38 || kd == 40) {
          if (kd == 13) {
            event.returnValue = false;
            let _this = this;
            let nowVue = zmEditor.$store.state.component.selectList[0];
            let fid = nowVue.settingData.productId;
            let fname;
            let newAdvertisementText;
            let url;
            if (this.prop.attr2 == "productName") {
              // fname = nowVue.settingData.productName
              fname = this.prop.style.inputText;
            }
            if (this.prop.attr2 == "productBanner") {
              // newAdvertisementText = nowVue.settingData.productBanner
              newAdvertisementText = this.prop.style.inputText;
            }
            if (nowVue.dataSource == "productData") {
              // url = '/product/webbuilder-api/product/updateProductInfoByParam'
              url = "/product-api/updateProductInfoByParam";
            } else if (nowVue.dataSource == "serviceData") {
              url =
                "/service/webbuilder-api/serviceNote/updateShopServiceInfoByParam";
            }
            //   this.$axios({
            //     method: "post",
            //     url: url,
            //     headers: {
            //       "Content-Type": "application/x-www-form-urlencoded",
            //       "X-Requested-With": "XMLHttpRequest"
            //     },
            //     responseType: "json",
            //     params: {
            //       id: fid,
            //       newName: fname,
            //       newAdvertisementText: newAdvertisementText
            //     }
            //   })
            //     .then(res => {
            //       console.log("数据提交成功");
            //       nowVue.settingData[this.prop.attr2] = this.prop.style.inputText;
            //     })
            //     .catch(() => {
            //       console.log("数据提交失败");
            //     });
          }
          event.currentTarget.blur();
          event.returnValue = false;
        }
      },
      textChange() {
        let nowVue = this.nowVue();
        let textCount = this.fileGetLength(this.prop.style.inputText.trim());
        if (textCount <= this.prop.style.maxlength && textCount > 0) {
          this.textOldValue2 = this.prop.style.inputText;
          //   this.textOldValue = this.prop.style.inputText
        } else if (textCount > this.prop.style.maxlength) {
          this.prop.style.inputText =
            this.textOldValue2.trim().length > 0 ?
            this.textOldValue2 :
            this.textOldValue;
          this.textOldValue = this.prop.style.inputText;
        }
        if (this.prop.callback) {
          this.prop.callback(this.prop.style.inputText);
        }
        //   if(this.prop.title == '按钮文字'){
        //       nowVue.settingData.btnText = this.prop.style.inputText
        //   }
        nowVue.settingData[this.prop.attr2] = this.prop.style.inputText;
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
      nowVue() {
        return zmEditor.$store.state.component.selectList[0];
      }
    },
    destroyed() {
      let nowVue = this.nowVue() ? this.nowVue() : this.comVue;
      // let textCount = this.fileGetLength(this.prop.style.inputText.trim())
      // if(textCount <= 0){
      //     this.prop.style.inputText = this.textOldValue
      //     nowVue.settingData[this.prop.attr2] = this.textOldValue
      // }
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
        this.height = 87;
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