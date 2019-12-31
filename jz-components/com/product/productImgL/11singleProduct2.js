export default {
    methods: {
        toobarH(v) {
            if (this.isComputer) {
                if (v.height >= 15000) {
                    this.style.height = 150000
                }
                if (v.height <= 5) {
                    this.style.height = 5
                }
                this.titleHCompute()
            }
        },
        toolbarW(v) {
            if (this.isComputer) {
                this.style.width = v.width
                let nowMW = zmEditor.$store.state.page.nowWinWidth - $(this.$el)[0].getBoundingClientRect().left
                this.style.width = v.width
                if (this.style.width <= 140) {
                    this.style.width = 140
                }
                if (this.style.width >= 2500) {
                    this.style.width = 2500
                }
                this.titleHCompute()
            } else {
                this.mobileStyle.width = v.width
                if (this.mobileStyle.width <= 140) {
                    this.mobileStyle.width = 140
                }
                if (this.mobileStyle.width >= 320) {
                    this.mobileStyle.width = 320

                }
                this.titleHComputeM()
            }
        },
        ValidData(url, ValidID, shop) { //指定数据过滤下架数据及更新最新数据信息;
            this.$axios
                .post(url, "ids=" + ValidID + "&fShopId=" + shop, {
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
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated");
                        })
                    }
                })
                .catch(err => {
                    if (!this.isComputer && this.settingData.mobileComIsHide) {
                        this.mobileStyle.height = this.setMobHeight();
                    } else {
                        this.titleHCompute()
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated");
                    })
                });
        },
        pointDown(obj) { //组件八个点按下时的回调函数
            this.nStyle.height = this.style.height
            this.nStyle.top = this.style.top
            this.nStyle.left = this.style.left
            this.nStyle.width = this.style.width
            this.nStyle.dy = event.clientY
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                this.nStyle.height = this.mobileStyle.height
                this.nStyle.width = this.mobileStyle.width
                this.nStyle.top = this.mobileStyle.top
                this.nStyle.left = this.mobileStyle.left
                this.nStyle.dy = event.clientY
                this.nStyle.imgH = parseFloat(this.settingData.imgCss.MimgH)
            }
            // return {
            //     moveMold: obj.index
            // }

        },
        pointUp(obj) { //组件八个点鼠标松开时的回调函数
            let index = obj.index;
            this.isHoverColor = false;
            this.$store.commit("changegeSizePointUp", obj);
        },
        pointCallBack(obj) { //拖动组件八个点的回调函数
            let index = obj.index;
            let cont;
            this.isHoverColor = true;
            if (!this.isComputer && this.settingData.mobileComIsHide) { //手机端
                this.settingData.imgCss.MimgW = this.mobileStyle.width;
                this.settingData.cssObj.MtitleHeight = (this.nStyle.height - this.nStyle.imgH);
                if (index == 0 || index == 1 || index == 2 || index == 4 || index == 5 || index == 6) {
                    this.settingData.imgCss.MimgH = obj.height - this.settingData.cssObj.MtitleHeight
                    if (obj.height <= this.settingData.cssObj.MtitleHeight) {
                        this.settingData.imgCss.MimgH = 0;
                    }
                }
            }
            if (index == 5) {
                this.isOverflow = true
            }
            // this.$store.commit('updateComStyle', {
            //     id: this.id,
            //     style: this.style,
            //     mobileStyle: this.mobileStyle
            // }) //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
            // return { //如果调整编辑框的8个按钮时，组件自身有最小值的（最小宽度或最小高度）
            //     moduleMinWidth: 140,
            //     moduleMinHeight: cont
            // }
            let minWidth = this.isComputer ? 140 : 140;
            let maxWidth = this.isComputer ? 2500 : 320;
            let minHeight = this.isComputer ? 5 : this.settingData.cssObj.MtitleHeight;
            let maxHeight =15000;
            obj.width = Math.max(obj.width, minWidth)
            obj.width = Math.min(maxWidth, obj.width)
            obj.height = Math.max(obj.height,minHeight) 
           this.isComputer? obj.height = Math.min(maxHeight,obj.height):"";
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
        },
        pictureScale(row, col) {
            this.settingData.pictureScale.row = row;
            this.settingData.pictureScale.col = col;
            this.titleHComputeM();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        setMobHeight() { //计算手机端的高度
            this.settingData.imgCss.MimgW = this.mobileStyle.width;
            this.settingData.imgCss.MimgH = (this.mobileStyle.width / this.settingData.pictureScale.row * this.settingData.pictureScale.col) + 'px';
            let [titleH, lineH, priceH, detailsH, cont] = [0, 0, 0, 0, 0];
            titleH = 10 + 1.2 * parseFloat(parseFloat(this.settingData.font3.value.fontSize) >= 16 ? 16 : this.settingData.font3.value.fontSize) + 18;
            lineH = parseFloat(this.settingData.lineH.value) + 18;
            priceH = 18 + parseFloat(parseFloat(this.settingData.retailfont3.value.fontSize) >= 20 ? 20 : parseFloat(this.settingData.retailfont3.value.fontSize));
            detailsH = parseFloat(this.settingData.btnheight.value) + 18;
            this.settingData.cssObj.MtitleHeight = parseFloat(titleH + lineH + priceH + detailsH);
            cont = parseFloat(this.settingData.cssObj.MtitleHeight) + parseFloat(this.settingData.imgCss.MimgH);
            return cont;
        },
        titleHComputeM() {
            this.mobileStyle.height = this.setMobHeight();
            this.$store.commit('updateComStyle', {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            }) //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
        },
        setPcheight() { //计算pc端文字区域的高度
            let [titleH, lineH, priceH, detailsH, cont] = [0, 0, 0, 0, 0]
            if (this.settingData.productName && this.settingData.productName.length > 0) {
                titleH = parseFloat(this.settingData.marginBottom.value) +
                    parseFloat(this.settingData.font3.value.fontSize) * (parseFloat(this.settingData.lineHeight.value) <= 1.2 ? 1.2 : this.settingData.lineHeight.value)
            } else {
                titleH = 0
            }
            if (this.settingData.DivisionSwitchShow.value) {
                lineH = parseFloat(this.settingData.lineH.value)
            } else {
                lineH = 0
            }
            if (this.settingData.productPrice && this.settingData.productPrice.length > 0) {
                priceH = parseFloat(this.settingData.retailmarginBottom.value) + parseFloat(this.settingData.btnmarginTop.value) +
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
            //  this.settingData.DivisionSwitchShow.value   分隔线是否显示
            this.settingData.titleAreaH = this.setPcheight();
            this.style.height = this.style.height ? this.style.height : 180
        }
    }
}
