<template>
  <div v-if="(prop.isShowSet == false || prop.isShowSet == undefined)" class="zm-edit-slider zm-edit-item">
    <div class="zm-edit-components-Vtime-onOff">
      <span class="zm-edit-text-title">{{title}}</span>
      <label class="zm-switch-box" v-bind:class="{'zm-switch-box-on':isSwitchOn}" @click.stop="addSwitch">
        <span class="zm-switch"></span>
      </label>
    </div>
  </div>
</template>
<style scoped>
.zm-edit-warpBox {
  margin: 0;
}
.zm-edit-components-Vtime-onOff {
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  justify-content: space-between;
  align-items: center;
}
.zm-edit-text-title {
  display: inline-block;
  width: 130px;
  height: 60px;
  line-height: 60px;
  text-align: left;
  margin: 0;
  vertical-align: middle;
  padding-right: 9px;
  font-size: 12px;
  color: #797979;
}
.zm-switch-box {
  display: inline-block;
  width: 40px;
  border-radius: 10px;
  height: 20px;
  cursor: pointer;
  background-color: #d7d7d7;
  border: 1px solid #d7d7d7;
  text-align: left;
  vertical-align: middle;
}
.zm-switch {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #fff;
}
.zm-switch-box-on {
  /* background-color: #3089d5; */
  /* border: 1px solid #3089d5; */
  text-align: right;
}
</style>
<script>
export default {
  name: "switch",
  props: ["prop"],
  data() {
    return {
      title: "显示博客发布时间",
    //   isSwitchOn: false
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    },
    isSwitchOn:{
        get(){
            if(typeof this.prop.value == 'object'){
                return this.prop.value.value;
            }else{
                return this.prop.value;
            }
        },
        set(newVal){
            if(typeof this.prop.value == 'object'){
                this.prop.value.value = newVal;
            }else{
                this.prop.value = newVal;
            }
        }
    }
  },
  methods: {
    addSwitch() {
      this.isSwitchOn = !this.isSwitchOn;
      //同步数据到当前组件
      this.syncData(this.isSwitchOn);
    },
    syncData(curVal) {
        let attr = this.prop.attr;
        let title = this.prop.title;
        let curSelectedComVal = this.curSelectedCom.settingData[attr].value; //当前选中组件要改变的设置项属性值
        this.curSelectedCom.settingData[attr].value = curVal;

        if (curVal) {
            this.curSelectedCom.settingData[attr].num = "block";
        } else {
            this.curSelectedCom.settingData[attr].num = "none";
        }

        if (this.prop.callback) {
            this.prop.callback(curVal, this);
        }
    }
  },
  created() {
    let attr = this.prop.attr;
    this.title = this.prop.title;
    // this.isSwitchOn = this.curSelectedCom.settingData[attr].value;
  }
};
</script>
