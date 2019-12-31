<template>
    <div class="dialg-popup-box">
        <div class="popup-title">
            <span>提示</span>
            <i class="iconfont icon-close" @click.stop="addClick"></i>
        </div>
        <div class="popup-text">
            最多选择50条博客，请您及时移除部分博客再选择添加!
            <button @click.stop="addClick">我知道了</button>
        </div>
    </div>
</template>
<style lang="less">
.dialg-popup-box {
  width: 280px;
  height: 150px;
  background-color: #eee;
  border-radius: 10px;
  .popup-title {
    width: 100%;
    height: 32px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #3089d5;
    line-height: 32px;
    text-align: left;
    > span {
      margin-left: 10px;
      color: #fff;
      font-size: 14px;
    }
    > i {
      position: absolute;
      right: 7px;
      top: 4px;
      width: 24px;
      height: 24px;
      line-height: 25px;
      text-align: center;
      background-color: hsla(0, 0%, 100%, 0.5);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .popup-text {
    width: 100%;
    height: 118px;
    padding: 10px;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 5px #a9a9a9;
    text-align: left;
    font-size: 12px;
    color:#797979;
    > button {
      width: 80px;
      height: 26px;
      border-radius: 5px;
      background-color: #3089d5;
      line-height: 28px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      margin: 0 auto;
      margin-top: 30px;
      display: block;
    }
    > button:hover{
      cursor: pointer;
    }
  }
}
</style>
<script>
export default {
  name: "popup",
  methods: {
    addClick() {
      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneType",
        value: false
      }); //true为打开 false 为关闭
      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneMode",
        value: "/com/blog/dialog/popup.vue"
      });
    }
  }
};
</script>

