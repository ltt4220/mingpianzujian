<template>
    <div class="zm-product-err">
        <i></i>
        <p>未检测到您发布过{{setName}}！！</p>
        <p></p>
        <p></p>
        <!-- <p style="position:absolute;bottom:100px;">请选择添加{{setName}}！</p>
          <p class="iconfont icon-pointer" style="position:absolute;bottom:59px;margin-bottom:0px;"></p> -->
    </div>
</template>
<script>
export default {
  name: "no-news-product",
  props: ["prop"],
  computed: {
    setName() {
      return this.prop;
    }
  },
  created() {
    let that = zmEditor.$store.state.component.selectList[0];
    if (zmEditor.$store.state.editMold.value == "computer") {
      that.setListData ? that.setListData() : "";
    }
  }
};
</script>

