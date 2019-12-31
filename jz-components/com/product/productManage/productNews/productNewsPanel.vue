<template>
  <div class="zm-dialog-pageBox zm-dialog-News">
    <newsProduct :prop="setName" v-if="setList"></newsProduct>
    <noNewsProduct :prop="setName" v-else></noNewsProduct>
    <productCheck v-if="setList"></productCheck>
    <productAdd v-else :prop="setName"></productAdd>
  </div>
</template>
<script>
import newsProduct from "./newsProduct";
import noNewsProduct from "./noNewsProduct";
import productCheck from "./setProductCheck";
import productAdd from "./setAddProduct";
export default {
  name: "product-news-panel",
  components: {
    newsProduct,
    noNewsProduct,
    productCheck,
    productAdd
  },
  data() {
    return {
      addName: "",
      isShowProduct: true,
      lists: []
    };
  },
  created() {
    let url =
      zmEditor.$store.state.component.selectList[0].settingData.productUrl;
    let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
    // let mode;
    // this.type == "product" ? (mode = "") : (mode = -3);
    this.newData(url, -3, shop);
    this.$store.commit('editStepNum');
  },
  computed: {
    setName() {
      zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
        "service"
      ) > -1
        ? (this.addName = "服务")
        : (this.addName = "产品");
      return this.addName;
    },
    setList() {
      let that = zmEditor.$store.state.component.selectList[0];
      if (that.lists.length == 0) {
        this.isShowProduct = false;
      } else {
        this.isShowProduct = true;
      }
      return this.isShowProduct;
    }
  },
  methods: {
    newData(url, mode, shop) {
      //最新数据;
      this.$axios
        .post(url, "fCateId=" + mode + "&pageSize=64" + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(response => {
          var data = response.data.data;
          this.lists = data;
          this.upDateList(this.lists);
        })
        .catch(function(err) {
          this.lists = [];
          this.upDateList(this.lists);
        });
    },
    upDateList(list) {
      //更新当前组件的lists;
      let that = zmEditor.$store.state.component.selectList[0];
      that.lists = list; //给组件数据赋值
      that.lists = Object.assign([], that.lists); //更新组件的数据
    }
  }
};
</script>

