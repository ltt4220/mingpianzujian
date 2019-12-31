export default {
    methods: {
        bannerChangeW(obj) {
            obj.width > 2500 ? this.style.width = 2500 : obj.width < 140 ? this.style.width = 140 : this.style.width = obj.width;

            this.isComputer ? this.settingData.ProductViewCarousel.oldMainWidth = this.style.width : "";
            this.getComH();
            return {
                width: this.style.width,
                height: this.style.height
            }
        },
        toolbarW(v) {
            //通过工具条尺寸改变组件宽度
            let params = {
                nowCom: this, //当前选中组件
                isPush: false, //false-不下推组件，之下推页面分割线
            }
            if (this.isComputer) {
                this.style.width = v.width;
                // this.settingData.ProductViewCarousel.translateX = 0;
                this.settingData.ProductViewCarousel.moveLeftNum = 0;
                if (this.style.width <= 140) {
                    this.style.width = 140;
                }
                if (this.style.width >= 2500) {
                    this.style.width = 2500;
                }
                this.settingData.ProductViewCarousel.oldMainWidth = this.style.width;
                this.style.height = this.ComponentsOfCalculated();
            } else {
                this.mobileStyle.width = v.width;
                if (v.width <= 140) {
                    this.mobileStyle.width = 140;
                }
                if (v.width >= 320) {
                    this.mobileStyle.width = 320;
                    this.mobileStyle.left = 0;
                }
                this.mobileStyle.height = this.mobileGetDom();
            }
            this.$store.commit("createChangeHeightClass", params)
        },
        changeStyleCallback(obj) {
            // obj就是上图显示的对象
            // 以下的this指的是当前选中的组件
            this.settingData.fullScreen.value ? this.settingData.assignProductData = 0 : "";
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
            newObj.settingData.assignProductData = this.settingData.assignProductData; //记录全屏状态
            newObj.settingData.ProductViewCarousel.oldMainWidth = this.settingData.ProductViewCarousel.oldMainWidth;
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
                        });
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
            //类目id数据
            let _that = this.settingData.defauletTypeName[type + "SortName"];
            let sort;
            _that == "按发布时间排序" ? (sort = "2") : (sort = "1");
            if (fid.length == 0) {
                this.lists = [];
                this.lists = Object.assign([], this.lists);
                return;
            }
            this.$axios
                .post(
                    url,
                    "fCategoryIds=" + fid + "&sortType=" + sort + "&fEntrepId=" + shop, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    }
                )
                .then(response => {
                    var data = response.data.data;
                    this.lists = data;
                    this.setRotate();
                    // this.$store.commit("set_push_com_list", this);
                })
                .catch(function (err) {
                    this.setRotate();
                    console.log(err);
                });
        },
        newData(url, mode, shop) {
            //最新数据
            this.$axios
                .post(url, "fCateId=" + mode + "&fEntrepId=" + shop, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
                .then(response => {
                    var data = response.data.data;
                    this.lists = data;
                    this.setRotate();
                    console.log(this.settingData.fullScreen.value, '%cWidthHeight', 'font-size:24px;color:red')
                    // this.$store.commit("set_push_com_list", this);
                })
                .catch(function (err) {
                    this.setRotate();
                    console.log(err);
                });
        },
        ValidData(url, ValidID, shop) {
            //指定数据过滤下架数据
            this.$axios
                .post(url, "ids=" + ValidID + "&fEntrepId=" + shop, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                })
                .then(response => {
                    var data = response.data.data;
                    if (!data || data.length == 0) {
                        this.lists = [];
                    } else {
                        this.lists = data;
                        let ValidIDArr = ValidID.split(",");
                        this.lists.forEach((element, index) => {
                            //
                            ValidIDArr.forEach((ele, i) => {
                                let oldId = ele;
                                if (element.id == ele.substr(2, ele.length - 1)) {
                                    element.id = oldId;
                                }
                            });
                        });
                    }
                    this.setRotate();
                    // console.log(this.settingData.fullScreen.value,'%cWidthHeight', 'font-size:24px;color:red')
                    // this.$store.commit("set_push_com_list", this);
                })
                .catch(err => {
                    this.setRotate();
                    console.log(err);
                });
        },
        stretchUp() { //编辑框下方推动按钮回调
            this.isHoverColor = false;
            this.isOverflow = false;
            return true; //设置回弹;
        },
        stretchCallBack() {
            this.isHoverColor = true;
            this.isOverflow = true;
        },
        pointDown(obj) {
            //鼠标在八个点上按下的时候
            let index = obj.index;
            this.nStyle.left = this.style.left;
            this.nStyle.height = this.style.height;
            this.nStyle.width = this.style.width;
            this.nStyle.top = this.style.top;
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                this.nStyle.height = this.mobileStyle.height;
                this.nStyle.width = this.mobileStyle.width;
                this.nStyle.top = this.mobileStyle.top;
                this.nStyle.left = this.mobileStyle.left;
            } else {
                this.ProductViewCarousel2.imgHeight = $(
                    this.$refs.arrowR
                ).outerHeight();
                this.ProductViewCarousel2.imgWidth =
                    this.settingData.ProductViewCarousel.widthPer /
                    this.settingData.ProductViewCarousel.heightPer *
                    this.ProductViewCarousel2.imgHeight;
                let liMove = parseFloat(
                    this.ProductViewCarousel2.imgWidth +
                    this.settingData.ProductViewCarousel.liMarginLeft
                );
                this.ProductViewCarousel2.ulWidth =
                    liMove * this.settingData.ProductViewCarousel.num -
                    this.settingData.ProductViewCarousel.liMarginLeft;
                this.ProductViewCarousel2.StyleW =
                    this.ProductViewCarousel2.ulWidth +
                    Math.abs(
                        parseFloat(this.settingData.productCarousel.paddingLeft) * 2
                    );
            }
            return {
                moveMold: obj.index
            }
        },
        pointUp(obj) {
            //鼠标在八个点上松开的时候
            let index = obj.index;
            this.isHoverColor = false;
            this.isOverflow = false;
            if (index == 5) {
                obj.bounceBack = true; //如果拖动index=5的圆点可以可以回弹，则调用该语句；
            }
            this.$store.commit("changegeSizePointUp", obj);
            return true;
        },
        pointCallBack(obj) {
            let index = obj.index;
            this.isHoverColor = true;
            this.isOverflow = true;
            if (
                index == 0 ||
                index == 2 ||
                index == 3 ||
                index == 4 ||
                index == 6 ||
                index == 7
            ) {
                if (this.isComputer) {
                    // this.settingData.ProductViewCarousel.translateX = 0;
                    this.settingData.ProductViewCarousel.moveLeftNum = 0;
                    // this.settingData.arrowleft = false;
                    // this.settingData.arrowright = true;
                    this.settingData.ProductViewCarousel.oldMainWidth = obj.width;
                }
            }
            index == 5 && this.isComputer ? this.isOverflow = true : "";
            let minWidth = this.isComputer ? 140 : 140;
            let maxWidth = this.isComputer ? 2500 : 320;
            obj.width = Math.max(obj.width, minWidth)
            obj.width = Math.min(maxWidth, obj.width)
            index != 1 && index != 5 ? obj.height = this.setCallBackWidthH(obj.width) : "";
            console.log('%cWidthHeight', 'font-size:24px;color:red', obj.height, obj);
            this.$store.commit("comTriggerChangeSize", obj);
        },
        setCallBackWidthH(val) { //计算pc移动端组件的高度，不需要下推;
            return this.isComputer ? this.ComponentsOfCalculated(val) : this.mobileGetDom(val);
        },
        setListData() {
            //根据类目数据个数计算组件高度（pc端）
            this.getComH();
        },
        fullpage(val) {
            //工具条控制是否全屏的设置项的回调函数逻辑
            this.settingData.fullScreen.value = val;
            this.settingData.ProductViewCarousel.moveLeftNum = 0;
            if (val) {
                // this.style.width = zmEditor.$store.state.page.nowWinWidth;
                // this.style.left = -zmEditor.$store.state.page.marginLeft;
                this.settingData.isShow2.value = false;
                // this.isShowSet(_that, this.settingData.isShow2.value, "boxPaddingLR");
                // this.ComponentsOfCalculated()
            } else {
                this.style.width = this.settingData.ProductViewCarousel.oldMainWidth;
                this.settingData.isShow2.value = true;
                // this.isShowSet(_that, this.settingData.isShow2.value, "boxPaddingLR");
                let _this = zmEditor.$store.state.component.selectList[0] || this;
                let fath = ['headRow', 'bodyRow', 'footRow'].every(item => item != _this.$parent.type);
                if (fath) {
                    this.$store.commit("other_fullScreen", { //
                        _this: this, //当前实例
                        isFullPage: this.settingData.fullScreen.value, //非全屏状态;
                    }); //记录非全屏组件的left值;
                    this.settingData.oldLeft = this.$store.state.otherStore.fullPage_coms.get(_this.id);
                    this.style.left = this.settingData.oldLeft;
                    console.log("我是嵌套的！", this.style.left)
                } else {
                    this.style.left = this.settingData.oldLeft;
                    console.log("我是没有嵌套的！", this.settingData.oldLeft)
                }
            }
            this.isCarousel = true;
            this.getComH(this.style.width, false, true);
            this.settingData.fullScreen.value ? this.style.left = parseFloat(this.settingData.boxPaddingLR.value) : "";
            zmEditor.$store.commit('saveOperationToHistory')
        },
        fullScreen(val, _that) {
            //全屏宽度
            this.settingData.fullScreen.value = val;
            this.settingData.ProductViewCarousel.moveLeftNum = 0;
            if (val) {
                // this.style.width = zmEditor.$store.state.page.nowWinWidth;
                // this.style.left = -zmEditor.$store.state.page.marginLeft;
                this.settingData.isShow2.value = false;
                // this.isShowSet(_that, this.settingData.isShow2.value, "boxPaddingLR");
                // this.ComponentsOfCalculated()
            } else {
                this.style.width = this.settingData.ProductViewCarousel.oldMainWidth;
                this.settingData.isShow2.value = true;
                // this.isShowSet(_that, this.settingData.isShow2.value, "boxPaddingLR");
                let _this = zmEditor.$store.state.component.selectList[0] || this;
                let fath = ['headRow', 'bodyRow', 'footRow'].every(item => item != _this.$parent.type);
                if (fath) {
                    this.$store.commit("other_fullScreen", { //
                        _this: this, //当前实例
                        isFullPage: this.settingData.fullScreen.value, //非全屏状态;
                    }); //记录非全屏组件的left值;
                    this.settingData.oldLeft = this.$store.state.otherStore.fullPage_coms.get(_this.id);
                    this.style.left = this.settingData.oldLeft;
                    console.log("我是嵌套的！", this.style.left)
                } else {
                    this.style.left = this.settingData.oldLeft;
                    console.log("我是没有嵌套的！", this.settingData.oldLeft)
                }
            }
            this.isCarousel = true;
            this.getComH(this.style.width, false, true);
            this.settingData.fullScreen.value ? this.style.left = parseFloat(this.settingData.boxPaddingLR.value) : "";
            zmEditor.$store.commit('saveOperationToHistory')
        },
        rotateC() {
            //移动端换一批按钮事件
            this.isRotateP = true;
            this.settingData.rotateCount += 1;
            this.settingData.rotateDeg += 360;

            if (this.lists.length < 4) {
                // this.settingData.spliceNum = 2
                // this.settingData.firstIndex += 2
                this.settingData.spliceNum = 4;
                this.settingData.firstIndex += 4;
            } else {
                if (this.lists.length == 4) {
                    this.settingData.firstIndex += 4;
                    this.settingData.spliceNum = 4;
                } else {
                    // if(!this.minIs){
                    //     this.settingData.firstIndex += 4
                    // }
                    this.settingData.firstIndex += 4;
                    this.settingData.spliceNum = 4;
                    // if(this.lists.length-this.settingData.firstIndex < 4){
                    //     if(this.settingData.rotateCount >= Math.ceil(this.lists.length/4)){
                    //         this.settingData.firstIndex += 2
                    //     }
                    //     this.minIs = true
                    //     this.settingData.spliceNum = 2
                    // }else{
                    //     this.minIs = false
                    // }
                }
            }
            if (this.lists.length - this.settingData.firstIndex <= 0) {
                this.settingData.firstIndex = 0;
                this.settingData.rotateCount = 0;
                this.minIs = false;
                // if(this.lists.length < 4){
                //     this.settingData.spliceNum = 2
                // }else{
                //     this.settingData.spliceNum = 4
                // }
            }
            this.getComH();
            setTimeout(() => {
                this.$store.commit("updateComStyle", {
                    id: this.id,
                    style: this.style,
                    mobileStyle: this.mobileStyle
                }); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
                return;
            }, 50);
        },
        setRotate() {
            this.settingData.rotateCount = 0; //换一批点击次数;
            if (this.lists.length < 4) {
                this.settingData.firstIndex = 0; //数据lists起始下标位置;
                // this.settingData.spliceNum = 2
                this.settingData.spliceNum = 4; //数据lists截取位置;
            } else {
                this.settingData.firstIndex = 0;
                this.settingData.spliceNum = 4;
            }
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                this.mobileStyle.height = this.mobileGetDom();
            } else {
                this.style.height = this.ComponentsOfCalculated(this.style.width, true, true);
                let _this = zmEditor.$store.state.component.selectList[0] || this;
                let fath = ['headRow', 'bodyRow', 'footRow'].every(item => item != _this.$parent.type);
                this.settingData.fullScreen.value ? (fath ? this.style.left = parseFloat(this.settingData.boxPaddingLR.value) : "") : "";
            }
            this.$nextTick(() => {
                if (this.settingData.mobileComIsHide) {
                    this.$store.commit("raiseComUpdated", {
                        "id": this.id
                    });
                }
                this.$store.commit("resetHistoryDataAccordingToHistoryId", this) //历史记录;
            });
            if (this.$store.state.toolMenu.isChangeStyle) {
                this.$store.commit("createChangeHeightClass", {
                    nowCom: this, //当前选中组件
                    isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                });
                this.$store.commit("setChangeStyleStatus", false);
            }
        },
        isShowSet(_that, val, str) {
            //控制指定设置项是否显示
            let child = _that.$parent.$children;
            child.forEach(item => {
                item.prop && item.prop.attr == str ? (item.prop.isShowSet = val) : "";
            });
        },
        productLink(url) {
            //点击查看详情
            // location.href = url//当前页打开新页面
            // window.open(url, "_blank")//保存当前页，打开新页面
        },
        pictureHeight(ww, hh) {
            //图片宽高比例设置项回调函数
            let imgW = this.settingData.ProductViewCarousel.imgWidth;
            let imgWM = this.settingData.mobileData.imgWidth;
            switch (ww) {
                case 16:
                    this.settingData.ProductViewCarousel.imgHeight = Math.round(
                        imgW * (9 / 16)
                    );
                    this.settingData.mobileData.imgHeight = Math.round(imgWM * (9 / 16));
                    // this.style.height = Math.round(imgW*(9/16)) + titleH
                    break;
                case 3:
                    if (hh == 2) {
                        this.settingData.ProductViewCarousel.imgHeight = Math.round(
                            imgW * (2 / 3)
                        );
                        this.settingData.mobileData.imgHeight = Math.round(imgWM * (2 / 3));
                    } else if (hh == 4) {
                        this.settingData.ProductViewCarousel.imgHeight = Math.round(
                            imgW * (4 / 3)
                        );
                        this.settingData.mobileData.imgHeight = Math.round(imgWM * (4 / 3));
                    }
                    break;
                case 4:
                    this.settingData.ProductViewCarousel.imgHeight = Math.round(
                        imgW * (3 / 4)
                    );
                    this.settingData.mobileData.imgHeight = Math.round(imgWM * (3 / 4));
                    break;
                case 1:
                    this.settingData.ProductViewCarousel.imgHeight = Math.round(imgW);
                    this.settingData.mobileData.imgHeight = Math.round(imgWM);
                    break;
            }
            this.settingData.ProductViewCarousel.widthPer = ww;
            this.settingData.ProductViewCarousel.heightPer = hh;
            //   this.style.height = ($(this.$refs.procuctLi).height() + this.settingData.productCarousel.paddingTop+this.settingData.productCarousel.paddingBottom)
            //   this.ComponentsOfCalculated()
            //   this.ComponentsOfCalculatedM()
            this.getComH();
            zmEditor.$store.commit('saveOperationToHistory');
        },
        paddingTopF(v) {
            //组件上部高度
            this.settingData.productCarousel.paddingTop = parseFloat(v);
            this.getComH();
        },
        bgImgCb(v) {
            //图片显示效果设置项回调函数
            if (v.trim() == "自适应") {
                this.settingData.ProductViewCarousel.backgroundSize = "cover";
                this.settingData.ProductViewCarousel.backgroundPosition = "center";
            } else if (v.trim() == "填充") {
                this.settingData.ProductViewCarousel.backgroundSize = "cover";
                this.settingData.ProductViewCarousel.backgroundPosition = "0px 0px";
            }
            zmEditor.$store.commit('saveOperationToHistory');
        },
        vienMousemove(index) {
            //图片遮罩层移入事件
            // this.settingData.carouselVien.show = true
            if (this.settingData.imgLayout.enlarge == true) {
                $(this.$refs.imgbox3)
                    .eq(index)
                    .css("transform", "scale(1.04)");
            } else if (this.settingData.imgLayout.leftMove == true) {
                $(this.$refs.imgbox3)
                    .eq(index)
                    .css("transform", "translateX(-3%)");
            } else if (this.settingData.imgLayout.topMove == true) {
                $(this.$refs.imgbox3)
                    .eq(index)
                    .css("transform", "translateY(-3%)");
            } else if (this.settingData.imgLayout.blur == true) {
                $(this.$refs.imgbox3)
                    .eq(index)
                    .css("filter", "blur(1px)");
            }
        },
        vienMouseout(index) {
            //图片遮罩层移出事件
            // this.settingData.carouselVien.show = false
            $(this.$refs.imgbox3)
                .eq(index)
                .css("transition", "");
            $(this.$refs.imgbox3)
                .eq(index)
                .css("transform", "");
            $(this.$refs.imgbox3)
                .eq(index)
                .css("transform", "");
            $(this.$refs.imgbox3)
                .eq(index)
                .css("transform", "");
            $(this.$refs.imgbox3)
                .eq(index)
                .css("filter", "");
        },
        imgFloatE(v, v2, _that) {
            //图片悬浮效果回调函数
            switch (v) {
                case "无效果":
                    this.settingData.imgLayout.enlarge = false;
                    this.settingData.imgLayout.leftMove = false;
                    this.settingData.imgLayout.topMove = false;
                    this.settingData.imgLayout.blur = false;
                    this.settingData.carouselVien.show = false;
                    this.settingData.carouselVien.isShowSet = true;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
                case "放大":
                    this.settingData.imgLayout.enlarge = true;
                    this.settingData.imgLayout.leftMove = false;
                    this.settingData.imgLayout.topMove = false;
                    this.settingData.imgLayout.blur = false;
                    this.settingData.carouselVien.show = false;
                    this.settingData.carouselVien.isShowSet = true;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
                case "左移":
                    this.settingData.imgLayout.enlarge = false;
                    this.settingData.imgLayout.leftMove = true;
                    this.settingData.imgLayout.topMove = false;
                    this.settingData.imgLayout.blur = false;
                    this.settingData.carouselVien.show = false;
                    this.settingData.carouselVien.isShowSet = true;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
                case "上移":
                    this.settingData.imgLayout.enlarge = false;
                    this.settingData.imgLayout.leftMove = false;
                    this.settingData.imgLayout.topMove = true;
                    this.settingData.imgLayout.blur = false;
                    this.settingData.carouselVien.show = false;
                    this.settingData.carouselVien.isShowSet = true;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
                case "虚化":
                    this.settingData.imgLayout.enlarge = false;
                    this.settingData.imgLayout.leftMove = false;
                    this.settingData.imgLayout.topMove = false;
                    this.settingData.imgLayout.blur = true;
                    this.settingData.carouselVien.show = false;
                    this.settingData.carouselVien.isShowSet = true;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
                case "覆盖颜色":
                    this.settingData.imgLayout.enlarge = false;
                    this.settingData.imgLayout.leftMove = false;
                    this.settingData.imgLayout.topMove = false;
                    this.settingData.imgLayout.blur = false;
                    this.settingData.carouselVien.show = true;
                    this.settingData.carouselVien.isShowSet = false;
                    this.isShowSet(
                        _that,
                        this.settingData.carouselVien.isShowSet,
                        "carouselVien"
                    );
                    break;
            }
            zmEditor.$store.commit('saveOperationToHistory');
        },
        borderColorF(v) {
            //图片边框颜色
            this.settingData.borderColor.value = v.color;
            this.settingData.border =
                this.settingData.borderW.value +
                " solid " +
                this.settingData.borderColor.value;
        },
        borderWF(v) {
            //图片边框宽度
            this.settingData.borderW.value = v + "px";
            this.settingData.border =
                this.settingData.borderW.value +
                " solid " +
                this.settingData.borderColor.value;
        },
        boxPaddingLR(v) {
            //常规布局----边距缩进
            // this.settingData.ProductViewCarousel.translateX = 0;
            this.settingData.ProductViewCarousel.moveLeftNum = 0;
            // this.settingData.arrowleft = false;
            // this.settingData.arrowright = true;
            this.getComH();
            let _this = zmEditor.$store.state.component.selectList[0] || this;
            let fath = ['headRow', 'bodyRow', 'footRow'].every(item => item != _this.$parent.type);
            this.settingData.fullScreen.value ? (fath ? this.style.left = parseFloat(this.settingData.boxPaddingLR.value) : "") : "";
            // zmEditor.$store.commit('saveOperationToHistory')
        },
        numberOfColumns(v) {
            //列数改变
            this.settingData.ProductViewCarousel.num = v;
            // this.settingData.ProductViewCarousel.translateX = 0;
            // setTimeout(() => {
            this.getComH();
            this.settingData.ProductViewCarousel.moveLeftNum = 0;
            this.isCarousel = true;
            // this.settingData.ulBoxW.width = this.style.width - this.settingData.productCarousel.paddingLeft*2
            // this.settingData.arrowleft = false;
            // this.settingData.arrowright = true;
            this.settingData.ProductViewCarousel.oldnum = v;
            this.$store.commit("updateComStyle", {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            }); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
            return;
            // }, 20);
        },
        liMarginLeftF(v) {
            //列间距
            // this.settingData.ProductViewCarousel.translateX = 0;
            this.settingData.ProductViewCarousel.moveLeftNum = 0;
            this.settingData.ProductViewCarousel.liMarginLeft = parseInt(v);
            // this.$nextTick(() => {
            this.textRowF(this.settingData.textRow.value.text);
            // });
        },
        carouselArrow(val) {
            this.settingData.carouselArrow.width = val;
        },
        filters(val, size, num, min) {
            var minSize = min ? min : 10;
            var arr = [];
            var cont = minSize - 1;
            var sub;
            var sum = 0;
            try {
                for (var i = 1, j = 6; i <= 6; i++) {
                    cont += i;
                    if (num == 1) { //双线箭头
                        sub = size - (j + 30);
                    } else { //长箭头;
                        if (num == 2) {
                            sub = size - 30
                        }
                    }
                    arr.push({
                        list: cont,
                        size: sub
                    })
                }
                let filterSize;
                for (let k = 0; k <= arr.length; k++) {
                    for (let l = minSize; l <= arr[k].list; l++) {
                        if (val == arr[k].list) {
                            filterSize = arr[k].size;
                            return filterSize
                        } else {
                            if (val < arr[k].list) {
                                filterSize = arr[k - 1].size;
                                return filterSize
                            }
                        }
                    }
                }
            } catch (err) {

            }
        },
        filterSize(val, size, num, min) {
            var minSize = min;
            var arr = [];
            var cont = 9;
            var sub;
            var sum = 0;
            try {
                for (var i = 1, j = 6; i <= 6; i++) {
                    cont += i;
                    if (num != 1 && num != 2) {
                        if (num == 3) { //三角箭头
                            sub = size - 32
                        } else { //单线箭头
                            sub = size - (j + 28 - i)
                        }

                    }
                    sum = Math.round(cont * (minSize / 10));
                    arr.push({
                        list: sum,
                        size: sub
                    })
                }
                let filterSize;
                for (let k = 0; k <= arr.length; k++) {
                    for (let l = minSize; l <= arr[k].list; l++) {
                        if (val == arr[k].list) {
                            filterSize = arr[k].size;
                            return filterSize
                        } else {
                            if (val < arr[k].list) {
                                filterSize = arr[k - 1].size;
                                return filterSize
                            }
                        }
                    }
                }
            } catch (err) {

            }
        },
        downH() {
            //调节箭头边距缩进鼠标在拖动点上按下的时候
            if (parseFloat(this.settingData.BtnTextIndent.value) < 0) {
                this.nStyle.ulwidth =
                    this.style.width -
                    Math.abs(parseFloat(this.settingData.productCarousel.paddingLeft)) *
                    2;
            } else {
                this.nStyle.ulwidth = this.settingData.ulBoxW.width;
            }
            return this.nStyle.ulwidth;
        },
        textRowF(v, v2, _that) {
            //文本行数
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                this.settingData.isMtextRowNum = true;
                if (v.trim() == "单行文本") {
                    this.settingData.MtextRowNum = 1;
                } else if (v.trim() == "两行文本") {
                    this.settingData.MtextRowNum = 2;
                }
                // this.mobileGetDom();
                this.getComH();
            } else {
                if (v.trim() == "单行文本") {
                    this.settingData.textRowNum = 1;
                    this.settingData.lineEm.isShowSet = true;
                    if (_that)
                        this.isShowSet(
                            _that,
                            this.settingData.lineEm.isShowSet,
                            "NamelineHeight"
                        );
                } else if (v.trim() == "两行文本") {
                    this.settingData.textRowNum = 2;
                    this.settingData.lineEm.isShowSet = false;
                    if (_that)
                        this.isShowSet(
                            _that,
                            this.settingData.lineEm.isShowSet,
                            "NamelineHeight"
                        );
                }
                this.settingData.carouselHitleH =
                    parseFloat(this.settingData.bannerfont3.value.fontSize) *
                    parseFloat(this.settingData.NamelineHeight.value) *
                    parseFloat(this.settingData.textRowNum);
                // setTimeout(() => {
                this.getComH();
                // this.settingData.ProductViewCarousel.translateX = 0;
                this.settingData.ProductViewCarousel.moveLeftNum = 0;
                return;
                // }, 20);
            }
            zmEditor.$store.commit("saveOperationToHistory");
        },
        nameLineH(v) {
            //商品名称行高
            if (this.settingData.textRowNum == 1) {
                this.settingData.NamelineHeight.value = 1.2;
            } else if (this.settingData.textRowNum == 2) {
                this.settingData.NamelineHeight.value = v;
            }
            this.settingData.carouselHitleH =
                parseFloat(this.settingData.bannerfont3.value.fontSize) *
                parseFloat(this.settingData.NamelineHeight.value) *
                parseFloat(this.settingData.textRowNum);
            this.getComH();
        },
        productNameTxtI(v1) {
            //商品名称,SKU,零售价 边距缩进
            switch (this.settingData.carouselTitAlign) { //商品名称边距缩进
                case "left":
                    this.settingData.TitMarginRight.value = "";
                    // this.settingData.carouselTitleT.value = v1 + 'px'
                    break;
                case "center":
                    this.settingData.TitMarginRight.value = "";
                    // this.settingData.carouselTitleT.value = v1 + 'px'
                    break;
                case "right":
                    this.settingData.TitMarginRight.value = v1 + "px";
                    // this.settingData.carouselTitleT.value = ''
                    break;
            }
            switch (this.settingData.skutit) { //SKU边距缩设置项进回调函数
                case "left":
                    this.settingData.skumarginRight.value = "";
                    this.settingData.skuTitTextIndent.value = v1 + "px";
                    break;
                case "center":
                    this.settingData.skumarginRight.value = "";
                    this.settingData.skuTitTextIndent.value = "0px";
                    break;
                case "right":
                    this.settingData.skumarginRight.value = v1 + "px";
                    this.settingData.skuTitTextIndent.value = "0px";
                    break;
            }

            switch (this.settingData.retailtit) { //零售价边距缩设置项进回调函数
                case "left":
                    this.settingData.retailmarginRight.value = "";
                    this.settingData.retailTitTextIndent.value = v1 + "px";
                    break;
                case "center":
                    this.settingData.retailmarginRight.value = "";
                    this.settingData.retailTitTextIndent.value = "0px";
                    break;
                case "right":
                    this.settingData.retailmarginRight.value = v1 + "px";
                    this.settingData.retailTitTextIndent.value = "0px";
                    break;
            }
            this.getComH();
        },
        mobileGetDom(val) {
            //计算移动端组件初始化设置项
            //this.settingData.ProductViewCarousel.heightPer 图片高度比移动
            //this.settingData.ProductViewCarousel.widthPer 图片宽度比移动
            //this.settingData.MtextRowNum  标题文字的行数;
            //this.settingData.carouselHitleHM 标题文字的高度;
            //this.settingData.titLineH  标题文字的上下差值;
            let sub = val ? val : this.mobileStyle.width;
            let imgTop = 4;
            let scaleW = 1;
            let scaleH = 1;
            let imgH = (sub - 16) / 2 * (scaleW / scaleH); //图片的调度  16指-----左右边距各4，列间距8;
            let priceH = parseFloat(this.settingData.retailfont3.value.fontSize) >= 20 ? 20 : parseFloat(this.settingData.retailfont3.value.fontSize); //价格的高度;
            this.settingData.carouselHitleHM =
                (parseFloat(this.settingData.bannerfont3.value.fontSize) >= 16 ?
                    16 :
                    parseFloat(this.settingData.bannerfont3.value.fontSize)) *
                parseFloat(this.settingData.MtextRowNum) *
                1.5; //标题的总高度;
            this.settingData.titLineH =
                (1.5 *
                    parseFloat(
                        parseInt(this.settingData.bannerfont3.value.fontSize) >= 16 ?
                        "16px" :
                        this.settingData.bannerfont3.value.fontSize
                    ) -
                    parseFloat(
                        parseInt(this.settingData.bannerfont3.value.fontSize) >= 16 ?
                        "16px" :
                        this.settingData.bannerfont3.value.fontSize
                    )) /
                2; //标题文字的上下差值;
            let titH = parseFloat(this.settingData.carouselHitleHM);
            let titTop = 12 - parseFloat(this.settingData.titLineH); //标题的上边距
            let picTop = 12 - parseFloat(this.settingData.titLineH); //标题的下边距
            let lineHeight = 20; //行间距;
            let pageHeight = 38; //换一批的高度;
            let rows = 2; //行数;
            let totalH = parseFloat(parseFloat(imgH + titH + priceH + lineHeight + titTop + picTop) * rows) + imgTop + pageHeight;
            return totalH;
        },
        ComponentsOfCalculated(val, boen = false, drag = false) {
            // val   指最新的style.width,  
            // boen  指在created状态下判断是否拖离父子关系值为true,其它状态下拖离父子关系为false;
            // drag  指只有在created状态下，设置项调节全屏，工具栏调节全屏或样式切换下拖离父子关系默认为true,其它操作均不执行为false(设置项全屏计算组件新高度向编辑器传值注意，不用调用默认为 false)。
            //计算组件宽高，计算图片和文字区域宽高函数
            // this.$nextTick(()=>{
            // this.settingData.ProductViewCarousel.num    列数设置;
            // this.settingData.productCarousel.paddingLeft    content的上部间距，暂时没用;
            // this.settingData.ProductViewCarousel.liMarginLeft  li的列间距有上边距统一设置;
            // this.settingData.productCarousel.paddingTop    li的上边距单一设置，暂时没用;
            // this.settingData.BtnTextIndent.value    箭头的边距缩进;
            // this.settingData.ulBoxW.width   ul的总宽度;
            // this.settingData.isShow2.value   true关闭全屏状态;
            // this.settingData.boxPaddingLR.value   全屏状态下content的paddingleft,right;
            // this.settingData.ProductViewCarousel.imgWidth  图片的宽度;
            // this.settingData.NamelineHeight.value  标题的lineHeight;
            // this.settingData.carouselTitlePT.value  标题的上部高度;
            // this.settingData.carouselTitlePB.value  标题的下部高度;
            // this.settingData.retailTitmarginTop.value   价格的上部高度;
            // this.settingData.retailmarginBottom.value   价格的下部高度;
            let sub = val ? val : this.style.width;
            let num = this.settingData.ProductViewCarousel.num;
            let paddingLeft = this.settingData.fullScreen.value ? this.settingData.productCarousel.paddingLeft : 0;
            let liMarginLeft = this.settingData.ProductViewCarousel.liMarginLeft;
            this.settingData.ulBoxW.width = sub - Math.abs(parseFloat(this.settingData.productCarousel.paddingLeft) * 2);
            if (this.settingData["fullScreen"].value) {
                // this.settingData.ulBoxW.width =
                //     this.$store.state.page.nowWinWidth -
                //     Math.abs(
                //         parseFloat(this.settingData.productCarousel.paddingLeft) * 2
                //     ) -
                //     Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;
                // this.style.width = this.settingData.ulBoxW.width;
                if (drag) {
                    this.$store.commit("other_fullScreen", {
                        _this: this,
                        isFullPage: this.settingData.fullScreen.value,
                        reload: boen
                    }); //拖离父子关系，并改变当前选中组件的left值，设置为 0;
                }
                let _this = zmEditor.$store.state.component.selectList[0] || this;
                let fath = ['headRow', 'bodyRow', 'footRow'].every(item => item != _this.$parent.type);
                //判断当前父容器是不是不包含'headRow', 'bodyRow', 'footRow'，不是说明为容器嵌套,返回值为true为容器嵌套;
                if (fath) {
                    if (this.$parent.isFullPage || this.$parent.type == 'carousel' && this.$parent.settingData.fullScreen.value) {
                        this.settingData.ulBoxW.width =
                            this.$parent.style.width -
                            Math.abs(
                                parseFloat(this.settingData.productCarousel.paddingLeft) * 2
                            ) -
                            Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;
                    }
                } else {
                    this.settingData.ulBoxW.width =
                        this.$store.state.page.nowWinWidth -
                        Math.abs(
                            parseFloat(this.settingData.productCarousel.paddingLeft) * 2
                        ) -
                        Math.abs(parseFloat(this.settingData.boxPaddingLR.value)) * 2;

                    let _left = this.$store.state.page.marginLeft;
                    this.style.left = -_left + parseFloat(this.settingData.boxPaddingLR.value);
                }
                this.style.width = this.settingData.ulBoxW.width;
            }
            this.settingData.ProductViewCarousel.imgWidth = Number(parseFloat(
                (this.settingData.ulBoxW.width -
                    2 * liMarginLeft -
                    liMarginLeft * (num - 1)) /
                num
            ).toFixed(3));
            this.settingData.ProductViewCarousel.imgHeight = parseFloat(
                this.settingData.ProductViewCarousel.imgWidth *
                (this.settingData.ProductViewCarousel.heightPer /
                    this.settingData.ProductViewCarousel.widthPer)
            );
            this.settingData.titH =
                this.settingData.textRowNum *
                (parseFloat(this.settingData.NamelineHeight.value) <= 1.3 ?
                    1.3 :
                    this.settingData.NamelineHeight.value) *
                parseFloat(this.settingData.bannerfont3.value.fontSize);

            this.settingData.titLineH =
                (1.3 * parseFloat(this.settingData.bannerfont3.value.fontSize) -
                    parseFloat(this.settingData.bannerfont3.value.fontSize)) /
                2;
            this.settingData.priceH = parseFloat(
                this.settingData.retailfont3.value.fontSize
            );
            let titH =
                this.settingData.titH +
                parseFloat(this.settingData.carouselTitlePT.value) +
                parseFloat(this.settingData.carouselTitlePB.value);
            let priceH =
                this.settingData.priceH +
                parseFloat(this.settingData.retailTitmarginTop.value);
            let contHeight = parseFloat(this.settingData.ProductViewCarousel.imgHeight) +
                parseFloat(titH) +
                parseFloat(priceH) +
                parseFloat(
                    this.settingData.ProductViewCarousel.liMarginLeft -
                    this.settingData.titLineH -
                    5
                ) +
                parseFloat(this.settingData.retailmarginBottom.value);
            let ulWidth = parseFloat(this.settingData.ProductViewCarousel.imgWidth) * this.lists.length + parseFloat((this.lists.length - 1) * this.settingData.ProductViewCarousel.liMarginLeft);
            this.settingData.ProductViewCarousel.translateX = ulWidth + this.settingData.ProductViewCarousel.liMarginLeft;
            contHeight = Number(contHeight.toFixed(2));
            return contHeight;
        },
        getComH(val = this.style.width, boen = false, drag = false) { //获取pc移动组件的总高度
            if (!this.isComputer && this.settingData.mobileComIsHide) { //
                let params = {
                    oriL: this.mobileStyle.left, //组件高度改变前的left
                    oriH: this.mobileStyle.height, //组件高度改变前的height
                    oriW: this.mobileStyle.width, //组件高度改变前的width
                    oriT: this.mobileStyle.top, //组件高度改变前的top
                    oriRotate: this.mobileStyle.rotate, //组件高度改变前的rotate
                    curH: this.mobileGetDom(), //组件高度改变后的height
                    nowCom: this, //当前选中组件
                    isPush: true, //true-下推组件
                }
                this.$store.commit("createChangeHeightClass", params); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
                this.mobileStyle.height = this.mobileGetDom();
            } else {
                //下推组件参数：
                let params = {
                    oriL: this.style.left, //组件高度改变前的left
                    oriH: this.style.height, //组件高度改变前的height
                    oriW: this.style.width, //组件高度改变前的width
                    oriT: this.style.top, //组件高度改变前的top
                    oriRotate: this.style.rotate, //组件高度改变前的rotate
                    curH: this.ComponentsOfCalculated(val, boen, false), //组件高度改变后的height
                    nowCom: this, //当前选中组件
                    isPush: true, //true-下推组件
                }
                this.$store.commit("createChangeHeightClass", params); //组件自身高度变化时 要同步修改下方或父级组件大小或者位置的
                this.style.height = this.ComponentsOfCalculated(val, boen, drag);
            }

        }
    }
}
