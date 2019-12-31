<template>
  <div class="LightboxClose_set">
    <p>图标样式</p>
    <EasyScrollbar>
      <div style="height: 650px;">
        <div style="max-height: 650px;">
          <div class="box">
            <div
              v-for="(item, index) in svgList"
              :key="index"
              @click.stop.prevent="change(item,index)"
            >
              <div
                v-html="item.fSvgCode"
                class="svgBox"
              ></div>
              <span
                class=" iconfont icon-duigou1 xzIcon"
                v-if="item.fId == fId"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </EasyScrollbar>
  </div>
</template>

<script>
export default {
  name: "close-setting",
  data() {
    return {
      svgList: [],
      isshow: null
    };
  },
  created() {
    this.$axios
      .get(
        "/manage-api/resource/carouselIconManage/editorQueryPage?fIsDelete=0&fStatus=3"
      )
      .then(res => {
        // this.svgList = Object.assign([], res.data.data);

        res.data.data.forEach(item => {
          item.fSvgCode = item.fSvgCode.replace(
            "<svg",
            `<svg id=${item.fId} width="28px" height="28px"`
          );
        });
        this.svgList = res.data.data;
        this.fId =
          zmEditor.$store.state.component.selectList[0].settingData.arrowIcon.value.id;
      })
      .catch(req => {
        console.log(req);
      });
  },
  methods: {
    change(item, index) {
      //储存svg代码
      zmEditor.$store.state.component.selectList[0].settingData.arrowIcon.value.iconClass =
        item.fSvgCode;
      //存储svg对应的fId
      zmEditor.$store.state.component.selectList[0].settingData.arrowIcon.value.id =
        item.fId;
    }
  },
  computed: {
    fId() {
      //返回svg对应的id
      return zmEditor.$store.state.component.selectList[0].settingData.arrowIcon
        .value.id;
    }
  }
};
</script>
<style>
.LightboxClose_set {
  width: 286px;
}
.box {
  width: 286px;
  /* height: 650px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
}
.LightboxClose_set p {
  height: 35px;
  line-height: 35px;
  text-indent: 15px;
  font-size: 17px;
  font-weight: 800;
  border-bottom: 1px solid #d7d7d7;
  color: #797979;
}
.box > div {
  margin: 10px 5.75px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}
.box > div > div {
  display: flex;
  fill: #333;
  display: -ms-flexbox;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  width: 28px;
  height: 28px;
}
.box > div svg {
  height: 100%;
}
.box > div > span {
  position: absolute;
  font-size: 16px;
  right: -10px;
  top: -10px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;
  /* display: none; */
}
</style>
