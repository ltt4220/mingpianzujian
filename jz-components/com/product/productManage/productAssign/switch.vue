<template>
  <div class="labelBox">
    <div class="switchBox">
      <span>显示{{prop}}标签</span>
      <!-- <span class="switch switchOn"  @click.stop="switchOnOff" :style="{backgroundColor:productList[nowIndex]?productList[nowIndex].backgroundColor:'#eee'}"> -->
      <span class="switch"  @click.stop="switchOnOff" :class="{switchOn:productList[nowIndex]?productList[nowIndex].float=='right':false}">
        <!-- <span class="point" :style="{float:cssObj.float}"></span> -->
        <span class="point" :style="{float:productList[nowIndex]?productList[nowIndex].float:'left'}"></span>
      </span>
      <div class="bottomW"></div>
    </div>
    <!-- <div class="label" v-show="isSwitchOn"> -->
    <div class="label" v-show="productList[nowIndex]?productList[nowIndex].isSwitchOn:false">
      <div class="lN">{{prop}}{{title2}}:</div>
      <div class="nList">
        <div @click.stop="tagC(i)" :nowLabel="curSelectedCom" :class="{tagN:bgArr[i].tagNS,tagS:bgArr[i].tagSS}" class="tag" v-for="(item,i) in labelList" :key="i">{{item}}</div>
      </div>
    </div>
    <div class="bottomW"></div>
  </div>
</template>
<script>
export default {
  name: "switch",
  props: ["prop","list","oldText","nowIndex","productList"],
  data() {
    return {
      title: "显示产品标签",
      title2: "标签",
      isSwitchOn: true,
      cssObj:{
        backgroundColor:'#3089D5',
        float:"right"
      },
      tagNS:true,//
      tagSS:false,
      bgArr:[],
      labelPorList:[
        '新','荐','折','券','惠','精品','让利','热卖','热销','好评','特价','爆款','分期','新品','主打','推荐',
        '批发','包邮','年货','NEW','Hot','限时特惠','韩','欧版','美版','进口','精品国货','批发','包邮','免费安装','买就送','分期付',
        '量贩装','情人节','中秋','端午','国庆','圣诞','元旦','双十一','五一特惠',
      ],
      labelSevList:[
         '新','荐','折','券','惠','让利','热卖','热销','好评','特价','新品','主打','推荐','NEW','Hot','限时特惠','情人节','中秋','端午','国庆','圣诞','元旦','双十一','五一特惠',
      ],
      labelList:[]
    };
  },
  created(){
    this.prop == "产品"?this.labelList = this.labelPorList: this.labelList = this.labelSevList;
    let obj ;
    this.labelList.forEach((element,i)=>{
      obj = {
        tagNS:true,
        tagSS:false
      }
      if(element = this.list[0].mfLabel){
        obj = {
                tagNS:false,
                tagSS:true
              }
      }
      this.bgArr.push(obj)
    })
     console.log(this.labeList,"______+_____",this.prop)
  },
  computed: {
    curSelectedCom() {
      let index;
      this.labelList.forEach((element,i)=>{
        if(element == this.list[0].mfLabel){
          index = i
        }
      })

      this.bgArr.forEach((element,i)=>{
        if(index == i){
          element.tagNS = false
          element.tagSS = true
        }else{
          element.tagNS = true
          element.tagSS = false
        }
      })
      return this.list[0].mfLabel //当前选中的组件
    }
  },
  methods: {
    tagC(index){
      this.bgArr.forEach((element,i)=>{
        if(index == i){
          element.tagNS = false
          element.tagSS = true
        }else{
          element.tagNS = true
          element.tagSS = false
        }
      })

      if(this.labelList[index] == '去除标签'){
        let str = ' '
        this.$emit('tagb',str)
      }else{
        this.$emit('tagb',this.labelList[index])
      }
    },
    switchOnOff(){
      let nowIndex
      this.productList.forEach((element, index) => {
          if (element.isSelect) {
            nowIndex = index
          }
      });
      // if(this.productList[this.nowIndex].float == 'left'){
      if(this.productList[nowIndex].float == 'left'){
        this.cssObj.float = 'right'
        this.isSwitchOn = true
        this.$emit("switchOnOff",this.isSwitchOn,this.cssObj.float)
      // }else if(this.productList[this.nowIndex].float == 'right'){
      }else if(this.productList[nowIndex].float == 'right'){
        this.cssObj.backgroundColor = '#FF0000'
        this.cssObj.float = 'left'
        this.isSwitchOn = false
        this.$emit("switchOnOff",this.isSwitchOn,this.cssObj.float)
      }
    }

  }
};
</script>
<style scoped>
  .bottomW{
      position: absolute;
      bottom: 0px;
      width: 260px;
      height: 1px;
      background-color: #d7d7d7;
    }
  .labelBox{
      width:100%;
      height: auto;
      /* background-color: #eee; */
      padding: 0px 20px;
      position: relative;
  }
  .switchBox{
      width:100%;
      height: 55px;
      line-height: 55px;
      position: relative;
      color:#797979;

  }
  .switchBox span{
    color:#797979;
    font-size:12px;
  }
  .switch{
    cursor:pointer;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: #d7d7d7;
    border-radius:10px;
    /* border-to */
    margin-left:125px;
    /* position: relative; */
  }
  .switchOn:hover{
    cursor: pointer;
  }
  .point{
    width: 18px;
    height: 18px;
    /* float: left; */
    background-color: #fff;
    border-radius: 50%;
    margin-top: 1px;
  }
  .label{
    width:100%;
    height: auto;
    /* background-color: green; */
    text-align: left;
  }
  .lN{
    height: 40px;
    width:100%;
    line-height: 40px;
    position: relative;
    color:#797979;
    font-size:12px;
    margin-left: 10px;
  }
  .nList{
    /* height: 168px; */
    width:100%;
    background-color: #fff;
    padding-bottom: 20px;
    margin-left: 3px;
  }
  .nList div{
    font-size: 12px;
  }
  .tag{
    display: inline-block;
    height: 12px;
    line-height: 1px;
    font-size: 12px;
    color:#797979;
    background-color: #F2F2F2;
    padding: 11px;
    text-align: center;
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 2px;
    cursor: pointer;
  }
  .tagN{
    color:#797979;
    background-color: #F2F2F2;
  }
  .tagS{
    color:#fff;
    background-color: #3089D5;
  }
</style>
