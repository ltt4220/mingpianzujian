<template>
  <div class="zm-dialog-check">
    <a @click.stop="pathName(event)" v-if="prop=='产品'">
      <button class="zm-dialog-check-button">添加{{title}}</button>
    </a>
    <a @click.stop="pathName(event)" v-else>
      <button class="zm-dialog-check-button">添加{{title}}</button>
    </a>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  props: ["prop"],
  data() {
    return {
      title: this.prop,
      path: ""
    };
  },
  computed: {
    typeName() {
      let type;
      this.title == "产品" ? (type = "Product") : (type = "Service");
      return type;
    }
  },
  methods: {
    pathName() {
      let webType = zmEditor.$store.state.menu.webType;
      let shop;
      webType == "website"
        ? (shop = zmEditor.$store.state.menu.siteData.fEntrepId)
        : (shop = "71");
      this.title == "产品"
        ? (this.path =
            zmEditor.$store.state.menu.siteHost.www +
            "/product_web/product/getProductCategory?fEntrepId=" +
            shop)
        : (this.path =
            zmEditor.$store.state.menu.siteHost.www +
            "/service_web/zmService/toAddSysServiceCategory?fEntrepId=" +
            shop);
      let falg = this.$store.state.permission["add" + this.typeName];
      console.log(falg,"----",this.$store.state.permission,this.typeName,)
      if (falg) {
        window.open(this.path);
      } else {
        zmEditor.$store.commit("openInfoDialog", {
          content: "您暂无此权限！"
        });
      }
    }
  }
};
</script>

