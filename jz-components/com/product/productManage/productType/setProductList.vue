<template>
  <li :data-index="tarIndex">
    <div
      class="zm-product-list"
      :style="styleObject"
      :data-id="prop.fId"
    >
      <i
        class="iconfont icon-check"
        :class="{'duigouBox':prop.isSelect}"
        @click="addSelect(prop)"
      ></i>
      <i
        class="iconfont zm-icon-toggle"
        :class="[isShow ? 'icon--jianhao' : 'icon-iconfonticon02']"
        v-if="prop.list != null && prop.list.length != 0"
        @click="addTarrger(prop)"
      ></i>
      <span>{{prop.fName}}{{prop.numCount}}</span>
    </div>
    <ul v-show="isShow">
      <productList
        v-if="prop.list.length != 0 && prop.list != null"
        v-for="(item,i) in prop.list"
        :key="i"
        :prop="item"
        :tarIndex="tarIndex-0+1"
      ></productList>
    </ul>
  </li>
</template>
<script>
import productList from "./setProductList";
export default {
  name: "product-type",
  props: {
    prop: {},
    tarIndex: {
      type: Number,
      default: 1
    },
    index: Number
  },
  data() {
    return {
      tarIndex: this.tarIndex,
      styleBottom: {
        borderTop: "1px solid #f2f2f2"
      },
      checkNum: 0,
      isShow: true
    };
  },
  beforeCreate: function() {
    this.$options.components.productList = require("./setProductList.vue").default;
  },
  methods: {
    isNoProduct() {
      //显示添加产品或服务文字提示;
      let data =
        zmEditor.$store.state.component.selectList[0].settingData[
          this.type + "TypeData"
        ];
      let falg = true,
        select = false;
      curData(data);
      function curData(data) {
        if (data != null && data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].list != null && data[i].list.length != 0) {
              curData(data[i].list);
            } else {
              if (data[i].isSelect == true && data[i].fServiceCount != 0) {
                falg = false;
              }
              if (data[i].isSelect == true) {
                select = true;
              }
            }
          }
        }
      }
      !select && (falg = false);
      falg
        ? (zmEditor.$store.state.component.selectList[0].settingData.isNoProduct = true)
        : (zmEditor.$store.state.component.selectList[0].settingData.isNoProduct = false);
    },
    addSelect(_prop) {
      let set = zmEditor.$store.state.component.selectList[0];
      let checkList = set[this.type + "Check"]; //列表样式全部选中id
      let checkSet = set[this.type + "Set"]; //数据交互子级id;
      let typeData = set.settingData[this.type + "TypeData"];
      let num = Number(this.tarIndex);
      switch (num) {
        case 1:
          this.judgeOne(_prop, checkList, checkSet, typeData);
          break;
        case 2:
          this.judgeTwo(_prop, checkList, checkSet, typeData);
          break;
        case 3:
          this.judgeThree(_prop, checkList, checkSet, typeData);
          break;
        default:
          break;
      }
      set.settingData[this.type + "TypeId"] = Array.from(checkSet);
      set.settingData[this.type + "CheckId"] = Array.from(checkList);
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      this.getProductData(set.settingData[this.type + "TypeId"], shop);
      this.isNoProduct();
      this.$store.commit("editStepNum");
    },
    judgeOne(_prop, checkList, checkSet, typeData) {
      let _this = this;
      let isTrue = !_prop.isSelect;
      _prop.isSelect = isTrue;
      if (this.$children != null && this.$children.length != 0) {
        if (isTrue) {
          checkList.add(this.prop.fId);
        } else {
          checkList.delete(this.prop.fId);
        }
        curData(this.$children);
      } else {
        // this.ditorType(this.prop);
        if (isTrue) {
          checkList.add(this.prop.fId);
          checkSet.add(this.prop.fId);
        } else {
          checkList.delete(this.prop.fId);
          checkSet.delete(this.prop.fId);
        }
      }
      function curData(_data) {
        _data.forEach(item => {
          item.prop.isSelect = isTrue;
          if (item.$children != null && item.$children.length != 0) {
            if (isTrue) {
              checkList.add(item.prop.fId);
            } else {
              checkList.delete(item.prop.fId);
            }
            curData(item.$children);
          } else {
            // _this.ditorType(item.prop);
            if (isTrue) {
              checkList.add(item.prop.fId);
              checkSet.add(item.prop.fId);
            } else {
              checkList.delete(item.prop.fId);
              checkSet.delete(item.prop.fId);
            }
          }
        });
      }
      // if (
      //   typeData[this.index].list != null &&
      //   typeData[this.index].list != undefined &&
      //   typeData[this.index].list.length != 0
      // ) {
      //   if (isTrue) {
      //     ////////////////////  一级
      //     checkList.add(_prop.fId);
      //     this.ditorType(_prop);
      //     typeData[this.index].list.forEach(item => {
      //     // typeData[this.index].list.forEach(item => {
      //       item.isSelect = isTrue;
      //       if (isTrue) {
      //         ////////////////////  二级本身
      //           console.log("***2222222222222")
      //         checkList.add(item.fId);
      //         this.ditorType(item);
      //       }
      //       if (
      //         item.list != null &&
      //         item.list != undefined &&
      //         item.list.length != 0
      //       ) {
      //         item.list.forEach(ele => {
      //           ele.isSelect = isTrue;
      //           ////////////////////  三级
      //           if (isTrue) {
      //              console.log("***333333333333")
      //             this.ditorType(ele);
      //             checkList.add(ele.fId);
      //             checkSet.add(ele.fId);
      //           }
      //         });
      //       } else {
      //         /////////////////////  二级
      //         if (isTrue) {
      //           console.log("===============2222222222222")
      //           checkSet.add(item.fId);
      //           // checkList.add(item.fId);
      //           this.ditorType(item);
      //         }
      //       }
      //     });
      //   } else {
      //     /////一级无子级;
      //     checkList.delete(_prop.fId);
      //     this.ditorType(_prop, false);
      //     /// 一级有子级
      //     typeData[this.index].list.forEach(item => {
      //       item.isSelect = isTrue;
      //       checkList.delete(item.fId);
      //       this.ditorType(item, false);
      //       if (
      //         item.list != null &&
      //         item.list != undefined &&
      //         item.list.length != 0
      //       ) {
      //         ////////////////////  二级有子级
      //         item.list.forEach(ele => {
      //           ele.isSelect = isTrue;
      //           ////////////////////  三级
      //           this.ditorType(ele, false);
      //           checkList.delete(ele.fId);
      //           checkSet.delete(ele.fId);
      //         });
      //       } else {
      //         /////////////////////  二级无子级;
      //         checkSet.delete(item.fId);
      //         // checkList.delete(item.fId);
      //         this.ditorType(item, false);
      //       }
      //     });
      //   }
      // } else {
      //   if (isTrue) {
      //     ////////////////////  一级只有自己;
      //     checkSet.add(_prop.fId);
      //     checkList.add(_prop.fId);
      //     this.ditorType(_prop);
      //   } else {
      //     checkSet.delete(_prop.fId);
      //     checkList.delete(_prop.fId);
      //     this.ditorType(_prop, false);
      //   }
      // }
    },
    judgeTwo(_prop, checkList, checkSet, typeData) {
      let isTrue = !_prop.isSelect;
      _prop.isSelect = isTrue;
      //判断子类
      if (
        this.prop.list != null &&
        this.prop.list != undefined &&
        this.prop.list.length != 0
      ) {
        if (isTrue) {
          // this.ditorType(_prop);
          checkList.add(_prop.fId);
        } else {
          // this.ditorType(_prop, false);
          checkList.delete(_prop.fId);
        }
        this.prop.list.forEach(item => {
          item.isSelect = isTrue;
          if (isTrue) {
            // this.ditorType(item);
            checkList.add(item.fId);
            checkSet.add(item.fId);
          } else {
            // this.ditorType(item, false);
            checkList.delete(item.fId);
            checkSet.delete(item.fId);
          }
        });
      } else {
        if (isTrue) {
          // this.ditorType(_prop);
          checkList.add(_prop.fId);
          checkSet.add(_prop.fId);
        } else {
          // this.ditorType(_prop, false);
          checkList.delete(_prop.fId);
          checkSet.delete(_prop.fId);
        }
      }
      //判断父类
      if (isTrue) {
        let parentIsOk = this.$parent.$children.every(item => {
          return item.prop.isSelect == true;
        });
        if (parentIsOk) {
          this.$parent.prop.isSelect = true;
          checkList.add(this.$parent.prop.fId);
        }
      } else {
        this.$parent.prop.isSelect = false;
        checkList.delete(this.$parent.prop.fId);
      }
    },
    judgeThree(_prop, checkList, checkSet, typeData) {
      let isTrue = !_prop.isSelect;
      _prop.isSelect = isTrue;
      if (isTrue) {
        // this.ditorType(_prop);
        checkList.add(_prop.fId);
        checkSet.add(_prop.fId);
        //判断二级父类
        let twoParent = this.sublingsIsTrue(this.$parent.$children, true);
        if (twoParent) {
          this.$parent.prop.isSelect = true;
          checkList.add(this.$parent.prop.fId);
        }
        //判断一级父类
        let oneParent = this.sublingsIsTrue(
          this.$parent.$parent.$children,
          true
        );
        if (oneParent) {
          this.$parent.$parent.prop.isSelect = true;
          checkList.add(this.$parent.$parent.prop.fId);
        }
      } else {
        // this.ditorType(_prop, false);
        checkList.delete(_prop.fId);
        checkSet.delete(_prop.fId);
        this.$parent.prop.isSelect = false;
        this.$parent.$parent.prop.isSelect = false;
        checkList.delete(this.$parent.prop.fId);
        checkList.delete(this.$parent.$parent.prop.fId);
      }
    },
    ditorType(data, isOk) {
      let num = false;
      if (isOk == undefined && data.fServiceCount == 0) {
        num = true;
      }
      //显示添加产品或服务文字提示;
      zmEditor.$store.state.component.selectList[0].settingData.isNoProduct = num;
    },
    sublingsIsTrue(_data, isTrue) {
      //遍历同级所有的兄弟级元素的选中状态是否为true;
      let flag = _data.every(item => {
        return item.prop.isSelect == isTrue;
      });
      return flag;
    },
    addTarrger() {
      this.isShow = !this.isShow;
    },
    getProductData(fid, shop) {
      let url =
        zmEditor.$store.state.component.selectList[0].settingData.productUrl;
      let _that = zmEditor.$store.state.component.selectList[0];
      let sort;
      _that.settingData.defauletTypeName[this.type + "SortName"] ==
      "按发布时间排序"
        ? (sort = "2")
        : (sort = "1");
      if (fid.length == 0) {
        _that.lists = [];
        _that.lists = Object.assign([], _that.lists);
        if (zmEditor.$store.state.editMold.value == "computer") {
          _that.setListData ? _that.setListData() : "";
        }
        return;
      }
      this.$axios
        .post(
          url,
          "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        // this.$axios({
        //     method: "post",
        //     url: url,
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //       "X-Requested-With": "XMLHttpRequest"
        //     },
        //     responseType: "json",
        //     params: {
        //       fCategoryIds: fid,
        //       sortType:sort
        //     }
        //   })
        .then(response => {
          var data = response.data.data;
          zmEditor.$store.state.component.selectList[0].lists = data;
          zmEditor.$store.state.component.selectList[0].lists = Object.assign(
            [],
            zmEditor.$store.state.component.selectList[0].lists
          );
          let that = zmEditor.$store.state.component.selectList[0];
          if (data.length == 0) {
            if (zmEditor.$store.state.editMold.value == "computer") {
              that.setListData ? that.setListData() : "";
            }
          } else {
            if (zmEditor.$store.state.editMold.value == "computer") {
              that.setListData ? that.setListData() : "";
            }
          }
        })
        .catch(function(err) {
          console.log(err);
          let _that = zmEditor.$store.state.component.selectList[0];
          if (zmEditor.$store.state.editMold.value == "computer") {
            _that.setListData ? _that.setListData() : "";
          }
        });
    }
  },
  computed: {
    styleObject() {
      let paddingL = `paddingLeft:20px;`;
      this.tarIndex != 1 &&
        (paddingL = `paddingLeft:${(this.tarIndex + 1) * 20}px;`);
      return paddingL;
    },
    type() {
      if (
        zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
          "product"
        ) > -1
      ) {
        return "product";
      } else {
        return "server";
      }
    }
  }
};
</script>
