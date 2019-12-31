<template>
  <div class="zm-dialog-check">
    <button v-bind:class="['zm-dialog-check-button',{'zm-dialog-checkBack':isBack}]" @click.stop="checkBlog">选择博客</button>
  </div>
</template>
<script>
export default {
  name: "set-blog-check",
  props: ["prop", "isBack"],
  computed: {
    selectName() {
      return zmEditor.$store.state.component.selectList[0].settingData
        .defauletTypeName.value;
    },
    checkId() {
      return zmEditor.$store.state.component.selectList[0].settingData.listsID;
    }
  },
  methods: {
    checkBlog() {
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "-888888")
        : (shop = zmEditor.$store.state.component.selectList[0].fShopId);
      if (this.selectName == "最新发布的博客") {
        return;
      } else {
        if (this.checkId.length >= 50) {
          zmEditor.$store.commit("changeCustomerPaneData", {
            key: "paneType",
            value: true
          }); //true为打开 false 为关闭
          zmEditor.$store.commit("changeCustomerPaneData", {
            key: "paneMode",
            value: "/com/blog/dialog/popup.vue"
          });
        } else {
          this.prop.public.choiceModules({
            nowLength: this.checkId.length,
            totalLenght: 50,
            multiple: true,
            warningText: "最多选择50条博客，请您及时移除过期博客。",
            modules: "blog",
            callBack: this.blogpict,
            fShopId: shop
          });
        } //7-1选择博客数据;
      }
      this.$store.commit('editStepNum');
    },
    blogpict(data) {
      var fathList = this.prop.lists;
      let webType = zmEditor.$store.state.menu.webType;
      data.forEach(ele => {
        webType == "component" || webType == "template"
          ? (ele.fId = "1-" + ele.fId)
          : (ele.fId = "2-" + ele.fId);
      });
      if (this.checkId.length == 0) {
        data.forEach(item => {
          zmEditor.$store.state.component.selectList[0].settingData.listsID.push(
            { id: item.fId, type: true }
          );
        });
        this.$emit("checkList", data);
      } else {
        let arr = [];
        data.forEach(item => {
          let isOk = fathList.some(ele => {
            return item.fId == ele.fId;
          });
          if (!isOk) {
            arr.push(item);
            zmEditor.$store.state.component.selectList[0].settingData.listsID.push(
              { id: item.fId, type: true }
            );
          }
        });
        arr = [...fathList, ...arr];
        this.$emit("checkList", arr);
      }
    },
    blogpictA(data) {
      var fathList = this.prop.lists;
      data.forEach(ele => {
        var date = new Date(ele.fCreateTime)
          .toLocaleString()
          .replace(/:d{1,2}$/, " ");
        ele.fCreateTime = date;
        ele.fImg.push(ele.pupUpImg);
      });
      var Data = data.concat(fathList),
        arr = this.prop.public.grouping(Data, "fId"),
        results = [],
        currentData = [];
      for (var i = 0; i < arr.length; i++) {
        results.push(arr[i][0]);
      }
      var filterResult = fathList.some(ite => {
        return ite.isTime;
      });
      if (filterResult) {
        results.forEach(item => {
          item.isShowBlog = true;
          item.isTime = true;
          item.sapnBlock = "none";
          item.imgDis = "none";
          item.videoDis = "none";
          if (item.fvideo.length > 0) {
            item.bgUrlv = item.fvideo[0][1];
            item.source = item.fvideo[0][0];
            item.sapnBlock = "block";
            item.videoDis = "block";
          }
          if (item.fImg.length > 0) {
            item.bgUrl = item.fImg[0];
            item.imgDis = "block";
          }
        });
      } else {
        results.forEach(item => {
          const paten = /style\s*=\s*["'][^"']+["']/g;
          const re = /class\s*=\s*["'][^"']+["']/g;
          item.fContentText = item.fContentText
            .replace(paten, "")
            .replace(re, "")
            .replace(/<\/?cite[^>]*>/g, "")
            .replace(/<p\s?><\/p>/g, "")
            .replace(/<p\s?><br\s*\/?><\/p>/g, "");
          item.isShowBlog = true;
          if (item.fvideo.length > 0) {
            item.bgUrl = item.fvideo[0][1];
            item.source = item.fvideo[0][0];
            item.imgDis = "none";
            item.videoDis = "block";
            item.ahref = "false";
          } else {
            let defalutImg = "./img/zumalogo.png";
            if (item.fImg.length > 0) {
              if (item.fImg[0] == defalutImg) {
                item.fImg[0] = "../../../../../static/img/zumalogo.jpg";
                item.bgUrl = item.fImg[0];
                item.imgDis = "block";
                item.videoDis = "none";
                item.ahref = "true";
              } else {
                item.bgUrl = item.fImg[0];
                item.imgDis = "block";
                item.videoDis = "none";
                item.ahref = "false";
              }
            } else {
              item.bgUrl = "../../../../../static/img/zumalogo.jpg";
              item.imgDis = "block";
              item.videoDis = "none";
              item.ahref = "true";
            }
          }
        });
      }
      this.$emit("checkList", results);
    }
  }
};
</script>

