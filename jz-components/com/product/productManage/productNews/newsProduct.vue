<template>
  <div class="zm-product-newErr">
    <span class="iconfont icon-fcstubiao25"></span>
    <p class="zm-new-product">最新发布的{{setName}}置顶显示！</p>
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
    let url =
      zmEditor.$store.state.component.selectList[0].settingData.productUrl;
    let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
    this.newData(url, -3, shop);
    let that = zmEditor.$store.state.component.selectList[0];
    if (zmEditor.$store.state.editMold.value == "computer") {
      that.setListData ? that.setListData() : "";
    }
  },
  methods: {
    newData(url, mode, shop) {
      //最新数据;
      this.$axios
        .post(url, "fCateId=" + mode + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(response => {
          var data = response.data.data;
          this.upDateList(data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    upDateList(list) {
      //更新当前组件的lists;
      let that = zmEditor.$store.state.component.selectList[0];
      that.lists = list; //给组件数据赋值
      that.lists = Object.assign([], that.lists); //更新组件的数据
    }
  }
};
</script>

