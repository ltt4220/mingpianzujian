<template>
    <div class="zm-blog-noAssign">
        <i></i>
        <p>实在抱歉！<br/>您目前没有选择博客！！</p>
    </div>
</template>
<script>
export default {
  created() {
    let that = zmEditor.$store.state.component.selectList[0];
    that.lists.splice(0, that.lists.length);
    if (zmEditor.$store.state.editMold.value == "computer") {
      that.setListData ? that.setListData() : "";
    }
  }
};
</script>


