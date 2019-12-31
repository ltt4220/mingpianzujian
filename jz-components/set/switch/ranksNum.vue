<template>
  <div class="zm-edit-slider zm-edit-item zm-edit-goodsList-colsRows">
    <div class="zm-edit-goodsList-rowsBox">
      <span>行数：</span>
      <div>
        <input
          type="text"
          v-model="rowsInputVal"
          @focus="handleFocus($event)"
          @blur="handleRowBlur($event)"
          @input="rowsInputChange($event)"
          @keyup.enter="rowsEnter($event)"
        >
        <p>
          <i @click="rowsBoxUp">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 367.23 246.78"
              style="width:10px;height:6.72px;fill:#d7d7d7;"
            >
              <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
            </svg>
          </i>
          <em @click="rowsBoxDown">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 367.23 246.78"
              style="width:10px;height:6.72px;fill:#d7d7d7;"
            >
              <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
            </svg>
          </em>
        </p>
      </div>
    </div>
    <div class="zm-edit-goodsList-colsBox">
      <span style="margin-left:10px;">列数：</span>
      <div>
        <input
          type="text"
          v-model="colsInputVal"
          @focus="handleFocus($event)"
          @blur="handleColBlur($event)"
          @input="colsInputChange($event)"
          @keyup.enter="colsEnter($event)"
        >
        <p>
          <i @click="colsBoxUp">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 367.23 246.78"
              style="width:10px;height:6.72px;fill:#d7d7d7;"
            >
              <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
            </svg>
          </i>
          <em @click="colsBoxDown">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 367.23 246.78"
              style="width:10px;height:6.72px;fill:#d7d7d7;"
            >
              <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
            </svg>
          </em>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.zm-edit-goodsList-colsRows {
  font-size: 12px;
  padding: 14px 0;
  color: #797979;
}
.zm-edit-goodsList-colsRows > div {
  float: left;
  width: 50%;
}
.zm-edit-goodsList-colsRows > div > span {
  float: left;
  line-height: 26px;
  width: 43px;
}
.zm-edit-goodsList-colsRows > div > div {
  float: left;
  margin-left: 14px;
}
.zm-edit-goodsList-colsRows > div > div input {
  width: 36px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  border: 1px solid #d7d7d7;
  outline: none;
  cursor: pointer;
  float: left;
  font-size: 12px;
  color: #797979;
}
.zm-edit-goodsList-colsRows > div input:hover {
  /* background-color: #eaf3fb; */
}
.zm-edit-goodsList-colsRows > div input:focus {
  /* border: 1px solid #3089d5; */
  background-color: #fff;
  /* border: 1px solid #3089d5; */
  /* box-shadow: 0 0 5px #3089d5; */
}
.zm-edit-goodsList-colsRows > div > div p {
  float: left;
}
.zm-edit-goodsList-colsRows > div > div p i {
  transform: rotate(180deg);
}
.zm-edit-goodsList-colsRows > div > div p i,
.zm-edit-goodsList-colsRows > div > div p em {
  cursor: pointer;
  display: block;
  width: 20px;
  height: 13px;
  line-height: 4px;
  border: 1px solid #d7d7d7;
  padding: 2px 4px;
  background: -webkit-linear-gradient(#f2f2f2, #fff);
  background: -o-linear-gradient(#f2f2f2, #fff);
  background: -moz-linear-gradient(#f2f2f2, #fff);
  background: linear-gradient(#f2f2f2, #fff);
}
.zm-edit-goodsList-colsRows > div > div p i svg,
.zm-edit-goodsList-colsRows > div > div p em svg {
  fill: #d7d7d7;
}
.zm-edit-goodsList-colsRows > div i:hover,
.zm-edit-goodsList-colsRows > div em:hover {
  /* border: 1px solid #3089d5; */
}
.zm-edit-goodsList-colsRows > div i:hover svg,
.zm-edit-goodsList-colsRows > div em:hover svg {
  /* fill: #3089d5; */
}
</style>
<script>
export default {
  name: "ranksNum",
  props: ["prop"],
  data() {
    return {
      rowsInputVal: 2,
      colsInputVal: 2,
      maxVal: 10,
      minVal: 1
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    }
  },
  created() {
    let attr = this.prop.attr;
    this.maxVal = this.prop.maxVal;
    this.minVal = this.prop.minVal;
    this.rowsInputVal = this.curSelectedCom.settingData[attr].rowsVal;
    this.colsInputVal = this.curSelectedCom.settingData[attr].colsVal;
  },
  methods: {
    judgeSize(currObj) {
      //0指行数对象  1指列对象
      var reg = /^\d+$/;
      let rowMax =
        typeof this.maxVal == "object" ? this.maxVal.rowMax : this.maxVal;
      let colMax =
        typeof this.maxVal == "object" ? this.maxVal.colMax : this.maxVal;
      let rowMin =
        typeof this.minVal == "object" ? this.minVal.rowMin : this.minVal;
      let colMin =
        typeof this.minVal == "object" ? this.minVal.colMin : this.minVal;
      let flag, currVal;
      currObj
        ? ((currVal = this.rowsInputVal), (flag = 1))
        : ((currVal = this.colsInputVal), (flag = 0));
      if (currVal.toString().match(reg)) {
        if (flag) {
          if (this.rowsInputVal > rowMax) {
            this.rowsInputVal = rowMax;
          }
          if (this.rowsInputVal < rowMin) {
            this.rowsInputVal = rowMin;
          }
          this.settingInput();
        } else {
          if (this.colsInputVal > colMax) {
            this.colsInputVal = colMax;
          }
          if (this.colsInputVal < colMin) {
            this.colsInputVal = colMin;
          }
          this.settingInput();
        }
        if (this.prop.callback) {
          this.prop.callback(this.rowsInputVal, this.colsInputVal);
        }
      } else {
        let attr = this.prop.attr;
        flag
          ? (this.rowsInputVal = this.curSelectedCom.settingData[attr].rowsVal)
          : (this.colsInputVal = this.curSelectedCom.settingData[attr].colsVal);
        console.log("行或列为无效数字---");
      }
    },
    handleFocus(event) {
      this.$store.commit("removeComKeyEvent");
      event.target.setSelectionRange(0, 1);
      event.target.setSelectionRange(0, -1);
    },
    handleColBlur() {
      this.$store.commit("addComKeyEvent");
      this.judgeSize(0);
    },
    handleRowBlur() {
      this.$store.commit("addComKeyEvent");
      this.judgeSize(1);
    },
    rowsBoxUp() {
      this.rowsInputVal++;
      this.judgeSize(1);
    },
    settingInput() {
      let attr = this.prop.attr;
      this.curSelectedCom.settingData[attr].rowsVal = this.rowsInputVal;
      this.curSelectedCom.settingData[attr].colsVal = this.colsInputVal;
    },
    rowsBoxDown() {
      this.rowsInputVal--;
      this.judgeSize(1);
    },
    rowsInputChange(event) {
      event.stopPropagation();
    },
    rowsEnter(event) {
      this.judgeSize(1);
      event.currentTarget.blur();
    },
    colsBoxUp() {
      this.colsInputVal++;
      this.judgeSize(0);
    },
    colsBoxDown() {
      this.colsInputVal--;
      this.judgeSize(0);
    },
    colsInputChange(event) {
      event.stopPropagation();
    },
    colsEnter(event) {
      this.judgeSize(0);
      event.currentTarget.blur();
    }
  }
};
</script>
