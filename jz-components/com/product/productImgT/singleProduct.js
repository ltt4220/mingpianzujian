export default {
    methods: {
        bannerChangeW(obj){
            obj.width > 2500 ? this.style.width = 2500 : obj.width < 140 ? this.style.width = 140 : this.style.width = obj.width;
            this.titleHCompute()
            return {width:this.style.width,height:this.style.height}
        },
        toolbarW(v) {
            //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
            let params = {
                nowCom: this, //当前选中组件
                isPush: false, //false-不下推组件，之下推页面分割线
            }
            if (this.isComputer) {
                let nowMW = zmEditor.$store.state.page.nowWinWidth - $(this.$el)[0].getBoundingClientRect().left
                this.style.width = v.width
                if (this.style.width <= 140) {
                    this.style.width = 140
                }
                if (this.style.width >= 2500) {
                    this.style.width = 2500
                }
                this.style.height = this.setPcHeight();
            } else {
                this.mobileStyle.width = v.width
                if (this.mobileStyle.width <= 140) {
                    this.mobileStyle.width = 140
                }
                if (this.mobileStyle.width >= 320) {
                    this.mobileStyle.width = 320
                }
                this.mobileStyle.height = this.setMobHeiht();
            }
            this.$store.commit("createChangeHeightClass", params)
        },
        changeStyleCallback(obj) {
            // obj就是上图显示的对象
            // 以下的this指的是当前选中的组件
            let newObj = JSON.parse(JSON.stringify({
                bigClass: this.prop.bigClass, //因组件只能在同类型之间切换样式，所以bigClass是不会变的，取当前组件的bigClass即可
                comName: obj.fName,
                fId: obj.fId,
                url: obj.fVueUrl,
                settingData: JSON.parse(obj.fSettingData),
                style: obj.fStyle,
                mobileStyle: JSON.parse(obj.fMobleStyle),
                childData: null, //容器组件
                lists: [],
            }));
            newObj.settingData.inAllPage = this.settingData.inAllPage; //公用组件属性需要继承;
            newObj.settingData.mobileComIsHide = this.settingData.mobileComIsHide //移动端隐藏属性需要继承;
            //newObj重新渲染所需要的数据，如果需要保留宽高和位置，则需要修改newObj,例如下;
            newObj.settingData.ValidData = this.settingData.ValidData;
            newObj.settingData.productType = this.settingData.productType;
            newObj.style.width = this.style.width;
            newObj.style.left = this.style.left;
            newObj.style.top = this.style.top;
            return newObj;

        },
        ValidData(url, ValidID, shop) { //指定数据过滤下架数据及更新最新数据信息;
            this.$axios
                .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                })
                .then(response => {
                    var data = response.data.data;
                    this.mylists = data
                    this.prodcutList[0].fId = data[0].id
                    this.prodcutList[0].fTitle = data[0].name
                    this.prodcutList[0].productImg = data[0].mainImage
                    if (!this.isComputer && this.settingData.mobileComIsHide) {
                        this.mobileStyle.height = this.setMobHeiht();
                    } else {
                        this.style.height = this.setPcHeight();
                    }
                    if (this.mylists.length > 0) {
                        this.$nextTick(() => {
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated",{"id":this.id});
                            this.$store.commit("resetHistoryDataAccordingToHistoryId",this)//历史记录;
                        })
                        if (this.$store.state.toolMenu.isChangeStyle) {
                            this.$store.commit("createChangeHeightClass", {
                              nowCom: this, //当前选中组件
                              isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                            });
                            this.$store.commit("setChangeStyleStatus", false);
                          }
                    }
                })
                .catch(err => {
                    this.mylists = []
                    if (!this.isComputer && this.settingData.mobileComIsHide) {
                        this.mobileStyle.height = this.setMobHeiht();
                    } else {
                        this.style.height = this.setPcHeight();
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated",{"id":this.id});
                        this.$store.commit("resetHistoryDataAccordingToHistoryId",this)//历史记录;
                    })
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                          nowCom: this, //当前选中组件
                          isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                      }
                });
        },
        stretchUp(){//编辑框下方推动按钮回调
            this.isOverflow = false;
            this.isHoverColor = false;
            return true;//设置回弹;
        },
        stretchCallBack(){
            this.isOverflow = true;
            this.isHoverColor = true;
        },
        pointDown(obj) { //组件八个点按下时的回调函数
            return {
                moveMold: obj.index
            }
        },
        pointUp(obj) { //组件八个点鼠标松开时的回调函数
            let index = obj.index;
            if (index == 5) {
                obj.bounceBack = true;
            }
            this.isOverflow = false;
            this.isHoverColor = false;
            this.$store.commit("changegeSizePointUp", obj);
        },
        pointCallBack(obj) { //拖动组件八个点的回调函数
            this.isOverflow = true;
            this.isHoverColor = true;
            let index = obj.index;
            let minWidth = this.isComputer ? 140 : 140;
            let maxWidth = this.isComputer ? 2500 : 320;
            obj.width = Math.max(obj.width, minWidth)
            obj.width = Math.min(maxWidth, obj.width)
            index != 1 && index != 5 ? obj.height = this.setCallBackWidthH(obj.width) :"";
            this.$store.commit("comTriggerChangeSize", obj)
        },
        setCallBackWidthH(val) { //计算pc移动端组件的高度，不需要下推;
            return this.isComputer ? this.setPcHeight(val) : this.setMobHeiht(val);
        },
        bgImgCb(v) { //图片显示效果设置项回调函数
            if (v.trim() == '自适应') {
                this.settingData.bgSize.value = 'cover'
                this.settingData.bgPosition.value = 'center'
            } else if (v.trim() == '填充') {
                this.settingData.bgSize.value = 'cover'
                this.settingData.bgPosition.value = '0px 0px'
            }
            zmEditor.$store.commit('saveOperationToHistory')
        },
        isShowSet(_that, val, str) {
            let child = _that.$parent.$children;
            child.forEach(item => {
                item.prop && item.prop.attr == str ? (item.prop.isShowSet = val) : "";
            })
        },
        lineH() {
            this.titleHCompute()
        },
        textRowF(v, v2, _that) { //文本行数
            if (v.trim() == '单行文本') {
                this.settingData.textRowNum = 1
                this.settingData.isShow2.value = true
            } else if (v.trim() == '两行文本') {
                this.settingData.textRowNum = 2
                this.settingData.isShow2.value = false
            }
            this.isShowSet(_that, this.settingData.isShow2.value, 'lineHeight');
            this.titleHCompute()
            zmEditor.$store.commit('saveOperationToHistory')
        },
        productLink(href) { //点击查看详情
            // location.href = href
            // window.open(href, "_blank")
        },
        pictureHeight(ww, hh) { //图片宽高比例设置项回调函数
            this.settingData.pictureScale.row = ww
            this.settingData.pictureScale.col = hh
            this.titleHCompute()
            zmEditor.$store.commit('saveOperationToHistory')
        },
        imgFloatE(v) { //图片悬浮效果回调函数
            switch (v) {
                case '无效果':
                    this.settingData.enlarge = false
                    this.settingData.leftMove = false
                    this.settingData.topMove = false
                    this.settingData.blur = false
                    break;
                case '放大':
                    this.settingData.enlarge = true
                    this.settingData.leftMove = false
                    this.settingData.topMove = false
                    this.settingData.blur = false
                    break;
                case '左移':
                    this.settingData.enlarge = false
                    this.settingData.leftMove = true
                    this.settingData.topMove = false
                    this.settingData.blur = false
                    break;
                case '上移':
                    this.settingData.enlarge = false
                    this.settingData.leftMove = false
                    this.settingData.topMove = true
                    this.settingData.blur = false
                    break;
                case '虚化':
                    this.settingData.enlarge = false
                    this.settingData.leftMove = false
                    this.settingData.topMove = false
                    this.settingData.blur = true
                    break;
            }
            zmEditor.$store.commit('saveOperationToHistory');
        },
        textIndentF2(v1) { //商品名称边距缩进设置项回调函数
            this.titleHCompute()
        },
        retailmarginF(v) { //解决零售价与查看详情按钮之间margin属性的塌陷问题
            this.titleHCompute()
        },
        btnmarginF(v) { //解决零售价与查看详情按钮之间margin属性的塌陷问题
            this.titleHCompute()
        },
        btnmarginBottomF(v) {
            this.titleHCompute()
        },
        setMobHeiht(val) {
            let sub = val ? val : this.mobileStyle.width;
            this.settingData.imgCss.MimgW = (sub - 20) + 'px'
            this.settingData.imgCss.MimgH = parseFloat(this.settingData.imgCss.MimgW) * (this.settingData.pictureScale.col / this.settingData.pictureScale.row) + 'px'
            let [imgH, titleH, priceH,titBottom, cont] = [0, 0, 0,0, 0];
            imgH = parseFloat(this.settingData.imgCss.MimgH) + 10;
            titleH = parseFloat(16) + (this.settingData.textRowNum * 1.2 * (parseFloat(parseFloat(this.settingData.font3.value.fontSize) >= 16 ? 16 : this.settingData.font3.value.fontSize)));
            titBottom = 5;
            priceH = parseFloat(15) + (parseFloat(this.settingData.retailfont3.value.fontSize) >= 20 ? 20 : parseFloat(this.settingData.retailfont3.value.fontSize))
            cont = parseFloat(imgH + titleH + titBottom + priceH);
            return cont;
        },
        titleHComputeM() {
            let params = {
                oriL: this.mobileStyle.left, //组件高度改变前的left
                oriH: this.mobileStyle.height, //组件高度改变前的height
                oriW: this.mobileStyle.width, //组件高度改变前的width
                oriT: this.mobileStyle.top, //组件高度改变前的top
                oriRotate: this.mobileStyle.rotate, //组件高度改变前的rotate
                curH:this.setMobHeiht(),//组件高度改变后的height
                nowCom:this,//当前选中组件
                isPush:true,//true-下推组件
            }
            this.$store.commit("createChangeHeightClass",params);//组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
            this.mobileStyle.height = this.setMobHeiht();
        },
        setPcHeight(val) {
            let sub = val ? val : this.style.width;
            this.settingData.imgCss.imgW = sub - 2 * parseFloat(this.settingData.MarginIn.value) + 'px';
            this.settingData.imgCss.imgH = (this.settingData.pictureScale.col / this.settingData.pictureScale.row) * parseFloat(this.settingData.imgCss.imgW) + 'px';
            this.settingData.titH = this.settingData.textRowNum * (parseFloat(this.settingData.lineHeight.value) <= 1.2 ? 1.2 : this.settingData.lineHeight.value) * parseFloat(this.settingData.font3.value.fontSize);
            this.settingData.titLineH = (((parseFloat(this.settingData.lineHeight.value) <= 1.2 ? 1.2 : this.settingData.lineHeight.value) * parseFloat(this.settingData.font3.value.fontSize)) - parseFloat(this.settingData.font3.value.fontSize)) / 2;
            let [imgH, titleH, priceH, detailsH, cont] = [0, 0, 0, 0, 0];
            imgH = parseFloat(this.settingData.imgCss.imgH) + parseFloat(this.settingData.MarginIn.value);
            titleH = (parseFloat(this.settingData.TitmarginTop.value) - this.settingData.titLineH) + parseFloat(this.settingData.titH);
            priceH = parseFloat(this.settingData.retailmarginBottom.value) +
                (parseFloat(this.settingData.retailTitmarginTop.value) - this.settingData.titLineH - 2) +
                parseFloat(this.settingData.retailfont3.value.fontSize)
            if (this.settingData.btnSwitchShow.value) {
                detailsH = parseFloat(this.settingData.btnmarginBottom.value) +
                    parseFloat(this.settingData.btnmarginTop.value) +
                    parseFloat(this.settingData.btnheight.value);
            } else {
                detailsH = 0
            }
            cont = imgH + titleH + priceH + detailsH;
            return cont;
        },
        titleHCompute() { //计算pc端文字区域的高度
            //下推组件参数：
            let params = {
                oriL: this.style.left, //组件高度改变前的left
                oriH: this.style.height, //组件高度改变前的height
                oriW: this.style.width, //组件高度改变前的width
                oriT: this.style.top, //组件高度改变前的top
                oriRotate: this.style.rotate, //组件高度改变前的rotate
                curH:this.setPcHeight(),//组件高度改变后的height
                nowCom:this,//当前选中组件
                isPush:true,//true-下推组件
            }
            this.$store.commit("createChangeHeightClass",params);//组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
            this.style.height = this.setPcHeight();
        }
    }

}
