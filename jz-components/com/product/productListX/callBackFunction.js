import {
    DH_CHECK_P_NOT_SAFE_PRIME
} from "constants";

export default {
    methods: {
        bannerChangeW(obj) {
            obj.width > 2500 ? this.style.width = 2500 : obj.width < 150 ? this.style.width = 150 : this.style.width = obj.width;
            this.setListData();
            return {
                width: this.style.width,
                height: this.style.height
            }
        },
        toolbarW(obj) {
            let params = {
                nowCom: this, //当前选中组件
                isPush: false, //false-不下推组件，之下推页面分割线
            }
            if (!this.isComputer) {
                let _left = this.mobileStyle.left;
                let _width = this.mobileStyle.width;
                let cont = _left + _width;
                let sub;
                cont > 320 ? sub = 320 : sub = cont;
                // obj.width > sub - _left ? this.mobileStyle.width = sub - _left : this.mobileStyle.width = obj.width;
                obj.width > 320 ? this.mobileStyle.width = 320 : obj.width < 140 ? this.mobileStyle.width = 140 : this.mobileStyle.width = obj.width;
                this.mobileStyle.height = this.setMobHeight(); //移动端组件的高度;
            } else {
                obj.width > 2500 ? this.style.width = 2500 : obj.width < 150 ? this.style.width = 150 : this.style.width = obj.width;
                this.style.height = this.setPcHeight();
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
            newObj.style.width = this.style.width;
            newObj.style.left = this.style.left;
            newObj.style.top = this.style.top;
            return newObj;

        },
        ValidDataL(arr) { //给每一个添加列标签
            let typeName = this.settingData.defauletTypeName.value;
            let has;
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
                    has = arr.some(item => {
                        return item.id.indexOf("1-") > -1;
                    });
                    this.$set(this.settingData, "hasZuma", {value:has,type:'product'}); //判断当前数据是否含有zuma数据;
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
                    has = arr.some(item => {
                        return item.id.indexOf("1-") > -1;
                    });
                    this.$set(this.settingData, "hasZuma", {value:has,type:'server'}); //判断当前数据是否含有zuma数据;
                    break;
                case "产品类目":
                case "服务类目":
                case "最新发布的产品":
                case "最新发布的服务":
                    arr.forEach(element => {
                        element.comTitName = element.name;
                    })
                    this.$set(this.settingData, "hasZuma", {value:has,type:'product'}); //判断当前数据是否含有zuma数据;
                    this.$set(this.settingData,'hasZuma',{value:false,type:'server'});
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
                .post(url, "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop, {
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
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                })
                .catch(function (err) {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                });
        },
        newData(url, mode, shop) {
            //最新数据;
            this.$axios
                .post(
                    url, "fCateId=" + mode + "&pageSize=64" + "&fEntrepId=" + shop, {
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
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                })
                .catch(function (err) {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                });
        },
        ValidData(url, ValidID, shop) {
            //指定数据过滤下架数据
            this.$axios
                .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    withCredentials: true
                })
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
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                })
                .catch(err => {
                    this.style.height = this.setPcHeight();
                    this.initMobile(); //移动端组件的初始化;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated", {
                            "id": this.id
                        });
                        this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
                    }); //editor根据内容对组件高度做自适应处理;
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                            nowCom: this, //当前选中组件
                            isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                    }
                });
        },
        pagechangeA(val) {
            // 页码改变event ， p 为新的 current
            this.settingData.current = parseInt(val);
            this.settingData.showPage = parseInt(val);
        },
        pointDown(val) { //鼠标在八个点上按下的时候
            let index = val.index;
            return {
                moveMold: index
            }; //组件位置位移，向下推其它组件;
        },
        pointUp(obj) {
            let index = obj.index;
            this.isHoverColor = false;
            if (index == 5) {
                obj.bounceBack = true; //如果拖动index=5的圆点可以可以回弹，则调用该语句；
            }
            this.$store.commit("changegeSizePointUp", obj);
        },
        stretchUp() { //编辑框下方推动按钮回调
            this.isHoverColor = false;
            return true; //设置回弹;
        },
        stretchCallBack() {
            this.isHoverColor = true
        },
        pointCallBack(obj) { //编辑框8个小点回调;
            this.isHoverColor = true;
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
        setMobHeight(val) { //计算mobile高度;
            let sub = val ? val : this.mobileStyle.width;

            let fontSize = parseInt(this.settingData.mobTit.value);
            let titCont = parseFloat(fontSize * 1.5 * parseInt(this.settingData.mobTitNum.value)) + "px";
            let size = parseFloat(parseFloat(1.5 * fontSize) - fontSize) / 2;
            let marHeight = parseFloat(11 - size) + "px";
            this.settingData.mobPageH.value = marHeight;
            this.settingData.mobTitNum.num = titCont;

            let imgTop = parseInt(this.settingData.picturePadding.value); //图片的上边距;
            let r = this.settingData["pictureScale"].row; //图片比例值1
            let l = this.settingData["pictureScale"].col; //图片比例值2
            let _left = parseInt(this.settingData.picturePadding.value) * 2; //BOX边距
            let _height = (parseFloat(sub) - _left).toFixed(9); //2:指两列;
            this.settingData.mobPicHeight.value = parseFloat(_height / r * l) + "px"; //计算图片的高度;
            let imgHeight = parseFloat(this.settingData.mobPicHeight.value); //获取图片的高度;
            let titTop = parseFloat(this.settingData.mobPageH.value); //标题上部边距;
            let titHeight = parseFloat(this.settingData.mobTitNum.num); //标题高度;
            let priceTop = parseFloat(this.settingData.mobPageH.value); //价格上部边距;
            let priceHeight = parseInt(this.settingData.mobPic.value); //价格字体高度;
            let priceBottom = 12; //价格下部边距;
            let detailsHeight = this.settingData.skuShow.value ? parseInt(this.settingData.skuHeight.value) : 0; //查看详情高度;
            let detailsBottom = this.settingData.skuShow.value ? 20 : 0; //查看详情的下边距;
            let boxBottom = parseInt(this.settingData.mobLineH.value); //产品行间距;
            let boxNum = parseInt(this.settingData.mobNum.value);
            let cont; //mobile高度;
            cont = parseFloat(imgTop + imgHeight + titTop + titHeight + priceTop + priceHeight + priceBottom + detailsHeight + detailsBottom) * boxNum + (boxBottom * (boxNum - 1)); //产品总高度包括分页;
            return cont
        },
        initMobile() {
            let set = this.settingData;
            if (set.mobNum.flag) {
                let rows = set.ranksNum.rowsVal;
                let cols = set.ranksNum.colsVal;
                let proNum = parseInt(rows * cols);
                proNum > 8 ? (set.mobNum.value = 8) : (set.mobNum.value = proNum);
            }
            if (set.mobLineH.flag) {
                set.mobLineH.value = set.BoxMarginBottom.value;
            }
            if (parseInt(set.titleFont.value.fontSize) > 16) {
                set.mobTit.value = "16px"
            } else {
                set.mobTit.value = set.titleFont.value.fontSize;
            }
            if (parseInt(set.priceFont.value.fontSize) > 20) {
                set.mobPic.value = "20px"
            } else {
                set.mobPic.value = set.priceFont.value.fontSize;
            }
            if (set.mobTitNum.flag) {
                set.mobTitNum.value = set.titleDBHeight.num;
                // let fontSize = parseInt(set.mobTit.value);
                // let cont = parseFloat(fontSize * 1.5 * parseInt(set.mobTitNum.value)) + "px";
                // let sub = parseFloat(parseFloat(1.5 * fontSize) - fontSize) / 2;
                // let marHeight = parseFloat(11 - sub) + "px";
                // set.mobPageH.value = marHeight;
                // set.mobTitNum.num = cont;
            }
            this.mobileStyle.height = this.setMobHeight();
        },
        mobNum(val) {
            this.settingData.mobNum.flag = false;
            this.settingData.mobNum.value = parseInt(val);
            this.setMobListData();
        },
        mobTitNum(val) {
            let fontSize = parseInt(this.settingData.mobTit.value);
            let cont = parseFloat(fontSize * 1.5 * parseInt(val)) + "px";
            if (val == 1) {
                this.settingData.mobTitNum.num = cont;
            } else {
                this.settingData.mobTitNum.num = cont;
            }
            this.settingData.mobTitNum.value = val;
            this.settingData.mobTitNum.flag = false;
            let sub = parseFloat(parseFloat(1.5 * fontSize) - fontSize) / 2;
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
            let sub = val ? val : this.style.width;
            this.setPicH(sub); //计算图片的高度;
            let boxHeight = parseFloat(this.settingData.boxHeight.value); //获取单个产品高度;
            let rowsVal = parseInt(this.settingData.ranksNum.rowsVal); //产品行数; 
            let boxBottom = parseInt(this.settingData.BoxMarginBottom.value); //产品行间距;
            let cont;
            cont = boxHeight * rowsVal + (rowsVal - 1) * boxBottom;
            return cont
        },
        setPicH(val) { //图片高度及单个产品的高度;
            let rows = this.settingData["ranksNum"].rowsVal;
            let cols = this.settingData["ranksNum"].colsVal;
            let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
            let LR = parseInt(this.settingData["boxPaddingLR"].value) * 2;
            let _width = (
                (parseFloat(val) - LR - (cols - 1) * _left) /
                cols
            ).toFixed(9);
            this.settingData["boxWidth"].value = _width + "px";
            let r = this.settingData["pictureScale"].row;
            let l = this.settingData["pictureScale"].col;
            let margT = parseInt(this.settingData.picturePadding.value) * 2;
            let boxWidth =
                parseFloat(this.settingData["boxWidth"].value) / 2;
            this.settingData["boxHeight"].value =
                parseFloat(boxWidth / r * l) +
                "px";
            let cont = parseFloat(this.settingData.boxHeight.value) - margT + "px";
            this.settingData.pictureHeight.value = cont;
        },
        setListData() {
            let params = {
                oriL: this.style.left, //组件高度改变前的left
                oriH: this.style.height, //组件高度改变前的height
                oriW: this.style.width, //组件高度改变前的width
                oriT: this.style.top, //组件高度改变前的top
                oriRotate: this.style.rotate, //组件高度改变前的rotate
                curH: this.setPcHeight(), //组件高度改变后的height
                nowCom: this, //当前选中组件
                isPush: true, //true-下推组件
            }
            this.$store.commit("createChangeHeightClass", params); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
            this.style.height = this.setPcHeight();
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
        pictureSize(val) {
            this.getPictrueSetData("pictureSize", val, "text");
        },
        pictureHover(val, val2, _that) {
            this.getPictrueSetData("pictureHover", val, "text", _that);
        },
        titleFontFamily(val) {
            this.getSettingData("titleFont", val, "fontFamily");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        titleFontSize(val) {
            this.getSettingData("titleFont", val, "fontSize");
            let size = parseInt(val);
            let linH = parseFloat(this.settingData.titleLineHeight.value);
            if (this.settingData.titleDBHeight.value.text != "单行文本") {
                this.settingData.titleLineHeight.num = parseFloat(linH * size) * 2 + "px";
            } else {
                this.settingData.titleLineHeight.num = "1.5em";
            }
            zmEditor.$store.commit('saveOperationToHistory');
        },
        titleColor(val) {
            this.getSettingData("titleFont", val, "color");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        titleFontWeight(val) {
            this.getSettingData("titleFont", val, "fontWeight");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        titleFontStyle(val) {
            this.getSettingData("titleFont", val, "fontStyle");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        titleDBHeight(val, val2, that) {
            if (val == "单行文本") {
                this.settingData.titleDBHeight.value.text = val;
                this.settingData.titleDBHeight.num = 1;
                this.settingData.titleLineHeight.value = "1.5em";
                this.settingData.titleLineHeight.num = "1.5em";
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
                this.settingData.titleLineHeight.value = "1.5em";
                this.settingData.titleLineHeight.num = "1.5em";
                this.settingData.firstHeight.value = 0;

            }
            this.setListData();
        },
        boxImgWidth(val) {
            this.getSettingData("skuFont", val);
            this.setPicH() //图片高度;
        },
        imgFloat(val) {
            this.settingData.imgFloat = val;
            val == "left" ? this.settingData.justifyContent = "flex-end" : this.settingData.justifyContent = "flex-start";
            zmEditor.$store.commit('saveOperationToHistory');
        },
        picturePadding() {
            this.setPicH() //图片高度;
            this.setListData();
        },
        titlePaddingLRight(val) {
            let align = this.settingData.titleAlign.value;
            align == "center" ? this.getSettingData("titlePaddingLRight", 10) : this.getSettingData("titlePaddingLRight", val)
        },
        skuShow(val) {
            val ? this.getSettingData("skuShow", "inline-block") : this.getSettingData("skuShow", "none");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuFontFamily(val) {
            this.getSettingData("skuFont", val, "fontFamily");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuFontSize(val) {
            this.getSettingData("skuFont", val, "fontSize");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuColor(val) {
            this.getSettingData("skuFont", val, "color");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuFontWeight(val) {
            this.getSettingData("skuFont", val, "fontWeight");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuFontStyle(val) {
            this.getSettingData("skuFont", val, "fontStyle");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        skuWidth(val) {
            this.getSettingData("skuWidth", val + "%")
        },
        skuAlign(val) {
            this.getSettingData("skuAlign", val);
        },
        priceFontFamily(val) {
            this.getSettingData("priceFont", val, "fontFamily");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        priceFontSize(val) {
            this.getSettingData("priceFont", val, "fontSize");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        priceColor(val) {
            this.getSettingData("priceFont", val, "color");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        priceFontWeight(val) {
            this.getSettingData("priceFont", val, "fontWeight");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        priceFontStyle(val) {
            this.getSettingData("priceFont", val, "fontStyle");
            zmEditor.$store.commit('saveOperationToHistory');
        },
        priceAlign(val) {
            this.getSettingData("priceAlign", val);
        },
        pageShow() {
            this.style.height = this.setPcHeight();
            this.$store.commit('updateComStyle', {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            });
            zmEditor.$store.commit('saveOperationToHistory');
        },
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值 3.对1的子对象change（子对象value值为obj======必须传第3个参数);
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
                    case "skuShow":
                        convert == "inline-block" ? (this.settingData[property].value = true) : (this.settingData[property].value = false)
                        this.settingData[property].num = convert;
                        this.setListData();
                        break;
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
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数) 4.当前设置项的实例;
            let _type = property;
            switch (_type) {
                case "pictureSize":
                    let cont = null;
                    convert == "填充" ? cont = "left top" : cont = "center";
                    this.settingData[property].value[subvalue] = convert;
                    this.settingData[property].num = cont;
                    break;
                case "pictureHover":
                    this.settingData[property].num = "none";
                    switch (convert) {
                        case "放大":
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].num = "scale(1.1)";
                            this.settingData[property].filter = "none";
                            this.settingData[property].isShad = "hidden";
                            this.settingData.isShowSet = true;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                        case "左移":
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].num = "translatex(-2.5%)";
                            this.settingData[property].filter = "none";
                            this.settingData[property].isShad = "hidden";
                            this.settingData.isShowSet = true;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                        case "上移":
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].num = "translateY(-2.5%)";
                            this.settingData[property].filter = "none";
                            this.settingData[property].isShad = "hidden";
                            this.settingData.isShowSet = true;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                        case "虚化":
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].num = "";
                            this.settingData[property].filter = "blur(1px)";
                            this.settingData[property].isShad = "hidden";
                            this.settingData.isShowSet = true;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                        case "覆盖颜色":
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].num = "none";
                            this.settingData[property].filter = "none";
                            this.settingData[property].isShad = "visible";
                            this.settingData.isShowSet = false;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                        default:
                            this.settingData[property].num = "none";
                            this.settingData[property].value[subvalue] = convert;
                            this.settingData[property].filter = "none";
                            this.settingData[property].isShad = "hidden";
                            this.settingData.isShowSet = true;
                            this.isShowSet(_that, this.settingData.isShowSet);
                            break;
                    }
                    break;
                default:
                    this.settingData[property].value[subvalue] = convert;
                    this.setListData()
                    break;
            }
        },
        isShowSet(_that, val) {
            let child = _that.$parent.$children;
            child.forEach(item => {
                item.prop && item.prop.attr == "pictureBackHover" ? (item.prop.isShowSet = val) : "";
            })
        }
    }
}
