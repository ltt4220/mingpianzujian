export default {
    methods: {
        toolbarW(obj) { //工具条宽度的方法;obj是输入值返回的参数对象;
            if (!this.isComputer) {
                obj.width > 320 ? this.mobileStyle.width = 320 : obj.width < 140 ? this.mobileStyle.width = 140 : this.mobileStyle.width = obj.width;
            } else {
                let picWidth = parseFloat(this.settingData.pictureWidth.value);
                let boxLr = parseInt(this.settingData.paddingLeftRight.value) * 2;
                let oldWidth = parseFloat(picWidth + boxLr);
                obj.width < oldWidth ? (this.style.width = oldWidth) : obj.width > 2500 ? (this.style.width = 2500) : this.style.width = obj.width;
            }
        },
        changeStyleCallback(obj) { //样式切换的方法;
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
            newObj.style.left = this.style.left;
            newObj.style.top = this.style.top;
            newObj.settingData.listsID = this.settingData.listsID;
            newObj.settingData.defauletTypeName.value = this.settingData.defauletTypeName.value;
            return newObj;

        },
        newAxios(url, shop) { //最新博客的数据
            this.$axios
                .get(
                    url, {
                        params: {
                            fShopId: shop
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }
                )
                .then(response => {
                    let data = response.data.data;
                    this.items = data;
                    this.lists = this.items.slice(0, 10);
                    this.mobChangeSet(); //初始化移动端;
                    if (!data || data.length == 0) {
                        this.setComBoxHeight(); //pc默认高度;
                    } else {
                        if (this.isComputer) {
                            this.setListData ? this.setListData() : "";
                        } else {
                            this.mobChangeSet(); //初始化移动端;
                        }
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide)
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                })
                .catch(response => {
                    // 这里是处理错误的回调
                    this.lists = [];
                    this.setComBoxHeight(); //pc默认高度;
                    console.log(response);
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide)
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                });
        },
        assignAxios(url, fid, shop) { //指定博客的数据
            this.$axios
                .get(
                    url, {
                        params: {
                            ids: fid,
                            fShopId: shop
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }
                )
                .then(response => {
                    let data = response.data.data;
                    if (!data || data.length == 0) {
                        this.setComBoxHeight(); //pc默认高度;
                    } else {
                        let falg = this.settingData.listsID.some(item => {
                            return item.type == true;
                        });
                        if (!falg) {
                            if (this.isComputer) {
                                this.setComBoxHeight ? this.setComBoxHeight() : "";
                            }
                        } else {
                            let fid = JSON.parse(JSON.stringify(this.settingData.listsID));
                            data.forEach(ele => {
                                fid.forEach(item => {
                                    let id1 = '1-' + ele.fId;
                                    let id2 = '2-' + ele.fId;
                                    id1 == item.id && (ele.fId = id1);
                                    id2 == item.id && (ele.fId = id2);
                                })
                            });
                            this.lists = data;
                            if (this.isComputer) {
                                this.setListData ? this.setListData() : "";
                            } else {
                                console.log(this.settingData.pictureScale.row,
                                    this.settingData.pictureScale.col, "****************")
                                this.mobChangeSet(); //初始化移动端;
                            }
                        }
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide)
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                })
                .catch(response => {
                    // 这里是处理错误的回调
                    this.lists = [];
                    this.setComBoxHeight(); //pc默认高度;
                    console.log(response);
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide)
                            if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                });
        },
        pointDown(obj) { //鼠标在八个点上按下的时候
            let index = obj.index;
            this.nStyle.left = this.style.left;
            this.nStyle.height = this.style.height;
            this.nStyle.top = this.style.top;
            this.nStyle.dy = event.clientY;
            this.mStyle.left = this.mobileStyle.left;
            this.mStyle.height = this.mobileStyle.height;
            this.mStyle.top = this.mobileStyle.top;
            this.mStyle.dy = event.clientY;
            if (index == 7) {
                if (this.isComputer) {
                    this.oldWidth = this.style.width; //鼠标按下的宽度
                    this.oldLeft = this.style.left; //鼠标按下的left
                } else {
                    this.oldMobWidth = this.mobileStyle.width;
                    this.oldMobLeft = this.mobileStyle.left;
                }
            }
            return {
                moveMold: index
            };
        },
        pointUp(obj) { //鼠标在八个点弹起的时候;
            let index = obj.index;
            if (index == 5) {
                this.style.height = this.nStyle.height;
                this.mobileStyle.height = this.mStyle.height;
            }
            return true;
        },
        pointCallBack(val) { //编辑框8个小点回调;
            let index = val.index;
            let picWidth = parseFloat(this.settingData.pictureWidth.value);
            let boxLr = parseInt(this.settingData.paddingLeftRight.value) * 2;
            let oldWidth = parseFloat(picWidth + boxLr);
            this.nStyle.dw = event.clientY - this.nStyle.dy;
            this.mStyle.dw = event.clientY - this.mStyle.dy;
            // if (index == 1) {
            //     this.style.top = this.nStyle.top + this.nStyle.dw;
            //     this.style.height = this.nStyle.height;
            //     this.mobileStyle.top = this.mStyle.top + this.mStyle.dw;
            //     this.mobileStyle.height = this.mStyle.height;
            // }
            if (index == 3) {
                if (this.isComputer) {
                    this.style.width < oldWidth ? (this.style.width = oldWidth) : "";
                } else {
                    this.mobileStyle.width < 140 ? (this.mobileStyle.width = 140) : "";
                }
            }
            if (index == 7) {
                if (this.isComputer) {
                    if (this.style.width < oldWidth) {
                        this.style.width = oldWidth;
                        let sub = this.oldWidth - this.style.width; //最新宽度-鼠标按下的宽度差值;
                        this.style.left = this.oldLeft + sub; //鼠标按下的left-宽差值;
                    }
                } else {
                    if (this.mobileStyle.width < 140) {
                        this.mobileStyle.width = 140;
                        let mobSub = this.oldMobWidth - this.mobileStyle.width; //最新宽度-鼠标按下的宽度差值;
                        this.mobileStyle.left = this.oldMobLeft + mobSub; //鼠标按下的left-宽差值;
                    }
                }
            }
            let minWidth;//编辑器需要组件的最小宽度;
            if (this.isComputer) {
                minWidth = oldWidth;
                index == 0 || index == 2 || index == 3 || index == 4 || index == 6 || index == 7 ? this.setListData() : "";
            } else {
                minWidth = 180;
                index == 0 || index == 2 || index == 3 || index == 4 || index == 6 || index == 7 ? this.setMobListData() : "";
            }
            return {
                moduleMinWidth: minWidth
            }
        },
        /*
         * transformation(): 转换时间;
         *           time: 转换时间;
         *           formar: 时间转换格式(暂用原始格式);
         * */
        transformation(time, format) {
            let Y = new Date(time).getFullYear();
            let M = new Date(time).getMonth() + 1;
            let D = new Date(time).getDate();
            let h = new Date(time).getHours();
            let m = new Date(time).getMinutes();
            let s = new Date(time).getSeconds();
            let timeFormat = "";
            switch (format) {
                case "YYYY/M/D":
                    timeFormat = Y + "/" + M + "/" + D;
                    break;
                case "YYYY-MM-DD":
                    timeFormat =
                        Y + "-" + this.autoAddZero(M) + "-" + this.autoAddZero(D);
                    break;
                case "YYYY年M月D日":
                    timeFormat = Y + "年" + M + "月" + D + "日";
                    break;
                case "YYYY_str年M_str月D_str日":
                    timeFormat =
                        this.numAutoStr(Y) +
                        "年" +
                        this.numAutoStr(M) +
                        "月" +
                        this.numAutoStr(D) +
                        "日";
                    break;
                case "YYYY_str年M_str月":
                    timeFormat = this.numAutoStr(Y) + "年" + this.numAutoStr(M) + "月";
                    break;
                case "M_str月D_str日":
                    timeFormat = this.numAutoStr(M) + "月" + this.numAutoStr(D) + "日";
                    break;
                case "YYYY年M月":
                    timeFormat = Y + "年" + M + "月";
                    break;
                case "YYYY/M/D H:SPM(12)":
                    timeFormat =
                        Y +
                        "/" +
                        M +
                        "/" +
                        D +
                        " " +
                        (h > 12 ? h - 12 : h) +
                        ":" +
                        this.autoAddZero(m) +
                        (h > 12 ? " PM" : " AM");
                    break;
                case "YYYY/M/D H:S(24)":
                    timeFormat =
                        Y + "/" + M + "/" + D + " " + h + ":" + this.autoAddZero(m);
                    break;
                case "YY/M/D":
                    timeFormat = Y.toString().slice(2, 4) + "/" + M + "/" + D;
                    break;
                case "M/D/YY":
                    timeFormat = M + "/" + D + "/" + Y.toString().slice(2, 4);
                    break;
                case "D-M_e":
                    timeFormat = D + "-" + this.monthEnglish(M);
                    break;
                case "D-M_e-YY":
                    timeFormat =
                        D + "-" + this.monthEnglish(M) + "-" + Y.toString().slice(2, 4);
                    break;
                case "M_e-YY":
                    timeFormat = this.numAutoEnglish(M) + "-" + Y.toString().slice(2, 4);
                    break;
                default:
                    console.log("参数formar传入的时间格式不正确！");
                    break;
            }
            return timeFormat;
        },
        /*
         * autoAddZero(): 不足两位，自动补0;
         *
         */
        autoAddZero(num) {
            return num >= 10 ? num : "0" + num;
        },
        /*
         * numAutoStr(): 日期类型转换，数字转字符串;
         *          num: 要转换的数值;
         */
        numAutoStr(num) {
            var numStr = num.toString();
            var newStr = "";
            for (var i = 0; i < numStr.length; i++) {
                switch (numStr[i]) {
                    case "0":
                        newStr += "零";
                        break;
                    case "1":
                        newStr += "一";
                        break;
                    case "2":
                        newStr += "二";
                        break;
                    case "3":
                        newStr += "三";
                        break;
                    case "4":
                        newStr += "四";
                        break;
                    case "5":
                        newStr += "五";
                        break;
                    case "6":
                        newStr += "六";
                        break;
                    case "7":
                        newStr += "七";
                        break;
                    case "8":
                        newStr += "八";
                        break;
                    case "9":
                        newStr += "九";
                        break;
                    default:
                        console.log(numStr[i] + "非数字！");
                        break;
                }
            }
            //判断是否为月份,中间加"十"(例:二十三)
            if (newStr.length == 2) {
                var arr = newStr.split("");
                if (arr[0] == "零") {
                    arr.splice(0, 1);
                } {
                    if (arr[0] !== "零") {
                        if (arr.length >= 2) {
                            arr.splice(1, 0, "十");
                            if (arr[0] == "一") {
                                arr.splice(0, 1, "");
                            }
                            if (arr[2] == "零") {
                                arr.splice(2, 1);
                            }

                        }
                    } else {
                        arr.splice(0, 1, "");
                    }
                }
                arr = arr.join("");
                return arr;
            } else {
                return newStr;
            }
        },
        /*
         * numAutoEnglish() : 将月份转换为English形式;
         * 			  month	: int类型，月份数值;
         */
        numAutoEnglish(month) {
            var month_Englist = "";
            switch (month) {
                case 1:
                    month_Englist = "January";
                    break;
                case 2:
                    month_Englist = "February";
                    break;
                case 3:
                    month_Englist = "March";
                    break;
                case 4:
                    month_Englist = "April";
                    break;
                case 5:
                    month_Englist = "May";
                    break;
                case 6:
                    month_Englist = "June";
                    break;
                case 7:
                    month_Englist = "July";
                    break;
                case 8:
                    month_Englist = "August";
                    break;
                case 9:
                    month_Englist = "September";
                    break;
                case 10:
                    month_Englist = "October";
                    break;
                case 11:
                    month_Englist = "November";
                    break;
                case 12:
                    month_Englist = "December";
                    break;
                default:
                    console.log("月份转换失败，参数不正确！");
                    break;
            }
            return month_Englist;
        },
        /*
         * monthEnglish() : 将月份转换为English简写形式;
         * 			  month	: int类型，月份数值;
         */
        monthEnglish(month) {
            var month_Englist = "";
            switch (month) {
                case 1:
                    month_Englist = "Jan";
                    break;
                case 2:
                    month_Englist = "Feb";
                    break;
                case 3:
                    month_Englist = "Mar";
                    break;
                case 4:
                    month_Englist = "Apr";
                    break;
                case 5:
                    month_Englist = "May";
                    break;
                case 6:
                    month_Englist = "Jun";
                    break;
                case 7:
                    month_Englist = "Jul";
                    break;
                case 8:
                    month_Englist = "Aug";
                    break;
                case 9:
                    month_Englist = "Sep";
                    break;
                case 10:
                    month_Englist = "Oct";
                    break;
                case 11:
                    month_Englist = "Nov";
                    break;
                case 12:
                    month_Englist = "Dec";
                    break;
                default:
                    console.log("月份转换失败，参数不正确！");
                    break;
            }
            return month_Englist;
        },
        checkBlogPicture(item) {
            let _this = this;
            if (item.ahref == undefined && !item.ahref) return;
            if (item.ahref) {
                _this.public.choiceModules({
                    multiple: false, //单选;
                    modules: "picture",
                    callBack: _this.blogpict
                });
            }
            this.checkImgId = item.fId;
            zmEditor.$store.commit('saveOperationToHistory')
        },
        blogpict(data) {
            let bgUrl = data[0].fPath;
            this.lists.forEach(item => {
                if (item.fId == this.checkImgId) {
                    item.bgUrl = bgUrl;
                    item.fImg[0] = bgUrl;
                    item.ahref = false;
                }
            });
            this.lists = Object.assign([], this.lists)
            let fid = this.checkImgId.replace(/[12]\-/g, "");
            let shop;
            let webType = zmEditor.$store.state.menu.webType;
            webType == "component" || webType == "template" ?
                (shop = "-888888") :
                (shop = this.fShopId);
            this.PicAxios(fid, bgUrl, shop); //接口改变fImg字段;
        },
        PicAxios(fid, fname, shop) {
            let _this = this;
            let url = '/blog_api/shopBlogApi/insertImg';
            _this.$axios({
                    method: "get",
                    url: url,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    responseType: "json",
                    params: {
                        fId: fid,
                        url: fname,
                        fShopId: shop
                    }
                })
                .then(function (response) {
                    let result = response.status;
                    if (0 == result) {
                        console.log("数据异常!");
                    } else {
                        console.log("数据OK!");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        setMobHeight() {
            let mobBlogNum = parseInt(this.settingData.mobBlogNum.value);
            let countHeight = parseFloat(84 * mobBlogNum) + parseInt(mobBlogNum - 1);
            return countHeight;
        },
        setMobListData() { //计算mobile博客总高度;
            // this.$nextTick(() => {
                this.mobileStyle.height = this.setMobHeight();
                const contHeight = this.$refs.content.clientHeight;
                this.minComH = contHeight;
                this.$store.commit('updateComStyle', {
                    id: this.id,
                    style: this.style,
                    mobileStyle: this.mobileStyle
                });
            // });
        },
        mobChangeSet() { //移动端样初始化;
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                if (this.settingData.mobBlogNum.flag) {
                    this.settingData.mobBlogNum.value = this.settingData.blogNum.value;
                }
                if (this.settingData.mobBlogShow.flag) {
                    this.settingData.mobBlogShow.num = this.settingData.blogShow.num;
                    this.settingData.mobBlogShow.value = this.settingData.blogShow.value;
                }
                if (parseInt(this.settingData.Familyfont.value.fontSize) > 14) {
                    this.settingData.mobTitle.value = "14px";
                } else {
                    this.settingData.mobTitle.value = this.settingData.Familyfont.value.fontSize;
                }
                if (parseInt(this.settingData.blogTimeFont.value.fontSize) > 14) {
                    this.settingData.mobDate.value = "14px";
                } else {
                    this.settingData.mobDate.value = this.settingData.blogTimeFont.value.fontSize;
                }
                this.setMobilePicHeight();
            };
        },
        setComBoxHeight() { //默认pc博客高度;
            this.style.height = 230;
            this.$store.commit('updateComStyle', {
                id: this.id,
                style: this.style,
                mobileStyle: this.mobileStyle
            });
        },
        setMobilePicHeight() { //计算mobile图片高度;
            let proper = [
                this.settingData.pictureScale.row,
                this.settingData.pictureScale.col
            ];
            let imgHeight = 60;
            this.settingData.mobileHeight.value =
                parseFloat(imgHeight * proper[0] / proper[1]) + "px";
            this.$nextTick(() => {
                this.mobileStyle.height = this.$el.firstChild.clientHeight;
                const contHeight = this.$refs.content.clientHeight;
                this.minComH = contHeight;
            });
        },
        mobBlogNum(val) {
            this.getSettingData("mobBlogNum", val);
            this.setMobListData();
            this.settingData.mobBlogNum.flag = false;
        },
        mobBlogShow(val) {
            this.settingData.mobBlogShow.flag = false;
            zmEditor.$store.commit('saveOperationToHistory')
        },
        setPcHeight() {
            this.settingData.contWidth.value = parseInt(this.style.width) - parseInt(this.settingData.paddingLeftRight.value) * 2 - parseInt(this.settingData.pictureWidth.value) - 20;
            let paddingLeftRight = parseInt(this.settingData.paddingLeftRight.value) * 2;
            let pictureHeight = parseFloat(this.settingData.pictureHeight.value);
            // let titFontSize = parseInt(this.settingData.Familyfont.value.fontSize) + parseInt(this.settingData.blogTimeTop.value) + parseInt(this.settingData.ContmarginTop.value) + parseInt(this.settingData.firstHeight.value);
            // let contHeight = parseInt(this.settingData.ContLineHeight.num) * parseInt(this.settingData.lineHeightNum.value)
            // let detailHeight = parseInt(this.settingData.DismarginTop.value) + parseInt(this.settingData.DismarginBottom.value) + parseInt(this.settingData.blogContFont.value.fontSize) + parseInt(this.settingData.lastHeight.value);
            let _height = parseFloat(paddingLeftRight + pictureHeight);
            console.log("总高度：", _height);
            let rows = parseInt(this.settingData.blogNum.value);
            let boxMarginBottom = parseInt(this.settingData.BoxMarginBottom.value) * (rows - 1);
            let con = _height * rows + boxMarginBottom;
            return con;
        },
        setListData() { //计算pc博客总高度;
            // this.$nextTick(() => {
                this.style.height = this.setPcHeight();
                this.$store.commit('updateComStyle', {
                    id: this.id,
                    style: this.style,
                    mobileStyle: this.mobileStyle
                });
            // });
        },
        blogNum(val) {
            this.getSettingData("blogNum", val);
            this.$store.commit('czj_changeBodyRowH', this); //改变bodyROw高度;
            this.setListData();
        },
        TitfontFamily(val) {
            this.getSettingData("Familyfont", val, "fontFamily");
        },
        TitfontSize(val) {
            this.getSettingData("Familyfont", val, "fontSize");
        },
        Titcolor(val) {
            this.getSettingData("Familyfont", val, "color");
        },
        TitfontWeight(val) {
            this.getSettingData("Familyfont", val, "fontWeight");
        },
        TitfontStyle(val) {
            this.getSettingData("Familyfont", val, "fontStyle");
        },
        TimefontFamily(val) {
            this.getSettingData("blogTimeFont", val, "fontFamily");
        },
        TimefontSize(val) {
            this.getSettingData("blogTimeFont", val, "fontSize");
        },
        Timecolor(val) {
            this.getSettingData("blogTimeFont", val, "color");
        },
        TimefontWeight(val) {
            this.getSettingData("blogTimeFont", val, "fontWeight");
        },
        TimefontStyle(val) {
            this.getSettingData("blogTimeFont", val, "fontStyle");
        },
        lineHeightNum(val) {
            this.getSettingData("lineHeightNum", val);
        },
        ContfontFamily(val) {
            this.getSettingData("blogContFont", val, "fontFamily");
        },
        ContfontSize(val) {
            this.getSettingData("blogContFont", val, "fontSize");
        },
        Contcolor(val) {
            this.getSettingData("blogContFont", val, "color");
        },
        ContfontWeight(val) {
            this.getSettingData("blogContFont", val, "fontWeight");
        },
        ContfontStyle(val) {
            this.getSettingData("blogContFont", val, "fontStyle");
        },
        ContTextIndent(val) {
            this.getSettingData("ContTextIndent", val + "px");
        },
        ContLineHeight(val) {
            this.getSettingData("ContLineHeight", val + "px");
        },
        blogDetails(name, type, that) {
            var sub = that.$parent.$children;
            if (name == "" && type == "iconfont") {
                this.settingData.isShowSet = true;
                this.settingData.blogDetailsShow.num = "none";
                let showSet = sub.filter(item => {
                    if (item.prop != undefined) {
                        return item.prop.attr != "blogDetails";
                    }
                });
                showSet.forEach(ele => {
                    ele.prop.isShowSet = this.settingData.isShowSet;
                })
            } else {
                this.settingData.blogDetailsShow.num = "block";
                this.settingData.isShowSet = false;
                sub.forEach(item => {
                    if (item.prop != undefined) {
                        item.prop.isShowSet = this.settingData.isShowSet;
                    }
                });
            }
            this.settingHeight();
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        DiscontrolRowAlign(val) {
            this.getSettingData("DiscontrolRowAlign", val);
        },
        pictureWidth(row, col) {
            var val = [row, col];
            this.getSettingData("pictureWidth", val);
            zmEditor.$store.commit('saveOperationToHistory');
            this.settingData.contWidth.value = parseInt(this.style.width) - parseInt(this.settingData.paddingLeftRight.value) * 2 - parseInt(this.settingData.pictureWidth.value) - 20;
        },
        blogTime(val) {
            this.settingHeight();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        settingHeight() {
            setTimeout(() => {
                if (this.isComputer) {
                    this.setPictureHeight();
                    this.setListData();
                } else {
                    this.setMobListData();
                }
            }, 0);
        },
        setPictureHeight() {
            this.settingData["pictureHeight"].value =
                this.$el.getElementsByClassName(
                    "zm-component-blog-upcont"
                )[0].clientHeight + "px";
            let detailHeight = parseInt(this.settingData["pictureHeight"].value);
            let row = parseInt(this.settingData["pictureScale"].row);
            let col = parseInt(this.settingData["pictureScale"].col);
            this.settingData["pictureWidth"].value =
                parseInt(detailHeight * row / col) +
                "px";
        },
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let detailHeight = this.$el.getElementsByClassName(
                "zm-component-blog-upcont"
            )[0].clientHeight;
            let _type = property;
            if (
                typeof this.settingData[property].value === "string" ||
                typeof this.settingData[property].value === "boolean"
            ) {
                switch (_type) {
                    case "lineHeightNum":
                        let lineH = parseInt(
                            this.settingData["ContLineHeight"].num
                        );
                        this.settingData[property].num = convert * lineH + "px";
                        this.settingData[property].value = parseInt(convert);
                        this.settingHeight();
                        this.setListData();
                        break;
                    case "ContLineHeight":
                        let fontSize = parseInt(this.settingData.blogContFont.value.fontSize);
                        let linH = parseInt(convert);
                        this.settingData[property].num = linH + fontSize + "px";
                        this.settingData[property].value = linH + "px";
                        let lineHeight = parseInt(this.settingData["ContLineHeight"].num);
                        let num = parseInt(this.settingData["lineHeightNum"].value);
                        this.settingData["lineHeightNum"].num = num * lineHeight + "px";
                        this.settingData.firstHeight.value = -(lineHeight / 2) + "px";
                        this.settingData.lastHeight.value = -(lineHeight / 2) + "px";
                        this.settingHeight();
                        this.setListData();
                        break;
                    case "pictureWidth":
                        this.settingData[property].value =
                            parseInt(detailHeight * convert[0] / convert[1]) +
                            "px";
                        this.settingData["pictureScale"].row = convert[0];
                        this.settingData["pictureScale"].col = convert[1];
                        setTimeout(() => {
                            this.setPictureHeight();
                        }, 0)
                        break;
                    default:
                        this.settingData[property].value = convert;
                        this.setListData()
                        break;
                }
            } else {
                this.settingData[property].value[subvalue] = convert;
                if (property == "blogContFont" && subvalue == "fontSize") {
                    let fontSize = parseInt(this.settingData.blogContFont.value.fontSize);
                    let linH = parseInt(this.settingData["ContLineHeight"].value);
                    this.settingData["ContLineHeight"].num = linH + fontSize + "px";
                    let lineHeight = parseInt(
                        this.settingData["ContLineHeight"].num
                    );
                    let num = parseInt(this.settingData["lineHeightNum"].value);
                    this.settingData["lineHeightNum"].num = num * lineHeight + "px";
                }
                this.settingHeight();
                this.setListData();
            }
        }
    }
};
