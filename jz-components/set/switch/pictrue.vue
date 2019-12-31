<template>
  <div class="zm-edit-slider zm-edit-item" @mouseleave="addleave" ref="time">
    <div class="zm-edit-text">{{fTitle}}</div>
    <div class="zm-edit-components-img-proportion">
      <span v-bind:class="{'zm-edit-select':isSelect}" @click.self.prevent="addClick">{{changSelect.row}} : {{changSelect.col}}
        <i class="iconfont icon-sanjiao-copy" @click.self.prevent="addClick"></i>
      </span>
    </div>
    <div class="zm-edit-Vtime" v-show="isShow" @mouseleave="addleave">
        <ul :style="{height:isheight}">
          <div :style="{height:isheight}">
          <li v-for="(ite,index) in dataType" :key="index" @click="addSelectChang(ite)">{{ite.row}} : {{ite.col}}</li>
          </div>
        </ul>
    </div>
  </div>
</template>
<style scoped>
.zm-edit-item {
  display: table;
  vertical-align: middle;
  position: relative;
  font-size: 12px;
  color: #797979;
}
.zm-edit-text {
  width: 62px;
  text-align: left;
  display: inline-block;
  vertical-align: middle;
  padding-right: 9px;
}
.zm-edit-components-img-proportion {
  display: inline-block;
  width: 180px;
  height: 55px;
  line-height: 55px;
  vertical-align: middle;
}
.zm-edit-components-img-proportion span {
  width: 100%;
  height: 30px;
  line-height: 25px;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #797979;
  padding-top: 2px;
}
.zm-edit-components-img-proportion span i {
  color: #BCBCBC;
  font-size: 13px;
  float: right;
  margin-right: 4px;
  margin-top: 2px;
}
.zm-edit-components-img-proportion .zm-edit-select,.zm-edit-components-img-proportion>span:hover
{
  /* border: 1px solid  #3089d5; */
  font-size: 12px;
  /* box-shadow: 0 0 10px #3089d5; */
}
.zm-edit-components-img-proportion .zm-edit-select i {
  /* color: #3089d5; */
  border: none;
  box-shadow: none;
}
.zm-edit-Vtime {
  /* display: none; */
  position: absolute;
  top: 50px;
  left: 65px;
  z-index: 1000;
  width: 180px;
  background: #fff;
  color: #363636;
  box-shadow: 0 0 5px #BCBCBC;
  border-radius: 3px;
}
.zm-edit-Vtime ul {
  height: 120px;
}
.zm-edit-Vtime ul div {
  height: 150px;
  overflow-x: hidden;
}
.zm-edit-Vtime .nicescroll-cursors {
  /* background-color: #3098d5 !important; */
}
.zm-edit-Vtime li {
  height: 30px;
  line-height: 30px;
  padding: 0 16px 0 14px;
  font-size: 12px;
}
.zm-edit-Vtime li.icon-shenglvehao {
  font-size: 20px;
  padding-left: 10px;
}
.zm-edit-Vtime li:hover {
  background-color: #EFF6FC;
  cursor: pointer;
}
</style>
<script>
export default {
  name: "pictrue",
  props: ["prop"],
  data() {
    return {
      fTitle: "图片框宽高比例",
      isSelect: false,
      isShow: false,
      isheight: "120px",
      myBarOption: {
          barOpacityMin: 0,
          railColor: "transparent",
          barWidth: 10
      },
      dataType: [
        {
          row: 16,
          col: 9
        },
        {
          row: 3,
          col: 2
        },
        {
          row: 4,
          col: 3
        },
        {
          row: 1,
          col: 1
        }
      ],
      changSelect: {
        row: 16,
        col: 9
      }
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    }
  },
  created() {
    let attr = this.prop.attr;
    this.fTitle = this.prop.title;
    if (this.prop.label) {
      this.dataType = this.prop.label;
      this.isheight = parseInt(this.dataType.length) * 30 + "px";
    }
    this.changSelect.row = this.curSelectedCom.settingData[attr].row;
    this.changSelect.col = this.curSelectedCom.settingData[attr].col;
  },
  methods: {
    addClick() {
      this.isSelect = !this.isSelect;
      this.isShow = !this.isShow;
      let sizeDiv = this.$refs.time
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("div")[0];
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
    },
    addSelectChang(ite) {
      let attr = this.prop.attr;
      if (this.prop.callback) {
        this.prop.callback(ite.row, ite.col); //当前选中组件要改变的设置项属性值;
      }
      this.isSelect = false;
      this.isShow = false;
      this.changSelect.row = ite.row;
      this.changSelect.col = ite.col;
      this.curSelectedCom.settingData[attr].row = this.changSelect.row;
      this.curSelectedCom.settingData[attr].col = this.changSelect.col;
    },
     addleave(){
      this.isSelect = false;
      this.isShow = false;
    }
  }
};
</script>


