<template>
  <div class="zm-dialog-sortord zm-dialog-productType" @mouseleave="addSelHidden">
    <span class="zm-dialog-Icon-title">排序方式</span>
    <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmicon_hover':isHover}">
      <span class="number">{{defauletSortName}}</span>
      <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
    </div>
    <ul class="zm-dialog-random" v-show="isShow" @mouseleave="addSelHidden">
      <li data-type="random" @click="getProductData">随机展示</li>
      <li data-type="time" @click="getProductData">按发布时间排序</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "set-product-select",
  props: ["prop"],
  data() {
    return {
      isShow: false,
      isHover: false,
      RandomSN: "按发布时间排序"
    };
  },
  methods: {
    addSelClass() {
      let _this = this;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
    },
    addSelHidden() {
      let _this = this;
      _this.isShow = false;
      _this.isHover = false;
    },
    addSelClick(e) {
      let event = window.event || e;
      let _this = this;
      let current = event.currentTarget;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
      _this.RandomSN = current.innerText;
      let typeName =
        zmEditor.$store.state.component.selectList[0].settingData
          .defauletTypeName.value;
      if (typeName == "产品类目") {
          zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.productSortName= _this.RandomSN;
      } else if (typeName == "服务类目") {
          zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.serverSortName = _this.RandomSN;
      }
    },
    getProductData() {
      this.addSelClick();
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;      
      let set = zmEditor.$store.state.component.selectList[0].settingData;
      let fid = set[this.type + "TypeId"];
      let url = zmEditor.$store.state.component.selectList[0].settingData.productUrl;
      let _that =
        zmEditor.$store.state.component.selectList[0].settingData
          .defauletTypeName[this.type + "SortName"];
      let sort;
      _that == "按发布时间排序" ? (sort = "2") : (sort = "1");
      if (fid.length == 0) {
        zmEditor.$store.state.component.selectList[0].lists = [];
        zmEditor.$store.state.component.selectList[0].lists = Object.assign(
          [],
          zmEditor.$store.state.component.selectList[0].lists
        );
          return;
      }
      this.$axios
        .post(url, "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(response => {
          var data = response.data.data;
            zmEditor.$store.state.component.selectList[0].lists = data;
            zmEditor.$store.state.component.selectList[0].lists = Object.assign(
              [],
              zmEditor.$store.state.component.selectList[0].lists
            );
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    addSortRandom() {
      let _this = this;
      let lists = zmEditor.$store.state.component.selectList[0].lists;
      _this.addSelClick();
      for (var i = 0, len = lists.length; i < len; i++) {
        var rand = parseInt(Math.random() * len);
        var temp = lists[rand];
        lists[rand] = lists[i];
        lists[i] = temp;
      }
      zmEditor.$store.state.component.selectList[0].lists = lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    addSortDesc() {
      let _this = this;
      let lists = zmEditor.$store.state.component.selectList[0].lists;
      _this.addSelClick();
      lists.sort(_this.sortBy("time", false));
      zmEditor.$store.state.component.selectList[0].lists = lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    sortBy(attr, rev) {
      //attr 排序的属性 如number属性
      //rev true表示升序排列，false降序排序
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    }
  },
  computed: {
    defauletSortName() {
      let typeName =
        zmEditor.$store.state.component.selectList[0].settingData
          .defauletTypeName.value;
      if (typeName == "产品类目") {
        this.RandomSN =
          zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.productSortName;
      } else if (typeName == "服务类目") {
        this.RandomSN =
          zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.serverSortName;
      }
      return this.RandomSN;
    },
    type() {
      if (zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf("product") > -1) {
        return "product";
      } else {
        return "server";
      }
    }
  }
};
</script>
