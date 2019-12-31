<template>
  <div class="zm-dialog-check">
    <button class="zm-dialog-check-button">{{setName}}</button>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  computed:{
    setName(){
      return  zmEditor.$store.state.component.selectList[0].settingData.labelName;
    }
  }
};
</script>

