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
            var disCol = _this.settingData.DishoverColor.value;
            var disOldCol = _this.settingData.blogScale.value;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            let _id = '#' + this.id + ' ';
            return `<style> 
              ${_id}.zm-component-blog-title{color:${oldColor};}
              ${_id}.zm-component-blog-title:hover{color:${color};cursor:move}
              ${_id}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;transition: all 0.2s;}
              ${_id}.zm-component-blog-title-a:hover{color:${color};text-decoration: none;cursor:move}
              ${_id}.zm-component-details{color:${disOldCol};text-decoration: none;}
              ${_id}.zm-component-details:hover{color:${disCol};text-decoration: none;}
              ${_id}span .zm-component-blog-box{
                margin-bottom:${boxBottom};
              }
              ${_id}span:last-Child .zm-component-blog-box{
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
                                    value: this.settingData.blogNum.value,
                                    decimalNum: 0,
                                    callback: this.blogNum
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
                                    value: this.settingData.BoxBackgroundColor
                                        .value,
                                    decimalNum: 0
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
                                    value: this.settingData.BoxMarginBottom
                                        .value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "左右留白(px)",
                                    attr: "paddingLeftRight",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
                                    value: this.settingData.paddingLeftRight
                                        .value,
                                    decimalNum: 0
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "上下留白(px)",
                                    attr: "ContmarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
                                    value: this.settingData
                                        .ContmarginBottom.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/switch/setTextLayout.vue",
                                props: {
                                    title: "文字布局",
                                    midShow: 1,//隐藏设置项居中对齐;
                                    style: {
                                        textAlign: this
                                            .settingData
                                            .controlRowAlign
                                            .value,
                                        callBack: this
                                            .controlRowAlign
                                    },
                                    // height: 1,//改变title的高度;
                                    // isShowSet: this.settingData.isShowSet //默认显示该设置项;
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
                            // {
                            //     type: "/set/sliders.vue",
                            //     props: {
                            //         title: "标题上部高度(px)",
                            //         attr: "TitmarginTop",
                            //         param: "size",
                            //         minVal: 0,
                            //         maxVal: 30,
                            //         value: this.settingData.TitmarginTop.value,
                            //         decimalNum: 0,
                            //         callback: this.setListData
                            //     }
                            // }
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
                                    title: "内容行距(倍)",
                                    attr: "ContLineHeight",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 1,
                                    value: this.settingData
                                        .ContLineHeight.value,
                                    decimalNum: 1,
                                    callback: this.ContLineHeight
                                }
                            }
                        ]
                    }
                ]
            };
        },
        setList() {
            let listId = [];
            let arr = [];
            try {
                this.lists.forEach((item, i) => {
                    this.settingData.listsID.forEach(ele => {
                        if (item.fId == ele.id) {
                            item.isIconEyeOn = ele.type //设置睁眼图标显示或隐藏==》默认显示;
                        }
                    })
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
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
                this.lists = [];
                console.log("指定博客数据为null")
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
                        type: "/set/sliders.vue",
                        props: {
                            title: "文字行数",
                            attr: "mobTitLine",
                            param: "number",
                            minVal: 1,
                            maxVal: 2,
                            value: this.settingData.mobTitLine.value,
                            decimalNum: 0,
                            callback:this.setMobListData
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
                    })
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
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
