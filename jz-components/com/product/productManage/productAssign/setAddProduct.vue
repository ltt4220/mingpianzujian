<template>
  <div class="zm-dialog-check zm-dialog-NewCheck">
    <a href="javascript:;">
      <!-- <button class="zm-dialog-check-button">{{setName}}</button> -->
       <button class="zm-dialog-check-button" @click="addClick">{{setName}}</button>
    </a>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  props: ["prop"],
  computed: {
    setName() {
      return zmEditor.$store.state.component.selectList[0].settingData.labelName;
    }
  },
  methods:{
    addClick(){
     zmEditor.$store.commit('changeCustomerPaneData',{key: 'paneType',value: true}) //true为打开 false 为关闭
                zmEditor.$store.commit('changeCustomerPaneData',{key: 'paneMode',value: '/com/product/productManage/productAssign/productBufferPool.vue'})
    }
  }
};
</script>

