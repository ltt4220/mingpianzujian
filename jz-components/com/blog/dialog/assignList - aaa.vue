<template>
  <div class="zm-dialog-pageBox">
    <EasyScrollbar :barOption="myBarOption">
      <ul class="zm-dialog-pageList">
        <!-- unselectable="on" onselectstart="return false;" style="user-select:none;"  -->
        <li v-for="(ite,i) in setBlogList" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-fid="ite.fId" :data-show="true" :data-time="ite.fCreateTime" v-bind:class="{'onlay':i===isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}" @click.stop.prevent="addClick(ite,i)" v-dragging="{ item: ite, list: lists, group: 'ite'}" @mouseenter="addMouseEnter(i)" @mouseleave.stop="addMouseLeave(i)" :draggable="isDraggable">
          <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
          <div class="zm-dialog-Title">
            <input class="zm-dialog-pageList-title" v-model="ite.fTitle" @keyup.enter="addEnter(ite,i)" @focus="inputFocus(ite,i)" @input.stop.prevent="addInput(ite,i)" @blur="addblur(ite,i)" v-bind:class="{ 'onFocus': i===isOnFocus,'onError' : i===isonError}" @dragstart="addDragstart($event)" @dragenter="dragenter(ite)">
            <i class="zm-boxShow" v-show="ite.isInputShow" @dblclick.stop.prevent="addAbClick(ite,i)"></i>
          </div>
          <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': ite.isIconEyeOn && !ite.isIconDuigou1}" @click.self.prevent="addHidShow(i)"></span>
          <span class="iconfont zm-eyeoff" v-bind:class="{'icon-eyeOff':!ite.isIconEyeOn && !ite.isIconDuigou1}" @click.self.prevent="addIconEyeOff(i)"></span>
          <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-cha2':ite.isIconCha}" @click.self.prevent="addIconCha(i,ite)"></span>
          <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-duigou1':ite.isIconDuigou1}" @mousedown="addDuiGou(ite,i)"></span>
          <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-solidsettingicon':ite.iconShezhi2}" @click.stop.prevent="addSetting(ite,i)"></span>
          <p class="zm-dialog-blogNameError iconfont icon-jinzhitishi" v-if="i===isJiZhi" @mouseenter.self.prevent="addJiZhiEnter" @mouseleave.self.prevent="addJiZhiLeave"></p>
          <p class="zm-dialog-blogReNameError" v-if="i===isDubeName && isDUbeShow">{{errorTitle}}</p>
          <p class="zm-dialog-blogNameErrorText" v-if="i===isNameOver && isNameShow">{{errorTitle}}</p>
        </li>
      </ul>
    </EasyScrollbar>
    <div class="zm-dialog-carousel-pageSetBox" @mouseenter="pageSetEnter()" @mouseleave="pageSetLeave()" v-if="isSelect" :style="{top:objCss.top,left:objCss.left}">
      <div @click.stop.prevent="addReName()">重命名</div>
      <div @click.stop.prevent="addReMove()">移除</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOnlayClick: "", //鼠标点击的li的样式;
      isOnlay: "", //鼠标hover的li的样式;
      isWrong: "", //编辑title 父元素li的样式;
      isOnFocus: "", //input聚焦样式;
      isonError: "", //input报错样式;
      isKey: 0, //判断当前元素li显示闭眼还是睁眼;
      lists: [], //列表数据;
      isSelect: false, //是否显示右侧提示框;
      num: 0, //当前父元素--li下标；
      isJiZhi: "", //title警告提示框;
      isDubeName: "", //title重复提示状态;
      isDUbeShow: false,
      isNameOver: "", //title超出提示状态;
      isNameShow: false,
      errorTitle: "※ 请填写不超过25个汉字或50个字符!",
      initData: "", //初始化标题;
      checkData: "", //chang标题;
      ratio: [], //list数据深拷贝-----》对比新数据和旧数据的标题是否重复;
      isSavefTilte: false, //title状态判断及更改  false>不改变  true改变;
      targName: null, //存入input元素用来-----强制聚焦;
      isDraggable: true, //li托拽状态开启或禁止（默认开启）
      objCss: {
        //右侧提示框的top/left的值;
        left: 0,
        top: 0
      },
      isFlag: null, //标题是否报错状态;
      changSettingIcon: false,
      blogSetTime: null, //控制右侧框消失时间;
      time: null, //标题报错消失时间
      myBarOption: {
        horizrailenabled: false
      }
    };
  },
  mounted() {
    this.$dragging.$on("dragend", () => {
      event.stopPropagation();
      let that = zmEditor.$store.state.component.selectList[0];
      let arr = [];
      this.lists.forEach(item => {
        arr.push({ id: item.fId, type: item.isIconEyeOn });
      });
      that.settingData.listsID = arr;
      that.lists = this.lists;
      that.lists = Object.assign([], that.lists);
    });
  },
  computed: {
    setBlogList() {
      let _this = this;
      _this.lists = zmEditor.$store.state.component.selectList[0].lists; //blog组件数据;
      return _this.lists;
    },
    checkId() {
      return zmEditor.$store.state.component.selectList[0].settingData.listsID;
    }
  },
  methods: {
    addClick(ite, i) {
      //li点击事件添加class;
      let _this = this;
      _this.isOnlayClick = i;
    },
    addMouseEnter(i) {
      //li鼠标移入事件添加class;
      this.isOnlay = i;
    },
    addMouseLeave(i) {
      //li鼠标移出事件添加class并将右侧小弹出框隐藏;
      this.isOnlay = -1;
    },
    addDragstart() {
      this.targName = event.currentTarget;
      this.targName.blur();
      event.stopPropagation(); //阻止input托拽enter;
      return false; //阻止input托拽默认事件;
    },
    dragenter(ite) {
      event.stopPropagation(); //阻止input托拽enter;
      return false; //阻止input托拽默认事件;
    },
    addblur(ite, i) {
      //标题设置;图标初始化;]
      let _this = this;
      _this.isDraggable = true; //允许父级托拽;
      ite.isInputShow = true;
      this.changSettingIcon = false;
      setTimeout(() => {
        if (_this.isSavefTilte) {
          //修改fTitle成功;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
          _this.isSavefTilte = false;
        } else {
          //修改fTitle不成功；
          // _this.initData = ite.finitName;
          ite.fTitle = _this.initData;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        }
      }, 200);
      _this.clearSelections(); //取消选中状态;
      event.stopPropagation(); //阻止input托拽开始;
      //恢复编辑的键盘事件
      this.$store.commit("addComKeyEvent");
      return false; //阻止input托拽默认事件;
    },
    inputFocus(ite, index) {
      let _this = this;
      _this.isDraggable = false; //阻止父级托拽;
      this.changSettingIcon = true;
      this.initData = ite.fTitle;
      this.ratio = [];
      this.lists.forEach(item => {
        this.ratio.push(JSON.parse(JSON.stringify(item.fTitle)));
      });
      this.ratio.splice(index, 1);
      let targName = event.currentTarget;
      this.targName = targName;
      targName.select();
      _this.addListSet(index); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.isWrong = index;
      _this.isOnFocus = index;
      //禁掉编辑器的键盘事件
      this.$store.commit("removeComKeyEvent");
      return false;
    },
    addEnter(ite, index) {
      let _this = this;
      let targName = event.currentTarget;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
    },
    addInput(ite, index) {
      let title = ite.fTitle;
      // this.checkData = title;
      this.isFlag = this.judgeTitle(title, index);
      return false;
    },
    addAbClick(ite, index) {
      let _this = this;
      let targName = event.currentTarget.previousElementSibling;
      targName.focus();
      ite.isInputShow = false;
      _this.isOnlayClick = -1;
    },
    addReNameAxios(ite, i) {
      let _this = this;
      let url = "/blog_api/shopBlogApi/updateTitle";
      let fid = ite.fId.replace(/[12]\-/g,"");
      let fname = ite.fTitle;
      let shop = zmEditor.$store.state.menu.siteData.fShopId;
      _this.$axios
        .get(
          url,
          {
            params: {
              fId: fid,
              fBlogTitle: fname,
              fShopId: shop
            }
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        )
        .then(function(response) {
          let result = response.data.status;
          if (0 == result) {
            _this.targName.blur();
            console.log("数据OK!");
          } else if (3 == result) {
            _this.targName.blur();
            console.log("异常!", response.data.message);
          } else {
            _this.isDubeName = i;
            _this.isJiZhi = i;
            _this.isonError = i;
            _this.isOnFocus = -1;
            _this.errorTitle = "※禁止重名！";
            _this.isSavefTilte = false;
            _this.targName.focus();
            console.log("数据异常!", response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addChangeName(ite, index) {
      let _this = this;
      let isShow = this.judgeTitle(ite.fTitle, index);
      if (isShow) {
        _this.addReNameAxios(ite, index); //重命名tilte;
      } else {
        _this.isSavefTilte = false;
      }
    },
    judgeTitle(fTitle, index) {
      let _this = this;
      let namelen = _this.fileGetLength(fTitle); //字符长度计算;
      var tempKey = this.ratio.some(item => {
        return fTitle == item;
      });
      if (tempKey) {
        _this.isDubeName = index;
        _this.isJiZhi = index;
        _this.isonError = index;
        _this.isOnFocus = -1;
        _this.errorTitle = "※禁止重名！";
        return false;
      } else {
        if (namelen > 50) {
          _this.isNameOver = index;
          _this.isJiZhi = index;
          _this.isonError = index;
          _this.isOnFocus = -1;
          _this.errorTitle = "※请填写不超过25个汉字或50个字符!";
          return false;
        } else if (namelen < 1) {
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
      if (!this.isFlag) {
        event.preventDefault(); //阻止默认行为，blur事件;
      } else {
        this.isSavefTilte = true;
        this.addChangeName(ite, index); //重命名设置;
      }
    },
    addSetting(ite, index) {
      let DOMRect = $(event.currentTarget)[0].getBoundingClientRect(); //当前元素元素的左，上，右和下分别相对浏览器视窗的位置;
      let maxWidth = DOMRect.left - 148;
      let cWidth =
        document.body.clientWidth || document.documentElement.clientWidth; //页面可视区域宽度;
      let scrollbarWidth = this.getScrollBarSize(); //滚动条宽度;
      let currLeft = cWidth - 176 - 40 - scrollbarWidth;
      if (DOMRect.left > currLeft) {
        this.objCss.left = maxWidth + "px";
        this.objCss.top = DOMRect.top + 30 + "px";
      } else {
        this.objCss.left = DOMRect.left + 40 + "px";
        this.objCss.top = DOMRect.top + "px";
      }
      let _this = this;
      this.num = index;
      _this.isOnlayClick = index;
      for (let i = 0; i < _this.lists.length; i++) {
        if (i == index) {
          if (_this.isSelect) {
            _this.isSelect = false;
          } else {
            _this.isSelect = true;
          }
        }
      }
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
    addJiZhiEnter() {
      clearTimeout(this.time);
      this.isNameShow = true;
      this.isDUbeShow = true;
    },
    addJiZhiLeave() {
      this.time = setTimeout(() => {
        this.isNameShow = false;
        this.isDUbeShow = false;
      }, 500);
    },
    addIconCha(index, ite) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isWrong = -1;
      _this.isOnFocus = -1;
      _this.isOnlayClick = -1;
      ite.fTitle = this.initData;
      _this.addListinit(index); //list图标数据类初始化;
      _this.clearSelections(); //取消选中状态;
    },
    addIconEyeOff(index) {
      let that = zmEditor.$store.state.component.selectList[0];
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isOnlayClick = -1;
      that.settingData.listsID[index].type = true;
      _this.addEyeInit(index);
      let falg = that.settingData.listsID.some(item => {
        return item.type == true;
      });
      if (!falg) {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setComBoxHeight ? that.setComBoxHeight() : "";
        }
      } else {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setListData ? that.setListData() : "";
        }
      }
    },
    addHidShow(index) {
      let that = zmEditor.$store.state.component.selectList[0];
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      that.settingData.listsID[index].type = false;
      _this.addEyeInit(index);
      let falg = that.settingData.listsID.some(item => {
        return item.type == true;
      });
      if (!falg) {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setComBoxHeight ? that.setComBoxHeight() : "";
        }
      } else {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setListData ? that.setListData() : "";
        }
      }
    },
    addReMove() {
      let _this = this;
      let that = zmEditor.$store.state.component.selectList[0];
      that.lists.splice(_this.num, 1); //移除指定数据;
      that.settingData.listsID.splice(_this.num, 1); //移除指定数据id;
      if (that.lists.length == 0) {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setComBoxHeight ? that.setComBoxHeight() : "";
        }
      } else {
        if (zmEditor.$store.state.editMold.value == "computer") {
          that.setListData ? that.setListData() : "";
        }
      }
      this.isSelect = false; //小弹出框隐藏;
    },
    addReName() {
      let _this = this;
      let parClass =
        event.currentTarget.parentElement.previousElementSibling.children[0]
          .firstChild.firstChild.children[_this.num];
      let targName = parClass.children[1].firstChild;
      targName.focus();
      targName.select();
      _this.addListSet(_this.num); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.isWrong = _this.num;
      _this.isOnFocus = _this.num;
    },
    pageSetEnter() {
      clearTimeout(this.blogSetTime);
      this.isSelect = true;
    },
    pageSetLeave() {
      this.isSelect = false;
    },
    addEyeInit(index) {
      let _this = zmEditor.$store.state.component.selectList[0];
      _this.lists[index].iconShezhi2 = true;
      _this.lists[index].isIconCha = false;
      _this.lists[index].isIconDuigou1 = false;
      _this.lists[index].isIconEyeOff = true;
      _this.lists[index].isIconEyeOn = !_this.lists[index].isIconEyeOn;
      _this.lists = Object.assign([], _this.lists);
    },
    addListinit(num) {
      let _this = zmEditor.$store.state.component.selectList[0];
      _this.lists[num].iconShezhi2 = true;
      _this.lists[num].isIconCha = false;
      _this.lists[num].isIconDuigou1 = false;
      _this.lists[num].isInputShow = true;
      _this.lists = Object.assign([], _this.lists);
    },
    addListSet(num) {
      let _this = zmEditor.$store.state.component.selectList[0];
      _this.lists[num].iconShezhi2 = false;
      _this.lists[num].isIconCha = true;
      _this.lists[num].isIconDuigou1 = true;
      _this.lists[num].isInputShow = false;
      _this.lists = Object.assign([], _this.lists);
    }
  },
  watch: {
    isSelect(val) {
      if (val) {
        this.blogSetTime = setTimeout(() => {
          this.isSelect = false;
        }, 1500);
      }
    }
  }
};
</script>

