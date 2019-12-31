<template>
  <div class="zm-product-err">
    <i></i>
    <p>您目前没有选择{{setName}}！！</p>
    <!-- <p style="position:absolute;bottom:100px;">请选择添加{{setName}}！</p>
          <p class="iconfont icon-pointer" style="position:absolute;bottom:59px;;margin-bottom:0px;"></p> -->
    <p></p>
    <p></p>
  </div>
</template>
<script>
export default {
  name: "no-news-product",
  computed: {
    setName() {
      let label;
      zmEditor.$store.state.component.selectList[0].settingData.labelName.indexOf("管理产品") > -1
        ? (label = "产品")
        : (label = "服务");
      return label;
    }
  },
  created(){
    let list = [];
    let that = zmEditor.$store.state.component.selectList[0];
        that.lists.splice(0,that.lists.length)
    if (zmEditor.$store.state.editMold.value == "computer") {
        that.setListData ? that.setListData(): "";
      }
    zmEditor.$store.state.component.selectList[0].lists = Object.assign([],list);
  }
};
</script>

