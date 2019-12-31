import {
    createSign
} from "crypto";

export default {
    computed: {
        setMarginBottom() {
            let titTop = this.settingData.blogShow.value ? 0 : parseInt(this.settingData.ContmarginTop.value);
            let first = this.settingData.blogShow.value ? 0 : parseFloat(this.settingData.firstHeight.value);
            let num = parseInt(this.settingData.lineHeightNum.value);
            let cont;
            cont = titTop + first;
            if(num==0){
                cont = 0;
            }
            return cont + 'px';
        },
        setContBottom() {
            let linH = parseFloat(this.settingData.firstHeight.value) * 2 +'px';
            let num = parseInt(this.settingData.lineHeightNum.value);
            if(num==0){
                linH = 0;
            }
            return linH;
        },
        changemsg() {
            var _this = this;
            var color = _this.settingData.hoverColor.value;
            var oldColor = _this.settingData.Familyfont.value.color;
            var disCol = _this.settingData.DishoverColor.value;
            var disOldCol = _this.settingData.blogScale.value;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            let _fId = '#' + this.id + ' ';
            return `<style> 
            ${_fId}.zm-component-blog-title{color:${oldColor};}
            ${_fId}.zm-component-blog-title:hover{color:${color}; cursor: move;}
            ${_fId}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;transition: all 0.2s;}
            ${_fId}.zm-component-blog-title-a:hover{color:${color};text-decoration: none; cursor: move;}
            ${_fId}.zm-component-details{color:${disOldCol};text-decoration: none;}
            ${_fId}.zm-component-details:hover{color:${disCol};text-decoration: none;cursor: move;}
            ${_fId}.zm-component-blog-bgImg:hover{
              cursor: move;
            }
            ${_fId}span .zm-component-blog-box{
              margin-bottom:${boxBottom};
            }
            ${_fId}span:last-Child .zm-component-blog-box{
              margin-bottom:0;
            }
              </style>`;
        },
        setData() {
            return {
                type: "tabs",
                props: [{
                        title: "布局",
                        type: "sets",
                        props: [{
                                type: "/set/sliders.vue",
                                props: {
                                    title: "博客条数",
                                    attr: "blogNum",
                                    param: "number",
                                    minVal: 1,
                                    maxVal: 10,
                                    value: this.settingData.blogNum
                                        .value,
                                    decimalNum: 0,
                                    callback: this.blogNum
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "博客间距(px)",
                                    attr: "BoxMarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .BoxMarginBottom.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "背景颜色",
                                    attr: "BoxBackgroundColor",
                                    param: "color",
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData
                                        .BoxBackgroundColor.value,
                                    decimalNum: 0
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "图片边距缩进(px)",
                                    attr: "pictureLRPadding",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .pictureLRPadding.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/switch/pictrue.vue",
                                props: {
                                    title: "图片比例",
                                    attr: "pictureScale",
                                    value: this.settingData.pictureScale
                                        .row,
                                    callback: this.pictureWidth
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "内容右侧缩进(px)",
                                    attr: "paddingLeftRight",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .paddingLeftRight.value,
                                    decimalNum: 0,
                                    callback: this.paddingLeftRight
                                }
                            }
                        ]
                    },
                    {
                        title: "标题",
                        type: "sets",
                        props: [{
                                type: "/set/setFont/setFont.vue",
                                props: {
                                    title: "标题文字设置",
                                    attr: "Familyfont",
                                    style: {
                                        fontFamily: this.settingData.Familyfont
                                            .value.fontFamily,
                                        fontSize: this.settingData.Familyfont
                                            .value.fontSize,
                                        color: this.settingData.Familyfont.value
                                            .color,
                                        fontWeight: this.settingData.Familyfont
                                            .value.fontWeight,
                                        fontStyle: this.settingData.Familyfont
                                            .value.fontStyle,
                                        callBack1: this.TitfontFamily,
                                        callBack2: this.TitfontSize,
                                        callBack3: this.Titcolor,
                                        callBack4: this.TitfontWeight,
                                        callBack5: this.TitfontStyle
                                    }
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "光标悬浮文字颜色",
                                    attr: "hoverColor",
                                    param: "color",
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.hoverColor.value,
                                    decimalNum: 0
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "上部高度",
                                    attr: "TitmarginTop",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData.TitmarginTop.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            }
                        ]
                    },
                    {
                        title: "时间",
                        type: "sets",
                        props: [{
                            type: "/set/switch/setWarp.vue",
                            props: {
                                onOffBut: [{
                                    type: "/set/switch/switch.vue",
                                    props: {
                                        title: "显示博客发布时间",
                                        attr: "blogShow",
                                        value: this.settingData.blogShow
                                            .value,
                                        callback: this.setListData
                                    }
                                }],
                                sonType: [{
                                        type: "/set/switch/setTime.vue",
                                        props: {
                                            title: "时间样式",
                                            attr: "blogTime",
                                            value: this.settingData.blogTime
                                                .value,
                                            callback: this.blogTime
                                        }
                                    },
                                    {
                                        type: "/set/setFont/setFont.vue",
                                        props: {
                                            title: "时间文字设置",
                                            attr: "blogTimeFont",
                                            style: {
                                                fontFamily: this.settingData
                                                    .blogTimeFont.value
                                                    .fontFamily,
                                                fontSize: this.settingData
                                                    .blogTimeFont.value
                                                    .fontSize,
                                                color: this.settingData
                                                    .blogTimeFont.value
                                                    .color,
                                                fontWeight: this.settingData
                                                    .blogTimeFont.value
                                                    .fontWeight,
                                                fontStyle: this.settingData
                                                    .blogTimeFont.value
                                                    .fontStyle,
                                                callBack1: this
                                                    .TimefontFamily,
                                                callBack2: this
                                                    .TimefontSize,
                                                callBack3: this.Timecolor,
                                                callBack4: this
                                                    .TimefontWeight,
                                                callBack5: this
                                                    .TimefontStyle
                                            }
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "上部高度(px)",
                                            attr: "blogTimeTop",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .blogTimeTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    }
                                ]
                            }
                        }]
                    },
                    {
                        title: "内容",
                        type: "sets",
                        props: [{
                                type: "/set/sliders.vue",
                                props: {
                                    title: "内容显示行数",
                                    attr: "lineHeightNum",
                                    param: "number",
                                    minVal: 0,
                                    maxVal: 10,
                                    value: this.settingData
                                        .lineHeightNum.value,
                                    decimalNum: 0,
                                    callback: this.lineHeightNum
                                }
                            },
                            {
                                type: "/set/setFont/setFont.vue",
                                props: {
                                    title: "内容文字设置",
                                    attr: "blogContFont",
                                    style: {
                                        fontFamily: this.settingData
                                            .blogContFont.value
                                            .fontFamily,
                                        fontSize: this.settingData
                                            .blogContFont.value
                                            .fontSize,
                                        color: this.settingData
                                            .blogContFont.value.color,
                                        fontWeight: this.settingData
                                            .blogContFont.value
                                            .fontWeight,
                                        fontStyle: this.settingData
                                            .blogContFont.value
                                            .fontStyle,
                                        callBack1: this.ContfontFamily,
                                        callBack2: this.ContfontSize,
                                        callBack3: this.Contcolor,
                                        callBack4: this.ContfontWeight,
                                        callBack5: this.ContfontStyle
                                    }
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "首行上部高度(px)",
                                    attr: "ContmarginTop",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .ContmarginTop.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "内容行距(px)",
                                    attr: "ContLineHeight",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .ContLineHeight.value,
                                    decimalNum: 0,
                                    callback: this.ContLineHeight
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "尾行下部高度(px)",
                                    attr: "ContmarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData
                                        .ContmarginBottom.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            }
                        ]
                    }
                ]
            };
        },
        setList() {
            let listId = [];
            let arr;
            try {
                this.lists.forEach((item, i) => {
                    this.settingData.listsID.forEach(ele => {
                        if (item.fId == ele.id) {
                            item.isIconEyeOn = ele.type //设置睁眼图标显示或隐藏==》默认显示;
                        }
                    });
                    item.fContentText = item.fContentText.replace(/<br>/g,"").replace(/\s/g, "").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
                    if (item.fvideo.length > 0) {
                        item.bgUrl = item.fBlogVideoImg;
                        item.source = item.fvideo[0][0];
                        item.imgDis = "none";
                        item.videoDis = "block";
                        item.ahref = false;
                    } else {
                        let localImg = "../../../../../static/img/zumalogo.jpg";
                        if (item.fImg.length > 0) {
                            item.bgUrl = item.fImg[0];
                            item.imgDis = "block";
                            item.videoDis = "none";
                            item.ahref = false;
                        } else {
                            item.bgUrl = localImg;
                            item.imgDis = "block";
                            item.videoDis = "none";
                            item.ahref = true;
                        }
                    }
                });
                if (this.settingData.defauletTypeName.value == "最新发布的博客") {
                    arr = JSON.parse(JSON.stringify(this.lists));
                } else {
                    if (this.settingData.listsID.length == 0) {
                        arr = [];
                    } else {
                        this.lists.forEach((item, i) => {
                            let isLook = this.settingData.listsID.some(ele => {
                                return item.fId == ele.id && ele.type
                            })
                            if (isLook) {
                                listId.push(item)
                            }
                        })
                        arr = listId;
                    }
                }
                if (arr.length > this.settingData.blogNum.value) {
                    arr.length = this.settingData.blogNum.value;
                }
            } catch (err) {
                console.log("博客数据为null")
                this.lists = [];
            }
            return arr;
        },
        mobileSetData() {
            return {
                type: "sets",
                props: [{
                        type: "/set/sliders.vue",
                        props: {
                            title: "博客条数",
                            attr: "mobBlogNum",
                            param: "number",
                            minVal: 1,
                            maxVal: 10,
                            value: this.settingData.mobBlogNum.value,
                            decimalNum: 0,
                            callback: this.mobBlogNum
                        }
                    },
                    {
                        type: "/set/switch/switch.vue",
                        props: {
                            title: "显示博客发布时间",
                            attr: "mobBlogShow",
                            value: this.settingData.mobBlogShow
                                .value,
                            callback: this.mobBlogShow
                        }
                    }
                ]
            }
        },
        setMobList() {
            let listId = [];
            let arr;
            try {
                this.lists.forEach((item, i) => {
                    this.settingData.listsID.forEach(ele => {
                        if (item.fId == ele.id) {
                            item.isIconEyeOn = ele.type //设置睁眼图标显示或隐藏==》默认显示;
                        }
                    });
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
                    if (item.fvideo.length > 0) {
                        item.bgUrl = item.fBlogVideoImg;
                        item.source = item.fvideo[0][0];
                        item.imgDis = "none";
                        item.videoDis = "block";
                        item.ahref = "false";
                    } else {
                        let localImg = "../../../../../static/img/zumalogo.jpg";
                        if (item.fImgSmall.length > 0) {
                            item.bgUrl = item.fImgSmall[0];
                            item.imgDis = "block";
                            item.videoDis = "none";
                            item.bgUrl.indexOf(localImg) > -1 ? (item.ahref = true) : (item.ahref = false);
                        } else {
                            item.bgUrl = localImg;
                            item.imgDis = "block";
                            item.videoDis = "none";
                            item.ahref = true;
                        }
                    }
                });
                if (this.settingData.defauletTypeName.value == "最新发布的博客") {
                    arr = JSON.parse(JSON.stringify(this.lists));
                } else {
                    if (this.settingData.listsID.length == 0) {
                        arr = [];
                    } else {
                        this.lists.forEach((item, i) => {
                            let isLook = this.settingData.listsID.some(ele => {
                                return item.fId == ele.id && ele.type
                            })
                            if (isLook) {
                                listId.push(item)
                            }
                        })
                        arr = listId;

                    }
                }
                if (arr.length > this.settingData.mobBlogNum.value) {
                    arr.length = this.settingData.mobBlogNum.value;
                }
            } catch (err) {
                console.log("博客数据为null")
                this.lists = [];
            }
            return arr;
        }
    }
};
