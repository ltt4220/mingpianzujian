<template>
  <div v-if="isComputer" class="zm-component-main-blog" :id="id" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,boxShadow: settingData.pictureShadow.num}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event)" ondragstart="return false"  @dblclick.stop.prevent="openSetPane">
    <div ref="content" class="zm-component-blog-content timeBlog" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in pageList" :key="i">
        <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle" :style="{backgroundColor:settingData.BoxBackgroundColor.value}">
          <div class="zm-component-blog-detail">
            <div class="zm-component-blog-upcont">
              <div class="zm-component-blog-title" :style="{marginTop:settingData.TitmarginTop.value,marginBottom:settingData.TitmarginBottom.value,textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                <a class="zm-component-blog-title-a" :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                  {{item.fTitle}}
                </a>
              </div>
              <div class="zm-component-blog-date" :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.blogTimeAlign.value,paddingTop:settingData.blogTimeTop.value,paddingBottom:settingData.blogTimeBottom.value,display:settingData.blogShow.num}">{{item.fUpdateTime}}
              </div>
              <div class="zm-component-blog-word" ref="word" v-html="item.fContent" :style="{ontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,marginTop:settingData.ContmarginTop.value,lineHeight:settingData.ContLineHeight.value,marginBottom:settingData.ContmarginBottom.value,textAlign:settingData.ContcontrolRowAlign.value,paddingLeft:settingData.contPaddingLR.value,paddingRight:settingData.contPaddingLR.value}">
              </div>
              <div class="zm-component-blog-viewMore" :style="{display:settingData.blogDetailsShow.num,textAlign:settingData.DiscontrolRowAlign.value,paddingTop:settingData.DismarginTop.value,paddingBottom:settingData.DismarginBottom.value,paddingLeft:settingData.DisPaddingLR.value,paddingRight:settingData.DisPaddingLR.value}">
                <a class="zm-component-details" v-bind:class="settingData.blogDetails.value.iconClass">
                  {{settingData.blogDetails.value.text}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
      <pagination :total="settingData.total" :current.sync="settingData.current" :display="settingData.display" :showPage="settingData.showPage" @pagechange="pagechangeA($event)"></pagination>
    </div>
    <span v-html="changemsg"></span>
  </div>
  <div v-else-if="(!isComputer && settingData.mobileComIsHide)" class="zm-component-main-blog" :id="id" :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event)"  @dblclick.stop.prevent="openSetPane">
    <div ref="content" class="zm-component-blog-content mobileLeft" :data-num="settingData.mobBlogNum.value">
      <div v-for="(item,i) in setMobList" :key="i" class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle">
        <div class="zm-component-blog-mediaBox medialBoxOne" v-if="(item.ahref == true)">
          <div class="zm-component-blog-bgImg" :data-sortid="item.fId" :style="{display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
          </div>
          <div class="zm-component-blog-bgVideo" :style="{display:item.videoDis}">
            <span class="zm-component-videoControls">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                <g>
                  <g class="st0">
                    <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                    <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                  </g>
                  <g>
                    <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                  </g>
                </g>
                <g class="st2">
                  <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                </g>

              </svg>
            </span>
            <video :poster="item.bgUrl" :src="item.source"></video>
          </div>
        </div>
        <div class="zm-component-blog-detail">
          <div class="zm-component-blog-upcont">
            <div class="zm-component-blog-title" :style="{fontFamily:settingData.Familyfont.value.fontFamily}">
              {{item.fTitle}}
            </div>
            <div class="zm-component-blog-date" :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,display:settingData.mobBlogShow.num}">{{item.fUpdateTime}}
            </div>
          </div>
        </div>
      </div>
       <div class="zm-box-loading" @click.stop="addBlogNum" :style="{color:settingData.blogScale.value,display:settingData.blogDetailsShow.num}">加载更多</div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
import callBack from "./timeBlog/callBackFunction.js";
import computed from "./timeBlog/computed.js";
import pagination from "./pagination";
export default {
  name: "com-time-blog",
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
  components: {
    pagination
  },
  data() {
    return {
      id: this.prop.id, //随机ID;
      type: "blog", //组件类别;
      mold: "commonUnit", //组件类型（普通组件：commonUnit)(普通容器：commonContainer) (特殊容器：multipleContainer)(其他自定义)
      style: this.prop.style, //组件样式;
      settingData: this.prop.settingData, //组件设置项数据;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      pattern: [0, 1, 0, 1, 0, 1, 0, 1], //托拽控制点：1：显示 0：隐藏;
      isRotate: false, //是否旋转;
      minComH:null,
      buttonList: [
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "博客设置",
          paneInfo:""
        },
        { type: "del", title: "删除", icon: "icon-delete"}
      ],
      mobileButtonList: [
        { type: "hide", title: "隐藏", icon: "icon-hide" },
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "博客设置"
        }],
      // settingData: {
      //   defauletTypeName: {
      //     value:"按时间排序"
      // },
      //   blogNum: {
      //     value: 1,
      //     id: "blog1-1",
      //     valName: "blogNum"
      //   },
      //   pictureShow: {
      //     value: "block"
      //   },
      //   BoxMarginBottom: {
      //     value: "10px",
      //     id: "blog1-2",
      //     valName: "BoxMarginBottom"
      //   },
      //   BoxMarginLeft: {
      //     value: "10px",
      //     id: "blog1-3",
      //     valName: "BoxMarginLeft"
      //   },
      //   BoxBackgroundColor: {
      //     value: "rgba(252,234,234,1)",
      //     id: "blog1-4",
      //     valName: "BoxBackgroundColor"
      //   },
      //   pictureLRPadding: {
      //     value: "0px",
      //     id: "blog1-6-4",
      //     valName: "pictureLRPadding"
      //   },
      //   pictureShadow: {
      //     value: false,
      //     num: "none",
      //     id: "blog1-5",
      //     valName: "pictureShadow"
      //   },
      //   hShadow: {
      //     value: "0px"
      //   },
      //   vShadow: {
      //     value: "0px"
      //   },
      //   blurShadow: {
      //     value: "5px"
      //   },
      //   colorShadow: {
      //     value: "rgba(0,0,0,0.2)"
      //   },
      //   pictureWidth: {
      //     value: "339px",
      //     id: "blog1-6-5",
      //     valName: "pictureWidth"
      //   },
      //   pictureHeight: {
      //     value: "239.0625px",
      //     id: "blog1-6-6",
      //     valName: "pictureHeight"
      //   },
      //   playWidth: {
      //     value: "100px",
      //     id: "blog1-8",
      //     valName: "playWidth"
      //   },
      //   controlRowAlign: {
      //     value: "left",
      //     id: "blog2-1",
      //     valName: "controlRowAlign"
      //   },
      //   Familyfont: {
      //     value: {
      //       fontFamily: "微软雅黑",
      //       fontSize: "18px",
      //       color: "rgba(206,53,53,1)",
      //       fontWeight: "normal",
      //       fontStyle: "normal"
      //     },
      //     opacity: "1",
      //     id: "blog2-2",
      //     valName: "Familyfont"
      //   },
      //   hoverColor: {
      //     value: "rgba(22,122,11,1)",
      //     id: "blog2-3",
      //     valName: "hoverColor"
      //   },
      //   TitmarginTop: {
      //     value: "0px",
      //     id: "blog2-4",
      //     valName: "TitmarginTop"
      //   },
      //   TitmarginBottom: {
      //     value: "0px",
      //     id: "blog2-5",
      //     valName: "TitmarginBottom"
      //   },
      //   blogShow: {
      //     value: true,
      //     num: "block",
      //     id: "blog3-1",
      //     valName: "blogShow"
      //   },
      //   blogTime: {
      //     value: "2018-1-26",
      //     id: "blog3-1-1",
      //     valName: "blogTime"
      //   },
      //   blogTimeFont: {
      //     value: {
      //       fontFamily: "微软雅黑",
      //       fontSize: "14px",
      //       color: "rgba(0,0,0,1)",
      //       fontWeight: "normal",
      //       fontStyle: "normal"
      //     },
      //     id: "blog3-1-2",
      //     valName: "blogTimeFont"
      //   },
      //   blogTimeAlign: {
      //     value: "left",
      //     id: "blog3-1-3",
      //     valName: "blogTimeAlign"
      //   },
      //   blogTimeTop: {
      //     value: "10px",
      //     id: "blog3-1-4",
      //     valName: "blogTimeTop"
      //   },
      //   blogTimeBottom: {
      //     value: "10px",
      //     id: "blog3-1-5",
      //     valName: "blogTimeBottom"
      //   },
      //   lineHeightNum: {
      //     value: 5,
      //     num: "140px",
      //     id: "blog4-1",
      //     valName: "lineHeightNum"
      //   },
      //   blogContFont: {
      //     value: {
      //       fontFamily: "微软雅黑",
      //       fontSize: "14px",
      //       color: "rgba(0,0,0,1)",
      //       fontWeight: "normal",
      //       fontStyle: "normal"
      //     },
      //     id: "blog4-2",
      //     valName: "blogContFont"
      //   },
      //   contPaddingLR: {
      //     value: "0px"
      //   },
      //   ContmarginTop: {
      //     value: "0px",
      //     id: "blog4-3",
      //     valName: "ContmarginTop"
      //   },
      //   ContTextIndent: {
      //     value: "0px",
      //     id: "blog4-4",
      //     valName: "ContTextIndent"
      //   },
      //   ContLineHeight: {
      //     value: "20px",
      //     id: "blog4-5",
      //     valName: "ContLineHeight"
      //   },
      //   ContmarginBottom: {
      //     value: "0px",
      //     id: "blog4-6",
      //     valName: "ContmarginBottom"
      //   },
      //   ContcontrolRowAlign: {
      //     value: "left",
      //     id: "blog4-7",
      //     valName: "ContcontrolRowAlign"
      //   },
      //   blogDetailsShow: {
      //     value: true,
      //     num: "block",
      //     id: "blog5-1",
      //     valName: "blogDetailsShow"
      //   },
      //   blogDetails: {
      //     value: {
      //       text: "查看详情",
      //       iconClass: ""
      //     }
      //   },
      //   DisPaddingLR: {
      //     value: "0px"
      //   },
      //   detailsWidth: {
      //     value: "100px"
      //   },
      //   detailsHeight: {
      //     value: "24px"
      //   },
      //   DiscontrolRowAlign: {
      //     value: "left",
      //     id: "blog5-1-2",
      //     valName: "DiscontrolRowAlign"
      //   },
      //   blogScale: {
      //     value: "rgba(50,137,199,1)",
      //     id: "blog5-1-3",
      //     valName: "blogScale"
      //   },
      //   DishoverColor: {
      //     value: "rgba(255,69,0,1)",
      //     id: "blog5-1-4",
      //     valName: "DishoverColor"
      //   },
      //   DismarginTop: {
      //     value: "10px",
      //     id: "blog5-1-5",
      //     valName: "DismarginTop"
      //   },
      //   DismarginBottom: {
      //     value: "0px",
      //     id: "blog5-1-6",
      //     valName: "DismarginBottom"
      //   }
      // },
      items: [], //后台所有数据;
      lists: [] //后台前10条数据及选择数据;
      // total: this.prop.settingData.total, // 记录总条数
      // display: this.prop.settingData.blogNum.value, // 每页显示条数
      // current: this.prop.settingData.current, // 当前第n页 ， 也可以 watch current 的变化
      // showPage: this.prop.settingData.showPage // 跳转到某页
    };
  },
  created() {
    var _this = this;
    var url = "/blog_api/shopBlogApi/queryByPage";
    var data = {};
    if (this.isComputer) {
      this.$axios
        .get(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        )
        .then(function(response) {
          let result = response.data.result;
          if (0 == result) {
            this.menulist = response.data.item.menulist;
          } else if (11 == result || 9 == result) {
            this.$router.push("/login");
          } else {
            var data = response.data.data;
            data.forEach(item => {
              const paten = /style\s*=\s*["'][^"']+["']/g;
              const re = /class\s*=\s*["'][^"']+["']/g;
              var date = new Date(item.fUpdateTime)
                .toLocaleString()
                .replace(/:d{1,2}$/, " ");
              item.fContent = item.fContent
                .replace(paten, "")
                .replace(re, "")
                .replace(/<\/?cite[^>]*>/g, "")
                .replace(/<p\s?><\/p>/g, "")
                .replace(/<p\s?><br\s*\/?><\/p>/g, "");
              item.fUpdateTime = date;
              item.isShowBlog = true;
              item.isTime = true;
              item.sapnBlock = "none";
              item.imgDis = "none";
              item.videoDis = "none";
              // .replace(/<br\s?\/>/g, "<br/>");
              // .replace(/<\/?span[^>]>/g, "")
              // .replace(/<\/?a[^>]>/g, "")
              // .replace(/<\/?ul[^>]*>/g, "")
              // .replace(/<li[^>]*>/g, "")
              // .replace(/<\/div>/g, "<br />")
              // .replace(/<div[^>]*>/g, "")
              // .replace(/<\/li>/g, "<br />")
              // .replace(/<p[^>]*>/g, "")
              // .replace(/<\/p>/g, "<br />")
              // .replace(/(<img[^>]+>)/, "<p>$1</p>")
              // .replace(/(<video[^>]+>.*<\/video>)/, "<p>$1</p>")
              // .replace(/<p\s?><\/p>/g, "")
              // .replace(/<p\s?><br\s*\/?><\/p>/g, "")
              // .replace(/<p\s?><\/p>/gm, "")
              // .replace(/<p\s?><br\s?\/><\/p>/gm, "")
              // .replace(/(<img[^>]+>)/, "</p><p>$1</p><p>")
              // .replace(/(<video[^>]+>.*<\/video>)/, "</p><p>$1</p><p>");
              //  .replace(/<p\s?><\/p>/g, "")
              //  .replace(/<p\s?><br\s?\/><\/p>/g, "");
              //  .replace(/<br>/g,'<br />')
              //   .replace(/(<img[^>]+>)/, "</p><p>$1</p><p>")
              //   .replace(/(<video[^>]+>.*<\/video>)/, "</p><p>$1</p><p>")
              //   .replace(/(<center[^>]+>.*<\/center>)/, "</p><p>$1</p><p>")
              // .replace(/(<a[^>]+>)/,"<p>");
              // aCont = aCont.replace(/(<p|<a)/g, '`$1')
              // aCont = aCont.split('`', 11).join("");
              // console.log(aCont,"__________________________")
              // item.fContent = aCont;
              // console.log(item.fContent,"///////////////////")
              if (item.fvideo.length > 0) {
                item.bgUrlv = item.fvideo[0][1];
                item.source = item.fvideo[0][0];
                item.sapnBlock = "block";
                item.videoDis = "block";
              }
              if (item.fImg.length > 0) {
                item.bgUrl = item.fImg[0];
                item.imgDis = "block";
              }
            });
            setTimeout(_this.setLHeigth, 200);
            // setTimetout(() => {
            //   $('.zm-component-blog-word').each((i,item)=>{
            //     let rowsNum=0, allHeight=0;
            //     $(item).children().each((i1,item2)=>{
            //       if(rowsNum<10){
            //         if($(item2).html().test(/<img|<video/ig)){
            //           rowsNum++
            //           allHeight+=$(item2).height();
            //         }else{
            //           rowsNum+=$(item2).height()/20;
            //           allHeight+=$(item2).height();
            //           if(rowsNum>10){
            //             allHeight-=(rowsNum-10)*20
            //           }
            //         }
            //       }
            //     })
            //     $(item).height(allHeight);
            //   })
            // }, 100)
            _this.items = data;
            _this.lists = _this.items.slice(0, 50);
          }
        })
        .catch(function(response) {
          // 这里是处理错误的回调
          console.log(response);
        });
    } else {
      this.$axios
        .get(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(function(response) {
          let result = response.data.result;
          if (0 == result) {
            this.menulist = response.data.item.menulist;
          } else if (11 == result || 9 == result) {
            this.$router.push("/login");
          } else {
            var data = response.data.data;
            data.forEach(item => {
              const paten = /style\s*=\s*["'][^"']+["']/g;
              const re = /class\s*=\s*["'][^"']+["']/g;
              var date = new Date(item.fUpdateTime)
                .toLocaleString()
                .replace(/:d{1,2}$/, " ");
              item.fUpdateTime = date;
              item.isShowBlog = true;
              if (item.fvideo.length > 0) {
                item.bgUrl = item.fvideo[0][1];
                item.source = item.fvideo[0][0];
                item.imgDis = "none";
                item.videoDis = "block";
                item.ahref = true;
              } else {
                if (item.fImg.length > 0) {
                  item.bgUrl = item.fImg[0];
                  item.imgDis = "block";
                  item.videoDis = "none";
                  item.ahref = true;
                } else {
                  item.bgUrl ="";
                  item.imgDis = "none";
                  item.videoDis = "none";
                  item.ahref = false;
                }
              }
            });
            _this.items = data;
            _this.lists = _this.items.slice(0, 50);
            setTimeout(_this.setMoblieHeight, 200);
          }
        })
        .catch(function(response) {
          // 这里是处理错误的回调
          console.log(response);
        });
    }
  },
  watch: {
    style: {
      handler(val, oldval) {
        this.rearchData();
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    isComputer(newVal, old) {
      if (newVal) {
        this.style.height = this.$el.firstChild.clientHeight;
      } else {
        this.mobileStyle.height = this.$el.firstChild.clientHeight;
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
    // let _this = this;
    // let setCend = () => {
    //   let time = null;
    //   if (_this.$el.firstChild.clientHeight == 0) {
    //     time = setTimeout(setCend, 10);
    //   } else {
    //     if (!_this.isComputer) {
    //       _this.mobileStyle.height = _this.$el.firstChild.clientHeight;
    //     }
    //     clearTimeout(time);
    //   }
    // };
    // setCend();
    // if (!this.isComputer) {
    //   if (parseInt(this.settingData.Familyfont.value.fontSize) > 14) {
    //     this.settingData.mobFontSize.value = "14px";
    //   } else {
    //     this.settingData.mobFontSize.value = this.settingData.Familyfont.value.fontSize;
    //   }
    // }
    if (!this.isComputer && this.settingData.mobileComIsHide) {
      this.settingData.mobBlogNum.value == null
        ? (this.settingData.mobBlogNum.value = this.settingData.blogNum.value)
        : "";
      if (this.settingData.mobBlogShow.num == null) {
        this.settingData.mobBlogShow.num = this.settingData.blogShow.num;
        this.settingData.mobBlogShow.value = this.settingData.blogShow.value;
      }
    }
  }
};
</script>