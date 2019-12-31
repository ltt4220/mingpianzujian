<template>
  <div class="zm-blog-content">
    <setBlogSelect ref="blogSelect"></setBlogSelect>
    <newList v-if="selectName=='最新发布的博客'"></newList>
    <noAssignList v-else-if="(selectName == '指定博客' && checkId.length == 0)"></noAssignList>
    <assignList v-else></assignList>
    <setBlogCheck @checkList="checkListA($event)" :prop="compositeData" :isBack="isBack"></setBlogCheck>
  </div>
</template>
<style scoped lang="less" src="./blog.less">
</style>
<script>
import setBlogSelect from "./setBlogSelect.vue";
import setBlogCheck from "./setBlogCheck.vue";
import newList from "./newList.vue";
import assignList from "./assignList.vue";
import noAssignList from "./noAssignList.vue";
import drag from "./drag.vue";
import publice from "./public.js";
export default {
  name: "set-blog",
  components: {
    setBlogSelect,
    setBlogCheck,
    assignList,
    noAssignList,
    newList
  },
  data() {
    return {
      public: publice //7-1接口数据;
    };
  },
  created() {
    let that = zmEditor.$store.state.component.selectList[0];
    let url = "/blog_api/shopBlogApi/queryByBlogIds"; //指定id查询信息;
    let newUrl = "/blog_api/shopBlogApi/queryByPage"; //最新blog数据;
    let typeName = this.selectName;
    let shop;
    let webType = zmEditor.$store.state.menu.webType;
    webType == "component" || webType == "template"
      ? (shop = "-888888")
      : (shop = zmEditor.$store.state.menu.siteData.fShopId);
    if (typeName == "最新发布的博客") {
      this.newAxios(newUrl, shop);
    } else {
      if (this.checkId.length != 0) {
        let arr = [];
        this.checkId.forEach(ite => {
          arr.push(ite.id);
        });
        let ads = JSON.stringify(arr);
        let fid = ads.slice(1, -1).replace(/\"/g, "");
        this.assignAxios(url, fid, shop);
      }
    }
    this.$store.commit('editStepNum');
  },
  computed: {
    isBack(){//控制选择博客样式;
      return zmEditor.$store.state.component.selectList[0].settingData.isBack;
    },
    compositeData() {
      return {
        lists: zmEditor.$store.state.component.selectList[0].lists,
        public: this.public
      };
    },
    selectName() {
      return zmEditor.$store.state.component.selectList[0].settingData
        .defauletTypeName.value;
    },
    checkId() {
      return zmEditor.$store.state.component.selectList[0].settingData.listsID;
    }
  },
  watch: {
    selectName(val) {
      if (val == "指定博客") {
        zmEditor.$store.state.component.selectList[0].settingData.isBack = false;
        this.isBack = false;
      } else {
        zmEditor.$store.state.component.selectList[0].settingData.isBack = true;
        this.isBack = true;
      }
    }
  },
  methods: {
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
                that.setListData ? that.setListData(): "";
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
    sortListA(sortRandom) {
      //排序过后数据更新;
      let _this = this;
      _this.lists = sortRandom;
      zmEditor.$store.state.component.selectList[0].lists = sortRandom;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    checkListA(currentData) {
      //选择过后数据更新;
      let _this = this;
      _this.lists = currentData;
      _this.lists.forEach(item => {
        item.iconShezhi2 = true; //设置图标默认显示;
        item.isIconCha = false; //对勾图标默认不显示
        item.isIconDuigou1 = false; //叉图标默认不显示
        item.finitName = item.fTitle; //解决报错后title恢复初始值;
        item.isInputShow = true; //input元素遮罩;
      });
      zmEditor.$store.state.component.selectList[0].lists = _this.lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
      let newVal = zmEditor.$store.state.editMold.value;
      let _self = zmEditor.$store.state.component.selectList[0];
      if (newVal == "computer") {
          _self.setListData ? _self.setListData() : "";
        }
    }
  }
};
</script>

