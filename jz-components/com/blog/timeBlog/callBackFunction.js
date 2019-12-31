export default {
    methods: {
        addBlogNum(){//移动端加载更多;
            if (this.lists.length > this.settingData.mobBlogNum.value) {
                this.settingData.mobBlogNum.value += 5;
            }else{
                event.currentTarget.style.color="#797979";
            } 
        },
        callBack5(val){
            if(!this.isComputer){//编辑的向下箭头3;
                const contHeight = this.$refs.content.clientHeight;
                val.height<contHeight?(this.mobileStyle.height = contHeight):"";
                // val.height>contHeight?(this.mobileStyle.height = contHeight):"";
            }
        },
        pointDown(index){//鼠标在八个点上按下的时候
            if(index == 7){
                this.settingData.comStyleRight = this.style.width;//鼠标按下的宽度
                this.settingData.comStyle = this.style.left;//鼠标按下的left
            }
          },
        pagechangeA(p) {
            // 页码改变event ， p 为新的 current;
            this.settingData.current = parseInt(p);
            let _this = this;
            _this.setLHeigth()
        },
        pointCallBack(index) { //编辑框8个小点回调;
            if ( index ==3 || index == 7) {
                if (this.style.width > 1080) {
                    this.style.width = 1080;
                } else if (this.style.width < 730) {
                    this.style.width = 730;
                }
            }
            if(index == 7 ){
                let sub = this.style.width - this.settingData.comStyleRight;//最新宽度-鼠标按下的宽度差值;
                this.style.left = this.settingData.comStyle - sub;//鼠标按下的left-宽差值;
            }
            const contHeight = this.$refs.content.clientHeight;
            if(index == 5 || index == 2 ){
                    if(this.mobileStyle.height<contHeight){
                        this.mobileStyle.height = contHeight;
                        this.minComH = contHeight
                }
            }
        },
        setMoblieHeight() {
            let _this = this;
            let oTitle = _this.$el.getElementsByClassName("zm-component-blog-title");
            let oCont = _this.$el.getElementsByClassName("zm-component-blog-word-mobile");
            for (let i = 0; i < oCont.length; i++) {
                let aTitHeight = oTitle[i].offsetHeight;
                aTitHeight >= 40 ? (aTitHeight = 50) : (aTitHeight = 30);
                oCont[i].style.height = (110 - aTitHeight) - 40 + "px"; //40：box的间距;110:_this.mobileStyle.height;
                _this.settingData.setMobContHeight.value = (110 - aTitHeight) - 40 + "px"; //40：box的间距;110:_this.mobileStyle.height;
            }
        },
        setLHeigth() {
            var _this = this;
            let temp = null;
            clearTimeout(temp)
            temp = setTimeout(() => {
                let farth = _this.$el.getElementsByClassName(
                    "zm-component-blog-word"
                );
                for (let i = 0; i < farth.length; i++) {
                    var lineNum = parseInt(_this.settingData.lineHeightNum.value),
                        rowsNum = 0,
                        allHeight = 0,
                        lineHeight = parseInt(_this.settingData.ContLineHeight.value);
                    for (let j = 0; j < farth[i].children.length; j++) {
                        if (rowsNum < lineNum) {
                            let re = /<img|<video/gi;
                            if (re.test(farth[i].children[j].innerHTML)) {
                                let imgWidth = farth[i].children[j].children;
                                for (let k = 0; k < imgWidth.length; k++) {
                                    let time = null;
                                    imgWidth[k].style.display = "block";
                                    if (imgWidth[k].clientWidth > _this.style.width) {
                                        imgWidth[k].style.width = "100%";
                                        imgWidth[k].style.height = "100%";
                                        imgWidth[k].style.objectFit = "cover";
                                    }
                                    if (farth[i].children[j].children[k].clientHeight != 0) {
                                        if (imgWidth.length > 1) {
                                            rowsNum++;
                                            if (rowsNum > lineNum) {
                                                break;
                                            } else {
                                                for (let f = k; f < rowsNum; f++) {
                                                    try {
                                                        allHeight += farth[i].children[j].children[f].clientHeight;
                                                    } catch (err) {
                                                        console.log(err, "图片高度异常===========")
                                                    }
                                                }
                                            }
                                        } else {
                                            rowsNum++;
                                            allHeight += farth[i].children[j].clientHeight;
                                        }
                                    } else {
                                        clearTimeout(time);
                                        time = setTimeout(function () {
                                            _this.setLHeigth();
                                        }, 10)

                                    }
                                }
                            } else {
                                rowsNum += farth[i].children[j].clientHeight / lineHeight;
                                allHeight += farth[i].children[j].clientHeight;
                                if (rowsNum > lineNum) {
                                    allHeight -= (rowsNum - lineNum) * lineHeight;
                                }
                            }
                        }
                    }
                    // _this.settingData.lineHeightNum.num = allHeight + "px";
                    farth[i].style.height = allHeight + "px";
                    setTimeout(() => {
                        if (_this.isComputer) {
                            // _this.style.height = _this.$el.firstChild.clientHeight;
                            _this.style.height = _this.$refs.content.clientHeight;
                        }
                    }, 100);
                }
            }, 200)

        },
        setMobBlogNum(val) {
            this.settingData.blogNum.value = parseInt(val);
            this.setMoblieHeight();
            this.setMobListData();
        },
        setListData() {
            let _this = this;
            setTimeout(() => {
                _this.style.height = _this.$el.firstChild.clientHeight;
                const contHeight = this.$refs.content.clientHeight;
                this.minComH = contHeight;
            }, 0);
        },
        setMobListData() { //移动端高度;
            setTimeout(() => {
                this.mobileStyle.height = this.$el.firstChild.clientHeight;
            }, 0);
        },
        rearchData() {
            let _width = parseFloat(this.style.width).toFixed(9);
            let imgWidth =
                _width -
                parseFloat(20) * 2;
            this.settingData["playWidth"].value =
                parseFloat(imgWidth / 6) + "px";
        },
        BoxMarginBottom(val) {
            this.getSettingData("BoxMarginBottom", val + "px");
        },
        controlRowAlign(val) {
            this.getSettingData("controlRowAlign", val);
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
        blogTimeAlign(val) {
            this.getSettingData("blogTimeAlign", val);
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
            this.textIntent(); //首行文字缩进;
        },
        textIntent() {
            var _this = this;
            let farth = _this.$el.getElementsByClassName(
                "zm-component-blog-word"
            );
            for (let i = 0; i < farth.length; i++) {
                for (let j = 0; j < farth[i].children.length; j++) {
                    let re = /<img|<video/gi;
                    if (re.test(farth[i].children[j].innerHTML)) {} else {
                        farth[i].children[j].style.textIndent = _this.settingData.ContTextIndent.value;
                        break;
                    }
                }
                setTimeout(() => {
                    _this.style.height = _this.$el.firstChild.clientHeight;
                }, 100);
            }
        },
        ContcontrolRowAlign(val) {
            this.getSettingData("ContcontrolRowAlign", val);
        },
        ContLineHeight(val) {
            let linHeight = parseInt(this.settingData.ContLineHeight.num);
            if (parseInt(val) == linHeight) {
                return;
            } else {
                this.getSettingData("ContLineHeight", val + "px");
            }
        },
        blogDetailsShow(val){
            if(this.settingData.isShowSet== true){
                this.settingData.blogDetailsShow.num ="none";
            }
            this.setListData()
        },
        blogDetails(name,type,that){
            var sub = that.$parent.$children;
            if(name == "" && type =="iconfont"){
                this.settingData.isShowSet = true;
                this.settingData.blogDetailsShow.num ="none";
                let showSet = sub.filter(item => {
                        return item.prop.title != "查看详情" && item.prop.title != "显示博客详情";
                });
                showSet.forEach(ele =>{
                    ele.prop.isShowSet = this.settingData.isShowSet;
                })
            }else{
                this.settingData.isShowSet = false;
                this.settingData.blogDetailsShow.num ="block";
                sub.forEach(item => {
                    item.prop.isShowSet = this.settingData.isShowSet;
                });
            }
            this.setListData()
        },
        DiscontrolRowAlign(val) {
            this.getSettingData("DiscontrolRowAlign", val);
        },
        pictureShadow(val) {
            this.getSettingData("pictureShadow", val);
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
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数);
            let _this = this;
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
                        this.settingData[property].val = convert;
                        // this.settingData[property].num = convert * lineH + "px";
                        setTimeout(_this.setLHeigth, 100);
                        break;
                    case "ContLineHeight":
                        let fontSize = parseInt(this.settingData.blogContFont.value.fontSize);
                        let linH = parseInt(convert);
                        this.settingData[property].value = linH + fontSize + "px";
                        _this.setLHeigth();
                        break;
                    case "pictureShadow":
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
                            this.setListData()
                        } else {
                            convert = "0 0 0 rgba(0,0,0,0)";
                            this.settingData[property].num = convert;
                            this.setListData()
                        }
                        break;
                    case "hShadow":
                        this.settingData[property].value = convert;
                        this.settingData["pictureShadow"].num =
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
                        this.settingData["pictureShadow"].num =
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
                        this.settingData["pictureShadow"].num =
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
                        this.settingData["pictureShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            convert;
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
                    let linH = parseInt(this.settingData["ContLineHeight"].num);
                    this.settingData["ContLineHeight"].value = linH + fontSize + "px";
                    let lineHeight = parseInt(
                        this.settingData["ContLineHeight"].value
                    );
                    let num = parseInt(this.settingData["lineHeightNum"].value);
                    this.settingData["lineHeightNum"].num = num * lineHeight + "px";
                    setTimeout(_this.setLHeigth, 100);
                } else {
                    this.setListData()
                }

            }
        }
    }
};
