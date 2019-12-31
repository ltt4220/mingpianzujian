<template>
  <div>
    <productSelect></productSelect>
    <EasyScrollbar :barOption="myBarOption">
      <div
        class="zm-dialog-pageBox"
        :style="{height:isheight}"
      >
        <ul class="zm-dialog-pageList">
          <productList
            v-for="(item,i) in setList"
            :key="i"
            :prop="item"
            tarIndex=1
            :index="i"
            :changList="addChangList"
          ></productList>
        </ul>
        <div
          class="zm-product-err"
          v-if="setErr"
          style="border-top:1px solid #f2f2f2"
        >
          <i></i>
          <p>实在抱歉！！<br />当前选择的分类中没有{{setName}}文件！</p>
          <p></p>
          <p></p>
          <!-- <p>请添加{{setName}}！</p>
          <p class="iconfont icon-pointer"></p> -->
        </div>
      </div>
    </EasyScrollbar>
    <productAdd
      v-if="setErr"
      :prop="setName"
    ></productAdd>
    <productCheck v-else></productCheck>
  </div>
</template>
<script>
import productList from "./setProductList";
import productSelect from "./setProductSelect";
import productCheck from "./setProductCheck";
import productAdd from "./setAddProduct";
export default {
  name: "set-product-type-panel",
  props: ["prop"],
  components: {
    productList,
    productSelect,
    productCheck,
    productAdd
  },
  data() {
    return {
      isStop: true,
      isheight: "538px",
      current: [],
      lists: [],
      addName: "",
      myBarOption: {
        horizrailenabled: false
      }
    };
  },
  created() {
    let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
    this.productAxiosPost(shop);
    this.$store.commit("editStepNum");
  },
  methods: {
    isNoProduct(data) {
      //显示添加产品或服务文字提示;
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
    curData(_data) {
      let whetherSelect, type;
      let _that = zmEditor.$store.state.component.selectList[0];

      _that.settingData[this.type + "CheckId"].forEach(item => {
        _that[this.type + "Check"].add(item);
      });
      whetherSelect = _that[this.type + "Check"];
      _data.forEach(item => {
        if (whetherSelect.has(item.fId)) {
          item.isSelect = true;
        } else {
          item.isSelect = false;
        }
        if (item.list != null && item.list.length != 0) {
          this.curData(item.list);
        } else {
          item.numCount = "(" + item.fServiceCount + ")";
        }
      });
    },
    productAxiosPost(shop) {
      let url =
        zmEditor.$store.state.component.selectList[0].settingData
          .productListUrl;
      this.$axios
        .post(url, "fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          let result = response.data.data;
          this.curData(result);
          this.lists.splice(0, this.lists.length);
          result.forEach(item => {
            this.lists.push(item);
          });
          let _this = zmEditor.$store.state.component.selectList[0];
          _this.settingData[this.type + "TypeData"] = result; //设置类目数据;
          let fid = _this.settingData[this.type + "TypeId"];

          _this.settingData[this.type + "TypeId"].forEach(item => {
            _this[this.type + "Set"].add(item);
          });
          
          this.isNoProduct(result);
          this.getProductData(fid, shop); //加载勾选类目id的数据;
        })
        .catch(error => {
          console.log(error);
          zmEditor.$store.state.component.selectList[0].settingData[
            this.type + "TypeData"
          ] = []; //设置类目数据;
        });
    },
    getProductData(fid, shop) {
      let _that = zmEditor.$store.state.component.selectList[0];
      let url = _that.settingData.productUrl;
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
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          var data = response.data.data;
          let that = zmEditor.$store.state.component.selectList[0];
          that.lists = data;
          that.lists = Object.assign([], that.lists);
          if (zmEditor.$store.state.editMold.value == "computer") {
            that.setListData ? that.setListData() : "";
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
    setList() {
      return this.lists;
    },
    setErr() {
      //添加产品显示页面状态及显示当前选择的分类中没有产品文件;
      return zmEditor.$store.state.component.selectList[0].settingData
        .isNoProduct;
    },
    setName() {
      zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
        "service"
      ) > -1
        ? (this.addName = "服务")
        : (this.addName = "产品");
      return this.addName;
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
  },
  watch: {
    setName(val) {
      let shop = zmEditor.$store.state.menu.siteData.fEntrepId;
      this.productAxiosPost(shop);
    }
  }
};
</script>

