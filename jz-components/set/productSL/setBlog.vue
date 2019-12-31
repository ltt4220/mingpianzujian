<template>
  <div class="zm-product-Mycontent" :style="{height:_height}">
    <blogSelect @selectProduct='selectName' @productType="productType" @sortList="sortListA($event)" :prop="compositeData" ref="blogSelect"></blogSelect>
    <div v-show="!productLShow">
      <!-- <div> -->
      <div class="noneSvg"></div>
      <div class="none" v-show="productS">您目前没有选择产品！！</div>
      <div class="none" v-show="serviceS">您目前没有选择服务项目！！</div>
      <!-- <div class="none2"><span class='iconfont icon-fuwu'></span> 请选择和替换服务 !</div> -->
      <!-- <div class="none3"><span class='iconfont icon-productSvg'></span> 请选择和替换产品 !</div> -->
      <div class="none2" v-show="false">请选择和替换产品 !</div>
      <div class="none3" v-show="false">请选择和替换服务 !</div>
      <div class="zm_product_hand" v-show="false">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 633.03 819.2">
            <defs>
            </defs>
            <title>手</title>
            <g id="图层_2" data-name="图层 2">
              <g id="图层_1-2" data-name="图层 1">
                <rect x="186.16" y="781.93" width="74.5" height="37.27" />
                <path d="M111.72,409.65v37.17h37.22V781.93h37.22V372.38H148.94v37.28Zm37.22,0" />
                <path d="M558.54,223.44h37.27V111.77H558.54V223.44Zm0-37.17" />
                <path d="M521.32,111.77h37.22V0H186.16V111.77h37.27V37.27H521.32v74.5Zm0-37.27" />
                <rect x="148.94" y="111.77" width="37.22" height="74.5" />
                <rect x="111.72" y="186.27" width="37.22" height="74.39" />
                <rect x="74.5" y="260.66" width="37.22" height="74.44" />
                <rect x="37.22" y="335.05" width="37.27" height="37.32" />
                <path d="M595.81,484.09H633V223.44H595.81V484.09Zm0-37.27" />
                <path d="M260.66,781.93h37.22V633h74.5V595.81h-74.5v-149H260.66V781.93Zm0-74.45" />
                <path d="M372.38,595.81H484V558.49H409.6V446.82H372.38v149Zm0-74.5" />
                <path d="M484,558.49h74.5V521.32H521.32v-74.5H484V558.49Zm0-74.39" />
                <rect x="558.54" y="484.09" width="37.33" height="37.22" />
                <path d="M37.22,372.38H0V484.09H111.72V446.82H37.22Zm0,74.45" />
              </g>
            </g>
          </svg>
        </span>
      </div>
    </div>
    <div class="zm-dialog-pageBox1" v-show="productLShow">
      <!-- <EasyScrollbar :barOption="myBarOption"> -->
      <ul class="zm-dialog-pageList">
        <!-- <li v-for="(ite,i) in setBlogList" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-fid="ite.fId" :data-show="true" :data-title="ite.fInitName" v-bind:class="{'bgW':i==bgW,'onlay':i===isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}" @click.self.prevent="addClick(ite,i)" @mouseenter="addMouseEnter(i)" @mouseleave="addMouseLeave(i)"> -->
        <li v-for="(ite,i) in getNewName" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-fid="ite.id" :data-show="true" :data-title="ite.fInitName" v-bind:class="{'bgW':i==bgW,'onlay':i===isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}" @click.self.prevent="addClick(ite,i)" @mouseenter="addMouseEnter(i)" @mouseleave="addMouseLeave(i)">
          <!-- <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber" :style="{backgroundImage:'url('+ite.productImg+')'}"></span> -->
          <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber" :style="{backgroundImage:'url('+ite.mainImage+')'}"></span>
          <div class="zm-dialog-Title">
            <!-- <textarea readonly class="zm-dialog-pageList-title" id="myProInput" row="3"  v-model="ite.fTitle" @keyup.enter="addEnter(ite,i)" @focus="inputFocus(ite,i)" @input.stop.prevent="addInput(ite,i)" @blur="addblur(ite,i)" v-bind:class="{ 'onFocus': i===isOnFocus,'onError' : i===isonError}"></textarea> -->
            <!-- <div class="zm-dialog-pageList-title">{{ite.fTitle}}</div> -->
            <!-- <textarea readonly class="zm-dialog-pageList-title" id="myProInput" row="3"  v-model="ite.fTitle"></textarea> -->
            <textarea readonly class="zm-dialog-pageList-title" id="myProInput" row="3" v-model="getProductName"></textarea>
            <!-- <i class="zm-boxShow" v-show="ite.isInputShow" @dblclick.stop.prevent="addAbClick(ite,i)"></i> -->
          </div>
          <!-- <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': ite.isIconEyeOn}" v-show='hidden'></span> -->
          <!-- <span class="zm-dialog-eye iconfont" v-show='hidden' v-bind:class="{'icon-eyeOff':ite.isIconEyeOn==false?ite.isIconEyeOff:(i==isKey) && ite.isEyeOff}"></span> -->
          <!-- <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-cha2':ite.isIconCha}" @click.self.prevent="addIconCha(i)"></span> -->
          <!-- <span class="zm-dialog-Mysetting iconfont" v-bind:class="{'icon-duigou1':ite.isIconDuigou1}" @click.stop="addDuiGou(ite,i)"></span> -->
          <!-- <span class="zm-dialog-Mysetting iconfont" v-bind:class="{'icon-solidsettingicon':ite.iconShezhi2}" @click.self.prevent="addSetting(ite,i)"></span> -->
          <!-- <p class="zm-dialog-nameError iconfont icon-jinzhitishi" v-if="i===isJiZhi"></p> -->
          <!-- <p class="zm-dialog-nameErrorText" v-if="i===isNameOver">※请填写不超过<i>60</i>个字符或<i>30</i>个汉字!</p> -->
        </li>
      </ul>
      <!-- </EasyScrollbar> -->
      <!-- <div class="zm-dialog-carousel-pageMySetBox" @mouseenter="pageSetEnter()" @mouseleave="pageSetLeave()" v-show="isSelect" :style="{top:objCss.top,left:objCss.left}">  
        <div @click.stop.prevent="addReName()">重命名</div>
        <div @click.stop.prevent="addReMove()">移除</div>
      </div> -->
    </div>
    <blogCheck @noProduct='noProduct' @productType="productType" @changCompositeDataL="changCompositeDataL" :prop="compositeDataL" @showPro='showPro' style="position:absolute;bottom:0;"></blogCheck>
  </div>
</template>
<style scoped lang="less">
@import "./singleProductSet.less";
</style>
<script>
import setBlogSelect from "./setBlogSelect.vue";
import setBlogCheck from "./setBlogCheck.vue";
export default {
  name: "set-blog",
  props: ["prop"],
  components: {
    blogSelect: setBlogSelect,
    blogCheck: setBlogCheck
  },
  data() {
    return {
      productLShow: false,
      compositeDataL: "选择产品",
      myBarOption: {
        horizrailenabled: false //是否显示水平滚动条
      },
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
      errorTitle: "※ 请填写不超过60个字符或30个汉字!",
      current: null,
      // public: publice,
      initData: "",
      ratio: [],
      isSavefTilte: false,
      objCss: {
        left: 0,
        top: 0
      },
      bgW: -1,
      productS: true,
      serviceS: true,
      _height:'655px'
    };
  },
  created() {
    this._height = this.$parent.content_height;
    let nowVue = zmEditor.$store.state.component.selectList[0];
    if (nowVue.prodcutList[0].fId) {
      this.productLShow = true;
    } else {
      this.productLShow = false;
    }
    let nowIndex = nowVue.typeIndex;
    if (nowIndex == 0) {
      this.compositeDataL = "选择产品";
    } else if (nowIndex == 1) {
      this.compositeDataL = "选择服务";
    }
    if (nowVue.RandomSN == "产品") {
      this.productS = true;
      this.serviceS = false;
      if (nowVue.prodcutList[0] && nowVue.prodcutList[0].fId) {
        this.compositeDataL = "替换产品";
      } else {
        this.compositeDataL = "选择产品";
      }
    } else if (nowVue.RandomSN == "服务") {
      this.productS = false;
      this.serviceS = true;
      if (nowVue.prodcutList[0] && nowVue.prodcutList[0].fId) {
        this.compositeDataL = "替换服务";
      } else {
        this.compositeDataL = "选择服务";
      }
    }
  },
  computed: {
    getProductName() {
      let name = this.getNewName[0].name;
      return name;
    },
    getNewName() {
      return zmEditor.$store.state.component.selectList[0].mylists;
    },
    setBlogList() {
      let _this = this;
      // let oldData = zmEditor.$store.state.component.selectList[0].lists; //blog组件数据;
      let oldData = this.prop; //blog组件数据;
      let selectData = _this.current; //7-1选择后及组件默认数据;
      _this.lists = selectData || oldData; //渲染数据;
      if (_this.current) {
        _this.lists = _this.current;
      }

      _this.lists.forEach((element, index) => {
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
          element.fInitName = element.fTitle;
          element.isShowBlog = true;
          element.isInputShow = true;
        }
      });
      return _this.lists;
    },
    compositeData() {
      return {
        lists: this.lists,
        public: this.public
      };
    }
  },
  methods: {
    productType(type) {
      if (type == "产品") {
        this.productS = true;
        this.serviceS = false;
      } else if (type == "服务") {
        this.productS = false;
        this.serviceS = true;
      }
    },
    changCompositeDataL(type, nowRandomSN) {
      let nowVue = zmEditor.$store.state.component.selectList[0];

      if (type == "product" || type == "product2") {
        this.compositeDataL = "替换产品";
      } else if (type == "service" || type == "service2") {
        this.compositeDataL = "替换服务";
      }
      if (nowRandomSN && nowRandomSN == "产品") {
        this.compositeDataL = "替换产品";
      } else if (nowRandomSN && nowRandomSN == "服务") {
        this.compositeDataL = "替换服务";
      }
    },
    showPro() {
      this.productLShow = true;
    },
    noProduct(v) {
      // if(v[0].hasPupupChild == 0 && (!zmEditor.$store.state.component.selectList[0].prodcutList[0].fId)){
      //   this.productLShow = false
      // }else{
      //   this.productLShow = true
      // }
    },
    selectName(index) {
      let nowVue = zmEditor.$store.state.component.selectList[0];
      let nowIndex = nowVue.typeIndex;
      if (nowIndex == 0) {
        this.compositeDataL = "选择产品";
      } else if (nowIndex == 1) {
        this.compositeDataL = "选择服务";
      }
    },
    sortListA(sortRandom) {
      let _this = this;
      _this.lists = sortRandom;
    },
    checkListA(currentData) {
      let _this = this;
      _this.lists = currentData;
      _this.current = currentData;
    },
    addClick(ite, i) {
      let _this = this;
      _this.isOnlayClick = i;
    },
    addMouseEnter(i) {
      let _this = this;
      _this.isOnlay = i;
      // if(this.lists[this.num].isIconDuigou1){//he
      //   this.lists[this.num].iconShezhi2 = false;
      // }else{
      //   this.lists[this.num].iconShezhi2 = true;
      // }
      var myInput = document.getElementById("myProInput"); //he
      if (myInput == document.activeElement) {
        //he
        this.bgW = this.num; //he
      } else {
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
      _this.bgW = -1; //he
      setTimeout(() => {
        if (_this.isSavefTilte) {
          //修改fTitle成功;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.num = i;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        } else {
          //修改fTitle不成功；
          ite.fTitle = _this.initData;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.num = i;
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
      this.$store.commit("addComKeyEvent"); //he
      return false;
    },
    inputFocus(ite, index) {
      let _this = this;
      this.initData = ite.fTitle;
      this.ratio = [];
      this.lists.forEach(item => {
        this.ratio.push(JSON.parse(JSON.stringify(item.fTitle)));
      });
      this.ratio.splice(index, 1);
      let targName = event.currentTarget;
      targName.select();
      _this.addListSet(index); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.bgW = index; //he
      _this.isWrong = index;
      _this.isOnFocus = index;
      this.$store.commit("removeComKeyEvent"); //he
    },
    addEnter(ite, index) {
      let _this = this;
      let targName = event.currentTarget;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
      targName.blur();
    },
    addInput(ite, index) {
      let title = ite.fTitle;
      let cc = this.judgeTitle(title, index);
    },
    addAbClick(ite, index) {
      let _this = this;
      let targName = event.currentTarget.previousElementSibling;
      targName.focus();
      ite.isInputShow = false;
      _this.isOnlayClick = -1;
      _this.bgW = index; //he
      _this.isSelect = false;
    },
    addReNameAxios(ite, i) {
      let _this = this;
      let nowVue = zmEditor.$store.state.component.selectList[0];
      let fid = ite.fId;
      let fname = ite.fTitle;
      let url;
      if (nowVue.dataSource == "productData") {
        // url = '/product/webbuilder-api/product/updateProductInfoByParam'
        url = "/product-api/updateProductInfoByParam";
      } else if (nowVue.dataSource == "serviceData") {
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
          newName: fname
          // newAdvertisementText:'',
          // label:''
        }
      })
        .then(res => {
          console.log("数据提交成功single");
          zmEditor.$store.state.component.selectList[0].settingData.productName =
            ite.fTitle;
        })
        .catch(() => {
          console.log("数据提交失败single");
        });
    },
    addChangeName(ite, index) {
      let _this = this;
      let isShow = this.judgeTitle(ite.fTitle, index);
      if (isShow) {
        _this.initData = ite.fTitle;
        _this.addReNameAxios(ite, index); //重命名tilte;
      } else {
        ite.fTitle = this.initData;
        _this.isNameOver = false;
        _this.isJiZhi = false;
        _this.isDubeName = false;
        _this.isonError = -1;
      }
    },
    judgeTitle(name, index) {
      let _this = this;
      let namelen = _this.fileGetLength(name); //字符长度计算;
      if (namelen > 60) {
        _this.isNameOver = index;
        _this.isJiZhi = index;
        _this.isonError = index;
        _this.isOnFocus = -1;
        return false;
      } else if (namelen <= 0) {
        return false;
      } else {
        _this.isNameOver = false;
        _this.isJiZhi = false;
        _this.isDubeName = false;
        _this.isonError = -1;
        _this.isOnFocus = index;
        return true;
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
    addSetting(ite, index) {
      let DOMRect = $(event.currentTarget)[0].getBoundingClientRect();
      this.objCss.left = DOMRect.left + 55 + "px";
      this.objCss.top = DOMRect.top + "px";

      let _this = this;
      _this.num = index;
      _this.top = index * 41 + "px";
      _this.isOnlayClick = index;
      _this.bgW = -1; //he
      for (let i = 0; i < _this.lists.length; i++) {
        if (i == index) {
          if (_this.isSelect) {
            _this.isSelect = !_this.isSelect;
          } else {
            _this.isSelect = !_this.isSelect;
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
      _this.bgW = -1; //he
      _this.addListinit(index); //list图标数据类初始化;
      _this.clearSelections(); //取消选中状态;
    },
    addIconEyeOff(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isOnlayClick = -1;
      _this.bgW = -1; //he
      _this.addEyeInit(index);
    },
    addHidShow(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.addEyeInit(index);
    },
    addReMove() {
      let _this = this;
      let nowVue = zmEditor.$store.state.component.selectList[0];
      // this.prop.splice(_this.num, 1); //移除list 数据;
      // zmEditor.$store.state.component.selectList[0].prodcutList[_this.num].fId = null//he
      nowVue.dailogProductL = []; //he
      let childV;
      this.$children.forEach((element, index) => {
        if (element.productType) {
          childV = element;
        }
      });
      childV.ff();
      this.prop[_this.num].fId = null; //移除list 数据;
      this.isSelect = false; //小弹出框隐藏;
      this.productLShow = false;
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
  }
};
</script>

