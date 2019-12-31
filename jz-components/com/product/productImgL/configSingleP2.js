export default {
    computed: {

        titleName() {
            this.settingData.productName == "" ? this.settingData.productName = this.mylists[0].name : "";
            return this.settingData.productName;
        },
        titPadding() { //文字区域整体边距缩进
            let paddingNum = this.settingData.TitTextIndent.value;
            let paddingLR
            // if (this.isComputer) {
            //     paddingNum = (this.settingData.TitTextIndent.value / 100) * this.style.width
            //     if (this.settingData.tit == 'right' && this.settingData.font3.value.fontStyle == 'italic' && parseFloat(this.settingData.TitTextIndent.value) == 0) {
            //         paddingNum = parseFloat(this.settingData.font3.value.fontSize) / 18 * 3
            //     }
            // } else {
            //     paddingNum = (this.settingData.TitTextIndent.value / 100) * this.mobileStyle.width
            //     if (this.settingData.tit == 'right' && this.settingData.font3.value.fontStyle == 'italic' && parseFloat(this.settingData.TitTextIndent.value) == 0) {
            //         paddingNum = 4
            //     }
            // }

            // let [paddingL,paddingR] = [0,0]
            // if(this.settingData.tit == 'left'){
            //     paddingL = paddingNum
            //     paddingR = 0
            // }else if(this.settingData.tit == 'right'){
            //     paddingL = 0
            //     paddingR = paddingNum
            // }else{
            //     paddingL = 0
            //     paddingR = 0
            // }
            // let titH = this.$el.firstChild.firstChild.firstChild.clientHeight
            let titH = this.settingData.titleAreaH / 2;
            let _id = "#" + this.id
            return `<style>
                ${_id} .titleArea{
                    position: relative;
                    top: 50%;
                    margin-top: -${titH}px;
                }
                ${_id} .zm-component-product-title-text{
                    padding-left:${paddingNum}%;
                    padding-right:${paddingNum}%;
                }
                ${_id} .title-line{
                    padding-left:${paddingNum}%;
                    padding-right:${paddingNum}%;
                }
                ${_id} .zm-component-product-title-price{
                    padding-left:${paddingNum}%;
                    padding-right:${paddingNum}%;
                    overflow:hidden;
                    word-break:break-all;
                }
                ${_id} .zm-component-product-title-details{
                    padding-left:${paddingNum}%;
                    padding-right:${paddingNum}%;
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
                                type: '/set/myProductLayout.vue',
                                props: {
                                    value: this.settingData.layOutIndex,
                                    attr: 'layOutIndex',
                                    callback: this.cb1
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '图片占比(%)',
                                    attr: 'imgCss',
                                    param: 'number',
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.imgCss.imgPer,
                                    callback: this.imgPerF
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
                                    title: '内容布局',
                                    style: {
                                        textAlign: this.settingData.tit,
                                        callBack: function (a) {
                                            //商品名称和价格布局===============================start
                                            this.settingData.tit = a
                                            //商品名称和价格布局===============================end

                                            //按钮布局===============================start
                                            // this.settingData.btnPosition.value = a
                                            //按钮布局===============================end

                                            //分割线布局===============================start
                                            if (a == "left") {
                                                this.settingData.lineM = ""
                                                this.settingData.lineF = ""
                                            } else if (a == "center") {
                                                this.settingData.lineM = "0 auto"
                                                this.settingData.lineF = ""
                                            } else if (a == "right") {
                                                this.settingData.lineM = ""
                                                this.settingData.lineF = "right"
                                            }
                                            // this.settingData.lineP = a
                                            //分割线布局===============================end
                                        }.bind(this)
                                    }
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '边距缩进(%)',
                                    attr: 'TitTextIndent',
                                    param: 'number',
                                    minVal: 0,
                                    maxVal: 15,
                                    value: this.settingData.TitTextIndent.value,
                                    decimalNum: 0,
                                    // callback:this.textIndentF2
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '文字间距(px)',
                                    attr: 'marginBottom',
                                    param: 'size',
                                    minVal: 0,
                                    maxVal: 50,
                                    value: this.settingData.marginBottom.value,
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
                                    title: '按钮上边距(px)',
                                    attr: 'btnmarginTop',
                                    param: 'size',
                                    minVal: 0,
                                    maxVal: 50,
                                    value: this.settingData.btnmarginTop,
                                    decimalNum: 0,
                                    callback: () => {
                                        this.titleHCompute()
                                    }
                                }
                            },
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
                                    type: '/set/setMyFont/setFont3.vue',
                                    props: {
                                        title: '标题文字',
                                        attr: 'font3',
                                        attr2: 'productName',
                                        style: {
                                            input: 1,
                                            maxlength: 20,
                                            inputText: this.settingData.productName,
                                            placeholder: '输入要显示的内容',
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
                                }, ]
                            },
                            {
                                title: '分割线',
                                type: 'sets',
                                // isHideLevel:this.isHideLevel,//true:隐藏,false:显示
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示分割线",
                                                attr: "DivisionSwitchShow",
                                                value: this.settingData.DivisionSwitchShow.value,
                                                callback: function (v) {
                                                    this.titleHCompute()
                                                    zmEditor.$store.commit('saveOperationToHistory')
                                                }.bind(this),
                                            }
                                        }],
                                        sonType: [{
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '线条长度(%)',
                                                    attr: 'lineWidth',
                                                    param: 'number',
                                                    minVal: 10,
                                                    maxVal: 90,
                                                    value: this.settingData.lineWidth.value,
                                                    decimalNum: 0,
                                                }
                                            },
                                            {
                                                type: '/set/sliders.vue',
                                                props: {
                                                    title: '线条宽度(px)',
                                                    attr: 'lineH',
                                                    param: 'size',
                                                    minVal: 1,
                                                    maxVal: 5,
                                                    value: this.settingData.lineH.value,
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
                                                    title: '线条颜色',
                                                    attr: 'lineBg',
                                                    param: 'color',
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData.lineBg.value,
                                                    decimalNum: 0,
                                                }
                                            },
                                        ]
                                    }
                                }, ]
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
                                                    // setTimeout(() => {
                                                    this.titleHCompute();
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                    // }, 20)
                                                }.bind(this),
                                                callBack2: function (v) {
                                                    this.settingData.retailfont3.value.fontSize = v;
                                                    // setTimeout(() => {
                                                    this.titleHCompute();
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                    // }, 20)

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

                                ]
                            },
                            {
                                title: '按钮',
                                type: 'sets',
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示按钮",
                                                attr: "btnSwitchShow",
                                                value: this.settingData.btnSwitchShow.value,
                                                callback: function (v) {
                                                    !this.settingData.btnSwitchShow.value ? this.settingData.btnmarginTop.value = 0 : "";
                                                    this.titleHCompute()
                                                    zmEditor.$store.commit('saveOperationToHistory')
                                                }.bind(this),
                                            }
                                        }],
                                        sonType: [{
                                                // type: '/set/setFont/setFont.vue',
                                                type: '/set/setMyFont/setFont2.vue',
                                                props: {
                                                    title: '按钮文字',
                                                    attr: 'btnfont3',
                                                    attr2: 'btnText',
                                                    style: {
                                                        input: 1,
                                                        maxlength: 8,
                                                        inputText: this.settingData.btnText,
                                                        placeholder: '输入要显示的内容',
                                                        'fontFamily': this.settingData.btnfont3.value.fontFamily,
                                                        'fontSize': this.settingData.btnfont3.value.fontSize,
                                                        'color': this.settingData.btnfont3.value.color,
                                                        'fontWeight': this.settingData.btnfont3.value.fontWeight,
                                                        'fontStyle': this.settingData.btnfont3.value.fontStyle,
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
                                        ]
                                    }
                                }, ]
                            },
                        ]
                    },
                ]
            }
        },
        mobileSetData() { //移动端设置项
            return {
                type: "sets",
                isScroll: false,
                props: [{
                    type: "/set/switch/pictrue.vue",
                    props: {
                        title: "图片宽高比",
                        attr: "pictureScale",
                        value: this.settingData.pictureScale
                            .row,
                        callback: this.pictureScale,
                        label: [{
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
                            }
                        ]
                    }
                }]
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
    }
}
