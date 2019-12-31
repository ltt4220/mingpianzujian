import {
    DH_CHECK_P_NOT_SAFE_PRIME
} from "constants";

export default {
    methods: {
        toolbarW(obj) {
            if (!this.isComputer) {
                let _left = this.mobileStyle.left;
                let _width = this.mobileStyle.width;
                let cont = _left + _width;
                let sub;
                cont > 320 ? sub = 320 : sub = cont;
                // obj.width > sub - _left ? this.mobileStyle.width = sub - _left : this.mobileStyle.width = obj.width;
                obj.width > 320 ? this.mobileStyle.width = 320 : obj.width < 140 ? this.mobileStyle.width = 140 : this.mobileStyle.width = obj.width;
                this.setMobListData();
            } else {
                obj.width > 2500 ? this.style.width = 2500 : obj.width < 150 ? this.style.width = 150 : this.style.width = obj.width;
                this.setListData();
            }
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
            newObj.settingData.labelName = this.settingData.labelName;
            newObj.settingData.productListUrl = this.settingData.productListUrl;
            newObj.settingData.productUrl = this.settingData.productUrl;
            newObj.settingData.productTypeData = this.settingData.productTypeData;
            newObj.settingData.isNoProduct = this.settingData.isNoProduct;
            newObj.settingData.serverTypeData = this.settingData.serverTypeData;
            newObj.settingData.isBufferPoll = this.settingData.isBufferPoll;
            newObj.settingData.isSaveProductLabel = this.settingData.isSaveProductLabel;
            newObj.settingData.isSaveServerLabel = this.settingData.isSaveServerLabel;
            newObj.settingData.productLabelId = this.settingData.productLabelId;
            newObj.settingData.serverLabelId = this.settingData.serverLabelId;
            newObj.settingData.productTypeId = this.settingData.productTypeId;
            newObj.settingData.serverTypeId = this.settingData.serverTypeId;
            newObj.settingData.serverAssId = this.settingData.serverAssId;
            newObj.settingData.productAssId = this.settingData.productAssId;
            newObj.settingData.isProductAssign = this.settingData.isProductAssign;
            newObj.settingData.isServerAssign = this.settingData.isServerAssign;
            newObj.settingData.defauletTypeName.value = this.settingData.defauletTypeName.value;
            newObj.settingData.defauletTypeName.productSortName = this.settingData.defauletTypeName.productSortName;
            newObj.settingData.defauletTypeName.serverSortName = this.settingData.defauletTypeName.serverSortName;
            newObj.settingData.productCheckId = this.settingData.productCheckId;
            newObj.settingData.serverCheckId = this.settingData.serverCheckId;
            // newObj.settingData.proNum.value = this.settingData.proNum.value;
            // newObj.settingData.ranksNum.rowsVal = this.settingData.ranksNum.rowsVal;
            // newObj.settingData.ranksNum.colsVal = this.settingData.ranksNum.colsVal;
            newObj.style.width = this.style.width;
            newObj.style.left = this.style.left;
            newObj.style.top = this.style.top;
            return newObj;

        },
        ValidDataL(arr) { //给每一个添加列标签
            let typeName = this.settingData.defauletTypeName.value;
            switch (typeName) {
                case "指定产品":
                    if (this.settingData.productLabelId.length <= 0) return
                    arr.forEach((element, index) => {
                        this.settingData.productLabelId.forEach((el, i) => {
                            if (element.id == el.id) {
                                element.isSwitchOn = el.isSwitchOn
                                element.float = el.float
                                element.backgroundColor = el.backgroundColor
                                element.mfLabel = el.mfLabel
                                element.color = el.color
                                el.comTitName != undefined && el.comTitName.length != 0 ? element.comTitName = el.comTitName : element.comTitName = element.name;
                            }
                        })
                    })
                    break;
                case "指定服务":
                    if (this.settingData.serverLabelId.length <= 0) return
                    arr.forEach((element, index) => {
                        this.settingData.serverLabelId.forEach((el, i) => {
                            if (element.id == el.id) {
                                element.isSwitchOn = el.isSwitchOn
                                element.float = el.float
                                element.backgroundColor = el.backgroundColor
                                element.mfLabel = el.mfLabel
                                element.color = el.color
                                el.comTitName == "" && el.comTitName == undefined ? element.comTitName = element.name :
                                    element.comTitName = el.comTitName;
                            }
                        })
                    })
                    break;
                case "产品类目":
                case "服务类目":
                    arr.forEach(element => {
                        element.comTitName = element.name;
                    })
                    break;
                default:
                    break;
            }
        },
        typeData(url, type, fid, shop) {
            //类目id数据;
            let _that =
                this.settingData
                .defauletTypeName[type + "SortName"];
            let sort;
            _that == "按发布时间排序" ? (sort = "2") : (sort = "1");
            if (fid.length == 0) {
                this.lists = [];
                return;
            }
            this.$axios
                .post(url, "fCategoryIds=" + fid + "&sortType=" + sort + "&fShopId=" + shop, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
                .then(response => {
                    var data = response.data.data;
                    this.lists = data;
                    if (!data || this.lists.length == 0) {
                        this.lists = [];
                    }
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                })
                .catch(function (err) {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                });
        },
        newData(url, mode, shop) {
            //最新数据;
            this.$axios
                .post(
                    url, "fCateId=" + mode + "&pageSize=64" + "&fShopId=" + shop, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    }
                )
                .then(response => {
                    var data = response.data.data;
                    this.lists = data;
                    if (!data || this.lists.length == 0) {
                        this.lists = [];
                    }
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                })
                .catch(function (err) {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                });
        },
        ValidData(url, ValidID, shop) {
            //指定数据过滤下架数据
            this.$axios
                .post(
                    url,
                    "ids=" + ValidID + "&fShopId=" + shop, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }
                )
                .then(response => {
                    var data = response.data.data;
                    if (!data || data.length == 0) {
                        this.lists = [];
                    } else {
                        var data = response.data.data;
                        let ValidIDArr = ValidID.split(',')
                        this.lists = data;
                        this.lists.forEach((element, index) => { //
                            ValidIDArr.forEach((ele, i) => {
                                let oldId = ele
                                if (element.id == ele.substr(2, (ele.length - 1))) {
                                    element.id = oldId
                                }
                            })
                        }) //pc端组件的高度;
                    }
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                })
                .catch(err => {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated")
                    }); //editor根据内容对组件高度做自适应处理;
                });
        },
        pagechangeA(val) {
            // 页码改变event ， p 为新的 current
            this.settingData.current = parseInt(val);
            this.settingData.showPage = parseInt(val);
            zmEditor.$store.commit('saveOperationToHistory')
        },
        pointDown(val) { //鼠标在八个点上按下的时候
            let index = val.index;
            this.nStyle.left = this.style.left;
            this.nStyle.height = this.style.height;
            this.nStyle.top = this.style.top;
            this.nStyle.dy = event.clientY;
            this.mStyle.left = this.mobileStyle.left;
            this.mStyle.height = this.mobileStyle.height;
            this.mStyle.top = this.mobileStyle.top;
            this.mStyle.dy = event.clientY;
            if (index == 7) {
                this.oldMobWidth = this.mobileStyle.width;
                this.oldMobLeft = this.mobileStyle.left;
            }
            return {
                moveMold: index
            }; //组件位置位移，向下推其它组件;
        },
        pointUp(obj) {
            let index = obj.index;
            this.isHoverColor = false;
            if (index == 5) {
                this.isComputer ? (this.$refs.content.style.overflow = "") : "";
                obj.bounceBack = true; //如果拖动index=5的圆点可以可以回弹，则调用该语句；
            }
            this.$store.commit("changegeSizePointUp", obj);
        },
        pointCallBack(obj) { //编辑框8个小点回调;
            let index = obj.index;
            let minWidth = this.isComputer ? 150 : 140;
            let maxWidth = this.isComputer ? 2500 : 320;
            obj.width = Math.max(obj.width, minWidth)
            obj.width = Math.min(maxWidth, obj.width)
            index != 1 && index != 5 ? obj.height = this.setCallBackWidthH(obj.width) : "";
            console.log('%cWidthHeight', 'font-size:24px;color:red', obj.height, obj);
            this.$store.commit("comTriggerChangeSize", obj)
        },
        setCallBackWidthH(val) { //计算pc移动端组件的高度，不需要下推;
            return this.isComputer ? this.setPcHeight(val) : this.setMobHeight(val);
        },
        setMobListData() {
            this.mobileStyle.height = this.setMobHeight(); //移动端组件的高度;
            this.$store.commit('updateComStyle', {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            });
        },
        setMobHeight(val) { //计算mobile高度;
            let sub = val ? val : this.mobileStyle.width;
            let _left = 10; //BOX边距
            let boxWidth = parseFloat(sub);
            let imgHeight = parseFloat(parseFloat((boxWidth - _left) / 2).toFixed(9)); //2:指两列;---------图片高度;
            let imgTop = 5; //图片上部边距;
            let titTop = 12; //标题上部边距;
            let titHeight = parseFloat(this.settingData.mobTitNum.num); //标题高度;
            let priceTop = parseFloat(this.settingData.mobPageH.value); //价格上部边距;
            let priceHeight = parseInt(this.settingData.mobPic.value); //价格字体高度;
            let priceBottom = 10; //价格下部边距;
            let boxBottom = parseInt(this.settingData.mobLineH.value); //产品行间距;
            let boxNum = parseInt(this.settingData.mobNum.value);
            let pageTop = 10; //分页的上边距;
            let pageTitHeight = 38; //分页的字体高度;
            let pageBottom = 10; //分页的下边距;
            let pageHeight; //分页高度;
            let cont; //mobile高度;
            this.settingData.pageShow.value ? (pageHeight = pageTop + pageTitHeight + pageBottom) : pageHeight = 0; //区分显示隐藏分页的高度;
            this.settingData.mobPicHeight.value = imgHeight + "px"; // 赋值给图片设置项;
            cont = parseFloat(imgTop + imgHeight + titTop + titHeight + priceTop + priceHeight + priceBottom) * boxNum + (boxBottom * (boxNum - 1)) + pageHeight; //产品总高度包括分页;
            return cont

        },
        initMobile() {
            let set = this.settingData;
            if (set.mobNum.flag) {
                // let lists = parseInt(this.lists.length);
                // switch (lists) {
                //     case 1:
                //     case 2:
                //     case 3:
                //         set.mobNum.value = 1;
                //         break;
                //     case 4:
                //     case 5:
                //         set.mobNum.value = 2;
                //         break;
                //     case 6:
                //     case 7:
                //     case 8:
                //         set.mobNum.value = 3;
                //         break;
                //     default:
                //         switch (proNum) {
                //             case 1:
                //             case 2:
                //             case 3:
                //                 set.mobNum.value = 1;
                //                 break;
                //             case 4:
                //             case 5:
                //                 set.mobNum.value = 2;
                //                 break;
                //             case 6:
                //             case 7:
                //             case 8:
                //                 set.mobNum.value = 3;
                //                 break;
                //             default:
                //                 set.mobNum.value = 4;
                //                 break;
                //         }
                //         break;
                // }
                set.mobNum.value = 1;
                set.mobNum.num = parseInt(set.mobNum.value) * 2;
            }
            if (set.mobLineH.flag) {
                set.mobLineH.value = set.BoxMarginBottom.value;
            }
            if (parseInt(set.titleFont.value.fontSize) > 16) {
                set.mobTit.value = "16px"
            } else {
                set.mobTit.value = set.titleFont.value.fontSize;
            }
            if (parseInt(set.skuFont.value.fontSize) > 14) {
                set.mobSku.value = "14px"
            } else {
                set.mobSku.value = set.skuFont.value.fontSize;
            }
            if (parseInt(set.priceFont.value.fontSize) > 16) {
                set.mobPic.value = "16px"
            } else {
                set.mobPic.value = set.priceFont.value.fontSize;
            }
            if (set.mobTitNum.flag) {
                set.mobTitNum.value = set.titleDBHeight.num;
                let fontSize = parseInt(set.mobTit.value);
                let cont = parseFloat(fontSize * 1.3 * parseInt(set.mobTitNum.value)) + "px";
                let sub = parseFloat(parseFloat(1.3 * fontSize) - fontSize) / 2;
                let marHeight = parseFloat(11 - sub) + "px";
                set.mobPageH.value = marHeight;
                set.mobTitNum.num = cont;
            }
            this.mobileStyle.height = this.setMobHeight(); //移动端组件的高度;
        },
        mobNum(val) {
            this.settingData.mobNum.flag = false;
            this.settingData.mobNum.value = val;
            this.settingData.mobNum.num = parseInt(val) * 2;
            this.setMobListData();
        },
        mobTitNum(val) {
            let fontSize = parseInt(this.settingData.mobTit.value);
            let cont = parseFloat(fontSize * 1.3 * parseInt(val)) + "px";
            if (val == 1) {
                this.settingData.mobTitNum.num = cont;
            } else {
                this.settingData.mobTitNum.num = cont;
            }
            this.settingData.mobTitNum.value = val;
            this.settingData.mobTitNum.flag = false;
            let sub = parseFloat(parseFloat(1.3 * fontSize) - fontSize) / 2;
            let marHeight = parseFloat(11 - sub) + "px";
            this.settingData.mobPageH.value = marHeight;
            this.setMobListData();
        },
        mobLineH(val) {
            this.settingData.mobLineH.value = val + "px";
            this.settingData.mobLineH.flag = false;
            this.setMobListData();
        },
        setPcHeight(val) { //pc产品高度计算;
            this.setPicH(val); //计算图片的高度;
            let imgborder = parseFloat(this.settingData.boxBorderWidth.value) * 2; //图片上部border宽度;
            let imgTop = parseFloat(this.settingData.picturePadding.value); //图片上部边距;
            let imgHeight = parseFloat(this.settingData.pictureHeight.value); //图片高度;
            let titTop = parseFloat(this.setfirstH); //标题上部边距;
            let titHeight = parseFloat(this.settingData.titleLineHeight.num); //标题高度;
            let titleFontSize = parseFloat(this.settingData.titleFont.value.fontSize); //标题字体大小;
            let priceTop = parseFloat(this.setLastH); //价格上部边距;
            let priceHeight = parseFloat(this.settingData.priceFont.value.fontSize); //价格字体高度;
            let priceBottom = parseFloat(this.settingData.priceMarginBottom.value); //价格下部边距;
            let boxBottom = parseFloat(this.settingData.BoxMarginBottom.value); //产品行间距;
            let pageTitHeight = 23; //分页字体高度;
            let pageTop = parseFloat(this.settingData.pageMarginTop.value); //分页上部高度;
            let pageBottom = parseFloat(this.settingData.pageMarginBottom.value); //分页下部高度;
            let pageHeight; //分页高度;
            let rowsVal = parseFloat(this.settingData.ranksNum.rowsVal); //产品行数;
            this.settingData.titleDBHeight.value.text == "单行文本" ? titHeight = parseFloat(titHeight * titleFontSize) : ""; //区分单双行
            this.settingData.pageShow.value ? (pageHeight = pageTitHeight + pageTop + pageBottom) : pageHeight = 0; //区分显示隐藏分页的高度;
            let cont; //pc高度;
            cont = parseFloat(parseFloat(imgborder + imgTop + imgHeight + titTop + titHeight + priceTop + priceHeight + priceBottom) * rowsVal) + (rowsVal - 1) * boxBottom + pageHeight; //产品总高度包括分页;
            return cont
        },
        setPicH(val) { //计算图片的高度;
            let sub = val ? val : this.style.width;
            let rows = this.settingData["ranksNum"].rowsVal;
            let cols = this.settingData["ranksNum"].colsVal;
            let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
            let LR = parseInt(this.settingData["boxPaddingLR"].value) * 2;
            let _width = (
                (parseFloat(sub) - LR - (cols - 1) * _left) /
                cols
            ).toFixed(9);
            this.settingData["boxWidth"].value = _width + "px";
            let boxWidth =
                parseFloat(this.settingData["boxWidth"].value) -
                parseFloat(this.settingData.boxBorderWidth.value) * 2 - parseFloat(
                    this.settingData["picturePadding"].value
                ) * 2 - parseFloat(this.settingData.pictureWidth.value) * 2;
            let r = this.settingData["pictureScale"].row;
            let l = this.settingData["pictureScale"].col;
            this.settingData["pictureHeight"].value =
                parseFloat(boxWidth / r * l) +
                "px";
        },
        setListData() {
            this.style.height = this.setPcHeight();
            this.$store.commit('updateComStyle', {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            });
        },
        setComBoxHeight() {
            this.style.height = 303.39;
        },
        fullScreen(val) {
            if (val) {
                this.style.width = zmEditor.$store.state.page.nowWinWidth;
                const _left = zmEditor.$store.state.page.marginLeft;
                if (_left >= 0) {
                    this.style.left = -_left;
                } else {
                    this.style.left = 0;
                }
                this.settingData.boxPaddingLR.value = this.settingData.boxPaddingLR.num;
                this.settingData.isShow.value = false;
                this.pattern = [0, 1, 0, 0, 0, 1, 0, 0];
            } else {
                this.settingData.boxPaddingLR.value = 0;
                this.style.width = this.settingData.initWidth;
                this.style.left = this.settingData.initLeft;
                this.settingData.isShow.value = true;
                this.pattern = [1, 1, 1, 1, 1, 1, 1, 1];
            }
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        fullpage(val) { //editor显示全屏方法;
            if (val) {
                this.style.width = zmEditor.$store.state.page.nowWinWidth;
                this.style.left = -(zmEditor.$store.state.page.marginLeft);
                const _left = zmEditor.$store.state.page.marginLeft;
                if (_left >= 0) {
                    this.style.left = -_left;
                } else {
                    this.style.left = 0;
                }
                this.settingData.boxPaddingLR.value = this.settingData.boxPaddingLR.num;
                this.settingData.isShow.value = false;
                this.pattern = [0, 1, 0, 0, 0, 1, 0, 0];
            } else {
                this.settingData.boxPaddingLR.value = 0;
                this.style.width = this.settingData.initWidth;
                this.style.left = this.settingData.initLeft;
                this.settingData.isShow.value = true;
                this.pattern = [1, 1, 1, 1, 1, 1, 1, 1];
            }
            this.settingData.fullScreen.value = val;
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        boxPaddingLR(val) {
            let rows = this.settingData.ranksNum.rowsVal;
            let cols = this.settingData.ranksNum.colsVal;
            this.setListData();
            this.settingData.boxPaddingLR.num = val;
        },
        ranksNum(rows, cols) {
            this.settingData["ranksNum"].rowsVal = rows;
            this.settingData["ranksNum"].colsVal = cols;
            this.settingData["proNum"].value = parseInt(rows * cols);
            this.setListData();
            setTimeout(() => {
                this.$store.commit('czj_changeBodyRowH', this); //改变bodyROw高度;               
            }, 5);
            zmEditor.$store.commit('saveOperationToHistory')
        },
        BoxMarginBottom(val) {
            this.settingData["BoxMarginBottom"].value = val + "px";
            this.setListData();
        },
        BoxMarginLeft(val) {
            this.settingData["BoxMarginLeft"].value = val + "px";
            this.setListData();
        },
        pictureHeight(row, col) {
            var val = [row, col];
            this.getSettingData("pictureHeight", val);
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        borderShow(val) {
            if (val) {
                this.settingData.borderShow.num = 'solid';
            } else {
                this.settingData.borderShow.num = 'none';
            }
            this.settingData.borderShow.value = val;
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        pictureSize(val) {
            this.getPictrueSetData("pictureSize", val, "text");
            zmEditor.$store.commit('saveOperationToHistory')
        },
        titleFontFamily(val) {
            this.getSettingData("titleFont", val, "fontFamily");
            zmEditor.$store.commit('saveOperationToHistory')
        },
        titleFontSize(val) {
            this.getSettingData("titleFont", val, "fontSize");
            let size = parseInt(val);
            let linH = parseFloat(this.settingData.titleLineHeight.value);
            if (this.settingData.titleDBHeight.value.text != "单行文本") {
                this.settingData.titleLineHeight.num = parseFloat(linH * size) * 2 + "px";
            } else {
                this.settingData.titleLineHeight.num = "1.1em";
            }
        },
        titleColor(val) {
            this.getSettingData("titleFont", val, "color");
        },
        titleFontWeight(val) {
            this.getSettingData("titleFont", val, "fontWeight");
        },
        titleFontStyle(val) {
            this.getSettingData("titleFont", val, "fontStyle");
        },
        titleDBHeight(val, val2, that) {
            if (val == "单行文本") {
                this.settingData.titleDBHeight.value.text = val;
                this.settingData.titleDBHeight.num = 1;
                this.settingData.titleLineHeight.value = "1.1em";
                this.settingData.titleLineHeight.num = "1.1em";
                this.settingData.isShowSet = true;
                this.settingData.firstHeight.value = 0;
                let child = that.$parent.$children;
                child.forEach(item => {
                    item.prop && item.prop.attr == "titleLineHeight" ? (item.prop.isShowSet = this.settingData.isShowSet) : "";
                })
            } else {
                let size = parseInt(this.settingData.titleFont.value.fontSize);
                this.settingData.titleDBHeight.num = 2;
                this.settingData.isShowSet = false;
                let child = that.$parent.$children;
                this.settingData.titleDBHeight.value.text = val;
                let linH = parseFloat(this.settingData.titleLineHeight.value);
                this.settingData.titleLineHeight.num = parseFloat(linH * size) * 2 + "px";
                child.forEach(item => {
                    if (item.prop && item.prop.attr == "titleLineHeight") {
                        item.prop.isShowSet = this.settingData.isShowSet;
                        item.prop.value = this.settingData.titleLineHeight.value;
                    };
                })
            }
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        titleLineHeight(val) {
            let size = parseInt(this.settingData.titleFont.value.fontSize);
            if (this.settingData.titleDBHeight.value.text != "单行文本") {
                this.settingData.titleLineHeight.value = val + "em";
                this.settingData.titleLineHeight.num = parseFloat(val * size) * 2 + "px";
            } else {
                this.settingData.titleLineHeight.value = "1.1em";
                this.settingData.titleLineHeight.num = "1.1em";
                this.settingData.firstHeight.value = 0;

            }
            this.setListData();
        },
        titleAlign(val) {
            this.getSettingData("titleAlign", val)
        },
        skuFontFamily(val) {
            this.getSettingData("skuFont", val, "fontFamily")
        },
        skuFontSize(val) {
            this.getSettingData("skuFont", val, "fontSize");
        },
        skuColor(val) {
            this.getSettingData("skuFont", val, "color");
        },
        skuFontWeight(val) {
            this.getSettingData("skuFont", val, "fontWeight");
        },
        skuFontStyle(val) {
            this.getSettingData("skuFont", val, "fontStyle");
        },
        skuAlign(val) {
            this.getSettingData("skuAlign", val);
        },
        priceFontFamily(val) {
            this.getSettingData("priceFont", val, "fontFamily");
        },
        priceFontSize(val) {
            this.getSettingData("priceFont", val, "fontSize");
        },
        priceColor(val) {
            this.getSettingData("priceFont", val, "color");
        },
        priceFontWeight(val) {
            this.getSettingData("priceFont", val, "fontWeight");
        },
        priceFontStyle(val) {
            this.getSettingData("priceFont", val, "fontStyle");
        },
        boxShadow(val) {
            this.getSettingData("boxShadow", val);
            zmEditor.$store.commit('saveOperationToHistory');
        },
        hShadow(val) {
            this.getSettingData("hShadow", val + "px");
        },
        vShadow(val) {
            this.getSettingData("vShadow", val + "px");
        },
        blurShadow(val) {
            this.getSettingData("blurShadow", val + "px");
        },
        colorShadow(val) {
            this.getSettingData("colorShadow", val.color);
        },
        pageShow() {
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory');
        },
        getSettingData(property, convert, subvalue, _that) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let _type = property;
            if (
                typeof this.settingData[property].value === "string" ||
                typeof this.settingData[property].value === "boolean"
            ) {
                switch (_type) {
                    case "lineHeightNum":
                        let lineH = parseInt(
                            this.settingData["ContLineHeight"].value
                        );
                        this.settingData[property].num = convert * lineH + "px";
                        this.settingData[property].value = parseInt(convert);
                        this.setListData();
                        break;
                    case "pictureHeight":
                        let boxWidth =
                            parseFloat(this.settingData["boxWidth"].value) -
                            parseFloat(this.settingData.boxBorderWidth.value) * 2 - parseFloat(
                                this.settingData["picturePadding"].value
                            ) * 2 - parseFloat(this.settingData.pictureWidth.value) * 2;
                        this.settingData[property].value =
                            parseFloat(boxWidth / convert[0] * convert[1]) +
                            "px";
                        this.settingData["pictureScale"].row = convert[0];
                        this.settingData["pictureScale"].col = convert[1];
                        break;
                    case "boxShadow":
                        if (convert) {
                            convert =
                                this.settingData["hShadow"].value +
                                " " +
                                this.settingData["vShadow"].value +
                                " " +
                                this.settingData["blurShadow"].value +
                                " " +
                                this.settingData["colorShadow"].value;
                            this.settingData[property].num = convert;
                        } else {
                            convert = "none";
                            this.settingData[property].num = convert;
                        }
                        break;
                    case "hShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            convert +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "vShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            convert +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "blurShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            convert +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "colorShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " + convert;
                    default:
                        this.settingData[property].value = convert;
                        break;
                }
            } else {
                this.settingData[property].value[subvalue] = convert;
                this.setListData();
            }
        },
        getPictrueSetData(property, convert, subvalue, _that) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let _type = property;
            switch (_type) {
                case "pictureSize":
                    let cont = null;
                    convert == "填充" ? cont = "left top" : cont = "center";
                    this.settingData[property].value[subvalue] = convert;
                    this.settingData[property].num = cont;
                    break;
                default:
                    this.settingData[property].value[subvalue] = convert;
                    break;
            }
        }
    }
}
