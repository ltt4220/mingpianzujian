export default {
    computed: {
        setMarBot(){
            let contTop = parseFloat(this.settingData.ContmarginTop.value);
            let firstH = parseFloat(this.settingData.firstHeight.value);
            let cont = parseFloat(contTop+firstH) +'px';
            let num = parseInt(this.settingData["lineHeightNum"].value);
            if(num==0){
                cont = 0;
            }
            return cont
        },
        changemsg() {
            var _this = this;
            var color = _this.settingData.hoverColor.value;
            var oldColor = _this.settingData.Familyfont.value.color;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            var setLeft = this.settingData.BoxMarginLeft.value;
            let col = parseInt(this.settingData.ranksNum.colsVal);
            let colBot = parseInt(this.settingData.ranksNum.colsVal) + 1;
            let mobBoxBot = this.settingData.mobLineH.value;
            let _id = '#' + this.id + ' ';
            let computer = `<style> 
               ${_id}.zm-component-blog-title{color:${oldColor};}
               ${_id}.zm-component-blog-title:hover{color:${color};cursor: move;}
               ${_id}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;transition: all 0.2s;}
               ${_id}.zm-component-blog-title-a:hover{color:${color};text-decoration: none;,cursor: move;}
               ${_id}.zm-component-details{
                text-decoration: none;
                cursor: move;
               }
               ${_id}.zm-component-details:hover{
                text-decoration: none;
                cursor: move;
               }
               ${_id}.zm-component-blog-bgImg:hover{
                cursor: move;
              }
               ${_id}.topPic>span .zm-component-blog-box{
                margin-left:${setLeft};
              } 
              ${_id}.topPic>span:nth-child(${col}n+1) .zm-component-blog-box{
                margin-left:0px;
              } 
              ${_id}span:nth-child(n+${colBot}) .zm-component-blog-box{
                margin-top:${boxBottom};
              }
              </style>`;
            let mobile = `<style>
            ${_id}.zm-component-blog-box:not(:first-child){
                margin-top:${mobBoxBot};
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
                                title: "常规布局",
                                type: "sets",
                                props: [{
                                        type: "/set/switch/ranksNum.vue",
                                        props: {
                                            attr: "ranksNum",
                                            minVal: 1,
                                            maxVal: 4,
                                            // maxVal:{rowMax:4,colMax:5},
                                            // minVal:{rowMin:0,colMin:1},
                                            callback: this.ranksNum
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "行间距",
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
                                            title: "列间距",
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
                                            title: "边距缩进(px)",
                                            attr: "paddingLeftRight",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .paddingLeftRight.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框颜色",
                                            attr: "boxBorderColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .boxBorderColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框线条宽度(px)",
                                            attr: "boxBorderWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .boxBorderWidth.value,
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
                                        type: "/set/switch/pictrue.vue",
                                        props: {
                                            title: "图片比例",
                                            attr: "pictureScale",
                                            value: this.settingData.pictureScale
                                                .row,
                                            callback: this.pictureHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框颜色",
                                            attr: "picBorderColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .picBorderColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框线条宽度(px)",
                                            attr: "picBorderWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .picBorderWidth.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    }
                                ]
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
                                    title: "标题下部高度(px)",
                                    attr: "TitmarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData.TitmarginBottom
                                        .value,
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
                                            title: "下部高度(px)",
                                            attr: "blogTimeBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .blogTimeBottom.value,
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
                        type: "level",
                        props: [{
                                title: "博客内容",
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
                                                callBack3: this.ContColor,
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
                                    }
                                ]
                            },
                            {
                                title: "查看详情",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示查看详情按钮",
                                                attr: "blogDetailsShow",
                                                value: this.settingData
                                                    .blogDetailsShow
                                                    .value,
                                                callback: this
                                                    .setListData
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/switch/detailsInput.vue",
                                                props: {
                                                    title: "按钮文字",
                                                    attr: "blogDetails",
                                                    value: this.settingData
                                                        .blogDetails.value
                                                }
                                            },
                                            {
                                                type: "/set/setFont/setFont.vue",
                                                props: {
                                                    title: "按钮文字设置",
                                                    attr: "detailsFont",
                                                    style: {
                                                        fontFamily: this
                                                            .settingData
                                                            .detailsFont
                                                            .value
                                                            .fontFamily,
                                                        fontSize: this
                                                            .settingData
                                                            .detailsFont
                                                            .value.fontSize,
                                                        color: this
                                                            .settingData
                                                            .detailsFont
                                                            .value.color,
                                                        fontWeight: this
                                                            .settingData
                                                            .detailsFont
                                                            .value
                                                            .fontWeight,
                                                        fontStyle: this
                                                            .settingData
                                                            .detailsFont
                                                            .value
                                                            .fontStyle,
                                                        callBack1: this
                                                            .detailsFamily,
                                                        callBack2: this
                                                            .detailsSize,
                                                        callBack3: this
                                                            .detailscolor,
                                                        callBack4: this
                                                            .detailsWeight,
                                                        callBack5: this
                                                            .detailsStyle
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按钮颜色",
                                                    attr: "detailsBackColor",
                                                    param: "color",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .detailsBackColor
                                                        .value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按键长度（%）",
                                                    attr: "detailsWidth",
                                                    param: "number",
                                                    minVal: 20,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .detailsWidth.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按键高度（px）",
                                                    attr: "detailsHeight",
                                                    param: "size",
                                                    minVal: 20,
                                                    maxVal: 40,
                                                    value: this.settingData
                                                        .detailsHeight
                                                        .value,
                                                    decimalNum: 0,
                                                    callback: this.setListData
                                                }
                                            },
                                            {
                                                type: "/set/setTextLayout.vue",
                                                props: {
                                                    title: "按钮位置",
                                                    style: {
                                                        textAlign: this
                                                            .settingData
                                                            .DiscontrolRowAlign
                                                            .value,
                                                        callBack: this
                                                            .DiscontrolRowAlign
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "按钮上部高度(px)",
                                                    attr: "DismarginTop",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .DismarginTop.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData
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
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
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
                    // {
                    //     type: "/set/sliders.vue",
                    //     props: {
                    //         title: "边距缩进(px)",
                    //         attr: "mobMarginLF",
                    //         param: "size",
                    //         minVal: 0,
                    //         maxVal: 30,
                    //         value: this.settingData.mobMarginLF.value,
                    //         decimalNum: 0,
                    //         callback: this.mobMarginLF
                    //     }
                    // },
                    // {
                    //     type: "/set/sliders.vue",
                    //     props: {
                    //         title: "行间距(px)",
                    //         attr: "mobLineH",
                    //         param: "size",
                    //         minVal: 0,
                    //         maxVal: 30,
                    //         value: this.settingData
                    //             .mobLineH.value,
                    //         decimalNum: 0,
                    //         callback: this.mobLineH
                    //     }
                    // },
                    {
                        type: "/set/switch/switch.vue",
                        props: {
                            title: "显示博客发布时间",
                            attr: "mobBlogShow",
                            value: this.settingData.mobBlogShow
                                .value,
                            callback: this.mobBlogShow
                        }
                    },
                    {
                        type: "/set/sliders.vue",
                        props: {
                            title: "内容显示行数",
                            attr: "mobLineNum",
                            param: "number",
                            minVal: 0,
                            maxVal: 10,
                            value: this.settingData
                                .mobLineNum.value,
                            decimalNum: 0,
                            callback: this.mobLineNum
                        }
                    },
                    {
                        type: "/set/sliders.vue",
                        props: {
                            title: "内容行距(px)",
                            attr: "mobContLine",
                            param: "size",
                            minVal: 0,
                            maxVal: 20,
                            value: this.settingData
                                .mobContLine.value,
                            decimalNum: 0,
                            callback: this.mobContLine
                        }
                    },
                    {
                        type: "/set/switch/switch.vue",
                        props: {
                            title: "显示按钮",
                            attr: "mobShowDet",
                            value: this.settingData
                                .mobShowDet
                                .value,
                            callback: this
                                .mobShowDet
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
                    })
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
                    if (item.fvideo.length > 0) {
                        item.bgUrl = item.fBlogVideoImg;
                        item.source = item.fvideo[0][0];
                        item.imgDis = "none";
                        item.videoDis = "block";
                        item.ahref = false;
                    } else {
                        if (item.fImg.length > 0) {
                            item.bgUrl = item.fImg[0];
                            item.imgDis = "block";
                            item.videoDis = "none";
                            item.ahref = false;
                        } else {
                            item.bgUrl = "../../../../../static/img/zumalogo.jpg";
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
                this.lists = [];
                console.log("指定博客数据为null")
            }
            return arr;
        }
    }
};
