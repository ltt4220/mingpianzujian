<template>
    <div v-if="isComputer" class="zm-component-main-blog" :data-title="typeName" :id="id"
         :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}"
         @mousedown.stop.left="other($event),mousedown($event)"
         @contextmenu.stop.prevent="other($event),openMenu($event)" @dblclick.stop.prevent="openSetPane"
         @mouseover.stop="handleEnter" @mouseout.stop="handleLeave">
        <div class="zm-component-blog-content leftPic" data-type="words" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in setList" :key="i">
        <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime"
             :data-title="item.fTitle"
             :style="{backgroundColor:settingData.BoxBackgroundColor.value,padding:settingData.paddingLeftRight.value}">
          <div class="zm-component-blog-mediaBox medialBoxOne"
               :style="{padding:settingData.pictureLRPadding.value,width:settingData.pictureWidth.value,height:settingData.pictureHeight.value}">
            <a class="zm-component-blog-bgImg" @click.stop="checkBlogPicture(item)" :data-sortid="item.fId"
               :data-show="item.ahref" :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
            </a>
            <a class="zm-component-blog-bgVideo" :style="{display:item.videoDis}">
              <span class="zm-component-videoControls"
                    :style="{width:settingData.playWidth.value,height:settingData.playWidth.value}">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;fill: #fff;" xml:space="preserve">
                  <!--<g>
                    <g class="st0">
                      <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                    <g>
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                  </g>-->
                  <g class="st2">
                    <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                  </g>
                </svg>
              </span>
              <video :poster="item.bgUrl" :src="item.source"></video>
            </a>
          </div>
          <div class="zm-component-blog-detail">
            <div class="zm-component-blog-upcont" :style="{width:settingData.contWidth.value+'px'}">
              <div class="zm-component-blog-title"
                   :style="{textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                <a class="zm-component-blog-title-a"
                   :style="{display:'inline-block',height:settingData.Familyfont.value.fontSize,lineHeight: settingData.Familyfont.value.fontSize,overflow:'hidden',fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                  {{item.fTitle}}
                </a>
              </div>
              <div class="zm-component-blog-date"
                   :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.blogTimeAlign.value,paddingTop:settingData.blogTimeTop.value,paddingBottom:settingData.ContmarginTop.value,marginBottom:settingData.firstHeight.value}">{{item.fTime}}
              </div>
              <div class="zm-component-blog-mediaBox mediaBoxTwo">
                <div class="zm-component-blog-bgImg" :data-sortid="item.fId"
                     :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">

                </div>
                <div class="zm-component-blog-bgVideo" :style="{display:item.videoDis}">
                  <span class="zm-component-videoControls">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;fill: #fff;" xml:space="preserve">
                      <!--<g>
                        <g class="st0">
                          <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                        <g>
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                      </g>-->
                      <g class="st2">
                        <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                      </g>

                    </svg>
                  </span>
                  <video :poster="item.bgUrl" :src="item.source" loop></video>
                </div>
              </div>
              <div class="zm-component-blog-word" v-html="item.fContentText"
                   :style="{height:settingData.lineHeightNum.num,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,lineHeight:settingData.ContLineHeight.num,textAlign:settingData.ContcontrolRowAlign.value}">
              </div>
              <div class="zm-component-blog-viewMore"
                   :style="{display:settingData.blogDetailsShow.num,textAlign:settingData.DiscontrolRowAlign.value,paddingTop:settingData.DismarginTop.value,paddingBottom:settingData.DismarginBottom.value,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,marginTop:settingData.lastHeight.value}">
                <a class="zm-component-details" v-bind:class="settingData.blogDetails.value.iconClass"
                   :style="{fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle}">
                  {{settingData.blogDetails.value.text}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
        </div>
        <span v-html="changemsg"></span>
    </div>
    <div v-else-if="(!isComputer && settingData.mobileComIsHide)" :data-title="typeName" class="zm-component-main-blog"
         :id="id"
         :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex}"
         @mousedown.stop.left="other($event),mousedown($event)"
         @contextmenu.stop.prevent="other($event),openMenu($event)" @dblclick.stop.prevent="openSetPane"
         @mouseover.stop="handleEnter" @mouseout.stop="handleLeave">
        <div ref="content" class="zm-component-blog-content mobileLeft" :data-num="settingData.mobBlogNum.value">
            <div v-for="(item,i) in setMobList" :key="i" class="zm-component-blog-box" :data-sortid="item.fId"
                 :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle">
                <div class="zm-component-blog-mediaBox medialBoxOne" :style="{width:settingData.mobileHeight.value}">
                    <div class="zm-component-blog-bgImg" @click.stop="checkBlogPicture(item)" :data-sortid="item.fId"
                         :data-show="item.ahref" :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
                    </div>
                    <div class="zm-component-blog-bgVideo" :style="{display:item.videoDis}">
                        <span class="iconfont icon-bofang1"></span>
                        <video :poster="item.bgUrl" :src="item.source"></video>
                    </div>
                </div>
                <div class="zm-component-blog-detail">
                    <div class="zm-component-blog-upcont">
                        <div class="zm-component-blog-title"
                             :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.mobTitle.value,lineClamp: 2,boxOrient:'vertical'}">
                            {{item.fTitle}}
                        </div>
                        <div class="zm-component-blog-date"
                             :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.mobDate.value,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,display:settingData.mobBlogShow.num}">
                            {{item.fTime}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import "../../../style/component-blog/components.Blog.PC.Edit.css";
    #set-fontFamily ul li span{
        display: inline-block;
        width: 100%;
        white-space: nowrap;
    }
</style>

<script>
    import callBack from "./onlyBlog/callBackFunction.js";
    import computed from "./onlyBlog/computed.js";
    import publice from "./dialog/public.js";

    export default {
        name: "com-picture-only-blog",
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
                // mobileIsHide: true,
                id: this.prop.id, //随机ID;
                type: "blog", //组件类别;
                typeName: "指定图文博客",
                mold: "commonUnit", //组件类型（普通组件：commonUnit)(普通容器：commonContainer) (特殊容器：multipleContainer)(其他自定义)
                style: this.prop.style, //组件样式;
                settingData: this.prop.settingData, //组件设置项数据;
                mobileStyle: this.prop.mobileStyle, //手机版样式
                pattern: [0, 1, 0, 1, 0, 1, 0, 1],
                minComH: null, //editor判断min height;
                isRotate: false,
                comName: this.prop.comName,//组件列表中要显示组件名称
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
                    {type: "del", title: "删除", icon: "icon-delete"}
                ],
                mobileButtonList: [
                    {type: "hide", title: "隐藏", icon: "icon-hide"},
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
                checkImgId: "",
                public: publice,
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
            let _this = this;
            if (this.$store.state.pane.isRenderSelect) {
                this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
            } else {
                this.id == this.$store.state.component.oldComID &&
                this.$store.commit("changeSelectList", this); //渲染组件的时候自动选中;
            }
            this.mobChangeSet();//移动端样式初始化;
        },
        watch: {
            isComputer(newVal, old) {
                if (newVal) {
                    this.style.height = this.$el.firstChild.clientHeight;
                } else {
                    this.mobileStyle.height = this.$el.firstChild.clientHeight;
                }
            },
            "settingData.mobileComIsHide"(val) {
                if (val) {
                    this.mobChangeSet();
                }
            }
        }
    };
</script>
