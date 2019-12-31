<template>
  <div class="Myscale" :class="{border:border}"   @mouseleave.stop="leave">
      <div class="title" :class="{height:height}">
          {{prop.title}}
      </div>
      <div class="slideCon" @click.stop="selScale">
        <i class="iconfont icon-xiangxia1"></i>
        <div class="cur"  v-if="prop.icon != 1">{{prop.curRatio}}</div>
        <div class="cur curText"  v-if="prop.icon == 1">
            <div class="iconP1">
                <i class="iconfont" :class="prop.curIcon"></i>
            </div>
            {{prop.curRatio}}
        </div>
        <ul :class="{on:on,zindex:zindex}" v-if="prop.icon != 1">
            <div class="wrap">
                <li v-for="(val,index) in prop.list" :key="index" @click="scale(val)">{{val}}</li>
            </div>
        </ul>
        <ul :class="{on:on,zindex:zindex}" v-if="prop.icon == 1">
            <div class="wrap">
                <li v-for="(val,index) in prop.list" :class="{textIndet:textIndet}" :key="index" @click="scale(val.title,val.left,index)">
                    <div class="iconP1">
                        <i class="iconfont" :class="val.left"></i>
                    </div>
                    {{val.title}}
                </li>
            </div>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "scale",
  data() {
    return {
      showUl: false,
      on: false,
      height: false,
      zindex: false,
      border: false,
      textIndet: false,
      list: [
        "icon-danxianjiantou-copy",
        "icon-shuangxianjiantou-copy",
        "icon-longArrow-copy",
        "icon-triangle-right"
      ]
    };
  },
  props: ["prop"],
  methods: {
    scale(a, b, index) {
      //title,left箭头,index
      this.prop.callBack(a, b, this.list[index],this);
      this.prop.curRatio = a;
      if (this.prop.curIcon) {
        this.prop.curIcon = b;
      }
    },
    selScale() {
      this.on = !this.on;
      if (this.on) {
        this.zindex = true;
      } else {
        setTimeout(() => {
          this.zindex = false;
        }, 250);
      }
    },
    leave() {
      this.on = false;
      setTimeout(() => {
        this.zindex = false;
      }, 250);
    }
  },
  mounted() {
    if (this.prop.height == 1) {
      this.height = true;
    }
    if (this.prop.height == 2) {
      this.textIndet = true;
    }
    if (this.prop.border == 1) {
      this.border = true;
    }
    if (this.prop.list.length == 0) {
      this.prop.list = [1, 2, 3, 4];
    }
  }
};
</script>
<style lang='less' scoped>
@baseColor: #3089d5; 
@gray3: #d7d7d7; 
@baseColorLight2: #83b8e6;
@baseColorLight3: #97c4ea;
@baseColorLight4: #d6e7f7;//he
@white: #fff;   
@fontColor: #0e293f; 
@gray4: #f2f2f2;
.Myscale {
  width: 246px;
  height: 55px;
  margin: 0 20px;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  font-size: 12px;
  color: #797979 ;
}
.border {
  border: none;
}
.title,
.slideCon {
  float: left;
  position: relative;
  margin-top: 12px;
  color: #797979 ;
}
.title {
  width: 67px;
  height: 32px;
  line-height: 32px;
  color: #797979 ;
}
.height {
  height: 20px;
  line-height: 18px;
  margin-top: 10px;
}
.slideCon {
  width: 176px;
  height: 30px;
  border: 1px solid #eee;
  border-radius: 3px;
}
.cur .iconfont {
  color: #3089d5;
  font-size: 12px;
}
.cur{
  // color: #797979 ;
  color: #3089d5 ;
}
.slideCon:hover .icon-xiangxia1 {
  color: @baseColor;
}
.slideCon:hover {
  border: 1px solid @baseColor;
}
.icon-xiangxia1 {
  color: #bcbcbc;
  font-size: 14px;
  display: block;
  position: absolute;
  top: 8px;
  right: 6px;
}
ul {
  position: absolute;
  width: 176px;
  top: 31px;
  height: 0;
  overflow: hidden;
  left: -1px;
  background: transparent;
  transition: 0.3s;
}
ul .iconfont {
  color: #3089d5;
  font-size: 14px;
}
.on {
  height: 183px;
}
.zindex {
  z-index: 2;
}
.wrap {
  border: 1px solid #eee;
  border-radius: 3px;
  width: 176px;
  background: #fff;
}
.slideCon .wrap {
  margin: 0;
  float: none;
}
ul li {
  list-style: none;
  line-height: 30px;
  text-indent: 10px;
  cursor: pointer;
  position: relative;
  color: #797979 ;
}
.textIndet {
  text-indent: 30px;
}
.iconP1 {
  width: 15px;
  height: 19px;
  position: absolute;
  top: 5px;
  left: 10px;
  // background-color: none !important;
  color: #3089d5;
  text-align: center;
  line-height: 18px;
  text-indent: 0;
}
ul li:hover {
  background:@baseColorLight4;
}
.cur {
  line-height: 25px;
  text-indent: 10px;
  position: relative;
}
.curText {
  line-height: 30px;
  text-indent: 0px;
  padding-left: 30px;
  color:#797979;
}
</style>