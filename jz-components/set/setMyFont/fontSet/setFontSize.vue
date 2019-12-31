<template>
<div class="wrapl" @mouseleave.stop="leave($event)">
  <div class="fontSize" id="set-fontSize" @click.stop="selFontList"  ref="fontSize">
    <input v-model="fontSize" type="text" @change="inputChange(fontSize)" @blur="inputBlur()" @focus="inputFocus($event)">
    <i class="iconfont icon-xiangxia1"></i>
    <ul :class="{showul:showul}">
        <div class="wrap">
          <li v-text="val.fontSize" v-for="(val,index) in item" :key="index" @click.stop="selFont(index)"></li>
        </div>
    </ul>
  </div>
</div>
</template>

<script>
  export default {
    name: "select-font-family",
    data(){
      return{
        item:[],
        fontSize:"20",
        curFont:'',
        showul:false,
      }
    },
    props:['prop'],
    methods:{
      inputFocus(e){
        this.$store.commit('removeComKeyEvent') ;
        e.target.setSelectionRange(0,1);
        e.target.setSelectionRange(0,-1);
      },
      inputBlur(){
        this.$store.commit('addComKeyEvent') ;
      },
      seach(e){
        this.showul = true ;
        let sizeDiv = this.$refs.fontSize
          .getElementsByTagName("ul")[0]
          .getElementsByTagName("div")[0];
        let input = this.$refs.fontSize.getElementsByTagName("input")[0] ;
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
      inputChange(v){
        this.showul = false ;
        v == "" && (v = this.curFont) ;
        v < 12 && (v = 12) ;
        v > 200 && (v = 200) ;
        this.fontSize = v ;
        v = v + "px" ;
        this.prop.style.callBack2(v) ;
      },
      selFontList(){
        let sizeDiv = this.$refs.fontSize.getElementsByTagName("ul")[0].getElementsByTagName("div")[0] ;
        let $sizeDiv = $(sizeDiv) ;
        $sizeDiv.niceScroll({
          cursorcolor:"#97c4ea",
          boxzoom:true,
          cursorwidth: "6px",
          cursorborder: "0px solid #fff",
          cursorborderradius: "3px",
          railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
          preventmultitouchscrolling: true ,
          autohidemode:false,
          cursordragspeed: 0.5,
          oneaxismousemode: false,
          enablescrollonselection: true,
        });
        this.showul = !this.showul ;
        let div = this.$refs.fontSize.getElementsByTagName("ul")[0].getElementsByTagName("div") ;
        for(let i=0;i<div.length;i++){
            if(div[i].className == ""){
                div[i].style.display = "none" ;
            }
        }
      },
      selFont(index){
        this.showul = false ;
        let v = this.item[index].fontSize ;
        this.fontSize = v ;
        v = v + "px" ;
        this.prop.style.callBack2&&this.prop.style.callBack2(v) ;
      },
      leave(e){
        this.showul = false ;
      },
      enter(){
        this.showul = true;
      },
    },
    mounted(){
      for(let a = 12 ; a <= 144 ; a+=2){
        let obj = {"fontSize": a} ;
        this.item.push(obj) ;
      }
      this.curFont = parseInt(this.prop.style['fontSize']);
      this.fontSize = parseInt(this.prop.style['fontSize']);
    }
  }
</script>

<style scoped lang="less">
@baseColorDeep1: #2882ca;
@baseColor: #3089d5;        //主色调 原色 页面主体色
@baseColorLight1: #6eace2;  //主色调 浅+1 rgba(48,137,213,.7)下拉菜单hover颜色
@baseColorLight2: #83b8e6;  //主色调 浅+2 rgba(48,137,213,.6) 删除按钮hover颜色
@baseColorLight3: #97c4ea;  //主色调 浅+3 rgba(48,137,213,.5) 文本框获取焦点颜色,删除按钮原色
.wrapl{
  background: #2882ca;
  height: 100%;
  width: 49px;
  float: left;
  background-color: transparent;
  margin-right: 4px;
}
  .fontSize{
    width: 49px;
    height: 30px;
    border: 1px solid #ddd ;
    border-radius: 3px;
    line-height: 30px;
    margin-top: 8px;
    padding: 0 10px 0 4px ;
    cursor: pointer;
    position: relative;
    font-size: 12px;
    margin-right: 4px;
    float: left;
  }
  .fontSize:hover{
    // box-shadow: 0 0 10px #3089D5;
    // border-color:#3089D5 ;
  }
  .fontSize:hover .iconfont{
    // color: #3089D5;
  }
  .iconfont{
    color: #ddd;
    display: block;
    position: absolute;
    top: 2px;
    right: 3px;
    font-size: 14px;
  } 
  ul{
    width: 49px;
    height: 0;
    position: absolute;
    top: 31px;
    left: -1px;
    padding: 0;
    background:transparent;
    text-align: center;
    overflow: hidden;
    z-index: 9999;
    transition: 0.4s;
  }
  .wrap{
    width: 49px ;
    height: 199px;
    overflow-x: hidden ;
    border: 1px solid #ddd;
    border-radius: 3px;
    background: #fff ;
  }

  li{
    list-style: none;
    height:28px ;
    width: 47px ;
    color: #333 ; 
    font-size: 12px;
  }
  input{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 12px;
    top: 0;
    left: 0;
    text-indent:5px; 
    border-radius: 3px;
    line-height: 30px;
    border: 0 ;
    color: #333 ; 
    outline: medium;
  }
  li:hover{
    // background: rgba(48,137,213,0.08);
  }
  .showul{
    height: 200px;
    transition: 0.4s ;
  }
</style>
