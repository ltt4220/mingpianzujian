<template>
  <div class="pN">
    <div class="n">{{prop}}{{name}}</div>
    <textarea
      :disabled="!isOnlay"
      @blur="tBlur"
      @keyup.enter="addenter($event)"
      @focus="tFocus($event)"
      @input="nameC($event)"
      :class="{nT2:ntS,nT:isOnlay}"
      @click.stop="tFocus($event)"
      id="nT"
      maxlength="80"
      v-model="listA[0].comTitName"
    ></textarea>
    <!-- <textarea readonly class="nT" maxlength="200" v-model="list[0].name"  @focus="tFocus($event)"></textarea> -->
    <div class="bottomW"></div>
  </div>
</template>
<script>
export default {
  name: "productName",
  props: ["prop", "list", "oldText", "isOnlay"],
  data() {
    return {
      ntS: false,
      name: "名称",
      nameText: "经典女款短袖t恤韩版女装圆领印花时尚美女无袖",
      oldProductName: null,
      initList: [
        {
          comTitName: "",
          name: "",
          advertisementText: "",
          fLabel: ""
        }
      ]
    };
  },
  computed: {
    listA() {
      this.list[0].isSelect
        ? (this.initList = this.list)
        : (this.initList = [
            {
              comTitName: "",
              name: "",
              advertisementText: "",
              fLabel: ""
            }
          ]);
      return this.initList;
    }
  },
  methods: {
    nameC(event) {
      let arr = event.currentTarget.value.split("");
      let unIcode = 0,
        pageName = "";
      for (let i = 0; i < arr.length; i++) {
        unIcode = unIcode + this.fileGetLength(arr[i]);
        pageName += arr[i];
        if (unIcode > 80) {
          this.oldText.oldProductName = pageName;
          this.initList[0].comTitName = this.oldText.oldProductName;
          break;
        }
      }
      this.$emit("tagb", this.initList[0].comTitName);
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
    tFocus(event) {
      this.$store.commit("removeComKeyEvent");
      this.isOnlay ? (this.ntS = true) : "";
      // const range = event.target.createTextRange();
      //               range.moveEnd( "character", event.target.value.length);
      //               range.moveStart( "character", 0);
      //               range.select();
      event.target.select();
    },
    tBlur() {
      this.$store.commit("addComKeyEvent");
      let arr = event.currentTarget.value.split("");
      if (arr.length == 0) {
        this.listA[0].comTitName = this.oldText.oldProductName;
        this.$emit("tagb", this.listA[0].comTitName);
      }
      this.ntS = false;
    },
    addenter() {
      this.ntS = false;
      event.currentTarget.blur();
    }
  }
};
</script>
<style scoped>
.bottomW {
  position: absolute;
  bottom: 0px;
  width: 260px;
  height: 1px;
  background-color: #d7d7d7;
}
.pN {
  width: 100%;
  height: 120px;
  padding: 0px 20px;
  font-size: 14px;
  color: #797979;
  position: relative;
}
.n {
  padding-top: 10px;
  color: #797979;
  font-size: 12px;
  margin-left: 5px;
  text-align: left;
}
textarea {
  font-size: 12px;
  overflow: auto;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: #797979;
  box-sizing: border-box;
  border: 1px solid #fff;
  width: 260px;
  height: 70px;
  margin-top: 10px;
  padding: 10px;
  line-height: 1.4;
  resize: none;
  outline: none;
  cursor: default;
  background: white;
}
.nT {
  cursor: text;
}
.nT:hover {
  border-radius: 2px;
  /* border: 1px solid #3089d5; */
}
.nT2 {
  border: 1px solid #3089d5;
  border-radius: 2px;
  box-shadow: 0 0 5px #3089d5;
}
</style>

