<template>
  <div
    class="zm-dialog-sortord"
    @mouseleave="addSelHidden"
  >
    <span class="zm-dialog-Icon-title">商品选择</span>
    <div
      class="zm-dialog-Icon"
      @click="addSelClass()"
      v-bind:class="{'zmicon_hover':isHover}"
    >
      <span class="number">{{defauletTypeName}}</span>
      <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
    </div>
    <ul
      class="zm-dialog-random"
      v-show="isShow"
      @mouseleave="addSelHidden"
    >
      <li @click="assignProduct($event)">指定产品</li>
      <li
        @click="productCategory"
        v-show="isCheckBox"
      >产品类目</li>
      <li
        @click="issueProduct($event)"
        v-show="isCheckBox"
      >最新发布的产品</li>
      <li @click="assignServe($event)">指定服务</li>
      <li
        @click="serveCategory($event)"
        v-show="isCheckBox"
      >服务类目</li>
      <li
        @click="issueServe($event)"
        v-show="isCheckBox"
      >最新发布的服务</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "set-product-select",
  data() {
    return {
      isShow: false,
      isHover: false,
      RandomSN: "",
      lists: [],
      isCheckBox: true
    };
  },
  created() {
    let webType = zmEditor.$store.state.menu.webType;
    if (webType == "component" || webType == "template") {
      this.isCheckBox = false;
    } else {
      this.isCheckBox = true;
    }
  },
  methods: {
    addSelClass() {
      this.isShow = !this.isShow;
      this.isHover = !this.isHover;
    },
    addSelHidden() {
      this.isShow = false;
      this.isHover = false;
    },
    addSelClick(e) {
      let current = e.currentTarget;
      this.isShow = !this.isShow;
      this.isHover = !this.isHover;
      this.RandomSN = current.innerText;
      zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.value = this.RandomSN; //商品默认类型;
      this.$store.commit("editStepNum");
    },
    assignProduct(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      that.settingData.labelName = "管理产品";
      that.settingData.isNoProduct = false;
      that.settingData.productUrl = "/product-api/getProductListByIds";
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
    },
    productCategory(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      that.settingData.labelName = "管理产品";
      that.settingData.productListUrl =
        "/product-api/productCategory/getProductCategoryList";
      that.settingData.productUrl =
        "/product-api/getCheapestProductByCategorys";
      // this.productAxiosPost(shop);
      that.settingData.isNoProduct = false;
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
    },
    issueProduct(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      that.settingData.labelName = "管理产品";
      that.settingData.isNoProduct = false;
      that.settingData.productUrl = "/product-api/getCheapestProductList";
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
      this.productAxios(shop);
    },
    assignServe(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      that.settingData.labelName = "管理服务";
      that.settingData.isNoProduct = false;
      that.settingData.productUrl =
        "/service/webbuilder-api/serviceNote/getServiceByIdsForSite";
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
    },
    serveCategory(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      that.settingData.labelName = "管理服务";
      that.settingData.productListUrl =
        "/service/webbuilder-api/shopserviceCategory/getServiceCategoryList";
      that.settingData.productUrl =
        "/service/webbuilder-api/serviceNote/getServiceByCatesAndSortForSite";
      // this.productAxiosPost(shop);
      that.settingData.isNoProduct = false;
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
    },
    issueServe(e) {
      let that = zmEditor.$store.state.component.selectList[0];
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      that.settingData.labelName = "管理服务";
      that.settingData.isNoProduct = false;
      that.settingData.productUrl =
        "/service/webbuilder-api/serviceNote/getNewServiceList";
      that.settingData.isBufferPoll = false;
      this.addSelClick(e);
      this.productAxios(shop);
    },
    productAxios(shop) {
      let url =
        zmEditor.$store.state.component.selectList[0].settingData.productUrl;
      this.$axios
        .post(url, "fCateId=-" + 3 + "&pageSize=64" + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          let result = response.data.data;
          this.lists = result;
        })
        .catch(error => {
          this.lists = [];
          console.log(error);
        });
    }
  },
  computed: {
    defauletTypeName() {
      this.RandomSN =
        zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.value;
      return this.RandomSN;
    },
    selectList() {
      return this.lists;
    }
  },
  watch: {
    selectList(val) {
      let that = zmEditor.$store.state.component.selectList[0];
      that.lists.splice(0, that.lists.length);
      val.forEach(element => {
        that.lists.push(element); //设置最新服务数据;
      });
    }
  }
};
</script>
