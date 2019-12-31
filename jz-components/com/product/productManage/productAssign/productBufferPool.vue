<template>
  <div
    class="zm-productH"
    :style="{width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}"
  >
    <div
      class="productH"
      @mousedown.stop="mousedown22($event)"
    >
      <span class="productT">{{productType}}列表</span>
      <span
        class="productC iconfont icon-close"
        @click.stop="closeP"
      ></span>
    </div>
    <div class="productB">
      <div class="productB-L">
        <div class="productB-LH">
          <div class="productB-LHL">
            <span class="ld iconfont icon-fcstubiao25"></span>
            <span class="ldt">拖拽顺序可以调整产品位置！</span>
          </div>
          <div
            class="productB-LHR"
            @click.stop="addProduct"
          >添加{{productType}}</div>
        </div>
        <!-- 滚动条插件 -->
        <EasyScrollbar>
          <div
            id="wrapper"
            style="height: 555px;"
          >
            <div class="productB-LB">
              <ul class="color-list">
                <li
                  @click.stop='isSelectF(index)'
                  class="color-item"
                  v-for="(item,index) in productList"
                  :key='index'
                  v-dragging="{ item: item, list: productList, group: 'color2' }"
                >
                  <div
                    class="imgBox"
                    :style="{backgroundImage:'url('+item.mainImage+')'}"
                  >
                    <span class="ImgIndex">{{index+1}}</span>
                    <span
                      v-show='item.isSelect'
                      class="dg iconfont icon-check"
                    ></span>
                    <span
                      v-show='item.isSelect'
                      class="imgVien"
                    ></span>
                    <span class="removeBox">
                      <span
                        @click.stop="removeProduct(index)"
                        class="removeIcon iconfont icon-delete"
                      >
                        <div
                          @click.stop="removeProduct(index)"
                          class="removeTit"
                          :class="{removeTit2:((index+1)%7==0)}"
                        >移除</div>
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </EasyScrollbar>
      </div>

      <div class="productB-R">
        <EasyScrollbar>
          <div
            id="wrapper"
            style="height: 600px;"
          >
            <div class="productB-RC">
              <productName
                @tagb="productN"
                :prop="productType"
                :list="listA"
                :oldText="oldText"
                :isOnlay="Choice"
              ></productName>
              <!-- <productBanner @tagb="productBn" :list="listA" :oldText="oldText"></productBanner> -->
              <div
                v-if="Choice"
                class="onOff"
              >
                <onOff
                  @init="init"
                  @switchOnOff="switchOnOff"
                  @tagb="tagN"
                  :productList="productList"
                  :prop="productType"
                  :list="listA"
                  :oldText="oldText"
                  :nowIndex="nowIndex"
                ></onOff>
                <div
                  v-show="productList[nowIndex]?productList[nowIndex].isSwitchOn:false"
                  v-for="(item,i) in isSilder"
                  :key="i"
                  :prop="item.props"
                  :is="item.com"
                ></div>
              </div>
              <div
                v-if="Choice2"
                class="onOff2"
              >
                <onOff2 :prop="productType"></onOff2>
              </div>
            </div>
          </div>
        </EasyScrollbar>
      </div>
    </div>
    <div class="productF">
      <span
        class="commit"
        @click="commitF"
        :class="{bounceIn:addbounceIn,animated:addbounceIn}"
      >完成</span>
    </div>
    <div
      class="info"
      v-show="infoS"
      :num1="color.value"
      :num="background.value"
      :class="{shake:addShake,animated:addShake}"
    >
      <div class="infoH">
        <span class="ts">提示</span>
        <span
          class="infoC iconfont icon-close"
          @click.stop="closeI"
        ></span>
      </div>
      <div class="infoB">
        <div class="sleNum">{{addF}}最多选择
          <span>{{count}}</span>条{{productType}}</div>
        <span
          class="iKnow"
          @click="iKnow"
        >我知道了</span>
      </div>
    </div>
  </div>
</template>
<script>
import productCommon from "./productCommon.js";
import productName from "./productName.vue";
import onOff from "./switch.vue";
import onOff2 from "./switch2.vue";
import productBanner from "./productBanner.vue";
export default {
  name: "productBufferPool",
  components: {
    productName,
    productBanner,
    onOff,
    onOff2
  },
  data() {
    return {
      inNum: 0,
      addShake: false,
      addbounceIn: false,
      count: 100,
      addF: "请先添加商品,",
      productT: "产品",
      productType: "产品",
      infoS: false,
      infoS2: false,
      isSilder: [],
      settingData: {
        title: "aa",
        attr: {
          value: null
        },
        NameHoverColor: {
          value: "#f90"
        }
      },
      showV: true,
      bottom: -23,
      width: 1250,
      height: 700,
      style: {
        width: 1250,
        height: 700,
        left: 326,
        top: 270,
        zIndex: 0,
        rotate: 0
      },
      lists: [],
      productList: [],
      setData: {
        name: "",
        advertisementText: "",
        fLabel: ""
      },
      oldText: {
        oldProductName: "", //旧的产品名称;
        oldadver: "", //产品广告语
        oldfLabel: "" //旧的标签;
      },
      backgroundColor: {
        value: ""
      },
      labelColor: {
        value: ""
      },
      changeN: false, //
      changeF: false,
      nowIndex: 0, //当前选中产品的下标;
      Choice: false, //控制面板中的显示产品标签关联设置项的状态-----关闭;
      Choice2: true //控制面板中的显示产品标签关联设置项的状态-----打开;
    };
  },
  computed: {
    color() {
      let val = zmEditor.$store.state.component.selectList[0].lists;
      if (val.length == 0) {
        this.labelColor.value = "#fff";
      } else {
        var flag = val.find(item => {
          return item.isSelect == true;
        });
        if (flag) {
          this.labelColor.value = flag.color;
        } else {
          this.labelColor.value = "#fff";
        }
      }
      console.log("%c标签颜色", "font-size:30px;color:yellow", val);
      return {
        value: 3
      };
    },
    background() {
      let val = zmEditor.$store.state.component.selectList[0].lists;
      if (val.length == 0) {
        this.backgroundColor.value = "#FF0000";
      } else {
        var flag = val.find(item => {
          return item.isSelect == true;
        });
        if (flag) {
          this.backgroundColor.value = flag.backgroundColor;
        } else {
          this.backgroundColor.value = "#FF0000";
        }
      }
      return {
        value: 7
      };
    },
    listA() {
      if (this.lists.length == 0) {
        this.lists = [
          {
            name: "",
            comTitName: "",
            advertisementText: "",
            fLabel: ""
          }
        ];
      }
      return this.lists;
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
    productList: {
      handler() {
        let that = zmEditor.$store.state.component.selectList[0];
        this.lists = [];
        if (this.productList.length > 100) {
          this.productList.splice(100); //只获取最新的100条数据
          this.infoS = true;
        }
        this.productList.forEach((element, index) => {
          that.settingData[this.type + "LabelId"].forEach((el, i) => {
            if (element.id == el.id) {
              element.isSwitchOn = el.isSwitchOn;
              element.float = el.float;
              element.backgroundColor = el.backgroundColor;
              element.mfLabel = el.mfLabel;
              element.color = el.color;
              el.comTitName != undefined && el.comTitName.length != 0
                ? (element.comTitName = element.name)
                : (element.comTitName = el.comTitName);
            }
          });
          if (element.isSelect) {
            this.lists.push(element);
            this.nowIndex = index;
          }
        });
        this.lists = [...new Set(this.lists)];//重命名title;
        that.lists = this.productList;
        that.lists = Object.assign([], that.lists);
        that.settingData[this.type + "AssId"] = [];
        this.productList.forEach((element, index) => {
          that.settingData[this.type + "AssId"].push(element.id);
        });
        let assId = that.settingData[this.type + "AssId"];
        if (assId.length == 0) {
          if (this.type == "product") {
            //设置指定数据面板显示;
            that.settingData.isProductAssign = true;
            this.productType = "产品";
          } else {
            this.productType = "服务";
            that.settingData.isServerAssign = true;
          }
        } else {
          if (this.type == "product") {
            //设置指定数据面板隐藏;
            this.productType = "产品";
            that.settingData.isProductAssign = false;
          } else {
            this.productType = "服务";
            that.settingData.isServerAssign = false;
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.$store.commit("removeComKeyEvent"); //取消全局键盘事件
    let that = zmEditor.$store.state.component.selectList[0].settingData;
    let shop =
      zmEditor.$store.state.menu.webType == "template" ||
      zmEditor.$store.state.menu.webType == "component"
        ? 71
        : zmEditor.$store.state.component.selectList[0].fEntrepId;
    let assId = JSON.stringify(that[this.type + "AssId"]);
    let fid = assId.slice(1, -1).replace(/\"/g, "");
    let url =
      zmEditor.$store.state.component.selectList[0].settingData.productUrl;
    if (fid.length != 0) {
      //存在指定数据;
      this.ValidData(url, fid, shop);
      this.productList.forEach(element => {
        element.isSelect = false;
      });
    } else {
      this.productList = [];
    }
    let file = "/set/sliders.vue";
    const component = () => import("../../../../../components" + file);
    this.isSilder.push(
      {
        com: component,
        props: {
          title: "标签颜色",
          param: "color",
          minVal: 0,
          maxVal: 100,
          value: this.backgroundColor,
          decimalNum: 0,
          callback: this.setBackground
        }
      },
      {
        com: component,
        props: {
          title: "文字颜色",
          param: "color",
          minVal: 0,
          maxVal: 100,
          value: this.labelColor,
          decimalNum: 0,
          callback: this.setColor
        }
      }
    );
  },
  methods: {
    setColor(val) {
      this.upProductlists("color", val.color); //更换当前选中产品的标签;
    },
    setBackground(val) {
      this.upProductlists("backgroundColor", val.color); //更换当前选中产品的标签;
    },
    ValidData(url, ValidID, shop) {
      //指定数据过滤下架数据及更新最新数据信息;
      let ValidIDArr = ValidID.split(",");
      let that = zmEditor.$store.state.component.selectList[0];
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
            that.setListData ? that.setListData() : "";
          }
          this.productList = data;

          this.productList.forEach((element, index) => {
            //
            ValidIDArr.forEach((ele, i) => {
              let oldId = ele;
              if (element.id == ele.substr(2, ele.length - 1)) {
                element.id = oldId;
              }
            });
          });
        })
        .catch(err => {
          that.setListData();
          console.log(err);
        });
    },
    getNewData() {
      //更新当前从7-1选中的产品是否存在修改;
      let that = zmEditor.$store.state.component.selectList[0].settingData;
      let shop =
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component"
          ? 71
          : zmEditor.$store.state.component.selectList[0].fEntrepId;
      let assId = JSON.stringify(that[this.type + "AssId"]);
      let fid = assId.slice(1, -1).replace(/\"/g, "");
      let url =
        zmEditor.$store.state.component.selectList[0].settingData.productUrl;
      if (fid.length != 0) {
        //存在指定数据;
        this.ValidData(url, fid, shop);
      } else {
        this.productList = [];
      }
    },
    addProduct() {
      //添加产品或服务数据;
      this.infoS2 = false;
      this.addF = "";
      this.addShake = true;
      setTimeout(() => {
        this.addShake = false;
      }, 500);
      this.dialog71();
      // this.$store.commit("removeComKeyEvent"); //取消全局键盘事件
    },
    dialog71() {
      //打开7-1产品或服务
      /*
          modules 模块product service
          nowLength 当前多少条数据
          totalLenght 达到多少条数据报警告
          multiple  true是多选 false是单选
          warningText 警告文字
          callBack 回调函数
      */
      let _this = this;
      let m;
      if (this.productType == "产品") {
        m = "product";
      } else if (this.productType == "服务") {
        m = "service";
      }
      let warn = "最多选择" + this.count + "条产品";
      let shop =
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component"
          ? 71
          : zmEditor.$store.state.component.selectList[0].fEntrepId;
      productCommon.choiceModules({
        nowLength: this.productList.length,
        totalLenght: 100,
        multiple: true,
        warningText: warn,
        modules: m,
        callBack: _this.productC,
        myBox: true,
        fEntrepId: shop
        // closeCallBack: () => {
        // this.$store.commit("addComKeyEvent"); //恢复全局键盘事件
        // }
      });
      this.$store.commit('editStepNum');
    },
    productC(v) {
      //7-1的产品或服务回调方法;  参数v：指7-1添加的数据;
      let that = zmEditor.$store.state.component.selectList[0];
      let newA = [];
      for (let i = 0; i < v.length; i++) {
        newA.push(v[i]);
      }

      if (
        zmEditor.$store.state.menu.webType == "template" ||
        zmEditor.$store.state.menu.webType == "component"
      ) {
        newA.forEach((element, index) => {
          let newId = element.id;
          element.id = "1-" + newId;
        });
      } else if (zmEditor.$store.state.menu.webType == "website") {
        newA.forEach((element, index) => {
          let newId = element.id;
          element.id = "2-" + newId;
        });
      }
      v = newA;
      let lenA = this.productList.length;
      let lenA2 = v.length;
      for (let i = 0; i < lenA; i++) {
        for (let j = 0; j < lenA2; j++) {
          if (v[j].id == this.productList[i].id) {
            v.splice(j, 1);
            lenA2--;
          }
        }
      }
      v.forEach((element, index) => {
        element.isSelect = false;
        if (this.productType == "产品") {
          element.dataSourse = "product";
        } else if (this.productType == "服务") {
          element.dataSourse = "service";
        }
        this.productList.push(element);
        let obj = {
          id: element.id, //产品id
          isSwitchOn: false, //判断是否显示组件标签;
          float: "left", //显示产品标签开关按钮样式;
          backgroundColor: "#FF0000", //标签背景颜色;
          mfLabel: "让利", //标签名称;
          color: "#fff", //标签文字背景颜色;
          comTitName: element.name //当前选中产品的名称;
        };
        that.settingData[this.type + "LabelId"].push(obj);
      });
      this.inNum = 1;

      //在7-1选择添加数据后再次重新请求------------------start
      that.settingData[this.type + "AssId"] = [];
      this.productList.forEach((element, index) => {
        that.settingData[this.type + "AssId"].push(element.id);
      });
      this.getNewData();
      //在7-1选择添加数据后再次重新请求--------------------end
      // this.$store.commit("addComKeyEvent"); //恢复全局键盘事件
    },
    isSelectF(i) {
      //选中缓冲池当前产品;
      let that = zmEditor.$store.state.component.selectList[0];
      this.nowIndex = i;
      this.lists = [];
      this.productList.forEach((element, index) => {
        if (index == i) {
          element.isSelect = !element.isSelect;
        } else {
          element.isSelect = false;
        }
        if (element.isSelect) {
          this.lists.push(element);
        }
      });
      this.lists = [...new Set(this.lists)];
      this.oldText.oldProductName = this.lists[0]
        ? this.lists[0].comTitName
        : "";
      // this.oldText.oldadver = this.lists[0]? this.lists[0].advertisementText: "";//广告语;
      if (this.lists.length <= 0) {
        this.Choice = false;
        this.Choice2 = true;
      } else {
        this.Choice = true;
        this.Choice2 = false;
      }
      this.productList = Object.assign([], this.productList);
    },
    upProductlists(obj, val) {
      //更新lable的值;
      // 参数1：更改的对象属性名  参数2：更改对象属性值
      let that = zmEditor.$store.state.component.selectList[0];
      let nowId;
      this.productList.forEach((element, index) => {
        if (element.isSelect) {
          nowId = element.id;
          element[obj] = val;
        }
      });
      let LabelId = that.settingData[this.type + "LabelId"];
      LabelId.forEach((element, index) => {
        if (nowId == element.id) {
          element[obj] = val;
        }
      });
      // this.productList = Object.assign([], this.productList);
    },
    productN(v) {
      //产品名称;
      this.changeN = true;
      this.setData.name = v;
      this.upProductlists("comTitName", v); //更换当前选中产品的标签;
    },
    switchOnOff(v, v2) {
      let that = zmEditor.$store.state.component.selectList[0];
      let nowId;
      this.productList.forEach((element, index) => {
        if (element.isSelect) {
          nowId = element.id;
        }
      });
      if (this.type == "product") {
        let LabelId = that.settingData.productLabelId;
        LabelId.forEach((element, index) => {
          if (nowId == element.id) {
            element.isSwitchOn = v;
            element.float = v2;
          }
        });
      } else {
        let LabelId = that.settingData.serverLabelId;
        LabelId.forEach((element, index) => {
          if (nowId == element.id) {
            element.isSwitchOn = v;
            element.float = v2;
          }
        });
      }
      this.productList = Object.assign([], this.productList);
    },
    tagN(v) {
      //添加标签
      let that = zmEditor.$store.state.component.selectList[0];
      this.setData.fLabel = v;
      this.upProductlists("mfLabel", v); //更换当前选中产品的标签;
      // let nowId;
      // this.productList.forEach((element, index) => {
      //   if (element.isSelect) {
      //     nowId = element.id;
      //   }
      // });
      // if (this.type == "product") {
      //   let LabelId = that.settingData.productLabelId;
      //   LabelId.forEach((element, index) => {
      //     if (nowId == element.id) {
      //       element.mfLabel = v;
      //     }
      //   });
      // } else {
      //   let LabelId = that.settingData.serverLabelId;
      //   LabelId.forEach((element, index) => {
      //     if (nowId == element.id) {
      //       element.mfLabel = v;
      //     }
      //   });
      // }
      // this.productList = Object.assign([], this.productList);
    },
    mousedown22(e) {
      const downX = e.clientX;
      const downY = e.clientY;
      const sourceX = this.$el.offsetLeft;
      const sourceY = this.$el.offsetTop;
      const oldIndex = this.style.zIndex;
      // this.style.zIndex = 10000;
      document.onmousemove = _.throttle(e => {
        const movX = e.clientX;
        const movY = e.clientY;
        const left = movX - downX + sourceX;
        const top = movY - downY + sourceY;
        this.style.left = left;
        this.style.top = top;
      }, 100);
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.style.zIndex = oldIndex;
      };
    },
    iKnow() {
      //关闭对话框"我知道了";
      this.infoS = false;
      // this.dialog71()
    },
    closeI() {
      //关闭对话框"X";
      this.infoS = false;
    },
    productBn(v) {
      //广告语
      this.changeF = true;
      this.setData.advertisementText = v;
    },
    commitF() {
      //标签设置完成;
      let that = zmEditor.$store.state.component.selectList[0];
      this.infoS = false;
      this.addbounceIn = true;
      setTimeout(() => {
        this.addbounceIn = false;
      }, 500);

      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneType",
        value: false
      }); //true为打开 false 为关闭
      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneMode",
        value: "/com/product/productManage/productAssign/productBufferPool.vue"
      });

      this.$store.commit("addComKeyEvent"); //恢复全局键盘事件
      if (this.type == "product") {
        that.settingData.isSaveProductLabel = true;
      } else {
        that.settingData.isSaveServerLabel = true;
      }
    },
    closeP() {
      //缓冲池关闭"x";
      // $(event.currentTarget).parent().parent().remove()
      // zmEditor.$store.commit("setBufferPoll",false);//关闭产品缓冲池
      let that = zmEditor.$store.state.component.selectList[0];
      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneType",
        value: false
      }); //true为打开 false 为关闭
      zmEditor.$store.commit("changeCustomerPaneData", {
        key: "paneMode",
        value: "/com/product/productManage/productAssign/productBufferPool.vue"
      });
      this.$store.commit("addComKeyEvent"); //恢复全局键盘事件

      if (this.type == "product") {
        if (!that.settingData.isSaveProductLabel) {
          this.productList.forEach((element, index) => {
            // let obj = {
            //   id: element.id, //产品id
            //   isSwitchOn: false, //判断是否显示组件标签;
            //   float: "left", //显示产品标签开关按钮样式;
            //   backgroundColor: "#FF0000", //标签背景颜色;
            //   mfLabel: "", //标签名称;
            //   color: "#fff" //标签文字背景颜色;
            // };
            // that.settingData[this.type + "LabelId"].push(obj);
          });
        }
      } else {
        if (!that.settingData.isSaveServerLabel) {
          this.productList.forEach((element, index) => {
            // let obj = {
            //   id: element.id, //产品id
            //   isSwitchOn: false, //判断是否显示组件标签;
            //   float: "left", //显示产品标签开关按钮样式;
            //   backgroundColor: "#FF0000", //标签背景颜色;
            //   mfLabel: "", //标签名称;
            //   color: "#fff" //标签文字背景颜色;
            // };
            // that.settingData[this.type + "LabelId"].push(obj);
          });
        }
      }
      this.productList = Object.assign([], this.productList);
    },
    removeProduct(index) {
      //移除选中产品;
      let that = zmEditor.$store.state.component.selectList[0];
      this.lists = [];
      let nowId = this.productList[index].id;
      let indexL;
      if (this.type == "product") {
        that.settingData.productLabelId.forEach((element, i) => {
          if (nowId == element.id) {
            indexL = i;
          }
        });
        that.settingData.productLabelId.splice(indexL, 1);
      } else {
        that.settingData.serverLabelId.forEach((element, i) => {
          if (nowId == element.id) {
            indexL = i;
          }
        });
        that.settingData.serverLabelId.splice(indexL, 1);
      }

      this.productList.splice(index, 1);
      this.productList.forEach(element => {
        if (element.isSelect) {
          this.lists.push(element);
        }
      });
      this.lists = [...new Set(this.lists)];

      // this.getNewData()
      if (zmEditor.$store.state.editMold == "computer") {
        that.setListData ? that.setListData() : "";
      }
    }
  }
};
</script>
<style scoped>
.zm-productH {
  border-radius: 10px;
  box-shadow: 0px 0px 5px #a9a9a9;
  background-color: #fff;
  /* position: absolute; */
  /* position: fixed; */
  left: -50%;
  /* top: 50%; */
  /* margin-left: - */
}
.info {
  position: absolute;
  width: 280px;
  height: 150px;
  background-color: #eee;
  border-radius: 10px;
  left: 40%;
  top: 50%;
  margin-left: -140px;
  margin-top: -75px;
}
.infoH {
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #3089d5;
  line-height: 38px;
}
.ts {
  margin-left: 10px;
  color: #fff;
  font-size: 14px;
}
.infoC {
  position: absolute;
  right: 7px;
  top: 5px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
.infoB {
  width: 100%;
  height: 112px;
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #a9a9a9;
  /* line-height: 38PX; */
}
.sleNum {
  padding-top: 10px;
  margin-left: 10px;
  color: #797979;
}
.iKnow {
  width: 80px;
  height: 22px;
  border-radius: 2px;
  background-color: #3089d5;
  line-height: 22px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  margin: 0 auto;
  margin-top: 50px;
  cursor: pointer;
  display: block;
}
.productH {
  width: 100%;
  height: 50px;
  background-color: #3089d5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  cursor: move;
}
.productC {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
.productC:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.productT {
  position: absolute;
  left: 23px;
  top: 13px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  font-size: 16px;
}
.productB {
  width: 100%;
  height: 600px;
  /* background-color: #563452; */
  border-left: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
}
.productB-L,
.productB-R {
  height: 600px;
  display: inline-block;
}
.productB-L {
  width: 942px;
  /* background-color: #ca6d6d; */
  border-right: 1px solid #d7d7d7;
}
.productB-LH {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #d7d7d7;
  /* background-color: green; */
  line-height: 45px;
  position: relative;
}
.ld {
  width: 15px;
  height: 17px;
  color: #ff6600;
}
.ldt {
  color: #797979;
  margin-left: 5px;
  font-size: 12px;
}
.productB-LHL,
.productB-LHR {
  display: inline-block;
}
.productB-LHL {
  /* width: 100px; */
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -15px;
  /* background-color: #308985; */
}
.productB-LHR {
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
  background-color: #3089d5;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -15px;
  cursor: pointer;
}
.productB-LB {
  width: 100%;
  height: auto;
  /* background-color: #fff; */
  padding: 20px;
  overflow: hidden;
}
.productB-LB > ul > li {
  margin-left: 10px;
  float: left;
  cursor: pointer;
}
.productB-LB > ul > li:nth-child(n + 8) {
  margin-top: 10px;
}
/* .productB-LB > ul >li:nth-child(-n+7){
        margin-left:0px;
    } */
.productB-LB > ul > li:nth-child(7n + 1) {
  margin-left: 0px;
}
.imgBox {
  width: 120px;
  height: 120px;
  background-size: cover;
  position: relative;
  /* overflow: hidden; */
}
.ImgIndex {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  transition: all 0.5;
}
.dg {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: #3089d5;
  line-height: 20px;
  text-align: center;
  color: #fff;
  z-index: 5;
}
.imgVien {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(48, 152, 213, 0.3);
}
.removeBox {
  position: absolute;
  left: 0px;
  bottom: -99999px;
  width: 100%;
  height: 23px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5;
}
.imgBox:hover .removeBox {
  /* transform: translateY(0) */
  bottom: 0px;
}
.removeIcon {
  position: absolute;
  right: 3px;
  bottom: 5px;
  width: 14px;
  height: 14px;
  color: #fff;
}
.removeIcon:hover .removeTit {
  right: -43px;
  display: block;
}
.removeTit {
  display: none;
  position: absolute;
  right: -9px;
  top: -20px;
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 2px;
  color: #000;
  z-index: 1;
  font-size: 12px;
}
.removeIcon:hover .removeTit2 {
  right: 0px;
}
.productB-R {
  width: 300px;
}
.productF {
  width: 100%;
  height: 50px;
  position: relative;
  line-height: 50px;
}
.commit {
  position: absolute;
  right: 20px;
  top: 9px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  background-color: #3089d5;
  border-radius: 4px;
  cursor: pointer;
}
.productB-RC {
  width: 100%;
  height: auto;
  overflow: hidden;
}
/* 点击添加产品、服务按钮动画========================================end */
.animated {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  -webkit-animation-name: shake;
  animation-name: shake;
}
/* 点击添加产品、服务按钮动画========================================end */
/* 点击完成按钮动画========================================start */
@-webkit-keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  -webkit-animation-duration: 0.9s;
  animation-duration: 0.9s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}
/* 点击完成按钮动画========================================end */
</style>

