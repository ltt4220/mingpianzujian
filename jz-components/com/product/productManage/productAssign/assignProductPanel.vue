<template>
  <div class="zm-dialog-pageBox zm-dialog-News">
    <noNewsProduct
      :prop="setName"
      v-if="isShow"
    ></noNewsProduct>
    <setProductSol :prop="setList"></setProductSol>
    <productAdd></productAdd>
  </div>
</template>
<script>
import noNewsProduct from "./noNewsProduct";
import productAdd from "./setAddProduct";
import setProductSol from "./setProductSol";
export default {
  name: "assign-product-panel",
  components: {
    noNewsProduct,
    productAdd,
    setProductSol
  },
  data() {
    return {
      addName: "",
      lists: []
    };
  },
  created(){
    this.$store.commit('editStepNum');
  },
  watch: {
    setList: {
      handler(val) {
        this.lists = zmEditor.$store.state.component.selectList[0].lists;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    setList() {
      this.lists = zmEditor.$store.state.component.selectList[0].lists;
      return this.lists;
    },
    setName() {
      zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
        "service"
      ) > -1
        ? (this.addName = "服务")
        : (this.addName = "产品");
      return this.addName;
    },
    isShow() {
      let flag;
      let that = zmEditor.$store.state.component.selectList[0].settingData;
      let assId = JSON.stringify(that[this.type + "AssId"]);
      let fid = assId.slice(1, -1).replace(/\"/g, "");
      if (fid.length == 0) {
        //设置指定数据面板显示隐藏;
        that.isProductAssign = true;
        that.isServerAssign = true;
        this.type == "product"
          ? (flag = that.isProductAssign)
          : (flag = that.isServerAssign);
      } else {
        that.isProductAssign = false;
        that.isServerAssign = false;
        this.type == "product"
          ? (flag = that.isProductAssign)
          : (flag = that.isServerAssign);
      }
      return flag;
    },
    type() {
      if (
        zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
          "product"
        ) > -1
      ) {
        return "product";
      } else {
        return "server";
      }
    }
  }
};
</script>

