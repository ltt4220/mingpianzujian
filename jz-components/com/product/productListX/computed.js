export default {
    computed: {
        setfirstH() {
            let size = parseInt(this.settingData.titleFont.value.fontSize);
            this.settingData.firstHeight.value = parseFloat(parseFloat(this.settingData.titleLineHeight.value) * size - size) / 2 + "px"; //lineheight上边距em
            let marginT = parseInt(this.settingData.titleMarginTop.value);
            let lineH = parseFloat(this.settingData.firstHeight.value);
            return parseFloat(marginT - lineH) + "px";
        },
        setLastH() {
            let size = parseInt(this.settingData.titleFont.value.fontSize);
            this.settingData.firstHeight.value = parseFloat(parseFloat(this.settingData.titleLineHeight.value) * size - size) / 2 + "px";
            let marginT = parseInt(this.settingData.priceMarginTop.value);
            let lineH = parseFloat(this.settingData.firstHeight.value);
            return parseFloat(marginT - lineH) + "px";
        },
        setLists() {
            let _this = this;
            let arr = [];
            let lists = [];
            try {
                cutData(_this.lists)

                function cutData(_data) {
                    _data.forEach(item => {
                        if (item.childItem != null && item.childItem != undefined && item.childItem.length != 0) {
                            cutData(item.childItem)
                        } else {
                            arr.push(item);
                        }
                    })
                }
                this.ValidDataL(arr) //he
                this.settingData.total = arr.length;
                this.settingData.display = parseInt(this.settingData.proNum.value);
                let [page, cur, proNum] = [arr, this.settingData.current, this.settingData.display];
                let start = (cur - 1) * proNum;
                let end = start + proNum;
                let maxCur = Math.ceil(this.settingData.total / proNum);
                if (cur == maxCur) {
                    end = this.settingData.total;
                } else if (cur > maxCur) {
                    start = (maxCur - 1) * proNum;
                    end = start + proNum;
                }
                page.forEach((item, i) => {
                    if (i >= start && i < end) {
                        lists.push(item)
                    }
                })
            } catch (err) {
                console.log("产品数据为null");
                this.lists = [];
            }
            return lists;

        },
        setMobLists() {
            let _this = this;
            let arr = [];
            cutData(_this.lists);

            function cutData(_data) {
                _data.forEach(item => {
                    if (item.childItem != null && item.childItem != undefined && item.childItem.length != 0) {
                        cutData(item.childItem)
                    } else {
                        arr.push(item);
                    }
                })
            }
            this.ValidDataL(arr) //he
            if (arr.length > this.settingData.mobNum.value) {
                arr.length = this.settingData.mobNum.value;
            }
            return arr;
        },
        productStyle() {
            let boxColor = this.settingData.boxBorderColor.value;
            let boxHoverColor = this.settingData.boxBorderHoverColor.value;
            let boxWidth = this.settingData.boxBorderWidth.value;
            let boxHoverWidth = this.settingData.boxBorderHoverWidth.value;
            let imgColor = this.settingData.pictureBackHover.value;
            let imgChange = this.settingData.pictureHover.num;
            let imgFilter = this.settingData.pictureHover.filter;
            let pictureSize = this.settingData.pictureSize.num;
            let isShad = this.settingData.pictureHover.isShad;
            let left = this.settingData.BoxMarginLeft.value; //BOX边距;
            let bottom = this.settingData.BoxMarginBottom.value; //BOX行距;
            let mobBottom = this.settingData.mobLineH.value;
            let col = parseInt(this.settingData.ranksNum.colsVal);
            let colBot = parseInt(this.settingData.ranksNum.colsVal) + 1;
            let labelBg = this.settingData.fLabelBgColor.value;
            let fontHColor;
            let fontColor = this.settingData.titleFont.value.color;
            let _id = '#' + this.id + ' ';
            this.isHoverColor ? fontHColor = fontColor : fontHColor = this.settingData.fontColor.value;
            let scale, trans;
            if (this.settingData.pictureHover.value.text != '左移' && this.settingData.pictureHover.value.text != '上移') {
                if (this.settingData.pictureHover.value.text == '虚化') {
                    scale = "110%";
                    trans = '-5%';
                } else {
                    scale = "100%";
                    trans = '0';
                }
            } else {
                scale = "110%";
                trans = '-5%';
            }
            let computer = `
            <style>
                ${_id}.zm-product-content .zm-product-mobileBox{
                    margin-left:${left};
                }
                ${_id}.zm-product-content .zm-product-mobileBox:nth-child(${col}n+1){
                    margin-left:0px;
                }
                ${_id}.zm-product-content .zm-product-mobileBox:nth-child(n+${colBot}){
                    margin-top:${bottom};
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-imgBox .zm-product-img{
                    z-index: 0;
                    background-position:${pictureSize};
                    width:${scale};
                    height:${scale};
                    position:absolute;
                    left: ${trans};
                    top: ${trans};
                    transition: all 0.3s;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-imgBox .zm-product-img:hover{
                    transform:${imgChange};
                    filter:${imgFilter};
                    cursor:move;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-imgBox .zm-product-img:after{
                    content: "";
                    visibility: hidden;
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    border:1px solid transparent;
                    background-color:transparent;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-imgBox .zm-product-img:hover:after{
                    visibility: ${isShad};
                    background-color: ${imgColor};
                    transition: all 1s;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-title{
                    color:${fontColor};
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-title:hover{
                    color:${fontHColor};
                    text-decoration:none;
                    cursor:move;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-details:hover{
                    cursor:move;
                }
            </style>`;
            let mobile = `
            <style>
            ${_id}.zm-product-list .zm-product-mobileBox{
                margin-bottom:${mobBottom};
            }
            ${_id}.zm-product-list .zm-product-mobileBox:last-child{
                margin-bottom: 0px;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-imgBox .zm-product-img{
                cursor: default;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-cont .zm-product-title:hover{
                cursor: default;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-cont .zm-product-details:hover{
                cursor:default;
            }
        </style>`;
            let mangeStyel;
            if (this.isComputer) {
                mangeStyel = computer;
            } else {
                mangeStyel = mobile;
            }
            return mangeStyel;
        },
        setData() {
            return {
                type: "tabs",
                props: [{
                        title: "布局",
                        type: "level",
                        props: [{
                                title: "列表布局",
                                type: "sets",
                                props: [
                                    // {
                                    //     type: "/set/switch/switch.vue",
                                    //     props: {
                                    //         title: "全屏宽度",
                                    //         attr: "fullScreen",
                                    //         value: this.settingData
                                    //             .fullScreen
                                    //             .value,
                                    //         callback: this
                                    //             .fullScreen
                                    //     }
                                    // },
                                    // {
                                    //     type: "/set/sliders.vue",
                                    //     props: {
                                    //         title: "边距缩进",
                                    //         attr: "boxPaddingLR",
                                    //         param: "size",
                                    //         minVal: 0,
                                    //         maxVal: 80,
                                    //         value: this.settingData
                                    //             .boxPaddingLR,
                                    //         decimalNum: 0,
                                    //         callback: this.boxPaddingLR,
                                    //         isShowSet: this.settingData.isShow //默认隐藏该设置项;
                                    //     }
                                    // },
                                    {
                                        type: "/set/switch/ranksNum.vue",
                                        props: {
                                            attr: "ranksNum",
                                            minVal: 1,
                                            maxVal: 4,
                                            callback: this.ranksNum
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "行间距(px)",
                                            attr: "BoxMarginBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .BoxMarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.BoxMarginBottom
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "列间距(px)",
                                            attr: "BoxMarginLeft",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .BoxMarginLeft.value,
                                            decimalNum: 0,
                                            callback: this.BoxMarginLeft
                                        }
                                    },
                                    {
                                        type: "/set/colorPick.vue",
                                        props: {
                                            title: "背景颜色",
                                            attr: "ContBackgroundColor",
                                            param: "color",
                                            value: this.settingData
                                                .ContBackgroundColor.value
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "图片宽度占比(%)",
                                            attr: "boxImgWidth",
                                            param: "number",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .boxImgWidth.value,
                                            decimalNum: 0,
                                            callback: this.boxImgWidth
                                        }
                                    },
                                    {
                                        type: "/set/setTextLayout.vue",
                                        props: {
                                            title: "内容布局",
                                            style: {
                                                textAlign: this.settingData
                                                    .priceAlign.value,
                                                callBack: this
                                                    .priceAlign
                                            },

                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边距缩进(%)",
                                            attr: "titlePaddingLRight",
                                            param: "number",
                                            minVal: 0,
                                            maxVal: 15,
                                            value: this.settingData
                                                .titlePaddingLRight.value,
                                            decimalNum: 0,
                                            callback: this.titlePaddingLRight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "文字间距(px)",
                                            attr: "priceMarginTop",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .priceMarginTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    }
                                ]
                            },
                            {
                                title: "图片",
                                type: "sets",
                                props: [{
                                        type: '/set/productSList/imgPosition.vue',
                                        props: {
                                            title: "图片位置 :",
                                            attr: "imgPosition",
                                            imgPosition: this.settingData.imgFloat,
                                            callback: this.imgFloat
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边距缩进(px)",
                                            attr: "picturePadding",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .picturePadding.value,
                                            decimalNum: 0,
                                            callback: this.picturePadding
                                        }
                                    }, {
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "图片显示效果",
                                            attr: "pictureSize",
                                            label: [{
                                                    name: "填充",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "自适应",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.pictureSize
                                        }
                                    },
                                    {
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "图片悬浮效果",
                                            attr: "pictureHover",
                                            label: [{
                                                    name: "无效果",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "放大",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "左移",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "上移",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "虚化",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "覆盖颜色",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.pictureHover
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "光标悬浮遮罩颜色",
                                            attr: "pictureBackHover",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .pictureBackHover.value,
                                            decimalNum: 0,
                                            isShowSet: this.settingData.isShowSet //默认隐藏该设置项;
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "文字",
                        type: "level",
                        props: [{
                                title: "商品名称",
                                type: "sets",
                                props: [{
                                        type: "/set/setFont/setFont.vue",
                                        props: {
                                            title: "文字设置",
                                            attr: "titleFont",
                                            style: {
                                                fontFamily: this.settingData
                                                    .titleFont.value
                                                    .fontFamily,
                                                fontSize: this.settingData
                                                    .titleFont.value
                                                    .fontSize,
                                                color: this.settingData
                                                    .titleFont.value.color,
                                                fontWeight: this.settingData
                                                    .titleFont.value
                                                    .fontWeight,
                                                fontStyle: this.settingData
                                                    .titleFont.value
                                                    .fontStyle,
                                                callBack1: this.titleFontFamily,
                                                callBack2: this.titleFontSize,
                                                callBack3: this.titleColor,
                                                callBack4: this.titleFontWeight,
                                                callBack5: this.titleFontStyle
                                            }
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "文字颜色悬浮效果",
                                            attr: "fontColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .fontColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "文本行数",
                                            attr: "titleDBHeight",
                                            label: [{
                                                    name: "单行文本",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "两行文本",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.titleDBHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "行距(倍)",
                                            attr: "titleLineHeight",
                                            param: "number",
                                            minVal: 1,
                                            maxVal: 2,
                                            value: this.settingData
                                                .titleLineHeight.value,
                                            decimalNum: 1,
                                            callback: this.titleLineHeight,
                                            isShowSet: this.settingData.isShowSet //默认隐藏该设置项;
                                        }
                                    }
                                ]
                            },
                            {
                                title: "价格",
                                type: "sets",
                                props: [{
                                    type: "/set/setFont/setFont.vue",
                                    props: {
                                        title: "文字设置",
                                        attr: "priceFont",
                                        style: {
                                            fontFamily: this.settingData
                                                .priceFont.value
                                                .fontFamily,
                                            fontSize: this.settingData
                                                .priceFont.value
                                                .fontSize,
                                            color: this.settingData
                                                .priceFont.value.color,
                                            fontWeight: this.settingData
                                                .priceFont.value
                                                .fontWeight,
                                            fontStyle: this.settingData
                                                .priceFont.value
                                                .fontStyle,
                                            callBack1: this.priceFontFamily,
                                            callBack2: this.priceFontSize,
                                            callBack3: this.priceColor,
                                            callBack4: this.priceFontWeight,
                                            callBack5: this.priceFontStyle
                                        }
                                    }
                                }]
                            },
                            {
                                title: "按钮",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示按钮",
                                                attr: "skuShow",
                                                value: this.settingData
                                                    .skuShow
                                                    .value,
                                                callback: this.skuShow
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/switch/setFontCont.vue",
                                                props: {
                                                    attr: "skuFont",
                                                    attr2: "productDetails",
                                                    title: "按钮文字",
                                                    style: {
                                                        input: 1,
                                                        maxLength: 20,
                                                        inputText: this.settingData.productDetails.value,
                                                        placeholder: this.settingData.productDetails.value,
                                                        fontFamily: this.settingData
                                                            .skuFont.value
                                                            .fontFamily,
                                                        fontSize: this.settingData
                                                            .skuFont.value
                                                            .fontSize,
                                                        color: this.settingData
                                                            .skuFont.value.color,
                                                        fontWeight: this.settingData
                                                            .skuFont.value
                                                            .fontWeight,
                                                        fontStyle: this.settingData
                                                            .skuFont.value
                                                            .fontStyle,
                                                        callBack1: this.skuFontFamily,
                                                        callBack2: this.skuFontSize,
                                                        callBack3: this.skuColor,
                                                        callBack4: this.skuFontWeight,
                                                        callBack5: this.skuFontStyle
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "背景颜色",
                                                    attr: "skuBackgroundColor",
                                                    param: "color",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .skuBackgroundColor.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按钮宽度(%)",
                                                    attr: "skuWidth",
                                                    param: "size",
                                                    minVal: 40,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .skuWidth.value,
                                                    decimalNum: 0,
                                                    callback: this.skuWidth
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按钮高度(px)",
                                                    attr: "skuHeight",
                                                    param: "size",
                                                    minVal: 20,
                                                    maxVal: 40,
                                                    value: this.settingData
                                                        .skuHeight.value,
                                                    decimalNum: 0,
                                                    callback: this.setListData
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按钮上边距(px)",
                                                    attr: "priceMarginBottom",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 50,
                                                    value: this.settingData
                                                        .priceMarginBottom.value,
                                                    decimalNum: 0,
                                                    callback: this.setListData
                                                }
                                            }
                                        ]
                                    }
                                }]
                            }
                        ]
                    }
                ]
            };
        },
        mobileSetData() {
            return {
                type: "sets",
                props: [{
                        type: "/set/sliders.vue",
                        props: {
                            title: "列表行数",
                            attr: "mobNum",
                            param: "size",
                            minVal: 1,
                            maxVal: 8,
                            value: this.settingData
                                .mobNum.value,
                            decimalNum: 0,
                            callback: this.mobNum
                        }
                    },
                    {
                        type: "/set/switch/setDetails.vue",
                        props: {
                            title: "商品名称文字行数",
                            attr: "mobTitNum",
                            label: [{
                                    name: "单行文本",
                                    type: "iconfont"
                                },
                                {
                                    name: "两行文本",
                                    type: "iconfont"
                                }
                            ],
                            callback: this.mobTitNum
                        }
                    },
                    // {
                    //     type: "/set/sliders.vue",
                    //     props: {
                    //         title: "行间距(px)",
                    //         attr: "mobLineH",
                    //         param: "size",
                    //         minVal: 0,
                    //         maxVal: 20,
                    //         value: this.settingData
                    //             .mobLineH.value,
                    //         decimalNum: 0,
                    //         callback: this.mobLineH
                    //     }
                    // }
                ]
            }
        },
        getMarginLeft() {
            return zmEditor.$store.state.page.marginLeft;
        },
        getNowWinWidth() {
            return zmEditor.$store.state.page.nowWinWidth
        },
        isFullPage: { // 返回值为当前组件控制全屏按钮的属性值
            get() {
                return this.settingData['fullScreen'].value
            },
            set(newval) {
                this.settingData['fullScreen'].value = newval
            }
        }
    }
}
