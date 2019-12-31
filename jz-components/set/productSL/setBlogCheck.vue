<template>
  <div class="zm-dialog-check1">
    <!-- <button v-show="show1" class="zm-dialog-check-button" @click.stop="checkBlog">{{prop}}</button> -->
    <button
      class="zm-dialog-check-button1"
      @click.stop="checkBlog"
    >{{prop}}</button>
    <!-- <button v-show="show2" class="zm-dialog-check-button" @click.stop="changeProduct">{{prop2}}</button> -->
  </div>
</template>
<script>
import productCommon from "../../com/product/productManage/productAssign/productCommon";
export default {
  name: "set-blog-check",
  props: ["prop"],
  data() {
    return {
      show1: true,
      show2: false,
      // prop:'',
      prop2: "替换产品",
      vObj: {},
      productType: "product",
      type: "mySelectType",
      nowRandomSN: ""
    };
  },
  created() {
    let nowVue = zmEditor.$store.state.component.selectList[0];
    let sibilVue;
    this.$parent.$children.forEach((element, index) => {
      if (element.type == "mySelectType2") {
        sibilVue = element;
      }
    });
    if (!nowVue.prodcutList[0].fId) {
      if (sibilVue.RandomSN == "产品") {
        this.$parent.compositeDataL = "选择产品";
        this.$parent.productS = true;
        this.$parent.serviceS = false;
      } else if (sibilVue.RandomSN == "服务") {
        this.$parent.compositeDataL = "选择服务";
        this.$parent.productS = false;
        this.$parent.serviceS = true;
      }
    } else {
      if (sibilVue.RandomSN == "产品") {
        this.$parent.compositeDataL = "替换产品";
        this.$parent.productS = true;
        this.$parent.serviceS = false;
      } else if (sibilVue.RandomSN == "服务") {
        this.$parent.compositeDataL = "替换服务";
        this.$parent.productS = false;
        this.$parent.serviceS = true;
      }
    }

    this.show2 = nowVue.chooseBtn2;
    this.oderData();
  },
  methods: {
    oderData() {
      let that = zmEditor.$store.state.component.selectList[0].settingData;
      let shop =
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component"
          ? 71
          : zmEditor.$store.state.component.selectList[0].fEntrepId;
      let assId = JSON.stringify(that.ValidData);
      let fid = assId.slice(1, -1).replace(/\"/g, "");
      let url;
      if (that.productType == "product") {
        url = "/product-api/getProductListByIds";
      } else if (that.productType == "service") {
        url = "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
      }
      if (fid.length != 0) {
        //存在指定数据;
        this.ValidData(url, fid, shop);
      } else {
        // this.productList = [];
      }
    },
    ff() {
      let nowVue = zmEditor.$store.state.component.selectList[0];
      this.show1 = true; //he
      this.show2 = false; //he
    },
    checkBlog(oldRandomSN, str) {
      /*
        modules 模块product service
        nowLength 当前多少条数据
        totalLenght 达到多少条数据报警告
        multiple  true是多选 false是单选
        warningText 警告文字
        callBack 回调函数
      */
      this.nowRandomSN = oldRandomSN;
      let _this = this;
      let nowVue = zmEditor.$store.state.component.selectList[0];
      let m = "";
      if (this.prop.trim() == "选择产品") {
        m = "product";
      } else if (this.prop.trim() == "替换产品") {
        m = "product";
      } else if (this.prop.trim() == "选择服务") {
        m = "service";
      } else if (this.prop.trim() == "替换服务") {
        m = "service";
      }
      if (str) {
        if (str == "product") {
          m = "product";
        } else if (str == "service") {
          m = "service";
        }
      }
      let shop =
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component"
          ? 71
          : zmEditor.$store.state.component.selectList[0].fEntrepId;
      this.productType = m;
      let oldType = this.nowRandomSN == "产品" ? "product" : "service";
      nowVue.productType = oldType;
      nowVue.settingData.productType = oldType;
      productCommon.choiceModules({
        nowLength: 1,
        totalLenght: 100,
        multiple: false,
        warningText: "最多选择100条产品",
        modules: m,
        callBack: _this.productC,
        fEntrepId: shop,
        closeCallBack: () => {
          //  this.$store.commit('addComKeyEvent')//恢复全局键盘事件
          _this.productC();
        }
      }); //7-1选择产品数据;
      //  this.$store.commit('removeComKeyEvent')//取消全局键盘事件
    },
    productC(v) {
      let nowVue = zmEditor.$store.state.component.selectList[0];
      if (!v) {
        let sibilVue;
        this.$parent.$children.forEach((element, index) => {
          if (element.type == "mySelectType2") {
            sibilVue = element;
          }
        });
        let index;
        if (this.nowRandomSN == "产品") {
          index = 0;
          sibilVue.selectF(index, "noSelset");
          if (nowVue.prodcutList[0] && nowVue.prodcutList[0].fId) {
            this.$emit("changCompositeDataL", "product", this.nowRandomSN);
          }
        } else {
          if (this.nowRandomSN == "服务") {
            index = 1;
            sibilVue.selectF(index, "noSelset");
            if (nowVue.prodcutList[0] && nowVue.prodcutList[0].fId) {
              this.$emit("changCompositeDataL", "service", this.nowRandomSN);
            }
          } else {
            this.prop.indexOf("替换产品") > -1
              ? ((this.productType = "product"), (this.nowRandomSN = "产品"))
              : ((this.productType = "service"), (this.nowRandomSN = "服务"));
            nowVue.settingData.productType = this.productType;
            nowVue.productType = this.productType;
            this.$emit("changCompositeDataL", this.productType);
            this.oderData();
          }
        }
        this.$emit("productType", this.nowRandomSN);
        nowVue.RandomSN = this.nowRandomSN;
      } else {
        let newId = v[0].id;
        if (
          zmEditor.$store.state.menu.webType == "template" ||
          zmEditor.$store.state.menu.webType == "component"
        ) {
          v.forEach((element, index) => {
            let newId = element.id;
            element.id = "1-" + newId;
          });
        } else if (zmEditor.$store.state.menu.webType == "website") {
          v.forEach((element, index) => {
            let newId = element.id;
            element.id = "2-" + newId;
          });
        }
        nowVue.dailogProductL = v;
        nowVue.dataSource = "productData"; //数据来源类型，分产品(productData)和服务(serviceData)
        if (this.prop == "选择产品" || this.productType == "替换产品") {
          this.productType = "product";
        } else if (this.prop == "选择服务" || this.prop == "替换服务") {
          this.productType = "service";
        }
        nowVue.settingData.productType = this.productType;
        nowVue.productType = this.productType;
        this.$emit("changeP", this.prop);
        this.$emit("changCompositeDataL", this.productType);
        this.$emit("showPro");
        this.changeProduct();
        this.$emit("productType", nowVue.RandomSN);
        // this.oderData();
      }

      // this.$emit("productType",nowVue.RandomSN)
      // this.$store.commit('addComKeyEvent')//恢复全局键盘事件
    },
    changeProduct() {
      let nowVue = zmEditor.$store.state.component.selectList[0];
      // this.productType = nowVue.settingData.productType;
      let v = nowVue.dailogProductL;
      // if(v[0].hasPupupChild != 0){
      if (!v) {
        // this.show1 = true
        // this.show2 = false
      } else {
        if (this.productType == "product") {
          nowVue.dataSource = "productData"; //数据来源类型，分产品(productData)和服务(serviceData)
        } else if (this.productType == "service") {
          nowVue.dataSource = "serviceData"; //数据来源类型，分产品(productData)和服务(serviceData)
        }
        nowVue.mylists = v;
        nowVue.prodcutList[0].fId = v[0].id;
        nowVue.prodcutList[0].fTitle = v[0].name;
        nowVue.settingData.productName = v[0].name;
        nowVue.prodcutList[0].productImg = v[0].mainImage;
        zmEditor.$store.state.component.selectList[0].settingData.nowData = v;
        zmEditor.$store.state.component.selectList[0].settingData.ValidData = [];
        let obj = {
          id: v[0].id
        };
        zmEditor.$store.state.component.selectList[0].settingData.ValidData.push(
          v[0].id
        );
        nowVue.titleHCompute ? nowVue.titleHCompute() : "";
      }
    },
    ValidData(url, ValidID, shop) {
      //指定数据过滤下架数据及更新最新数据信息;
      let that = zmEditor.$store.state.component.selectList[0];
      this.$axios
        .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          var data = response.data.data;
          if (!data[0]) return;
          let nowVue = zmEditor.$store.state.component.selectList[0];
          nowVue.mylists = data;
          nowVue.prodcutList[0].fId = data[0].id;
          nowVue.prodcutList[0].fTitle = data[0].name;
          nowVue.prodcutList[0].productImg = data[0].mainImage;
          nowVue.titleHCompute ? nowVue.titleHCompute() : "";
        })
        .catch(err => {
          nowVue.mylists = [];
          console.log(err);
        });
    }
  }
};
</script>
