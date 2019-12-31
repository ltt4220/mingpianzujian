export default {
    computed: {
        NameHC() { //光标悬浮文字颜色

            let nameHoverC;
            this.isHoverColor ? nameHoverC = this.settingData.font3.value.color : nameHoverC = this.settingData.NameHoverColor.value;
            let _id = "#" + this.id
            return `<style>
                ${_id} .zm-component-product-title-text:hover{
                    color:${nameHoverC} !important;
                }
        </style>`
        },
        setData() {
            return {
                type: 'tabs',
                props: [{
                        title: '布局',
                        type: 'sets',
                        props: [{
                                type: '/set/sliders.vue',
                                props: {
                                    title: '背景颜色',
                                    attr: 'backgroundColor',
                                    param: 'color',
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.backgroundColor.value,
                                    decimalNum: 0,
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '图片边距缩进(px)',
                                    attr: 'MarginIn',
                                    param: 'size',
                                    minVal: 0,
                                    maxVal: 20,
                                    value: this.settingData.MarginIn.value,
                                    decimalNum: 0,
                                    callback: () => {
                                        this.titleHCompute()
                                    }
                                }
                            },
                            {
                                type: '/set/switch/pictrue.vue',
                                props: {
                                    title: '图片宽高比',
                                    attr: "pictureScale",
                                    value: this.settingData.pictureScale.row,
                                    label: [
                                        // {
                                        //     row:16,
                                        //     col:9
                                        // },
                                        {
                                            row: 3,
                                            col: 2
                                        },
                                        {
                                            row: 4,
                                            col: 3
                                        },
                                        {
                                            row: 1,
                                            col: 1
                                        },
                                        // {
                                        //     row:3,
                                        //     col:4
                                        // },
                                    ],
                                    callback: this.pictureHeight
                                }
                            },
                            {
                                type: '/set/switch/setDetails.vue',
                                props: {
                                    title: '图片显示效果',
                                    attr: "blogDetails",
                                    value: this.settingData.blogDetails.value.text,
                                    label: [{
                                            name: "填充",
                                            type: ""
                                        },
                                        {
                                            name: "自适应",
                                            type: ""
                                        },
                                    ],
                                    callback: this.bgImgCb
                                }
                            },
                            {
                                type: '/set/switch/setDetails.vue',
                                props: {
                                    title: '图片悬浮效果',
                                    attr: "imgFloat",
                                    value: this.settingData.imgFloat.value.text,
                                    label: [{
                                            name: "无效果",
                                            type: ""
                                        },
                                        {
                                            name: "放大",
                                            type: ""
                                        },
                                        {
                                            name: "左移",
                                            type: ""
                                        },
                                        {
                                            name: "上移",
                                            type: ""
                                        },
                                        {
                                            name: "虚化",
                                            type: ""
                                        },
                                    ],
                                    callback: this.imgFloatE
                                }
                            },
                            {
                                type: '/set/setTextLayout.vue',
                                props: {
                                    title: '文字布局',
                                    style: {
                                        textAlign: this.settingData.tit,
                                        callBack: function (a) {
                                            this.settingData.tit = a;
                                            zmEditor.$store.commit('saveOperationToHistory');
                                        }.bind(this)
                                    }
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '边距缩进(px)',
                                    attr: 'TitTextIndent',
                                    param: 'size',
                                    minVal: 5,
                                    maxVal: 30,
                                    value: this.settingData.TitTextIndent.value,
                                    decimalNum: 0,
                                    callback: this.textIndentF2
                                }
                            }
                        ]
                    },
                    {
                        title: '商品',
                        type: 'sets',
                        isScroll: false,
                        props: [{
                            type: '/set/productSL/setBlog.vue',
                            props: this.prodcutList

                        }]
                    },
                    {
                        title: '内容',
                        type: 'level',
                        props: [{
                                title: '商品名称',
                                type: 'sets',
                                props: [{
                                        type: '/set/setMyFont/setFont2.vue',
                                        props: {
                                            title: '文字设置',
                                            attr: 'font3',
                                            // attr2:'productName',
                                            style: {
                                                // input:1,
                                                // maxlength:40,
                                                // inputText:this.settingData.productName,
                                                // placeholder:'输入要显示的内容',
                                                'fontFamily': this.settingData.font3.value.fontFamily,
                                                'fontSize': this.settingData.font3.value.fontSize,
                                                'color': this.settingData.font3.value.color,
                                                'fontWeight': this.settingData.font3.value.fontWeight,
                                                'fontStyle': this.settingData.font3.value.fontStyle,
                                                callBack1: function (v) {
                                                    this.settingData.font3.value.fontFamily = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack2: function (v) {
                                                    this.settingData.font3.value.fontSize = v;
                                                    setTimeout(() => {
                                                        this.titleHCompute();
                                                        zmEditor.$store.commit('saveOperationToHistory');
                                                    }, 20)
                                                }.bind(this),
                                                callBack3: function (v) {
                                                    this.settingData.font3.value.color = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack4: function (v) {
                                                    this.settingData.font3.value.fontWeight = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack5: function (v) {
                                                    this.settingData.font3.value.fontStyle = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                            }
                                        },
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '文字颜色悬浮效果',
                                            attr: 'NameHoverColor',
                                            param: 'color',
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData.NameHoverColor.value,
                                            decimalNum: 0,
                                        }
                                    },
                                    {
                                        type: '/set/switch/setDetails.vue',
                                        props: {
                                            title: '文本行数',
                                            attr: "textRow",
                                            value: this.settingData.textRow.value.text,
                                            label: [{
                                                    name: "单行文本",
                                                    type: ""
                                                },
                                                {
                                                    name: "两行文本",
                                                    type: ""
                                                },
                                            ],
                                            callback: this.textRowF
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '上部高度(px)',
                                            attr: 'TitmarginTop',
                                            param: 'size',
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData.TitmarginTop.value,
                                            decimalNum: 0,
                                            callback: () => {
                                                // setTimeout(()=>{
                                                this.titleHCompute()
                                                // },20)
                                            }
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            isShowSet: this.settingData.isShow2, //默认隐藏该设置项;
                                            title: '行高(倍)',
                                            attr: 'lineHeight',
                                            param: 'number',
                                            minVal: 1,
                                            maxVal: 2,
                                            value: this.settingData.lineHeight.value,
                                            decimalNum: 1,
                                            callback: this.lineH
                                        }
                                    }
                                ]
                            },
                            {
                                title: '价格',
                                type: 'sets',
                                props: [{
                                        // type: '/set/setFont/setFont.vue',
                                        type: '/set/setMyFont/setFont2.vue',
                                        props: {
                                            // title: '文字设置',
                                            attr: 'retailfont3',
                                            style: {
                                                'fontFamily': this.settingData.retailfont3.value.fontFamily,
                                                'fontSize': this.settingData.retailfont3.value.fontSize,
                                                'color': this.settingData.retailfont3.value.color,
                                                'fontWeight': this.settingData.retailfont3.value.fontWeight,
                                                'fontStyle': this.settingData.retailfont3.value.fontStyle,
                                                callBack1: function (v) {
                                                    this.settingData.retailfont3.value.fontFamily = v;
                                                    setTimeout(() => {
                                                        this.titleHCompute();
                                                        zmEditor.$store.commit('saveOperationToHistory');
                                                    }, 20)
                                                }.bind(this),
                                                callBack2: function (v) {
                                                    this.settingData.retailfont3.value.fontSize = v;
                                                    setTimeout(() => {
                                                        this.titleHCompute();
                                                        zmEditor.$store.commit('saveOperationToHistory');
                                                    }, 20)

                                                }.bind(this),
                                                callBack3: function (v) {
                                                    this.settingData.retailfont3.value.color = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack4: function (v) {
                                                    this.settingData.retailfont3.value.fontWeight = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack5: function (v) {
                                                    this.settingData.retailfont3.value.fontStyle = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                            }
                                        },
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '上部高度(px)',
                                            attr: 'retailTitmarginTop',
                                            param: 'size',
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData.retailTitmarginTop.value,
                                            decimalNum: 0,
                                            callback: () => {
                                                // setTimeout(() => {
                                                this.titleHCompute()
                                                // }, 20)
                                            }
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '下部高度(px)',
                                            attr: 'retailmarginBottom',
                                            param: 'size',
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData.retailmarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.retailmarginF
                                        }
                                    },
                                    // {
                                    //     type: '/set/setTextLayout.vue',
                                    //     props: {
                                    //         title: '文字布局',
                                    //         style: {
                                    //             textAlign: this.settingData.retailtit,
                                    //             callBack: function (a) {

                                    //                 this.settingData.retailtit = a
                                    //                 // zmEditor.$store.commit('saveOperationToHistory')
                                    //             }.bind(this)
                                    //         }
                                    //     }
                                    // },
                                ]
                            },
                            {
                                title: '按钮',
                                type: 'sets',
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        // title: '按钮文字',
                                        // value: this.settingData.btnSwitchShow.value,
                                        // callback:function(v){
                                        //     this.settingData.btnSwitchShow.value = v
                                        // }.bind(this),
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示按钮",
                                                attr: "btnSwitchShow",
                                                value: this.settingData.btnSwitchShow.value,
                                                callback: function (v) {
                                                    this.titleHCompute()
                                                    zmEditor.$store.commit('saveOperationToHistory')
                                                }.bind(this),
                                            }
                                        }],
                                        sonType: [
                                            // {
                                            //     // type: '/set/setFont/setFont.vue',
                                            //     type: '/set/setMyFont/setFont2.vue',
                                            //     props: {
                                            //         title: '按钮文字',
                                            //         attr: 'btnfont3',
                                            //         attr2: 'btnText',
                                            //         style: {
                                            //             input: 1,
                                            //             maxlength: 8,
                                            //             inputText: this.settingData.btnText,
                                            //             placeholder: '输入要显示的内容',
                                            //             'fontFamily': this.settingData.btnfont3.value.fontFamily,
                                            //             'fontSize': this.settingData.btnfont3.value.fontSize,
                                            //             'color': this.settingData.btnfont3.value.color,
                                            //             'fontWeight': this.settingData.btnfont3.value.fontWeight,
                                            //             'fontStyle': this.settingData.btnfont3.value.fontStyle,
                                            //             callBack1: function (v) {
                                            //                 this.settingData.btnfont3.value.fontFamily = v;
                                            //                 zmEditor.$store.commit('saveOperationToHistory');
                                            //             }.bind(this),
                                            //             callBack2: function (v) {
                                            //                 this.settingData.btnfont3.value.fontSize = v;
                                            //                 zmEditor.$store.commit('saveOperationToHistory');
                                            //             }.bind(this),
                                            //             callBack3: function (v) {
                                            //                 this.settingData.btnfont3.value.color = v;
                                            //                 zmEditor.$store.commit('saveOperationToHistory');
                                            //             }.bind(this),
                                            //             callBack4: function (v) {
                                            //                 this.settingData.btnfont3.value.fontWeight = v;
                                            //                 zmEditor.$store.commit('saveOperationToHistory');
                                            //             }.bind(this),
                                            //             callBack5: function (v) {
                                            //                 this.settingData.btnfont3.value.fontStyle = v;
                                            //                 zmEditor.$store.commit('saveOperationToHistory');
                                            //             }.bind(this),
                                            //         }
                                            //     },
                                            // },
                                            {
                                                // type: '/set/setFont/setFont.vue',
                                                type: '/set/switch/setFontCont.vue',
                                                props: {
                                                    attr: 'btnfont3',
                                                    attr2: 'btnText',
                                                    title: '按钮文字',
                                                    style: {
                                                        input: 1,
                                                        maxLength: 8,
                                                        inputText: this.settingData.btnText,
                                                        placeholder: this.settingData.btnText,
                                                        fontFamily: this.settingData.btnfont3.value.fontFamily,
                                                        fontSize: this.settingData.btnfont3.value.fontSize,
                                                        color: this.settingData.btnfont3.value.color,
                                                        fontWeight: this.settingData.btnfont3.value.fontWeight,
                                                        fontStyle: this.settingData.btnfont3.value.fontStyle,
                                                        callBack1: function (v) {
                                                            this.settingData.btnfont3.value.fontFamily = v;
                                                            zmEditor.$store.commit('saveOperationToHistory');
                                                        }.bind(this),
                                                        callBack2: function (v) {
                                                            this.settingData.btnfont3.value.fontSize = v;
                                                            zmEditor.$store.commit('saveOperationToHistory');
                                                        }.bind(this),
                                                        callBack3: function (v) {
                                                            this.settingData.btnfont3.value.color = v;
                                                            zmEditor.$store.commit('saveOperationToHistory');
                                                        }.bind(this),
                                                        callBack4: function (v) {
                                                            this.settingData.btnfont3.value.fontWeight = v;
                                                            zmEditor.$store.commit('saveOperationToHistory');
                                                        }.bind(this),
                                                        callBack5: function (v) {
                                                            this.settingData.btnfont3.value.fontStyle = v;
                                                            zmEditor.$store.commit('saveOperationToHistory');
                                                        }.bind(this),
                                                    }
                                                },
                                            },
                                            // {
                                            //     type: '/set/sliders.vue',
                                            //     props: {
                                            //         title: '按钮上部高度(px)',
                                            //         attr: 'btnmarginTop',
                                            //         param:'size',
                                            //         minVal:0,
                                            //         maxVal:30,
                                            //         value: this.settingData.btnmarginTop.value,
                                            //         decimalNum: 0,
                                            //         callback:this.btnmarginF
                                            //     }
                                            // },
                                            {
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '按钮下部高度(px)',
                                                    attr: 'btnmarginBottom',
                                                    param: 'size',
                                                    minVal: 0,
                                                    maxVal: 30,
                                                    value: this.settingData.btnmarginBottom.value,
                                                    decimalNum: 0,
                                                    callback: this.btnmarginBottomF
                                                }
                                            },
                                            {
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '按钮宽度(%)',
                                                    attr: 'btnWidth',
                                                    param: 'number',
                                                    minVal: 40,
                                                    maxVal: 100,
                                                    value: this.settingData.btnWidth.value,
                                                    decimalNum: 0,
                                                }
                                            },
                                            {
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '按钮高度(px)',
                                                    attr: 'btnheight',
                                                    param: 'size',
                                                    minVal: 20,
                                                    maxVal: 40,
                                                    value: this.settingData.btnheight.value,
                                                    decimalNum: 0,
                                                    callback: () => {
                                                        setTimeout(() => {
                                                            this.titleHCompute()
                                                        }, 20)
                                                    }
                                                }
                                            },
                                            {
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '按钮颜色',
                                                    attr: 'btnBg',
                                                    param: 'color',
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData.btnBg.value,
                                                    decimalNum: 0,
                                                }
                                            },
                                            // {
                                            //     type: '/set/setTextLayout.vue',
                                            //     props: {
                                            //         title: '按钮布局',
                                            //         style: {
                                            //             textAlign: this.settingData.btnPosition.value.length > 0 ? this.settingData.btnPosition.value : 'center',
                                            //             callBack: function (a) {

                                            //                 this.settingData.btnPosition.value = a
                                            //                 this.settingData.btnP.value = ''
                                            //                 if (a == 'center') {
                                            //                     this.settingData.btnPosition.value = ''
                                            //                     this.settingData.btnP.value = '0 auto'
                                            //                 }
                                            //                 // this.settingData.btnIndent.value = '0px'
                                            //                 zmEditor.$store.commit('saveOperationToHistory')
                                            //             }.bind(this)
                                            //         }
                                            //     }
                                            // },
                                            // {
                                            //     type: '/set/sliders.vue',
                                            //     props: {
                                            //         title: '边距缩进(px)',
                                            //         attr: 'btnIndent',
                                            //         param:'size',
                                            //         minVal:0,
                                            //         maxVal:20,
                                            //         value: this.settingData.btnIndent.value,
                                            //         decimalNum: 0,
                                            //         callback:this.textIndentF4
                                            //     }
                                            // },
                                        ]
                                    }
                                }, ]
                            },
                        ]
                    },
                    //     {
                    //     title: '阴影',
                    //     type: 'sets',
                    //     props:[
                    //         {
                    //             type: "/set/switch/setWarp.vue",
                    //             props: {
                    //                 // title: '显示按钮',
                    //                 // value: this.settingData.btnSwitchShow.value,
                    //                 // callback:function(v){
                    //                 //     this.settingData.btnSwitchShow.value = v
                    //                 // }.bind(this),
                    //                 onOffBut: [{
                    //                     type: "/set/switch/switch.vue",
                    //                     props: {
                    //                         title: "显示按钮",
                    //                         attr: "shadowSwitchShow",
                    //                         value: this.settingData.shadowSwitchShow.value
                    //                     }
                    //                 }],
                    //                 sonType:[
                    //                     {
                    //                         type: '/set/sliders.vue',
                    //                         props: {
                    //                             title: 'X轴偏移',
                    //                             attr: 'Xmove',
                    //                             param:'number',
                    //                             minVal:0,
                    //                             maxVal:5,
                    //                             value: this.settingData.Xmove.value,
                    //                             decimalNum: 0,
                    //                             callback:this.boxShadowX
                    //                         }
                    //                     },
                    //                     {
                    //                         type: '/set/sliders.vue',
                    //                         props: {
                    //                             title: 'Y轴偏移',
                    //                             attr: 'Ymove',
                    //                             param:'number',
                    //                             minVal:0,
                    //                             maxVal:5,
                    //                             value: this.settingData.Ymove.value,
                    //                             decimalNum: 0,
                    //                             callback:this.boxShadowY
                    //                         }
                    //                     },
                    //                     {
                    //                         type: '/set/sliders.vue',
                    //                         props: {
                    //                             title: '模糊',
                    //                             attr: 'shadowblur',
                    //                             param:'number',
                    //                             minVal:0,
                    //                             maxVal:50,
                    //                             value: this.settingData.shadowblur.value,
                    //                             decimalNum: 0,
                    //                             callback:this.boxShadowB
                    //                         }
                    //                     },
                    //                     {
                    //                         type: '/set/sliders.vue',
                    //                         props: {
                    //                             title: '背景颜色',
                    //                             attr: 'shadowBg',
                    //                             param: 'color',
                    //                             minVal: 0,
                    //                             maxVal: 100,
                    //                             value:this.settingData.shadowBg.value,
                    //                             decimalNum: 0,
                    //                             callback:this.boxShadowBG
                    //                         }
                    //                     },
                    //                 ]
                    //             }
                    //         }
                    //     ]
                    // },
                ]
            }
        },
        visData() {
            let assId = JSON.stringify(this.settingData.ValidData);
            let fid = assId.slice(1, -1).replace(/\"/g, "");
            let has = fid.indexOf("1-") > -1 ? true : false;
            this.settingData.productType == "product" ?
                this.$set(this.settingData, "hasZuma", {
                    value: has,
                    type: 'product'
                }) : this.$set(this.settingData, "hasZuma", {
                    value: has,
                    type: 'server'
                });
            return has
        }
        //   mobileSetData() {//移动端设置项
        //     return {
        //         type: "sets",
        //         props: [

        //             {
        //                 type: '/set/switch/switch.vue',
        //                 props: {
        //                     title: "显示广告语",
        //                     attr: "bannerSwitchShowM",
        //                     value: this.settingData.bannerSwitchShowM.value,
        //                 }
        //             },
        //             {
        //                 type: '/set/switch/switch.vue',
        //                 props: {
        //                     title: "显示分割线",
        //                     attr: "DivisionSwitchShowM",
        //                     value: this.settingData.DivisionSwitchShowM.value,
        //                 }
        //             },
        //             {
        //                 type: '/set/switch/switch.vue',
        //                 props: {
        //                     title: '显示零售价',
        //                     attr: "retailSwitchShowM",
        //                     value: this.settingData.retailSwitchShowM.value,
        //                 }
        //             },
        //             {
        //                 type: '/set/switch/switch.vue',
        //                 props: {
        //                     title: '显示按钮',
        //                     attr: "btnSwitchShowM",
        //                     value: this.settingData.btnSwitchShowM.value,
        //                 }
        //             }

        //         ]
        //     }
        //   },
    }
}
