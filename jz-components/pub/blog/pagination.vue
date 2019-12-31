<template>
    <nav>
        <ul class="pagination">
            <!-- <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li> -->
            <li :class="[{'disabled': current == 1},'buttonPage']" @click="setCurrent(current - 1)">
                <a href="javascript:;"> 上一页 </a>
            </li>
            <li v-for="(p,index) in grouplist" :key="index" :class="[{'active': current == p.val},'current']" @click="setCurrent(p.val)">
                <a href="javascript:;"> {{ p.text }} </a>
            </li>
            <li :class="[{'disabled': current == page},'buttonPage']" @click="setCurrent(current + 1)">
                <a href="javascript:;"> 下一页</a>
            </li>
            <!-- <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li> -->
        </ul>
        <ul class="pagination pull-right">
            <!-- <li><span> 共 {{ total }}  条数据 </span></li>            
            <li><span> 每页显示 {{ display }}  条数据 </span></li> -->
            <li>
                <span> 共 {{ page }} 页 </span>
            </li>
            <li class="pageCurrent">
                <span> 到第<input v-model="showPage" :class="[{'activeInput':isActiveInput},'currInput']" @focus="addFocus" @blur="addBlur" @keyup.enter="setCurrent(showPage),addBlur($event)">页 </span>
            </li>
            <li>
                <button @click="setCurrent(showPage)" class="btnCheck">确定</button>
            </li>
        </ul>
    </nav>
</template>
<style scoped>
nav {
  width: 100%;
  text-align: center;
  margin: 0;
}
ul {
  width: 100%;
  height: 23px;
  margin: 0px;
  padding: 0px;
  font-size: 0;
  display: inline;
}
li {
  list-style: none;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 3px;
  height: 23px;
  width: 54px;
  line-height: 23px;
  font-size: 12px;
}
li a {
  text-decoration: none;
  color: #000;
  width: 100%;
  display: inline-block;
}
.buttonPage {
  height: 23px;
  width: 54px;
  line-height: 21px;
  margin: 0 5px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  background-color: white;
}
.buttonPage:active {
  background-color: #f2f2f2;
}
.disabled {
  background-color: #f2f2f2;
}
.disabled a {
  color: #999;
}
.disabled a:hover {
  cursor: default;
}
.current {
  border: 1px solid transparent;
  background: #fff;
  width: 23px;
  height: 23px;
  display: inline-block;
  line-height: 21px;
  margin: 0 5px;
}
.current:hover {
  border: 1px solid #3098d5;
}
.active {
  background: #3098d5;
  width: 23px;
  height: 23px;
  display: inline-block;
  line-height: 21px;
  margin: 0 5 px;
}
.active a {
  color: white;
}
.pageCurrent {
  width: 102px;
}
.currInput {
  outline: none;
  width: 39px;
  height: 23px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  margin: 0 10px;
  border-radius: 3px;
}
.activeInput {
  border: 1px solid #3098d5;
  box-shadow: 0 0 5px #3098d5;
}
.btnCheck {
  outline: none;
  border: 1px solid #dcdcdc;
  width: 40px;
  height: 23px;
  line-height: 21px;
  background: white;
  cursor: pointer;
  border-radius: 3px;
}
.btnCheck:active {
  background-color: #f2f2f2;
}
</style>
<script>
export default {
  name: "pagination",
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    display: {
      // 每页显示条数
      type: Number,
      default: 0
    },
    current: {
      // 当前页码
      type: Number,
      default: 1
    },
    showPage: {
      //跳转页码;
      type: Number,
      default: null
    },
    pagegroup: {
      // 分页条数 -- 奇数
      type: Number,
      default: 5,
      coerce: function(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  data() {
    return {
      isActiveInput: false
    };
  },
  computed: {
    page: function() {
      // 总页数
      return Math.ceil(this.total / this.display);
    },
    grouplist: function() {
      // 获取分页页码
      var len = this.page,
        temp = [],
        list = [],
        count = Math.floor(this.pagegroup / 2),
        center = this.current;
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len });
        }
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        this.current > count + 1 &&
          list.unshift({ text: "...", val: list[0].val - 1 });
        this.current < this.page - count &&
          list.push({ text: "...", val: list[list.length - 1].val + 1 });
      }
      return list;
    }
  },
  methods: {
    setCurrent(index) {
      let idx = parseInt(index);
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        // this.current = idx;
        this.$emit("pagechange", idx);
      }
    },
    addFocus() {
      this.isActiveInput = true;
    },
    addBlur() {
      event.currentTarget.blur();
      this.isActiveInput = false;
    }
  }
};
</script>
