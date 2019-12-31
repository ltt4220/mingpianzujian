export default {
    methods: {
        bannerChangeW(obj) {
            obj.width > 2500 ? this.style.width = 2500 : obj.width < 140 ? this.style.width = 140 : this.style.width = obj.width;
            obj.height > 15000 ? this.style.height = 15000 : obj.height <= 5 ? this.style.height = 5 : this.style.height = obj.height;
            this.titleHCompute()
            return {
                width: this.style.width,
                height: this.style.height
            }
        },
        toolbarH(obj) {
            //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
            let params = {
                nowCom: this, //当前选中组件
                isPush: false, //false-不下推组件，之下推页面分割线
            }
            if (this.isComputer) {
                obj.height > 15000 ? this.style.height = 15000 : obj.height <= 5 ? this.style.height = 5 : this.style.height = obj.height;
            }
            this.$store.commit("createChangeHeightClass", params)
        },
        toolbarW(v) {
            //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
            let params = {
                nowCom: this, //当前选中组件
                isPush: false, //false-不下推组件，之下推页面分割线
            }
            if (this.isComputer) {
                this.style.width = v.width
                if (this.style.width <= 140) {
                    this.style.width = 140
                }
                if (this.style.width >= 2500) {
                    this.style.width = 2500
                }
            } else {
                this.mobileStyle.width = v.width
                if (this.mobileStyle.width <= 140) {
                    this.mobileStyle.width = 140
                }
                if (this.mobileStyle.width >= 320) {
                    this.mobileStyle.width = 320

                }
                // this.mobileStyle.height = this.setMobHeight();
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
            newObj.settingData.productName = this.settingData.productName;
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
                    this.mylists = data;
                    this.prodcutList[0].fId = data[0].id
                    this.prodcutList[0].fTitle = data[0].name
                    this.prodcutList[0].productImg = data[0].mainImage
                    if (!this.isComputer && this.settingData.mobileComIsHide) {
                        this.mobileStyle.height = this.setMobHeight();
                    } else {
                        this.titleHCompute()
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
                    if (!this.isComputer && this.settingData.mobileComIsHide) {
                        this.mobileStyle.height = this.setMobHeight();
                    } else {
                        this.titleHCompute()
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
        stretchUp() { //编辑框下方推动按钮回调
            this.isOverflow = false;
            this.isHoverColor = false;
            if (!this.isComputer) {
                return true; //设置回弹;
            }
        },
        stretchCallBack() {
            this.isOverflow = true;
            this.isHoverColor = true;
        },
        stretchDown() {
            if (this.isComputer) return {
                minHeight: 5
            };
        },
        pointDown(obj) { //组件八个点按下时的回调函数
            this.nStyle.height = this.style.height
            this.nStyle.top = this.style.top
            this.nStyle.left = this.style.left
            this.nStyle.width = this.style.width
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                this.nStyle.height = this.mobileStyle.height
                this.nStyle.width = this.mobileStyle.width
                this.nStyle.top = this.mobileStyle.top
                this.nStyle.left = this.mobileStyle.left
                this.nStyle.imgH = parseFloat(this.settingData.imgCss.MimgH)
            }
            // return {
            //     moveMold: obj.index
            // }

        },
        pointUp(obj) { //组件八个点鼠标松开时的回调函数
            let index = obj.index;
            this.isOverflow = false;
            this.isHoverColor = false;
            this.$store.commit("changegeSizePointUp", obj);
        },
        pointCallBack(obj) { //拖动组件八个点的回调函数
            let index = obj.index;
            let cont;
            this.isOverflow = true;
            this.isHoverColor = true;
            if (!this.isComputer && this.settingData.mobileComIsHide) { //手机端
                this.settingData.imgCss.MimgW = this.mobileStyle.width;
                this.settingData.cssObj.MtitleHeight = (this.nStyle.height - this.nStyle.imgH);
                if (index == 0 || index == 1 || index == 2 || index == 4 || index == 5 || index == 6) {
                    this.settingData.imgCss.MimgH = obj.height - this.settingData.cssObj.MtitleHeight
                    if (obj.height <= this.settingData.cssObj.MtitleHeight) {
                        this.settingData.imgCss.MimgH = 0;
                        this.settingData.Xmove = 0;
                    }
                }
            }
            if (index == 5) {
                this.isOverflow = true
            }
            let minWidth = this.isComputer ? 140 : 140;
            let maxWidth = this.isComputer ? 2500 : 320;
            let minHeight = this.isComputer ? 5 : this.settingData.cssObj.MtitleHeight;
            let maxHeight = 15000;
            obj.width = Math.max(obj.width, minWidth)
            obj.width = Math.min(maxWidth, obj.width)
            obj.height = Math.max(obj.height, minHeight)
            this.isComputer ? obj.height = Math.min(maxHeight, obj.height) : "";
            this.$store.commit("comTriggerChangeSize", obj)
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
        cb1(index, that) { //点击布局样式设置项回调函数
            this.settingData.productLayout = index
            this.settingData.layOutIndex = index
            if (index == 3) {
                this.settingData.imgCss.float1 = 'left'
                this.settingData.imgCss.float2 = 'right'
            } else {
                this.settingData.imgCss.float1 = 'right'
                this.settingData.imgCss.float2 = 'left'
            }
            zmEditor.$store.commit('saveOperationToHistory')
        },
        imgPerF(v) { //图片占比
            this.settingData.imgCss.imgPer = v
            this.settingData.imgCss.titPer = 100 - v
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
            zmEditor.$store.commit('saveOperationToHistory')
        },
        pictureScale(row, col) {
            this.settingData.pictureScale.row = row;
            this.settingData.pictureScale.col = col;
            this.settingData.Xmove = true;
            this.titleHComputeM();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        setMobHeight() { //计算手机端的高度
            this.settingData.imgCss.MimgW = this.mobileStyle.width;
            if (this.settingData.Xmove) {
                this.settingData.imgCss.MimgH = (this.mobileStyle.width / this.settingData.pictureScale.row * this.settingData.pictureScale.col) + 'px';
            }
            let [titleH, lineH, priceH, detailsH, cont] = [0, 0, 0, 0, 0];
            titleH = 10 + 1.2 * parseFloat(parseFloat(this.settingData.font3.value.fontSize) >= 16 ? 16 : this.settingData.font3.value.fontSize) + 18;
            lineH = this.settingData.DivisionSwitchShow.value ? parseFloat(this.settingData.lineH.value) + 18 : 0;
            priceH = 18 + parseFloat(parseFloat(this.settingData.retailfont3.value.fontSize) >= 20 ? 20 : parseFloat(this.settingData.retailfont3.value.fontSize));
            if (this.settingData.btnSwitchShow.value) {
                detailsH = parseFloat(this.settingData.btnheight.value) + 18;
            } else {
                detailsH = 0;
            }
            this.settingData.cssObj.MtitleHeight = parseFloat(titleH + lineH + priceH + detailsH);
            cont = parseFloat(this.settingData.cssObj.MtitleHeight) + parseFloat(this.settingData.imgCss.MimgH);
            return cont;
        },
        titleHComputeM() {
            let params = {
                oriL: this.mobileStyle.left, //组件高度改变前的left
                oriH: this.mobileStyle.height, //组件高度改变前的height
                oriW: this.mobileStyle.width, //组件高度改变前的width
                oriT: this.mobileStyle.top, //组件高度改变前的top
                oriRotate: this.mobileStyle.rotate, //组件高度改变前的rotate
                curH: this.setMobHeight(), //组件高度改变后的height
                nowCom: this, //当前选中组件
                isPush: true, //true-下推组件
            }
            this.$store.commit("createChangeHeightClass", params); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
            this.mobileStyle.height = this.setMobHeight();
        },
        setPcheight() { //计算pc端文字区域的高度
            let [titleH, lineH, priceH, detailsH, cont] = [0, 0, 0, 0, 0]
            if (this.settingData.productName && this.settingData.productName.length > 0) {
                titleH = parseFloat(this.settingData.font3.value.fontSize) * (parseFloat(this.settingData.lineHeight.value) <= 1.2 ? 1.2 : this.settingData.lineHeight.value)
            } else {
                titleH = 0
            }
            if (this.settingData.DivisionSwitchShow.value) {
                lineH = parseFloat(this.settingData.lineH.value)
            } else {
                lineH = 0
            }
            if (this.settingData.productPrice && this.settingData.productPrice.length > 0) {
                priceH = (this.settingData.btnSwitchShow.value ? parseFloat(this.settingData.btnmarginTop.value) : 0) +
                    parseFloat(this.settingData.marginBottom.value) +
                    parseFloat(this.settingData.retailfont3.value.fontSize)
            } else {
                priceH = 0
            }

            if (this.settingData.btnSwitchShow.value) {
                detailsH = parseFloat(this.settingData.btnheight.value)
            } else {
                detailsH = 0
            }
            cont = parseFloat(titleH + lineH + priceH + detailsH);
            return cont;
        },
        titleHCompute() { //计算pc端的高度
            // //下推组件参数：
            // let params = {
            // oriL: this.style.left, //组件高度改变前的left
            // oriH: this.style.height, //组件高度改变前的height
            // oriW: this.style.width, //组件高度改变前的width
            // oriT: this.style.top, //组件高度改变前的top
            // oriRotate: this.style.rotate, //组件高度改变前的rotate
            //     curH:this.style.height,//组件高度改变后的height
            //     nowCom:this,//当前选中组件
            //     isPush:true,//true-下推组件
            // }
            // this.$store.commit("createChangeHeightClass",params);//组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
            this.settingData.titleAreaH = this.setPcheight();
            this.style.height = this.style.height ? this.style.height : 180
        }
    }
}
