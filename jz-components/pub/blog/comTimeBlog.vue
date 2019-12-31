<template>
  <div class="zm-component-main-blog" :id="id" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex,boxShadow:settingData.pictureShadow.num}">
    <div class="zm-component-blog-content timeBlog" data-type="words" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in pageList" :key="i">
        <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle" :style="{backgroundColor:settingData.BoxBackgroundColor.value}">
          <div class="zm-component-blog-detail">
            <div class="zm-component-blog-upcont">
              <div class="zm-component-blog-title" :style="{marginTop:settingData.TitmarginTop.value,marginBottom:settingData.TitmarginBottom.value,textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                <a class="zm-component-blog-title-a" target="_blank" :href="item.Detail" :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                  {{item.fTitle}}
                </a>
              </div>
              <div class="zm-component-blog-date" :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.blogTimeAlign.value,paddingTop:settingData.blogTimeTop.value,paddingBottom:settingData.blogTimeBottom.value,display:settingData.blogShow.num}">{{item.fUpdateTime}}
              </div>
              <div class="zm-component-blog-word" v-html="item.fContent" :style="{ontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,marginTop:settingData.ContmarginTop.value,lineHeight:settingData.ContLineHeight.value,marginBottom:settingData.ContmarginBottom.value,textAlign:settingData.ContcontrolRowAlign.value,height:settingData.lineHeightNum.num,paddingLeft:settingData.contPaddingLR.value,paddingRight:settingData.contPaddingLR.value}">
              </div>
              <div class="zm-component-blog-viewMore" :style="{display:settingData.blogDetailsShow.num,textAlign:settingData.DiscontrolRowAlign.value,paddingTop:settingData.DismarginTop.value,paddingBottom:settingData.DismarginBottom.value,paddingLeft:settingData.DisPaddingLR.value,paddingRight:settingData.DisPaddingLR.value}">
                <a class="zm-component-details" target="_blank" :href="item.Detail" v-bind:class="settingData.blogDetails.value.iconClass">
                  {{settingData.blogDetails.value.text}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
      <pagination v-if="pageList.length != 0" :total="settingData.total" :current.sync="settingData.current" :display="settingData.display" :showPage="settingData.showPage" @pagechange="pagechangeA($event)"></pagination>
    </div>
    <span v-html="changemsg"></span>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
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
  mixins: [computed], //callBack----设置项回调;computd----设置项;
  components: {
    pagination
  },
  data() {
    return {
      id: this.prop.id, //随机ID;
      style: this.prop.style, //组件样式;
      settingData: this.prop.settingData, //组件设置项数据;
      items: [],
      lists: [] //后台前10条数据及选择数据, //后台前10条数据及选择数据;
    };
  },
  created() {
    var _this = this;
    var url = "/blog_api/shopBlogApi/queryByPage";
    var data = {};
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
          console.log(response.data);
        }
      })
      .catch(function(response) {
        // 这里是处理错误的回调
        console.log(response);
      });
  },
  methods: {
    pagechangeA(p) {
      // 页码改变event ， p 为新的 current ,showPage为当前页;
      this.settingData.current = parseInt(p);
      let _this = this;
      setTimeout(() => {
        _this.setLHeigth(this.settingData.blogNum.value);
      }, 200);
    },
    textIntent() {
      var _this = this;
      let farth = _this.$el.getElementsByClassName("zm-component-blog-word");
      for (let i = 0; i < farth.length; i++) {
        for (let j = 0; j < farth[i].children.length; j++) {
          let re = /<img|<video/gi;
          if (re.test(farth[i].children[j].innerHTML)) {
          } else {
            farth[i].children[j].style.textIndent =
              _this.settingData.ContTextIndent.value;
            break;
          }
        }
      }
    },
    setLHeigth() {
      var _this = this;
      let farth = _this.$el.getElementsByClassName("zm-component-blog-word");
      for (let i = 0; i < farth.length; i++) {
        var lineNum = parseInt(_this.settingData.lineHeightNum.value),
          rowsNum = 0,
          allHeight = 0,
          lineHeight = parseInt(_this.settingData.ContLineHeight.value);
        for (let j = 0; j < farth[i].children.length; j++) {
          if (rowsNum < lineNum) {
            let re = /<img|<video/gi;
            if (re.test(farth[i].children[j].innerHTML)) {
              let imgWidth = farth[i].children[j].children;
              for (let k = 0; k < imgWidth.length; k++) {
                let time = null;
                imgWidth[k].style.display = "block";
                if (imgWidth[k].clientWidth > _this.style.width) {
                  imgWidth[k].style.width = "100%";
                  imgWidth[k].style.height = "100%";
                  imgWidth[k].style.objectFit = "cover";
                }
                if (farth[i].children[j].children[k].clientHeight != 0) {
                  if (imgWidth.length > 1) {
                    rowsNum++;
                    if (rowsNum > lineNum) {
                      break;
                    } else {
                      for (let f = k; f < rowsNum; f++) {
                        try {
                          console.log(
                            f,
                            "==========",
                            farth[i].children[j].children[f]
                          );
                          allHeight +=
                            farth[i].children[j].children[f].clientHeight;
                        } catch (err) {
                          console.log(err, "图片高度异常===========");
                        }
                      }
                    }
                  } else {
                    console.log("===========______");
                    rowsNum++;
                    allHeight += farth[i].children[j].clientHeight;
                  }
                } else {
                  clearTimeout(time);
                  time = setTimeout(function() {
                    _this.setLHeigth();
                  }, 10);
                }
              }
            } else {
              rowsNum += farth[i].children[j].clientHeight / lineHeight;
              allHeight += farth[i].children[j].clientHeight;
              if (rowsNum > lineNum) {
                allHeight -= (rowsNum - lineNum) * lineHeight;
              }
            }
          }
        }
        farth[i].style.height = allHeight + "px";
        _this.textIntent();
        setTimeout(() => {
          _this.style.height = _this.$el.firstChild.clientHeight;
        }, 100);
      }
    }
  }
};
</script>