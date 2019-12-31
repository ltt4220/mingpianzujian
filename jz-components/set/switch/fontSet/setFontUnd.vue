<template>
  <div class="FontStyleSetItem">
    <div ref="fontstyle" :class="{item:cur,cur:current}" @click="itemClick" ><i class="iconfont icon-xiahuaxian"></i></div>
  </div>
</template>

<script>
  export default {
    name: "set-font-style",
    data(){
      return{
        cur: true,
        current:false,
      }
    },
    methods: {
      itemClick: function(){
        let arr = this.$refs.fontstyle.classList ,self = this ,mark = true ;
        for(let a=0;a<arr.length;a++){
          arr[a] === "cur" ? mark = false : mark = true ;
        }
        if(mark){
          this.current = true ;
          this.prop.style.callBack6("underline") ;
        }else {
          this.current = false ;
          this.prop.style.callBack6("none") ;
        }
      }
    },
    props:['prop'],
    mounted(){
      if(this.prop.style.textDecoration == "underline"){
        this.current = true ;
      }else{
        this.current = false ;
      }
    }
  }
</script>

<style scoped>
  .FontStyleSetItem {
    margin: 8px 0 0px 0px ;
    float: left;
    line-height: 30px ;
    cursor: pointer;
  }
  .FontStyleSetItem .item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  /* .FontUnderlineSetItem .cur { */
    /* border: 1px solid #3089D5; */
    /* background-color: #EAF3FB;  */
  /* } */
  .FontStyleSetItem .item:hover {
    /* background-color: #EAF3FB; */
  }
  .FontStyleSetItem .item i {
    font-size: 16px;
    color: #797979;
    display: block;
    margin-top: 2px;
  }
</style>
