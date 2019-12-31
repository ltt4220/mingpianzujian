<template>
  <div class="setTextLayout zm-edit-item" v-if="!prop.isShowSet">
      <div class="title" :class="{height:height}" v-text="prop.title"></div>
      <div class="con">
          <div :class="{on:onleft,hoverColor:leftHover}" @click="left" @mouseenter="leftEnter" @mouseleave="leftEnter2" :style="{
            float: 'left',
            position: 'relative',
            width: '40px',
            height: '40px',
            marginTop: '8px',
            marginLeft: '10px',
          }">
            <svg :style='{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "0px",
              left: "9px",
              fill: onleft ? "#ffffff" : "#797979"
            }' version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" fill="#797979">
              <rect width="14" height="2"/>
              <rect y="6"  width="20" height="2"/>
              <rect y="12"  width="14" height="2"/>
              <rect y="18"  width="20" height="2"/>
            </svg>
          </div>
          <div :class="{on:onmid,hoverColor:midHover}" @click="mid" @mouseenter="midEnter" @mouseleave="midEnter2" :style="{
            float: 'left',
            position: 'relative',
            width: '40px',
            height: '40px',
            marginTop: '8px',
            marginLeft: '10px',
          }">
            <svg :style='{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "0px",
              left: "9px",
              fill: onmid ? "#ffffff" : "#797979"
            }' version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" fill="#797979">
            <rect x="3"  width="14" height="2"/>
            <rect y="6"  width="20" height="2"/>
            <rect x="3" y="12"  width="14" height="2"/>
            <rect y="18"  width="20" height="2"/>
            </svg>
          </div>
          <div :class="{on:onright,hoverColor:rightHover}" v-if="midShow" @click="right" @mouseenter="rightEnter" @mouseleave="rightEnter2" :style="{
            float: 'left',
            position: 'relative',
            width: '40px',
            height: '40px',
            marginTop: '8px',
            marginLeft: '10px',
          }">
            <svg :style='{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "0px",
              left: "9px",
              fill: onright ? "#ffffff" : "#797979"
            }' version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" fill="#797979">
            <rect x="6"  width="14" height="2"/>
            <rect y="6"  width="20" height="2"/>
            <rect x="6" y="12"  width="14" height="2"/>
            <rect y="18"  width="20" height="2"/>
            </svg>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "set-text-layout",
  data() {
    return {
      onleft: false,
      onright: false,
      onmid: false,
      height: false,
      leftHover:false,
      midHover:false,
      rightHover:false,
      show:true,
      midShow: true
    };
},  
  props: ["prop"],
  methods: {
    left() {
      this.onleft = true;
      this.onright = false;
      this.onmid = false;
      this.prop.style.callBack("left");
      this.$store.state.component.selectList[0].$store.commit('saveOperationToHistory')
    },
    leftEnter(){
      this.leftHover = true ;
      this.midHover = false ;
      this.rightHover = false ;
    },
    rightEnter2(){
      this.leftHover = false ;
      this.midHover = false ;
      this.rightHover = false ;
    },
    midEnter2(){
      this.leftHover = false ;
      this.midHover = false ;
      this.rightHover = false ;
    },
    leftEnter2(){
      this.leftHover = false ;
      this.midHover = false ;
      this.rightHover = false ;
    },
    midEnter(){
      this.leftHover = false ;
      this.midHover = true ;
      this.rightHover = false ;
    },
    rightEnter(){
      this.leftHover = false ;
      this.midHover = false ;
      this.rightHover = true ;
    },
    mid() {
      this.onleft = false;
      this.onright = false;
      this.onmid = true;
      this.prop.style.callBack("center");
      this.$store.state.component.selectList[0].$store.commit('saveOperationToHistory')
    },
    right() {
      this.onleft = false;
      this.onright = true;
      this.onmid = false;
      this.prop.style.callBack("right");
      this.$store.state.component.selectList[0].$store.commit('saveOperationToHistory')
    },
    Trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, ""); 
    }
  },
  mounted() {
    this.Trim(this.prop.style.textAlign) == "left" && (this.onleft = true);
    this.Trim(this.prop.style.textAlign) == "center" && (this.onmid = true);
    this.Trim(this.prop.style.textAlign) == "right" && (this.onright = true);
    this.prop.height == 1 && (this.height = true);
    this.prop.midShow == 1 && (this.midShow = false);
  }
};
</script>
<style lang='less' scoped>
@baseColorDeep1: #2882ca;
@baseColor: #3089d5;        //主色调 原色 页面主体色
@baseColorLight1: #6eace2;  //主色调 浅+1 rgba(48,137,213,.7)下拉菜单hover颜色
@baseColorLight2: #83b8e6;  //主色调 浅+2 rgba(48,137,213,.6) 删除按钮hover颜色
@baseColorLight3: #97c4ea;  //主色调 浅+3 rgba(48,137,213,.5) 文本框获取焦点颜色,删除按钮原色
.setTextLayout {
  height: 56px;
  width: 245px;
  margin: 0 20px;
  border-bottom: 1px solid #f5f5f5;
}
.title {
  font-size: 12px;
  float: left;
  height: 56px;
  width: 73px;
  line-height: 56px;
  color: #797979
}
.height {
  height: 20px;
  line-height: 20px;
  width: 56px;
  margin-top: 8px;
}
.con div {
  float: left;
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 10px;
  line-height: 42px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  svg{
    fill:#797979;
    width: 20px;
    height: 20px;
    margin-top: 10px;
  }
}
.hoverColor{
  background: @baseColorLight3;
}
.con .on {
  background: @baseColor;
  svg{
    fill:#ffffff ;
  }
}
.iconfont {
  color: #797979;
  font-size: 25px;
}
</style>