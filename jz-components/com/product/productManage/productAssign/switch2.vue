<template>
  <div class="labelBox">
    <div class="switchBox">
      <span>显示{{prop}}标签</span>
      <span class="switch">
        <span class="point" :style="{float:'left'}"></span>
      </span>
      <div class="bottomW"></div>
    </div>
    <div class="bottomW"></div>
  </div>
</template>
<script>
export default {
  name: "switch",
  props: ["prop"],
  data() {
    return {
      title: "显示产品标签",
      title2: "标签",
      isSwitchOn: false,
    };
  },

};
</script>
<style scoped>
  .bottomW{
      position: absolute;
      bottom: 0px;
      width: 260px;
      height: 1px;
      background-color: #d7d7d7;
    }
  .labelBox{
      width:100%;
      height: auto;
      /* background-color: #eee; */
      padding: 0px 20px;
      position: relative;
  }
  .switchBox{
      width:100%;
      height: 55px;
      line-height: 55px;
      position: relative;
      color:#797979;

  }
  .switchBox span{
    color:#797979;
    font-size:12px;
  }
  .switch{
    cursor:pointer;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: #d7d7d7;
    border-radius:10px;
    /* border-to */
    margin-left:125px;
    /* position: relative; */
  }
  .switch:hover{
    cursor:default;
  }
  .point{
    width: 18px;
    height: 18px;
    /* float: left; */
    background-color: #fff;
    border-radius: 50%;
    margin-top: 1px;
  }
  .label{
    width:100%;
    height: auto;
    /* background-color: green; */
  }
  .lN{
    height: 40px;
    width:100%;
    line-height: 40px;
    position: relative;
    color:#797979;
    font-size:12px;
  }
  .nList{
    /* height: 168px; */
    width:100%;
    background-color: #fff;
    padding-bottom: 20px;
  }
  .nList div{
    font-size: 12px;
  }
  .tag{
    display: inline-block;
    height: 12px;
    line-height: 1px;
    font-size: 12px;
    color:#797979;
    background-color: #F2F2F2;
    padding: 11px;
    text-align: center;
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 2px;
    cursor: pointer;
  }
  .tagN{
    color:#797979;
    background-color: #F2F2F2;
  }
  .tagS{
    color:#fff;
    background-color: #3089D5;
  }
</style>
