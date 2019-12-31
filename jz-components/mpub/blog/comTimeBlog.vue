<template>
 <div class="zm-component-main-blog" :id="id" :style="{position: 'absolute', width: mobileStyle.width+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',zIndex:mobileStyle.zindex,boxShadow:settingData.pictureShadow.num}" ondragstart="return false">
    <div class="zm-component-blog-content mobileTime" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in pageList" :key="i">
        <div class="zm-component-blog-boxMeblie" :data-sortid="item.fId" :data-show="true" :data-time="item.fUpdateTime" :data-title="item.fTitle">
          <div class="zm-component-blog-title">
            <a class="zm-component-blog-title-a" target="_blank" :href="item.wapDetail">
              {{item.fTitle}}
            </a>
          </div>
          <div class="zm-component-blog-word-mobile">{{item.fContent_}}
          </div>
        </div>
      </span>
    </div>
    <span v-html="changemsg"></span>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
import computed from "./timeBlog/computed.js";
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
  data() {
    return {
      id: this.prop.id, //随机ID;
      mobileStyle: this.prop.mobileStyle, //手机版样式
      settingData: this.prop.settingData, //组件设置项数据;
      items:[],
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
              item.fUpdateTime = date;
              item.isShowBlog = true;
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
  },
  methods: {
    setMoblieHeight() {
            let _this = this;
            let oTitle = _this.$el.getElementsByClassName("zm-component-blog-title");
            let oCont = _this.$el.getElementsByClassName("zm-component-blog-word-mobile");
            for (let i = 0; i < oCont.length; i++) {
                let aTitHeight = oTitle[i].offsetHeight;
                aTitHeight >= 40 ? (aTitHeight = 50) : (aTitHeight = 30);
                oCont[i].style.height = (110 - aTitHeight) - 40 + "px"; //40：box的间距;110:_this.mobileStyle.height;
                _this.settingData.setMobContHeight.value = (110 - aTitHeight) - 40 + "px"; //40：box的间距;110:_this.mobileStyle.height;
            }
        }
  }
};
</script>