<template>
  <div
    v-if="isComputer"
    class="zm-component-main-blog"
    :id="id"
    :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',overflow: 'hidden'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @dblclick.stop.prevent="openSetPane"
    :data-title="typeName"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
  >
    <div
      class="zm-component-blog-content wordsBlog"
      data-type="words"
      :data-num="settingData.blogNum.value"
    >
      <span
        v-for="(item,i) in setList"
        :key="i"
      >
        <div
          class="zm-component-blog-box"
          :data-sortid="item.fId"
          :data-show="true"
          :data-time="item.fUpdateTime"
          :data-title="item.fTitle"
          :style="{backgroundColor:settingData.BoxBackgroundColor.value,paddingLeft:settingData.paddingLeftRight.value,paddingRight:settingData.paddingLeftRight.value}"
        >
          <div class="zm-component-blog-detail">
            <div
              class="zm-component-blog-upcont"
              :style="{paddingBottom:settingData.ContmarginBottom.value,paddingTop:settingData.ContmarginBottom.value}"
            >
              <div
                class="zm-component-blog-title"
                :style="{textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize,lineHeight:1.3,
                height:parseInt(settingData.Familyfont.value.fontSize) *1.3 +'px'}"
              >
                <div
                  class="zm-component-blog-title-a"
                  :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}"
                >
                  {{item.fTitle}}
                </div>
              </div>
              <div
                class="zm-component-blog-date"
                :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.controlRowAlign.value,paddingTop:settingData.blogTimeTop.value,paddingBottom:parseInt(settingData.lineHeightNum.value)!=0?settingData.ContmarginTop.value:0,marginBottom:parseInt(settingData.lineHeightNum.value)!=0?(settingData.blogShow.value?settingData.firstHeight.value:0):0,display:settingData.blogShow.num}"
              >
                <div :style="{height:parseFloat(parseInt(settingData.blogTimeFont.value.fontSize) *1.3) +'px',lineHeight:1.3}">
                  {{item.fTime}}
                </div>
              </div>
              <div
                class="zm-component-blog-word"
                v-html="item.fContentText"
                :style="{height:settingData.lineHeightNum.num,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,lineHeight:settingData.ContLineHeight.num,textAlign:settingData.controlRowAlign.value,marginBottom:parseInt(settingData.lineHeightNum.value)!=0?settingData.firstHeight.value:0,marginTop:settingData.blogShow.value?0:setMarBot}"
              >
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
    <span v-html="changemsg"></span>
  </div>
  <div
    v-else-if="(!isComputer && settingData.mobileComIsHide)"
    class="zm-component-main-blog"
    :id="id"
    :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex,overflow: 'hidden',background:'white'}"
    @mousedown.stop.left="other($event),mousedown($event)"
    @contextmenu.stop.prevent="other($event),openMenu($event)"
    @dblclick.stop.prevent="openSetPane"
    :data-title="typeName"
    @mouseover.stop="handleEnter"
    @mouseout.stop="handleLeave"
  >
    <div
      ref="content"
      class="zm-component-blog-content mobileWord"
      :data-num="settingData.mobBlogNum.value"
    >
      <div
        v-for="(item,i) in setMobList"
        :key="i"
        class="zm-component-blog-box"
        :data-sortid="item.fId"
        :data-show="true"
        :data-time="item.fUpdateTime"
        :data-title="item.fTitle"
        :style="{paddingTop:settingData.mobTitLine.value==1?'12px':12-(((1.3*14)-14)/2) +'px',paddingBottom:'12px'}"
      >
        <div
          class="zm-component-blog-title"
          :style="{height:(settingData.mobTitLine.value == 1 ? (1.3*14)*1:(1.3*14)*2) +'px',fontFamily:settingData.Familyfont.value.fontFamily,lineHeight:'1.3'}"
        >
          {{item.fTitle}}
        </div>
        <div
          class="zm-component-blog-date"
          :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,display:settingData.mobBlogShow.num,paddingTop:settingData.mobBlogShow.value?settingData.mobTitLine.value==1?'12px':12-(((1.3*14)-14)/2) +'px':0}"
        >{{item.fTime}}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../../../style/component-blog/components.Blog.PC.Edit.css">
</style>

<script>
import callBack from "./wordBlog/callBackFunction.js";
import computed from "./wordBlog/computed.js";
export default {
  name: "com-word-blog",
  props: {
    prop: {
      type: Object,
      required: true
    },
    index: {
      type: [String, Number],
      required: true
    }
  },
  mixins: [callBack, computed], //callBack----设置项回调;computd----设置项;
  data() {
    return {
      isHoverColor: false,
      id: this.prop.id, //随机ID;
      type: "blog", //组件类别;
      typeName: "指定文字博客",
      mold: "commonUnit", //组件类型（普通组件：commonUnit)(普通容器：commonContainer) (特殊容器：multipleContainer)(其他自定义)
      style: this.prop.style, //组件样式;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      settingData: this.prop.settingData, //组件设置项数据;
      pattern: [0, 1, 0, 1, 0, 1, 0, 1],
      isRotate: false,
      minComH: null, //editor判断min height;
      comName: this.prop.comName, //组件列表中要显示组件名称
      buttonList: [
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "博客设置",
          paneInfo: "通过设置项设置组件的样式"
        },
        {
          type: "manage",
          title: "博客管理",
          icon: "icon-blog",
          callback: () => {
            zmEditor.$store.commit("changePaneData", {
              key: "paneType",
              value: true
            }); //打开弹窗;
            zmEditor.$store.commit("changePaneData", {
              key: "paneTitle",
              value: "博客管理"
            }); //弹窗标题;
            zmEditor.$store.commit("changePaneData", {
              key: "paneMode",
              value: "/com/blog/dialog/setBlog.vue"
            }); //弹窗内容应加载的组件路径;
            zmEditor.$store.commit("changePaneData", {
              key: "paneHelpInfo",
              value: "为博客组件指定博客"
            }); //弹窗标题;
          }
        },
        {
          type: "style",
          title: "变更样式",
          icon: "icon-style",
          paneTitle: "博客样式",
          paneInfo: "选择和替换博客样式！"
        },
        { type: "del", title: "删除", icon: "icon-delete" }
      ],
      mobileButtonList: [
        { type: "hide", title: "隐藏", icon: "icon-hide" },
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "博客设置",
          paneInfo: "通过设置项调整布局及样式",
          paneHeight: 410
        }
      ],
      items: [], //后台所有数据;
      lists: this.prop.lists, //后台前10条数据及选择数据;
      result: [],
      nStyle: {
        //存取初始值;
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0
      },
      mStyle: {
        //存取初始值;
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        dy: 0,
        dw: 0
      },
      oldWidth: 0,
      oldLeft: 0,
      oldMobWidth: 0,
      oldMobLeft: 0,
      disableToolH: true
    };
  },
  created() {
    let url = "/blog_api/shopBlogApi/queryByBlogIds"; //指定id查询信息;
    let newUrl = "/blog_api/shopBlogApi/queryByPage"; //最新blog数据;
    let typeName = this.settingData.defauletTypeName.value;
    let shop;
    let webType = zmEditor.$store.state.menu.webType;
    webType == "component" || webType == "template"
      ? (shop = "-888888")
      : (shop = this.fShopId);
    if (typeName == "最新发布的博客") {
      this.newAxios(newUrl, shop);
    } else {
      if (this.settingData.listsID.length != 0) {
        let arr = [];
        this.settingData.listsID.forEach(ite => {
          arr.push(ite.id);
        });
        let ads = JSON.stringify(arr);
        let fid = ads.slice(1, -1).replace(/\"/g, "");
        this.assignAxios(url, fid, shop);
      } else {
        this.assignAxios(url, "", shop);
      }
    }
  },
  mounted() {
    if (this.$store.state.pane.isRenderSelect) {
      this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
    } else {
      this.id == this.$store.state.component.oldComID &&
        this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
    }
  }
};
</script>
