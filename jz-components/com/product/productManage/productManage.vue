<template>
  <div class="zm-product-content">
    <setProductType></setProductType>
    <setPorductTypePanel v-if="defauletName=='产品类目' || defauletName=='服务类目'"></setPorductTypePanel>
    <setProductNewsPanel v-else-if="defauletName=='最新发布的服务' || defauletName =='最新发布的产品'"></setProductNewsPanel>
    <setProductAssign v-else-if="defauletName=='指定服务' || defauletName =='指定产品'"></setProductAssign>
    <setProductBufferPool v-if="setBufferPoll"></setProductBufferPool>
  </div>
</template>
<style scoped lang="less" src="./productManage.less">
</style>
<script>
import setProductType from "./setProductType";
import setPorductTypePanel from "./productType/setProductTypePanel";
import setProductNewsPanel from "./productNews/productNewsPanel";
import setProductAssign from "./productAssign/assignProductPanel";
import setProductBufferPool from "./productAssign/productBufferPool";
export default {
  name: "product-manage",
  components: {
    setProductType,
    setPorductTypePanel,
    setProductNewsPanel,
    setProductAssign,
    setProductBufferPool
  },
  data() {
    return {
      isSilder: "",
      isPanel: true //切换面板;
    };
  },
  computed: {
    defauletName() {
      return zmEditor.$store.state.component.selectList[0].settingData
        .defauletTypeName.value;
    },
    setBufferPoll() {
      return zmEditor.$store.state.component.selectList[0].settingData
        .isBufferPoll;
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

