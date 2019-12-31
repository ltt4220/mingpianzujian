export default {
    computed: {
        changemsg() {
            var _this = this;
            var color = _this.settingData.hoverColor.value;
            var oldColor = _this.settingData.Familyfont.value.color;
            var disCol = _this.settingData.DishoverColor.value;
            var disOldCol = _this.settingData.blogScale.value;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            var contIndent = _this.settingData.ContTextIndent.value;
            let _id = '#'+this.id+' ';
            let computer =  `<style> 
               ${_id}.zm-component-blog-title{color:${oldColor};}
               ${_id}.zm-component-blog-title:hover{color:${color};}
               ${_id}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;}
               ${_id}.zm-component-blog-title-a:hover{color:${color};text-decoration: underline;}
               ${_id}.zm-component-details{color:${disOldCol};text-decoration: none;}
               ${_id}.zm-component-details:hover{color:${disCol};text-decoration: underline;}
               ${_id}span .zm-component-blog-box,${_id}span .zm-component-blog-boxMeblie{
                margin-bottom:${boxBottom};
              }
              ${_id}span:last-Child .zm-component-blog-boxMeblie{
                margin-bottom:0;
              }
              </style>`;
              let mobile =  `<style> 
               ${_id}span .zm-component-blog-box,${_id}span .zm-component-blog-boxMeblie{
                margin-bottom:${boxBottom};
              }
              ${_id}span:last-Child .zm-component-blog-boxMeblie{
                margin-bottom:0;
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
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "博客条数",
                                            attr: "blogNum",
                                            param: "number",
                                            minVal: 1,
                                            maxVal: 50,
                                            value: this.settingData.blogNum
                                                .value,
                                            decimalNum: 0,
                                            callback: this.setLHeigth
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
                                            title: "博客间距",
                                            attr: "BoxMarginBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .BoxMarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    }
                                ]
                            },
                            {
                                title: "阴影",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "阴影",
                                                attr: "pictureShadow",
                                                value: this.settingData
                                                    .pictureShadow
                                                    .value,
                                                callback: this
                                                    .pictureShadow
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "x轴偏移",
                                                    attr: "hShadow",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 50,
                                                    value: this.settingData
                                                        .hShadow.value,
                                                    decimalNum: 0,
                                                    callback: this.hShadow
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "Y轴偏移",
                                                    attr: "vShadow",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 50,
                                                    value: this.settingData
                                                        .vShadow.value,
                                                    decimalNum: 0,
                                                    callback: this.vShadow
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "模糊",
                                                    attr: "blurShadow",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 50,
                                                    value: this.settingData
                                                        .blurShadow.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .blurShadow
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "阴影颜色",
                                                    attr: "colorShadow",
                                                    param: "color",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .colorShadow.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .colorShadow
                                                }
                                            }
                                        ]
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        title: "标题",
                        type: "sets",
                        props: [{
                                type: "/set/setTextLayout.vue",
                                props: {
                                    title: "文字布局",
                                    style: {
                                        textAlign: this.settingData
                                            .controlRowAlign.value,
                                        callBack: this.controlRowAlign
                                    }
                                }
                            },
                            {
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
                                    title: "标题上部高度(px)",
                                    attr: "TitmarginTop",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
                                    value: this.settingData.TitmarginTop.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "标题下部高度(px)",
                                    attr: "TitmarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
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
                                            callback: this.setListData
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
                                        type: "/set/setTextLayout.vue",
                                        props: {
                                            title: "文字布局",
                                            style: {
                                                textAlign: this.settingData
                                                    .blogTimeAlign.value,
                                                callBack: this.blogTimeAlign
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
                                            maxVal: 30,
                                            value: this.settingData
                                                .blogTimeTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "下部高度(px)",
                                            attr: "blogTimeBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
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
                                            minVal: 1,
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
                                            maxVal: 30,
                                            value: this.settingData
                                                .ContmarginTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "首行文字缩进",
                                            attr: "ContTextIndent",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .ContTextIndent.value,
                                            decimalNum: 0,
                                            callback: this.ContTextIndent
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "内容行距(px)",
                                            attr: "ContLineHeight",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
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
                                            maxVal: 30,
                                            value: this.settingData
                                                .ContmarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/setTextLayout.vue",
                                        props: {
                                            title: "内容文字布局",
                                            style: {
                                                textAlign: this.settingData
                                                    .ContcontrolRowAlign.value,
                                                callBack: this
                                                    .ContcontrolRowAlign
                                            },
                                            height: 1
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边距缩进量(px)",
                                            attr: "contPaddingLR",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .contPaddingLR.value,
                                            decimalNum: 0
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
                                                title: "显示博客详情",
                                                attr: "blogDetailsShow",
                                                value: this.settingData
                                                    .blogDetailsShow
                                                    .value,
                                                callback: this
                                                    .blogDetailsShow
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/switch/setDetails.vue",
                                                props: {
                                                    title: "查看详情",
                                                    attr: "blogDetails",
                                                    value: this.settingData
                                                        .blogDetails.value
                                                        .text,
                                                    callback:this.blogDetails
                                                }
                                            },
                                            {
                                                type: "/set/setTextLayout.vue",
                                                props: {
                                                    title: "查看详情位置",
                                                    style: {
                                                        textAlign: this
                                                            .settingData
                                                            .DiscontrolRowAlign
                                                            .value,
                                                        callBack: this
                                                            .DiscontrolRowAlign
                                                    },
                                                    height: 1,
                                                    isShowSet: this.settingData.isShowSet //默认显示该设置项;
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "查看详情缩进量(px)",
                                                    attr: "DisPaddingLR",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 30,
                                                    value: this.settingData
                                                        .DisPaddingLR.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData,
                                                    isShowSet: this.settingData.isShowSet, //默认显示该设置项;
                                                    detailRetract:true //设置项宽度改变;
                                                    
                                                }
                                            },                                      
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "查看详情颜色",
                                                    attr: "blogScale",
                                                    param: "color",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .blogScale.value,
                                                    decimalNum: 0,
                                                    isShowSet: this.settingData.isShowSet //默认显示该设置项;
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "光标悬浮颜色",
                                                    attr: "DishoverColor",
                                                    param: "color",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .DishoverColor
                                                        .value,
                                                    decimalNum: 0,
                                                    isShowSet: this.settingData.isShowSet //默认显示该设置项;
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "上部高度",
                                                    attr: "DismarginTop",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 30,
                                                    value: this.settingData
                                                        .DismarginTop.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData,
                                                    isShowSet: this.settingData.isShowSet //默认显示该设置项;
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "下部高度",
                                                    attr: "DismarginBottom",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 30,
                                                    value: this.settingData
                                                        .DismarginBottom
                                                        .value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData,
                                                    isShowSet: this.settingData.isShowSet //默认显示该设置项;
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
        pageList() {
            this.settingData.total = this.lists.length;
            this.settingData.display = parseInt(this.settingData.blogNum.value);
            let arr = this.lists.filter(item => {
                return item.isShowBlog;
            });
            let [page, cur, blogNum, lists] = [arr, this.settingData.current, this.settingData.display, []];
            let start = (cur - 1) * blogNum;
            let end = start + blogNum;
            let maxCur = Math.ceil(this.settingData.total / blogNum);
            if (cur == maxCur) {
                end = this.settingData.total;
            } else if (cur > maxCur) {
                start = (maxCur - 1) * blogNum;
                end = start + blogNum;
            }
            page.forEach((item, i) => {
                if (i >= start && i < end) {
                    lists.push(item)
                }
            }); 
            // this.$nextTick(() =>{
            //     this.setLHeigth()
            // })
            return lists;
        },
        mobileSetData(){
            return {
                type: "sets",
                props: [
                    {
                        type: "/set/sliders.vue",
                        props: {
                            title: "博客条数",
                            attr: "mobBlogNum",
                            param: "number",
                            minVal: 1,
                            maxVal: 10,
                            value: this.settingData.mobBlogNum.value,
                            decimalNum: 0,
                            callback: this.setMobListData
                        }
                    },
                    {
                        type: "/set/switch/switch.vue",
                        props: {
                            title: "显示博客发布时间",
                            attr: "mobBlogShow",
                            value: this.settingData.mobBlogShow
                                .value,
                            callback: this.setMobListData
                        }
                    }
                ]
            }
        },
        setMobList() {
            let _this = this;
            let listId = [];
            let arr = _this.lists.filter(item => {
                listId.push({
                    id: item.fId
                });
                return item.isShowBlog;
            });
            if (arr.length > this.settingData.mobBlogNum.value && listId.length > this.settingData.mobBlogNum.value) {
                listId.length = this.settingData.mobBlogNum.value;
                arr.length = this.settingData.mobBlogNum.value;
            }
            this.settingData.listsID = listId;
            this.$emit("updataMes", {
                key: "lists",
                index: this.index,
                value: _this.lists
            }); //数据存储,更改父级lists;
            this.$nextTick(() =>{
                _this.mobileStyle.height = _this.$el.firstChild.clientHeight;
            })
            return arr;
        }
    }
};
