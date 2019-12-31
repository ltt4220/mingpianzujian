<template>
  <div v-if="(prop.isShowSet == false || prop.isShowSet == undefined)"  class="zm-edit-slider zm-edit-item zm-edit-vTimeBox">
    <div class="zm-edit-text">{{fTitle}}</div>
    <div class="zm-edit-components-img-proportion">
      <input v-bind:class="{'zm-edit-select':isSelect,'hoverColor':isHoverColor}" v-model="changSelect.name"  @keyup.enter="addenter" @focus="addFocus($event)" @input="addInput" @blur="addBlur($event)" maxlength="10" rows="1" />
    </div>
  </div>
</template>
<style scoped>
.zm-edit-text {
  float: left;
  width: 62px;
  text-align: left;
  padding-right: 9px;
  height: 55px;
  line-height: 55px;
  font-size: 12px;
  color: #797979;
}
.zm-edit-components-img-proportion {
  display: inline-block;
  width: 180px;
  position: relative;
  height: 55px;
  line-height: 55px;
}
.zm-edit-components-img-proportion input {
  width: 100%;
  height: 30px;
  line-height: 25px;
  outline: none;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  border: 1px solid transparent;
  color: #797979;
  border-radius: 3px;
  font-size: 12px;
}
.zm-edit-components-img-proportion input.hoverColor {
  /* background-color: #eaf3fb; */
}
.zm-edit-components-img-proportion input:hover{
  /* border: 1px solid #3089d5; */
  /* box-shadow: 0 0 5px #3089d5; */
  background-color: white;
}
.zm-edit-components-img-proportion .zm-edit-select {
  /* border: 1px solid #3089d5; */
  /* box-shadow: 0 0 5px #3089d5; */
  background-color: white;
}
</style>
<script>
export default {
  name: "setTime",
  props: ["prop"],
  data() {
    return {
      fTitle: "查看详情",
      isSelect: false,
      isHoverColor:false,
      changSelect: {
        name: "查看详情"
      },
      comVue:null
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
    this.changSelect.name = this.curSelectedCom.settingData[attr].value;
    this.comVue = this.$store.state.component.selectList[0];
  },
  methods: {
    addInput(e) {
       let event = window.event || e;
      let attr = this.prop.attr;
        this.changSelect.name = event.currentTarget.value;
        this.curSelectedCom.settingData[attr].value = this.changSelect.name;
        let arr = event.currentTarget.value.split('');
            let unIcode = 0,pageName = ''; 
            for (let i = 0; i < arr.length; i++) {
                unIcode = unIcode + this.fileGetLength(arr[i]);
                pageName += arr[i];
                if( unIcode >= 10 ) {
                    this.changSelect.name = pageName;
                    this.curSelectedCom.settingData[attr].value =  this.changSelect.name;
                    break;
                }
            }
        if (this.prop.callback) {
        this.prop.callback(this.changSelect.name); //当前选中组件要改变的设置项属性值;
      }
    },
    //重命名获取字符位数;
    fileGetLength(v) {
      var len = 0;
      for (var i = 0; i < v.length; i++) {
        var a = v.charAt(i);
        len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
      }
      return len;
    },
    addFocus(e) {
       let event = window.event || e;
      this.$store.commit('removeComKeyEvent');
      this.isSelect = true;
      event.currentTarget.select();
    },
    addBlur() {
      let attr = this.prop.attr;
      let nowVue = this.curSelectedCom ? this.curSelectedCom:this.comVue;
      this.$store.commit('addComKeyEvent');
      this.isSelect = false;
      if( this.changSelect.name ==""){
        this.changSelect.name = this.prop.value;
        nowVue.settingData[attr].value =  this.changSelect.name;
      }
    },
    addenter(e) {
       let event = window.event || e;
      this.isSelect = false;
      event.currentTarget.blur();
    }
  },
  destroyed(){
    let nowVue = this.comVue;
    nowVue.settingData[this.prop.attr].value = this.changSelect.name;
  }
};
</script>


