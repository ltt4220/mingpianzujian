<template>
  <div class="zm-productS-content">
    <div class="zm-product-pageBox">
      <EasyScrollbar :barOption="myBarOption">
        <ul class="zm-dialog-pageList1">
          <li
            v-for="(ite,i) in setList"
            :key="i"
            v-dragging="{ item: ite, list: setList, group: 'ite' }"
            class="zm-dialog-pageList-one sliderDragLi clearFloat"
            :data-fid="ite.id"
            :data-show="0"
            :data-title="ite.fInitName"
            v-bind:class="{'bgW':i==bgW,'onlay':i===isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}"
            @click.self.prevent="addClick(ite,i)"
            @mouseenter="addMouseEnter(i)"
            @mouseleave="addMouseLeave(i)"
          >
            <i class="zm-index">{{i+1}}</i>
            <span
              class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber"
              :style="{backgroundImage:'url('+ite.mainImage+')'}"
            ></span>
            <div class="zm-dialog-Title">
              <textarea
                readonly
                class="zm-dialog-pageList-title"
                id="myProInput"
                row="3"
                v-model="ite.name"
                v-bind:class="{ 'onFocus': i===isOnFocus,'onError' : i===isonError}"
              ></textarea>
              <i
                class="zm-boxShow"
                v-show="ite.isInputShow"
                @dblclick.stop.prevent="addAbClick(ite,i)"
              ></i>
            </div>
            <span
              class="zm-dialog-setting iconfont"
              v-bind:class="{'icon-delete':i===isOnlay}"
              @click.stop.prevent="addReMove(ite,i)"
            ></span>
          </li>
        </ul>
      </EasyScrollbar>
    </div>
  </div>
</template>
<script>
export default {
  name: "set-product-sol",
  props: ["prop"],
  data() {
    return {
      myBarOption: {
        horizrailenabled: false //是否显示水平滚动条
      },
      productType: "产品",
      hidden: false,
      isOnlayClick: "",
      isOnlay: "",
      isWrong: "",
      isOnFocus: "",
      isonError: "",
      isKey: 0,
      lists: [],
      isSelect: false,
      top: "0px",
      num: 0,
      isJiZhi: "",
      isDubeName: "",
      isNameOver: "",
      errorTitle: "※ 请填写不超过30个汉字或60个字符!",
      current: null,
      initData: "",
      ratio: [],
      isSavefTilte: false,
      objCss: {
        left: 0,
        top: 0
      },
      bgW: -1
    };
  },
  created() {
    let shop;
    let that = zmEditor.$store.state.component.selectList[0].settingData;
    let assId = JSON.stringify(that[this.type + "AssId"]);
    let fid = assId.slice(1, -1).replace(/\"/g, "");
    let url =
      zmEditor.$store.state.component.selectList[0].settingData.productUrl;
    let webType = zmEditor.$store.state.menu.webType;
    if (webType == "component" || webType == "template") {
      shop = "71";
    } else {
      shop = zmEditor.$store.state.component.selectList[0].fEntrepId;
    }
    if (fid.length != 0) {
      //存在指定数据;
      this.ValidData(url, fid, shop);
    } else {
    }
  },
  mounted() {
    this.$dragging.$on("dragend", () => {
      event.stopPropagation();
      let that = zmEditor.$store.state.component.selectList[0];
      let arr = [];
      that.lists.forEach(item => {
        arr.push(item.id);
      });
      that.settingData[this.type + "AssId"] = arr;
    });
  },
  watch: {
    setList: {
      handler(val) {
        zmEditor.$store.state.component.selectList[0].lists = Object.assign(
          [],
          val
        );
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    setList() {
      return zmEditor.$store.state.component.selectList[0].lists;
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
    },
    defaultName() {
      return zmEditor.$store.state.component.selectList[0].settingData
        .defauletTypeName.value;
    }
  },
  watch: {
    defaultName(val) {
      let that = zmEditor.$store.state.component.selectList[0].settingData;
      let assId = JSON.stringify(that[this.type + "AssId"]);
      let fid = assId.slice(1, -1).replace(/\"/g, "");
      let url =
        zmEditor.$store.state.component.selectList[0].settingData.productUrl;
      let shop;
      let webType = zmEditor.$store.state.menu.webType;
      webType == "component" || webType == "template"
        ? (shop = "71")
        : (shop = zmEditor.$store.state.component.selectList[0].fEntrepId);
      if (val == "指定产品") {
        if (fid.length != 0) {
          //存在指定数据;
          this.ValidData(url, fid, shop);
        }
      } else if (val == "指定服务") {
        if (fid.length != 0) {
          //存在指定数据;
          this.ValidData(url, fid, shop);
        }
      }
    }
  },
  methods: {
    upDateList(list) {
      //更新当前组件的lists;
      let that = zmEditor.$store.state.component.selectList[0];
      that.lists = list; //给组件数据赋值
      that.lists = Object.assign([], that.lists); //更新组件的数据
    },
    ValidData(url, ValidID, shop) {
      //指定数据过滤下架数据
      let that = zmEditor.$store.state.component.selectList[0];
      let ValidIDArr = ValidID.split(",");
      this.$axios
        .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          var data = response.data.data;
          if (zmEditor.$store.state.editMold.value == "computer") {
            if (!data) {
              that.setListData ? that.setListData() : "";
              this.lists = [];
            } else {
              this.lists = data;
              this.lists.forEach((element, index) => {
                if (
                  element.hasOwnProperty("isIconEyeOn") ||
                  element.hasOwnProperty("iconShezhi2") ||
                  element.hasOwnProperty("isIconCha") ||
                  element.hasOwnProperty("isIconDuigou1") ||
                  element.hasOwnProperty("isEyeOff") ||
                  element.hasOwnProperty("isIconEyeOff")
                ) {
                  return;
                } else {
                  element.isIconEyeOn = true;
                  element.iconShezhi2 = true;
                  element.isIconCha = false;
                  element.isIconDuigou1 = false;
                  element.isEyeOff = false;
                  element.isIconEyeOff = true;
                  element.fInitName = element.name;
                  element.isShowBlog = true;
                  element.isInputShow = true;
                }
              });
              that.setListData
                ? setTimeout(() => {
                    that.setListData();
                  }, 0)
                : "";
            }
          }

          this.lists.forEach((element, index) => {
            //
            ValidIDArr.forEach((ele, i) => {
              let oldId = ele;
              if (element.id == ele.substr(2, ele.length - 1)) {
                element.id = oldId;
                // console.log('element.id---------------',element.id)
              }
            });
            // element.id = ValidIDArr[index]
          });
          this.upDateList(this.lists);
        })
        .catch(err => {
          that.setListData();
          console.log(err);
        });
    },
    addClick(ite, i) {
      let _this = this;
      _this.isOnlayClick = i;
    },
    addMouseEnter(i) {
      let _this = this;
      _this.isOnlay = i;

      let lists = zmEditor.$store.state.component.selectList[0].lists;
      lists.forEach((element, index) => {
        if (i == index) {
          element.iconShezhi2 = true;
        } else {
          element.iconShezhi2 = false;
        }
      });

      var myInput = document.getElementById("myProInput"); //he
      if (myInput == document.activeElement) {
        //he
        console.log("获取焦点");
        this.bgW = this.num; //he
      } else {
        console.log("未获取焦点");
        this.bgW = -1; //he
      }
    },
    addMouseLeave(i) {
      let _this = this;
      _this.isOnlay = -1;

      if (this.isSelect) {
      } else {
        // _this.lists[i].iconShezhi2 = false;//he
        this.bgW = i; //he
      }

      setTimeout(() => {
        if (!_this.a) {
          _this.isSelect = false;
        }
      }, 200);
    },
    addblur(ite, i) {
      let _this = this;
      ite.isInputShow = true;
      setTimeout(() => {
        if (_this.isSavefTilte) {
          //修改fTitle成功;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          // _this.num = i;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        } else {
          //修改fTitle不成功；
          ite.name = _this.initData;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          // _this.num = i;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        }
      }, 200);
      _this.clearSelections(); //取消选中状态;
      // _this.$refs.blogSelect.addSelHidden(); //调用子级排序列表方法;
      event.stopPropagation();
      return false;
    },
    inputFocus(ite, index) {
      let _this = this;
      this.initData = ite.name;
      this.ratio = [];
      this.lists.forEach(item => {
        this.ratio.push(JSON.parse(JSON.stringify(item.name)));
      });
      this.ratio.splice(index, 1);
      let targName = event.currentTarget;
      targName.select();
      _this.addListSet(index); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.bgW = index; //he
      _this.isWrong = index;
      _this.isOnFocus = index;
    },
    addEnter(ite, index) {
      let _this = this;
      let targName = event.currentTarget;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
      targName.blur();
    },
    addInput(ite, index) {
      let title = ite.name;
      let cc = this.judgeTitle(title, index);
    },
    addAbClick(ite, index, e) {
      let event = window.event || e;
      let _this = this;
      let targName = event.currentTarget.previousElementSibling;
      targName.focus();
      ite.isInputShow = false;
      _this.isOnlayClick = -1;
      _this.bgW = index; //he
      // _this.addListSet(index); //list图标数据设置;he
      _this.isSelect = false;
      // _this.isWrong = index;//he
      // _this.isOnFocus = index;//he
    },
    addReNameAxios(ite, i) {
      let _this = this;
      let fid = ite.id;
      let fname = ite.name;
      let url;
      if (
        zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
          "product"
        ) > -1
      ) {
        this.productType = "产品";
        url = "/product/webbuilder-api/product/updateProductInfoByParam";
      } else if (
        zmEditor.$store.state.component.selectList[0].settingData.productUrl.indexOf(
          "service"
        ) > -1
      ) {
        this.productType = "服务";
        url =
          "/service/webbuilder-api/serviceNote/updateShopServiceInfoByParam";
      }
      this.$axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest"
        },
        responseType: "json",
        params: {
          id: fid,
          newName: fname,
          newAdvertisementText: "",
          label: ""
        }
      })
        .then(res => {
          console.log("数据提交成功-列表,轮播");
        })
        .catch(() => {
          console.log("数据提交失败");
        });
      zmEditor.$store.state.component.selectList[0].settingData.productName =
        ite.name;
    },
    addChangeName(ite, index) {
      let _this = this;
      let isShow = this.judgeTitle(ite.name, index);
      if (isShow) {
        _this.initData = ite.name;
        _this.addReNameAxios(ite, index); //重命名tilte;
      } else {
        ite.name = this.initData;
        _this.isNameOver = false;
        _this.isJiZhi = false;
        _this.isDubeName = false;
        _this.isonError = -1;
      }
    },
    judgeTitle(name, index) {
      let _this = this;
      let namelen = _this.fileGetLength(name); //字符长度计算;
      var tempKey = this.ratio.some(item => {
        return name == item;
      });
      if (tempKey) {
        _this.isDubeName = index;
        _this.isJiZhi = index;
        _this.isonError = index;
        _this.isOnFocus = -1;
        _this.errorTitle = "※禁止重名！";
        return false;
      } else {
        if (namelen > 60) {
          _this.isNameOver = index;
          _this.isJiZhi = index;
          _this.isonError = index;
          _this.isOnFocus = -1;
          return false;
        } else {
          _this.isNameOver = false;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isonError = -1;
          _this.isOnFocus = index;
          return true;
        }
      }
    },
    fileGetLength(v) {
      let len = 0;
      for (let i = 0; i < v.length; i++) {
        let a = v.charAt(i);
        len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
      }
      return len;
    },
    clearSelections() {
      if (window.getSelection) {
        // 获取选中
        var selection = window.getSelection();
        // 清除选中
        selection.removeAllRanges();
      } else if (document.selection && document.selection.empty) {
        // 兼容 IE8 以下，但 IE9+ 以上同样可用
        document.selection.empty();
        // 或使用 clear() 方法
        // document.selection.clear();
      }
    },
    addDuiGou(ite, index) {
      let _this = this;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
    },
    getScrollBarSize(fresh) {
      let cached;
      if (fresh || cached === undefined) {
        const inner = document.createElement("div");
        inner.style.width = "100%";
        inner.style.height = "200px";

        const outer = document.createElement("div");
        const outerStyle = outer.style;

        outerStyle.position = "absolute";
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = "none";
        outerStyle.visibility = "hidden";
        outerStyle.width = "200px";
        outerStyle.height = "150px";
        outerStyle.overflow = "hidden";

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = "scroll";
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
          widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
      }
      return cached;
    },
    addSetting(ite, index, e) {
      let event = window.event || e;
      // let DOMRect = $(event.currentTarget)[0].getBoundingClientRect();
      // this.objCss.left = DOMRect.left + 55 + "px";
      // this.objCss.top = DOMRect.top + "px";
      let DOMRect = $(event.currentTarget)[0].getBoundingClientRect(); //当前元素元素的左，上，右和下分别相对浏览器视窗的位置;
      let maxWidth = DOMRect.left - 130;
      let cWidth =
        document.body.clientWidth || document.documentElement.clientWidth; //页面可视区域宽度;
      let scrollbarWidth = this.getScrollBarSize(); //滚动条宽度;

      let currLeft = cWidth - 176 - 55 - scrollbarWidth;
      if (DOMRect.left > currLeft) {
        this.objCss.left = maxWidth - 13 + "px";
        this.objCss.top = DOMRect.top + 63 + "px";
      } else {
        this.objCss.left = DOMRect.left + 43 + "px";
        this.objCss.top = DOMRect.top + 13 + "px";
      }

      let _this = this;
      _this.num = index;
      // _this.top = index * 41 + "px"; //he
      _this.isOnlayClick = index;
      for (let i = 0; i < _this.lists.length; i++) {
        if (i == index) {
          if (_this.isSelect) {
            _this.isSelect = !_this.isSelect;
          } else {
            _this.isSelect = !_this.isSelect;
            // _this.isSelect = true;
          }
        }
      }
    },
    addIconCha(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isWrong = -1;
      _this.isOnFocus = -1;
      _this.isOnlayClick = -1;
      _this.addListinit(index); //list图标数据类初始化;
      _this.clearSelections(); //取消选中状态;
    },
    addIconEyeOff(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isOnlayClick = -1;
      // zmEditor.$store.state.component.selectList[0].lists[
      //   index
      // ].isShowBlog = true;
      _this.addEyeInit(index);
    },
    addHidShow(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      // zmEditor.$store.state.component.selectList[0].lists[
      //   index
      // ].isShowBlog = false;
      _this.addEyeInit(index);
    },
    addReMove(ite, i) {
      this.num = i; //he
      let _this = zmEditor.$store.state.component.selectList[0];
      // if (this.type == "product") {
      //   _this.settingData.productLabelId.splice(this.num, 1)
      // } else {
      //   _this.settingData.serverLabelId.splice(this.num, 1)
      // }

      let nowId = _this.lists[this.num].id;
      let indexL;
      if (this.type == "product") {
        _this.settingData.productLabelId.forEach((element, i) => {
          if (nowId == element.id) {
            indexL = i;
          }
        });
        _this.settingData.productLabelId.splice(indexL, 1);
      } else {
        _this.settingData.serverLabelId.forEach((element, i) => {
          if (nowId == element.id) {
            indexL = i;
          }
        });
        _this.settingData.serverLabelId.splice(indexL, 1);
      }

      _this.lists.splice(this.num, 1); //移除list 数据;
      _this.settingData[this.type + "AssId"].splice(this.num, 1);

      this.isSelect = false; //小弹出框隐藏;
      if (zmEditor.$store.state.editMold.value == "computer") {
        _this.setListData ? _this.setListData() : "";
      }
      this.$store.commit("editStepNum");
    },
    addReName(e) {
      // this.num = this.myNum//he
      let event = window.event || e;
      let _this = this;
      let parClass =
        event.currentTarget.parentElement.previousElementSibling.children[0]
          .firstChild.firstChild.children[_this.num];
      let targName = parClass.children[2].firstChild;
      targName.focus();
      targName.select();
      _this.addListSet(_this.num); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.isWrong = _this.num;
      _this.isOnFocus = _this.num;
    },
    pageSetEnter() {
      this.a = true;
    },
    pageSetLeave() {
      this.a = false;
      this.isSelect = false;

      // this.lists[this.num].iconShezhi2 = false;//he
      this.bgW = this.num; //he
    },
    addEyeInit(index) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[index].iconShezhi2 = true;
        _this.lists[index].isIconCha = false;
        _this.lists[index].isIconDuigou1 = false;
        _this.lists[index].isIconEyeOff = true;
        if (i == index) {
          _this.lists[i].isIconEyeOn = !_this.lists[i].isIconEyeOn;
          _this.isKey = index;
          _this.lists[i].isEyeOff = !_this.lists[i].isEyeOff;
        }
      }
      _this.lists = Object.assign([], _this.lists);
    },
    addListinit(num) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[num].isIconEyeOn = true;
        _this.lists[num].iconShezhi2 = true;
        _this.lists[num].isIconCha = false;
        _this.lists[num].isIconDuigou1 = false;
        _this.lists[num].isEyeOff = false;
        _this.lists[num].isIconEyeOff = true;
        _this.lists[num].isInputShow = true;
      }
      _this.lists = Object.assign([], _this.lists);
    },
    addListSet(num) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[num].isIconEyeOn = false;
        _this.lists[num].iconShezhi2 = false;
        _this.lists[num].isIconCha = true;
        _this.lists[num].isIconDuigou1 = true;
        _this.lists[num].isEyeOff = false;
        _this.lists[num].isIconEyeOff = false;
        _this.lists[num].isInputShow = false;
      }
      _this.lists = Object.assign([], _this.lists);
    }
  },
  destroyed() {
    this.$dragging.$off("dragend")
  },
};
</script>

