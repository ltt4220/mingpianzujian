<template>
  <div class="imgposition zm-edit-item" :style="{height:height+'px'}">
    <span>{{prop.title}} </span>
    <span class="point1" @click.stop="pointS('left')">
          <!-- <span :style="{backgroundColor:backgroundColor1}"></span> -->
          <span :class="{backgroundColorS:isSelect1}"></span>
    </span>
    <span>居左</span>
    <span class="point1 point2" @click.stop="pointS('right')">
          <!-- <span :style="{backgroundColor:backgroundColor2}"></span> -->
          <span :class="{backgroundColorS:isSelect2}"></span>
    </span>
    <span>居右</span>
  </div>
</template>

<script>
export default {
  name: 'set-font',
  data () {
    return {
        height:55,
        backgroundColor1:"#646464",
        backgroundColor2:"",
        isSelect1:true,
        isSelect2:false,
    }
  },
  props:['prop'],
  created(){
      if(this.prop.imgPosition == 'left'){
        this.backgroundColor1 = "#646464"
        this.backgroundColor2 = ""
        this.isSelect1 = true
        this.isSelect2 = false
      }else if(this.prop.imgPosition == 'right'){
        this.backgroundColor1 = ""
        this.backgroundColor2 = "#646464"
        this.isSelect1 = false
        this.isSelect2 = true
      }
  },
  methods: {
      pointS(v){
          if(v == 'left'){
              this.backgroundColor1 = "#646464"
              this.backgroundColor2 = ""
              this.isSelect1 = true
              this.isSelect2 = false
          }else if(v == 'right'){
              this.backgroundColor1 = ""
              this.backgroundColor2 = "#646464"
              this.isSelect1 = false
              this.isSelect2 = true
          }
          zmEditor.$store.state.component.selectList[0].settingData[this.prop.attr] = v
          this.prop.callback?this.prop.callback(v):''
      },
      nowVue(){
          return zmEditor.$store.state.component.selectList[0]
      },
  },
}

</script>
<style scoped>
    .imgposition{
        line-height: 55px;
    }
    .imgposition span{
        color:#797979;
        font-size: 12px;
    }
    .point1{
        display: inline-block;
        width: 15px;
        height: 15px;
        box-sizing: border-box;
        border-radius: 50%;
        border:1px solid #646464;
        padding: 5px;
        /* background-color: #3089D5; */
        margin-left: 27px;
        position: relative;
        vertical-align: middle;
        margin-right:2px;
    }
    .point1 span{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:-4.5px;
        margin-top:-4.5px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .point2{
        margin-left: 20px;
        vertical-align: middle;
    }
    .backgroundColorS{
        background-color: #3089D5;
    }

</style>