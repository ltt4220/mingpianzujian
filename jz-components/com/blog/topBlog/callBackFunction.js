import {
    constants,
    fstat
} from "fs";

export default {
    methods: {
        toolbarW(obj) { //工具条宽度的方法;obj是输入值返回的参数对象;
            if (!this.isComputer) {
                obj.width > 320 ? this.mobileStyle.width = 320 : obj.width < 140 ? this.mobileStyle.width = 140 : this.mobileStyle.width = obj.width;
                this.mobileStyle.height = this.setMobHeight();
            } else {
                obj.width < 240 ? this.style.width = 240 : obj.width > 2500 ? (this.style.width = 2500) : this.style.width = obj.width;
                this.style.height = this.setPcHeight(); //计算单个博客宽度;
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
            newObj.style.width = this.style.width;
            newObj.style.left = this.style.left;
            newObj.style.top = this.style.top;
            newObj.settingData.listsID = this.settingData.listsID;
            newObj.settingData.isBack = this.settingData.isBack;
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
                    if (!data || data.length == 0) {
                        this.style.height = this.setPcHeight(); //pc默认高度;
                    } else {
                        if (this.isComputer) {
                            this.style.height = this.setPcHeight(); //计算单个博客宽度;
                        } else {
                            this.mobChangeSet(); //初始化移动端;
                        }
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                          nowCom: this, //当前选中组件
                          isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                      }
                })
                .catch(response => {
                    // 这里是处理错误的回调
                    this.lists = [];
                    this.style.height = this.setPcHeight(); //计算单个博客宽度;
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
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
                    this.mobChangeSet(); //初始化移动端;
                    if (!data || data.length == 0) {
                        this.style.height = this.setPcHeight(); //pc默认高度;
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
                        this.style.height = this.setPcHeight(); //pc默认高度;
                    }
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
                    })
                    if (this.$store.state.toolMenu.isChangeStyle) {
                        this.$store.commit("createChangeHeightClass", {
                          nowCom: this, //当前选中组件
                          isPush: false //始终是false,样式切换不需要下推组件，只需要下推分割线
                        });
                        this.$store.commit("setChangeStyleStatus", false);
                      }
                })
                .catch(response => {
                    // 这里是处理错误的回调
                    this.lists = [];
                    this.style.height = this.setPcHeight(); //pc默认高度;
                    console.log(response);
                    this.$nextTick(() => {
                        if (this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated"); //editor根据内容对组件高度做自适应处理;
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
            this.isHoverColor = false;
            return true; //设置回弹;
        },
        stretchCallBack() {
            this.isHoverColor = true;
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
        pointCallBack(obj) { //编辑框8个小点回调;
            this.isHoverColor = true;
            let index = obj.index;
            let minWidth = this.isComputer ? 240 : 140;
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
            let shop;
            let webType = zmEditor.$store.state.menu.webType;
            webType == "component" || webType == "template" ?
                (shop = "-888888") :
                (shop = this.fShopId);
            if (item.ahref == undefined && !item.ahref) return;
            if (item.ahref) {
                this.checkImgId = item.fId;
                _this.public.choiceModules({
                    multiple: false, //单选;
                    modules: "picture",
                    callBack: _this.blogpict,
                    fShopId: shop
                });
            }
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
            let typeName = this.settingData.defauletTypeName.value;
            let fid = typeName == "最新发布的博客" ? this.checkImgId : this.checkImgId.replace(/[12]\-/g, "");
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
        setMobHeight(val) {
            let sub = val ? val : this.mobileStyle.width;
            this.setMobilePicHeight(sub);
            let size = parseInt(this.settingData.mobCont.value)+2;
            let num = parseInt(this.settingData.mobLineNum.value);
            let valLine =  parseInt(this.settingData.mobContLine.value);
            if (num == 1) {
                this.settingData.mobContLine.num = size + "px";
                this.settingData.mobFirstHeight.value = 12 + "px";
                this.settingData.mobLastHeight.value = 16 + "px";
            } else {
                this.settingData.mobContLine.num = size + valLine + "px";
                this.settingData.mobFirstHeight.value = 12 - (valLine / 2) + "px";
                this.settingData.mobLastHeight.value = 16 - ( valLine / 2) + "px";
            }
            this.settingData.mobLineNum.num = parseInt(this.settingData.mobContLine.num) * parseInt(this.settingData.mobLineNum.value) + "px";

            let lineH = parseFloat(this.settingData.mobContLine.num);
            let boxTop, titH, titBottom, dateH, imgTop, imgH, contTop, contH, butTop, butH, boxBottom, boxLineH, blogNum, cont;
            boxTop = 16;
            titH = parseFloat(this.settingData.mobTitle.value) * 1.3;
            titBottom = 10;
            dateH = this.settingData.mobBlogShow.value ? parseFloat(this.settingData.mobDate.value) : 0;
            imgTop = this.settingData.mobBlogShow.value ? 12 : 0;
            imgH = parseFloat(this.settingData.mobileHeight.value);
            contTop = num != 0 ? 12 : 0;
            contH = num != 0 ? parseFloat(this.settingData.mobLineNum.num) - (lineH - size) : 0;
            butTop = this.settingData.mobShowDet.value ? 16 : 0;
            butH = this.settingData.mobShowDet.value ? 24 : 0;
            boxBottom = 16;
            boxLineH = 10;
            blogNum = parseFloat(this.settingData.mobBlogNum.value);
            cont = parseFloat(parseFloat(boxTop + titH + titBottom + dateH + imgTop + imgH + contTop + contH + butTop + butH + boxBottom) * blogNum) + boxLineH * (blogNum - 1);
            return cont;

        },
        setMobilePicHeight(val) { //移动端图片的高度;
            let proper = [
                this.settingData.pictureScale.row,
                this.settingData.pictureScale.col
            ];
            let _width = val;
            let imgWidth = _width - 10 * 2;
            this.settingData.mobileHeight.value =
                parseFloat(imgWidth / proper[0] * proper[1]) + "px";
            let imgH = parseFloat(this.settingData.mobileHeight.value);
            this.settingData.mobPlayWidth.value = imgH / 5 + 'px';
        },
        setMobListData() { //计算mobile博客总高度;
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
        mobChangeSet() { //移动端样初始化;
            if (!this.isComputer && this.settingData.mobileComIsHide) {
                if (this.settingData.mobBlogNum.flag) {
                    let rows = this.settingData.ranksNum.rowsVal;
                    let cols = this.settingData.ranksNum.colsVal;
                    let num = rows * cols;
                    num > 10 ? this.settingData.mobBlogNum.value = 10 : this.settingData.mobBlogNum.value = num;
                }
                if (this.settingData.mobBlogShow.flag) {
                    this.settingData.mobBlogShow.num = this.settingData.blogShow.num;
                    this.settingData.mobBlogShow.value = this.settingData.blogShow.value;
                }
                if (this.settingData.mobMarginLF.flag) {
                    this.settingData.mobMarginLF.value = this.settingData.paddingLeftRight.value;
                }
                if (this.settingData.mobLineH.flag) {
                    // this.settingData.mobLineH.value = this.settingData.BoxMarginBottom.value;
                    this.settingData.mobLineH.value = '10px';
                }
                if (this.settingData.mobShowDet.flag) {
                    this.settingData.mobShowDet.num = this.settingData.blogDetailsShow.num;
                    this.settingData.mobShowDet.value = this.settingData.blogDetailsShow.value
                }
                if (parseInt(this.settingData.Familyfont.value.fontSize) > 16) {
                    this.settingData.mobTitle.value = "16px";
                } else {
                    this.settingData.mobTitle.value = this.settingData.Familyfont.value.fontSize;
                }
                if (parseInt(this.settingData.blogTimeFont.value.fontSize) > 14) {
                    this.settingData.mobDate.value = "14px";
                } else {
                    this.settingData.mobDate.value = this.settingData.blogTimeFont.value.fontSize;
                }
                if (parseInt(this.settingData.blogContFont.value.fontSize) > 12) {
                    this.settingData.mobCont.value = "12px";
                } else {
                    this.settingData.mobCont.value = this.settingData.blogContFont.value.fontSize;
                }
                if (this.settingData.mobLineNum.flag) {
                    this.settingData.mobLineNum.value = this.settingData.lineHeightNum.value;
                }
                if (this.settingData.mobContLine.flag) {
                    this.settingData.mobContLine.value = this.settingData.ContLineHeight.value;
                    let size = parseInt(this.settingData.mobCont.value)+2;
                    let num = parseInt(this.settingData.mobLineNum.value);
                    // let val = parseInt(this.settingData.mobContLine.value);
                    // if (num == 1) {
                    //     this.settingData.mobContLine.num = size + "px";
                    //     this.settingData.mobFirstHeight.value = 12 + "px";
                    //     this.settingData.mobLastHeight.value = 16 + "px";
                    // } else {
                    //     this.settingData.mobContLine.num = size + parseInt(this.settingData.mobContLine.value) + "px";
                    //     this.settingData.mobFirstHeight.value = 12 - (val / 2) + "px";
                    //     this.settingData.mobLastHeight.value = 16 - ( val / 2) + "px";
                    // }
                    // this.settingData.mobLineNum.num = parseInt(this.settingData.mobContLine.num) * parseInt(this.settingData.mobLineNum.value) + "px";
                }
                this.mobileStyle.height = this.setMobHeight();
            }
        },
        mobBlogNum(val) {
            this.getSettingData("mobBlogNum", val);
            this.setMobListData();
            this.settingData.mobBlogNum.flag = false;
        },
        mobMarginLF(val) {
            this.settingData.mobMarginLF.flag = false;
            this.setMobilePicHeight();
        },
        mobLineH(val) {
            this.settingData.mobLineH.flag = false;
            this.setMobListData();
        },
        mobBlogShow() {
            this.settingData.mobBlogShow.flag = false;
            this.setMobListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        mobLineNum(val) {
            this.settingData.mobLineNum.flag = false;
            this.getSettingData("mobLineNum", val);
        },
        mobShowDet(val) {
            this.settingData.mobShowDet.flag = false;
            this.setMobListData();
            zmEditor.$store.commit('saveOperationToHistory')
        },
        mobContLine(value) {
            // let size = parseInt(this.settingData.mobCont.value)+2;
            this.settingData.mobContLine.flag = false;
            // let num = parseInt(this.settingData.mobLineNum.value);
            // if (num == 1) {
            //     this.settingData.mobContLine.num = size + "px";
            //     this.settingData.mobFirstHeight.value = 12 + "px";
            //     this.settingData.mobLastHeight.value = 16 + "px";
            // } else {
            //     this.settingData.mobContLine.num = size + parseInt(value) + "px";
            //     this.settingData.mobFirstHeight.value = 12 - (parseFloat(value) / 2) + "px";
            //     this.settingData.mobLastHeight.value = 16 - (parseFloat(value) / 2) + "px";
            // }
            // let val = parseInt(this.settingData.mobContLine.num);
            // this.settingData.mobLineNum.num = parseInt(this.settingData.mobLineNum.value) * val + "px";
           
            this.setMobListData();
        },
        setPcHeight(val) {
            let sub = val ? val : this.style.width;
            this.setPictureHeight(sub);
            let fontSize = parseFloat(this.settingData.blogContFont.value.fontSize)+2;
            let lineH = parseFloat(this.settingData.ContLineHeight.num);
            let num = parseInt(this.settingData.lineHeightNum.value);
            let boxTop, titH, titBottom, dateH, dateBottom, imgH, contTop, contH, butTop, butH, boxBottom, boxBorder, boxLineH, rows, cont;
            boxTop = parseFloat(this.settingData.paddingLeftRight.value);
            titH = parseFloat(this.settingData.Familyfont.value.fontSize) * 1.3;
            titBottom = parseFloat(this.settingData.TitmarginBottom.value);
            dateH = this.settingData.blogShow.value ? parseFloat(this.settingData.blogTimeFont.value.fontSize) * 1.3 : 0;
            dateBottom = this.settingData.blogShow.value ? parseFloat(this.settingData.blogTimeBottom.value) : 0;
            imgH = parseFloat(this.settingData.pictureHeight.value);
            contTop = num != 0 ? parseFloat(this.settingData.ContmarginTop.value) : 0;
            contH = num != 0 ? parseFloat(this.settingData.lineHeightNum.num) - (lineH - fontSize) : 0;
            butTop = this.settingData.blogDetailsShow.value ? parseFloat(this.settingData.DismarginTop.value) : 0;
            butH = this.settingData.blogDetailsShow.value ? parseFloat(this.settingData.detailsHeight.value) : 0;
            boxBottom = parseFloat(this.settingData.paddingLeftRight.value);
            boxBorder = parseFloat(this.settingData.boxBorderWidth.value) * 2;
            boxLineH = parseFloat(this.settingData.BoxMarginBottom.value);
            rows = parseFloat(this.settingData.ranksNum.rowsVal);
            cont = parseFloat(parseFloat(boxTop + titH + titBottom + dateH + dateBottom + imgH + contTop + contH + butTop + butH + boxBottom + boxBorder) * rows) + boxLineH * (rows - 1);
            return cont;
        },
        setPictureHeight(val) {
            let rows = this.settingData.ranksNum.rowsVal;
            let cols = this.settingData.ranksNum.colsVal;
            let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
            let _width = (
                (parseFloat(val) - (cols - 1) * _left) /
                cols
            ).toFixed(9);
            let imgWidth =
                _width -
                parseFloat(this.settingData.paddingLeftRight.value) * 2 - parseFloat(this.settingData.boxBorderWidth.value) * 2;
            let proper = [
                this.settingData.pictureScale.row,
                this.settingData.pictureScale.col
            ];
            this.settingData.boxWidth.value = Math.floor(_width * 100) / 100 + "px";
            this.settingData.pictureHeight.value =
                Math.floor(parseFloat(imgWidth / proper[0] * proper[1]) * 100) / 100 + "px";
            let imgH = parseFloat(this.settingData.pictureHeight.value);
            this.settingData.playWidth.value =
                parseFloat(imgH / 5) + "px";
        },
        setListData() { //计算pc博客总高度;
            //下推组件参数：
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
            this.style.height = this.setPcHeight(); //计算单个博客宽度;
        },
        ranksNum(rows, cols) {
            this.settingData["ranksNum"].rowsVal = rows;
            this.settingData["ranksNum"].colsVal = cols;
            this.settingData["blogNum"].value = parseInt(rows * cols);
            this.setListData();
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
        blogTime(val) {
            this.setListData();
            zmEditor.$store.commit('saveOperationToHistory');
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
        ContColor(val) {
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
        detailsFamily(val) {
            this.getSettingData("detailsFont", val, "fontFamily");
        },
        detailsSize(val) {
            this.getSettingData("detailsFont", val, "fontSize");
        },
        detailscolor(val) {
            this.getSettingData("detailsFont", val, "color");
        },
        detailsWeight(val) {
            this.getSettingData("detailsFont", val, "fontWeight");
        },
        detailsStyle(val) {
            this.getSettingData("detailsFont", val, "fontStyle");
        },
        DiscontrolRowAlign(val) {
            this.getSettingData("DiscontrolRowAlign", val);
        },
        pictureHeight(row, col) {
            var val = [row, col];
            this.getSettingData("pictureHeight", val);
            zmEditor.$store.commit('saveOperationToHistory')
        },
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let _type = property;
            if (
                typeof this.settingData[property].value == "string" ||
                typeof this.settingData[property].value == "boolean" ||
                typeof this.settingData[property].value == "number"
            ) {
                switch (_type) {
                    case "lineHeightNum":
                        let Size = parseInt(this.settingData.blogContFont.value.fontSize)+2;
                        let linval = parseInt(this.settingData.ContLineHeight.value);
                        if (convert == 1) {
                            this.settingData.ContLineHeight.num = Size + "px";
                            this.settingData.firstHeight.value = 0;
                        } else {
                            this.settingData.ContLineHeight.num = linval + Size + "px";
                            this.settingData.firstHeight.value = -(linval / 2) + "px";
                        }
                        let lineH = parseInt(
                            this.settingData.ContLineHeight.num
                        );
                        this.settingData[property].num = convert * lineH + "px";
                        this.settingData[property].value = parseInt(convert);
                        this.setListData();
                        break;
                    case "mobLineNum":
                    // let size = parseInt(this.settingData.mobCont.value)+2;
                    // let val = parseInt(this.settingData.mobContLine.value);
                    // if(convert == 1){
                    //     this.settingData.mobContLine.num = size + 'px';
                    //     this.settingData.mobFirstHeight.value = 12 + "px";
                    //     this.settingData.mobLastHeight.value = 16 + "px";
                    // }else{
                    //     this.settingData.mobContLine.num = size + val + 'px';
                    //     this.settingData.mobFirstHeight.value = 12 - (parseFloat(val) / 2) + "px";
                    //     this.settingData.mobLastHeight.value = 16 - (parseFloat(val) / 2) + "px";
                    // }
                    //     let H = parseInt(
                    //         this.settingData.mobContLine.num
                    //     );
                    //     this.settingData[property].num = convert * H + "px";
                        this.settingData[property].value = parseInt(convert);
                        this.setMobListData()
                        break;
                    case "pictureHeight":
                        let boxWidth =
                            parseFloat(this.settingData.boxWidth.value) -
                            parseFloat(
                                this.settingData.paddingLeftRight.value
                            ) *
                            2 - parseFloat(this.settingData.boxBorderWidth.value) * 2;
                        this.settingData[property].value =
                            parseFloat(boxWidth / convert[0] * convert[1]) +
                            "px";
                        this.settingData.pictureScale.row = convert[0];
                        this.settingData.pictureScale.col = convert[1];
                        this.setListData()
                        break;
                    case "ContLineHeight":
                        let fontSize = parseInt(this.settingData.blogContFont.value.fontSize) + 2;
                        let linH = parseInt(convert);
                        let num = parseInt(this.settingData.lineHeightNum.value);
                        if (num == 1) {
                            this.settingData[property].num = fontSize + "px";
                            this.settingData.firstHeight.value = 0;
                        } else {
                            this.settingData[property].num = linH + fontSize + "px";
                            this.settingData.firstHeight.value = -(linH / 2) + "px";
                        }
                        let lineHeight = parseInt(this.settingData.ContLineHeight.num);
                        this.settingData.lineHeightNum.num = num * lineHeight + "px";
                        this.setListData();
                        break;
                    default:
                        this.settingData[property].value = convert;
                        this.setListData()
                        break;
                }
            } else {
                this.settingData[property].value[subvalue] = convert;
                if (property == "blogContFont" && subvalue == "fontSize") {
                    let fontSize = parseInt(this.settingData.blogContFont.value.fontSize) + 2;
                    let linH = parseInt(this.settingData.ContLineHeight.value);
                    let num = parseInt(this.settingData.lineHeightNum.value);
                    if (num == 1) {
                        this.settingData.ContLineHeight.num = fontSize + "px";
                    } else {
                        this.settingData.ContLineHeight.num = linH + fontSize + "px";
                    }
                    let lineHeight = parseInt(
                        this.settingData.ContLineHeight.num
                    );
                    this.settingData.lineHeightNum.num = num * lineHeight + "px";
                }
                this.setListData()
            }
        }
    }
};
