<template>
<div class="wrapl" @mouseleave.stop="leave($event)">
  <div class="fontFamily" id="set-fontFamily" ref="fontFamily">
    <!-- <div class="textWrap"> -->
      <input v-model="fontFamily" type="text" @keyup="seach($event,fontFamily)" @change="inputChange($event,fontFamily)" @blur="inputBlur($event)" @focus="inputFocus($event)">
      <i class="iconfont icon-xiangxia1" @click.stop="selFontList"></i>
    <!-- </div> -->
    <ul :class="{showul:showul}" @dblclick.stop.prevent="aaaa">
        <div class="wrap" @dblclick.stop.prevent="aaaa">
          <li v-for="(val,index) in item" :key="index" @mouseleave="leaveLi()" @dblclick.stop.prevent="aaaa" @mouseenter="!isHave && enter(index)" @click.stop="!isHave && selFont(index)">
            <span v-text="val.label" :style="{fontFamily:val.fontFamily}" :class="{seach: isHave}"></span>
          </li>
        </div>
    </ul>
  </div>
</div>
</template>

<script>
import 'jquery.nicescroll'
export default {
  name: "set-font-family",
  data() {
    return {
      mark: true,
      item: [],
      curItem: [],
      fontFamily: "微软雅黑",
      fontFamilyCopy: "微软雅黑",
      showul: false,
      isHave: false,
    };
  },
  props: ["prop"],
  methods: {
    aaaa(){
      console.log('=========');
      return
    },
    inputFocus(e){
      this.$store.commit('removeComKeyEvent');
      e.target.setSelectionRange(0,1);
      e.target.setSelectionRange(0,-1);
    },
    inputBlur(e){
      let input = e.currentTarget ; 
      this.$store.commit('addComKeyEvent') ;
      this.showul = false
      if(this.fontFamily == '' || this.isHave){
        console.log(this.fontFamily, this.fontFamilyCopy, 'kkkkk')
        this.fontFamily = this.prop.style["fontFamily"];
      }
    },
    inputChange(e,v){
      // for(let a=0;a<this.curItem.length;a++){
      //   if(this.curItem[a].label == v){
      //     this.prop.style.callBack1(v);
      //     this.item = this.curItem ;
      //   }
      // }
    },
    selFontList() {
      this.mark = false;
      let sizeDiv = this.$refs.fontFamily
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("div")[0];
      let input = this.$refs.fontFamily.getElementsByTagName("input")[0];
      let $sizeDiv = $(sizeDiv);
      $sizeDiv.niceScroll({
        cursorcolor: "#6eace2",
        boxzoom: true,
        cursorwidth: "6px",
        cursorborder: "0px solid #fff",
        cursorborderradius: "3px",
        railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
        preventmultitouchscrolling: true,
        autohidemode: false,
        cursordragspeed: 0.5,
        oneaxismousemode: false,
        enablescrollonselection: true
      });
      this.showul = !this.showul;
      let div = this.$refs.fontFamily
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("div");
      for (let i = 0; i < div.length; i++) {
        if (div[i].className == "") {
          div[i].style.display = "none";
        }
      }
      setTimeout(() => {
        this.mark = true;
        this.isHave = false;
        this.item = this.curItem;
      }, 20);
    },
    enter(index){
      let v = this.item[index].label;
      this.fontFamily = v;
      this.prop.style.callBack1(v);
    },
    leaveLi(){
      this.fontFamily = this.fontFamilyCopy;
      this.prop.style.callBack1(this.fontFamily);
    },
    selFont(index) {
      console.log('我被点击啦', index)
      this.showul = false;
      let v = this.item[index].label;
      this.fontFamily = v;
      this.fontFamilyCopy = v;
      this.prop.style.callBack1(v);
      this.$store.state.component.selectList[0].$store.commit('saveOperationToHistory')
      setTimeout(() => {
        this.item = this.curItem;
      }, 500)
      
    },
    seach(e,v){
      this.showul = true ;
      let sizeDiv = this.$refs.fontFamily
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("div")[0];
      let input = this.$refs.fontFamily.getElementsByTagName("input")[0] ;
      let $sizeDiv = $(sizeDiv);
      $sizeDiv.niceScroll({
        cursorcolor: "#6eace2",
        boxzoom: true,
        cursorwidth: "6px",
        cursorborder: "0px solid #fff",
        cursorborderradius: "3px",
        railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
        preventmultitouchscrolling: true,
        autohidemode: false,
        cursordragspeed: 0.5,
        oneaxismousemode: false,
        enablescrollonselection: true
      });
      
      let arr = [] , reg = /^[a-zA-Z]*$/ ;
      reg.test(v) && (v = v.toUpperCase()) ;//字母的情况
      if(v == ""){
        this.item = this.curItem
      }else{
        let arrLen = this.curItem.length 
        let strLen = v.length 
        for(let a=0;a<arrLen;a++){
          if(reg.test(v)){
            this.curItem[a].label.substring(0,strLen).toUpperCase() == v && arr.push(this.curItem[a]) 
          }else{
            this.curItem[a].label.substring(0,strLen) == v && arr.push(this.curItem[a]) 
          }
        }
        this.item = arr;
        this.isHave = false;
        if(arr.length < 1){
          // this.item = this.curItem
          this.item = [{
            label: '暂无更多',
            fontFamily: ''
          }]
          this.isHave = true;
        }
      }
    },
    leave(a) {
      this.showul = this.mark ? false : true;
    }
  },
  mounted() {
    this.item = this.$store.state.component.selectList[0].$store.state.otherStore.allFont;
    this.curItem = this.$store.state.component.selectList[0].$store.state.otherStore.allFont;
    this.fontFamily = this.prop.style["fontFamily"];
    this.fontFamilyCopy = this.prop.style["fontFamily"];
  }
};
</script>

<style scoped lang="less">
@baseColorDeep1: #2882ca;
@baseColor: #3089d5;        //主色调 原色 页面主体色hua
@baseColorLight1: #6eace2;  //主色调 浅+1 rgba(48,137,213,.7)下拉菜单hover颜色
@baseColorLight2: #83b8e6;  //主色调 浅+2 rgba(48,137,213,.6) 删除按钮hover颜色
@baseColorLight3: #97c4ea;  //主色调 浅+3 rgba(48,137,213,.5) 文本框获取焦点颜色,删除按钮原色
.wrapl{
  height: 100%;
  width: 90px;
  float: left;
  background-color: transparent;
  margin-right: 4px;
}
.fontFamily {
  width: 90px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 30px;
  margin-top: 8px;
  padding: 0 15px 0 4px;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  margin-right: 4px;
  float: left;
}
.fontFamily:hover {
  // box-shadow: 0 0 10px #3089d5;
  // border-color: #3089d5;
}
.fontFamily:hover .iconfont {
  // color: #3089d5;
}
.textWrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textWrap span{
  color: #333 ;
  
}
.iconfont {
  color: #ddd;
  display: block;
  position: absolute;
  top: 2px;
  right: 3px;
  font-size: 14px;
}
ul {
  width: 90px;
  height: 0;
  position: absolute;
  top: 31px;
  left: -1px;
  padding: 0;
  background: transparent;
  text-align: center;
  overflow: hidden;
  z-index: 9999;
  transition: 0.4s;
}
.wrap {
  width: 90px;
  max-height: 199px;
  overflow-x: hidden;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
}
input{
  display: block;
  width: 69px;
  height: 100%;
  position: absolute;
  font-size: 12px;
  top: 0;
  left: 0;
  text-indent:3px; 
  border-radius: 3px;
  line-height: 30px;
  border: 0 ;
  color: #333 ; 
  outline: medium;
}
li {
  list-style: none;
  height: 28px;
  width: 81px;
  overflow: hidden;
  color: #333 ;
}
li span{
  color: #333;
  font-size: 12px;
}
li:hover {
  background: rgba(48,137,213,0.08);
}
.showul {
  height: 200px;
  transition: 0.4s;
}
.seach {
  color: #797979;
  font-size: 12px;
}
</style>
