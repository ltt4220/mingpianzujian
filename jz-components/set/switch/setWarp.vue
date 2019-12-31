<template>
    <div class="zm-edit-warpBox">
        <!-- <div :is="switchSelect" :prop="prop.onOffBut.props"></div> -->
        <div v-for="(ite,i) in switchSelect" :is="ite.com" :key="i" :prop="ite.prop"></div>
        <div v-for="(item,index) in dataList" :is="item.com" :key="index" :prop="item.prop" v-show='isShow'>
        </div>
    </div>
</template>
<script>
export default {
  name: "setWarp",
  props: ["prop"],
  data() {
    return {
      dataList: [],
      switchSelect: []
      //   switchSelect: null
    };
  },
  computed: {
    isShow() {
      return zmEditor.$store.state.component.selectList[0].settingData[
        this.prop.onOffBut[0].props.attr
      ].value;
    }
  },
  created() {
    let _this = this;
    this.prop.sonType.forEach(element => {
      const component = () => import("../../../components" + element.type);
      this.dataList.push({ com: component, prop: element.props });
    });
    this.prop.onOffBut.forEach(ele => {
      const comp = () => import("../../../components" + ele.type);
      this.switchSelect.push({ com: comp, prop: ele.props });
    });
    // this.switchSelect = () =>
    //   import("../../../components" + _this.prop.onOffBut.type);
  }
};
</script>

