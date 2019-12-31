<template>
  <div
    class="zm-dialog-sortord"
    @mouseleave="addSelHidden"
  >
    <span class="zm-dialog-Icon-title">博客选择</span>
    <div
      class="zm-dialog-Icon"
      @click="addSelClass()"
      v-bind:class="{'zmicon_hover':isHover}"
    >
      <span class="number">{{defauletTypeName}}</span>
      <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
    </div>
    <ul
      class="zm-dialog-random"
      v-show="isShow"
      @mouseleave="addSelHidden"
    >
      <li
        data-type="random"
        @click="newList"
        v-show="isCheckBox"
      >
        <span class="random">最新发布的博客</span>
      </li>
      <li
        data-type="time"
        @click="assignList"
        v-show="isCheckBox"
      >
        <span class="time">指定博客</span>
      </li>
      <!-- <li data-type="number" @click="addSortAsc()">
        <span class="number">按编号排序</span>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: "set-blog-select",
  props: ["prop"],
  data() {
    return {
      isShow: false,
      isHover: false,
      RandomSN: "",
      isCheckBox: true
    };
  },
  created() {
    let webType = zmEditor.$store.state.menu.webType;
    if (webType == "component" || webType == "template") {
      this.isCheckBox = false;
    } else {
      this.isCheckBox = true;
    }
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
    addSelClick() {
      let _this = this;
      let current = event.currentTarget;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
      _this.RandomSN = current.innerText;
      zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.value =
        _this.RandomSN; //默认排序类型;
    },
    newList() {
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "-888888")
        : (shop = zmEditor.$store.state.menu.siteData.fShopId);
      let url = "/blog_api/shopBlogApi/queryByPage"; //最新blog数据;
      this.addSelClick();
      this.newAxios(url, shop);
    },
    assignList() {
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "-888888")
        : (shop = zmEditor.$store.state.menu.siteData.fShopId);
      let url = "/blog_api/shopBlogApi/queryByBlogIds"; //指定id查询信息;
      this.addSelClick();
      if (this.checkId.length != 0) {
        let arr = [];
        this.checkId.forEach(item => {
          arr.push(item.id);
        });
        let ads = JSON.stringify(arr);
        let fid = ads.slice(1, -1).replace(/\"/g, "");
        this.assignAxios(url, fid, shop);
      }
    },
    newAxios(url, shop) {
      this.$axios
        .get(
          url,
          { params: { fShopId: shop } },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          let data = response.data.data;
          let that = zmEditor.$store.state.component.selectList[0];
          that.lists = data;
          that.lists = Object.assign([], that.lists);
          if (zmEditor.$store.state.editMold.value == "computer") {
            that.setListData ? that.setListData() : "";
          }
        })
        .catch(response => {
          // 这里是处理错误的回调
          let that = zmEditor.$store.state.component.selectList[0];
          if (zmEditor.$store.state.editMold.value == "computer") {
            that.setListData ? that.setListData() : "";
          }
          console.log(response);
        });
    },
    assignAxios(url, fid, shop) {
      this.$axios
        .get(
          url,
          { params: { ids: fid, fShopId: shop } },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          let data = response.data.data;
          let that = zmEditor.$store.state.component.selectList[0];
          if (!data || data.length == 0) {
            if (zmEditor.$store.state.editMold.value == "computer") {
              that.setListData ? that.setListData() : "";
            }
          } else {
            let listID = JSON.parse(JSON.stringify(that.settingData.listsID));
            data.forEach(ele => {
              listID.forEach(item => {
                let id1 = "1-" + ele.fId;
                let id2 = "2-" + ele.fId;
                id1 == item.id && (ele.fId = id1);
                id2 == item.id && (ele.fId = id2);
              });
            });
            that.settingData.listsID = [];
            that.lists = data;
            that.lists.forEach(item => {
              item.iconShezhi2 = true; //设置图标默认显示;
              item.isIconCha = false; //对勾图标默认不显示
              item.isIconDuigou1 = false; //叉图标默认不显示
              item.finitName = item.fTitle; //解决报错后title恢复初始值;
              item.isInputShow = true; //input元素遮罩;
              for (let index = 0; index < listID.length; index++) {
                if (item.fId == listID[index].id) {
                  that.settingData.listsID.push(listID[index]);
                  break;
                }
              }
            });
            that.lists = Object.assign([], that.lists);
            if (zmEditor.$store.state.editMold.value == "computer") {
              that.setListData ? that.setListData() : "";
            }
          }
        })
        .catch(response => {
          // 这里是处理错误的回调
          let that = zmEditor.$store.state.component.selectList[0];
          if (zmEditor.$store.state.editMold.value == "computer") {
            that.setListData ? that.setListData() : "";
          }
          console.log(response);
        });
    },
    addSortRandom() {
      let _this = this;
      _this.addSelClick();
      for (var i = 0, len = _this.prop.lists.length; i < len; i++) {
        var rand = parseInt(Math.random() * len);
        var temp = _this.prop.lists[rand];
        _this.prop.lists[rand] = _this.prop.lists[i];
        _this.prop.lists[i] = temp;
      }
      _this.$emit("sortList", _this.prop.lists);
    },
    addSortDesc() {
      let _this = this;
      _this.addSelClick();
      _this.prop.lists.sort(_this.sortBy("fCreateTime", false));
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        _this.prop.lists.sort(_this.sortBy("fCreateTime", false))
      );
    },
    addSortAsc() {
      let _this = this;
      _this.addSelClick();
      _this.prop.lists.sort(_this.sortBy("fCreateTime", true));
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        _this.prop.lists.sort(_this.sortBy("fCreateTime", true))
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
    defauletTypeName() {
      this.RandomSN =
        zmEditor.$store.state.component.selectList[0].settingData.defauletTypeName.value;
      return this.RandomSN;
    },
    checkId() {
      return zmEditor.$store.state.component.selectList[0].settingData.listsID;
    }
  }
};
</script>
