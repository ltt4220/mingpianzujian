<template>
  <div class="zm-dialog-check">
    <a :href="pathName " target="_blank" v-if="prop=='产品'">
      <button class="zm-dialog-check-button">添加{{title}}</button>
    </a>
    <a :href="pathName" target="_blank" v-else>
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
    pathName() {
      this.title == "产品"
        ? (this.path =
            zmEditor.$store.state.menu.siteHost.www +
            "/product_web/product/getProductCategory")
        : (this.path =
            zmEditor.$store.state.menu.siteHost.www +
            "/service_web/zmService/toAddSysServiceCategory");
      return this.path;
    }
  }
};
</script>

