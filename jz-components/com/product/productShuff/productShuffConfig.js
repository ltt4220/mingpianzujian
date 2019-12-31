export default {
    computed: {
        svgHtml() {
            if(this.settingData.arrowIcon){
                let svg = this.settingData.arrowIcon.value.iconClass;
                return svg.replace('<svg', `<svg  style="width: ${this.settingData.carouselArrow.width +'px'};height:120px;fill:${this.settingData.arrowColor.value};"`);
            }else{
                console.log('%c产品轮播箭头属性没有，请重新保存产品轮播组件即可', 'font-size:34px;color:springgreen');
                return `<svg style="width: 30px;height:120px;fill:#333333;" version='1.1' id='图层_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 25.6 50' style='enable-background:new 0 0 25.6 50;' xml:space='preserve'><path d='M25.4,24.6L1,0.2c-0.2-0.2-0.6-0.2-0.8,0c-0.2,0.2-0.2,0.6,0,0.8l24,24l-24,24c-0.2,0.2-0.2,0.6,0,0.8 c0.2,0.2,0.6,0.2,0.8,0l24.4-24.4C25.7,25.2,25.7,24.8,25.4,24.6z'></path>`
            }
            
        },
        ulWidth() {
            let cont = parseFloat(this.settingData.ProductViewCarousel.imgWidth) * this.lists.length + parseFloat((this.lists.length - 1) * this.settingData.ProductViewCarousel.liMarginLeft);
            return cont
        },
        getNowWinWidth() {
            return zmEditor.$store.state.page.nowWinWidth;
        },
        getMarginLeft() {
            return zmEditor.$store.state.page.marginLeft;
        },
        vienH() {
            //光标悬浮箭头颜色
            let hoverC;
            this.isHoverColor ? hoverC = this.settingData.bannerfont3.value.color : hoverC = this.settingData.arrowHoverColor.value;
            //光标悬浮遮罩颜色
            let viehoverC = this.settingData.carouselVien.value;
            //光标悬浮文字颜色
            let nameHoverC = this.settingData.NameHoverColor.value;
            let _id = "#" + this.id;
            return `<style>
                  ${_id} .zm-component-product-carousel-vien:hover{
                      background-color:${viehoverC} !important;
                  }
                  ${_id} .arrowHoverC:hover svg{
                    fill:${hoverC} !important;
                }
                ${_id} .zm-component-product-carousel-title:hover{
                    color:${nameHoverC} !important;
                }
              </style>`;
        },
        rotateN() {
            //手机端换一批图标旋转样式
            let rotateDeg = this.settingData.rotateDeg;
            let _id = "#" + this.id;
            return `<style>
                  ${_id} .rotateC{
                      transform:rotate(${rotateDeg}deg);
                      -ms-transform:rotate(${rotateDeg}deg); 	/* IE 9 */
                      -moz-transform:rotate(${rotateDeg}deg); 	/* Firefox */
                      -webkit-transform:rotate(${rotateDeg}eg); /* Safari 和 Chrome */
                      -o-transform:rotate(${rotateDeg}deg); 	/* Opera */
                  }
              </style>`;
        },
        assignData() {
            let _this = this;
            let arr = [];
            if (!_this.lists) return;
            cutData(_this.lists);

            function cutData(_data) {
                _data.forEach(item => {
                    if (
                        item.childItem != null &&
                        item.childItem != undefined &&
                        item.childItem.length != 0
                    ) {
                        cutData(item.childItem);
                    } else {
                        try {
                            arr.push(item);
                        } catch (err) {
                        }
                    }
                });
            }
            arr = arr.splice(0, 20);
            this.ValidDataL(arr);
            return arr;
        },
        isFullPage: {
            // 返回值为当前组件控制全屏按钮的属性值
            get() {
                return this.settingData["fullScreen"].value;
            },
            set(newval) {
                this.settingData["fullScreen"].value = newval;
            }
        },
        assignDataM() {
            let _this = this;
            let arr = [];
            if (!_this.lists) return
            cutData(_this.lists)

            function cutData(_data) {
                _data.forEach(item => {
                    if (item.childItem != null && item.childItem != undefined && item.childItem.length != 0) {
                        cutData(item.childItem)
                    } else {
                        try {
                            arr.push(item)
                        } catch (err) {
                            console.log(arr)
                        }
                    }
                })
            }
            if (this.settingData.rotateCount >= 1) {
                arr = arr.splice(this.settingData.firstIndex, this.settingData.spliceNum)
            }
            if (this.settingData.rotateCount == 0) {
                arr = arr.splice(0, this.settingData.spliceNum)
            }
            this.ValidDataL(arr)
            // if(_this.lists.length>=4){
            // if (_this.lists.length) {
            //     if (arr.length == 1) {
            //         for (let i = 1; i < 4; i++) {
            //             arr.push(i)
            //         }
            //     } else if (arr.length == 2) {
            //         for (let i = 2; i < 4; i++) {
            //             arr.push(i)
            //         }
            //     } else if (arr.length == 3) {
            //         for (let i = 3; i < 4; i++) {
            //             arr.push(i)
            //         }
            //     }
            // }
            return arr
        },
        setData() {
            this.downH()
            return {
                type: 'tabs',
                props: [{
                        title: '布局',
                        type: 'level',
                        props: [{
                                title: '常规布局',
                                type: 'sets',
                                props: [{
                                        type: '/set/switch/switch.vue',
                                        props: {
                                            title: '全屏宽度',
                                            attr: 'fullScreen',
                                            value: this.settingData.fullScreen,
                                            callback: this.fullScreen
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            isShowSet: this.settingData.isShow2, //默认隐藏该设置项;
                                            title: "边距缩进(px)",
                                            attr: "boxPaddingLR",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 80,
                                            value: this.settingData
                                                .boxPaddingLR.value,
                                            decimalNum: 0,
                                            callback: this.boxPaddingLR
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '列数',
                                            attr: 'ProductViewCarousel',
                                            param: 'number',
                                            minVal: 1,
                                            maxVal: 8,
                                            value: this.settingData.ProductViewCarousel.num,
                                            decimalNum: 0,
                                            callback: this.numberOfColumns
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '列间距(px)',
                                            attr: 'ProductViewCarousel',
                                            param: 'number',
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData.ProductViewCarousel.liMarginLeft,
                                            decimalNum: 0,
                                            callback: this.liMarginLeftF
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '背景颜色',
                                            attr: 'productCarousel',
                                            param: 'color',
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData.productCarousel.value,
                                            decimalNum: 0,
                                            // callback:()=>{
                                            //     console.log('mdf')
                                            // }
                                        }
                                    },
                                    {
                                        type: '/set/switch/pictrue.vue',
                                        props: {
                                            title: '图片宽高比例',
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
                                ]
                            },
                            {
                                title: '图片',
                                type: 'level',
                                props: [{
                                        type: '/set/switch/setDetails.vue',
                                        props: {
                                            title: '显示效果',
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
                                                {
                                                    name: "覆盖颜色",
                                                    type: ""
                                                },
                                            ],
                                            callback: this.imgFloatE
                                        }
                                    },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            isShowSet: this.settingData.carouselVien.isShowSet, //默认隐藏该设置项;
                                            title: '光标悬浮遮罩颜色',
                                            attr: 'carouselVien',
                                            param: 'color',
                                            minVal: 0,
                                            maxVal: 80,
                                            value: this.settingData.carouselVien.value,
                                            decimalNum: 0
                                        }
                                    },
                                    // {
                                    //     type: '/set/sliders.vue',
                                    //     props: {
                                    //         title: '边框颜色',
                                    //         attr: 'borderColor',
                                    //         param: 'color',
                                    //         minVal: 0,
                                    //         maxVal: 100,
                                    //         value: this.settingData.borderColor.value,
                                    //         decimalNum: 0,
                                    //         callback: this.borderColorF
                                    //     }
                                    // },
                                    // {
                                    //     type: '/set/sliders.vue',
                                    //     props: {
                                    //         title: '边宽宽度(px)',
                                    //         attr: 'borderW',
                                    //         param: 'size',
                                    //         minVal: 0,
                                    //         maxVal: 5,
                                    //         value: this.settingData.borderW.value,
                                    //         decimalNum: 0,
                                    //         callback: this.borderWF
                                    //     }
                                    // },
                                ]
                            },
                        ]
                    },
                    {
                        title: '翻页',
                        type: 'sets',
                        props: [{
                                type: '/set/changeArrowSvg.vue',
                                props: {
                                    title: '图标样式',
                                    attr: 'arrowIcon',
                                    value: this.settingData.arrowIcon.value,
                                    callback:()=>{
                                        zmEditor.$store.commit('saveOperationToHistory');
                                    }
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '箭头宽度(px)',
                                    attr: 'carouselArrow',
                                    param: 'number',
                                    minVal: 10,
                                    maxVal: 30,
                                    value: this.settingData.carouselArrow.width,
                                    decimalNum: 0,
                                    callback:this.carouselArrow
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '箭头颜色',
                                    attr: 'arrowColor',
                                    param: 'color',
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.arrowColor.value,
                                    decimalNum: 0
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '光标悬浮箭头颜色',
                                    attr: 'arrowHoverColor',
                                    param: 'color',
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.arrowHoverColor.value,
                                    decimalNum: 0,
                                }
                            },
                            {
                                type: '/set/sliders.vue',
                                props: {
                                    title: '边距缩进(px)',
                                    attr: 'BtnTextIndent',
                                    param: 'number',
                                    minVal: -30,
                                    maxVal: 30,
                                    value: this.settingData.BtnTextIndent.value,
                                    decimalNum: 0
                                }
                            },
                        ]
                    },
                    {
                        title: '文字',
                        type: 'level',
                        props: [{
                                title: '商品名称',
                                type: 'sets',
                                props: [{
                                        type: '/set/setMyFont/setFont2.vue',
                                        props: {
                                            title: '文字设置',
                                            attr: 'bannerfont3',
                                            // attr2: 'productBanner',
                                            style: {
                                                // input:1,
                                                // maxlength:40,
                                                // inputText:this.settingData.productBanner,
                                                // placeholder:'输入要显示的内容',
                                                'fontFamily': this.settingData.bannerfont3.value.fontFamily,
                                                'fontSize': this.settingData.bannerfont3.value.fontSize,
                                                'color': this.settingData.bannerfont3.value.color,
                                                'fontWeight': this.settingData.bannerfont3.value.fontWeight,
                                                'fontStyle': this.settingData.bannerfont3.value.fontStyle,
                                                callBack1: function (v) {
                                                    this.settingData.bannerfont3.value.fontFamily = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack2: function (v) {
                                                    this.settingData.bannerfont3.value.fontSize = v;
                                                    setTimeout(() => {
                                                        this.textRowF(this.settingData.textRow.value.text)
                                                        return
                                                    }, 20)
                                                }.bind(this),
                                                callBack3: function (v) {
                                                    this.settingData.bannerfont3.value.color = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack4: function (v) {
                                                    this.settingData.bannerfont3.value.fontWeight = v;
                                                    zmEditor.$store.commit('saveOperationToHistory');
                                                }.bind(this),
                                                callBack5: function (v) {
                                                    this.settingData.bannerfont3.value.fontStyle = v;
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
                                    // {
                                    //     type: '/set/switch/setDetails.vue',
                                    //     props: {
                                    //         title:'显示效果',
                                    //         attr: "textRow",
                                    //         value:this.settingData.textRow.value.text,
                                    //         label:[
                                    //             {
                                    //                 name: "单行文本",
                                    //                 type: ""
                                    //             },
                                    //             {
                                    //                 name: "两行文本",
                                    //                 type: ""
                                    //             },
                                    //         ],
                                    //         callback: this.textRowF
                                    //     }
                                    // },
                                    {
                                        type: '/set/sliders.vue',
                                        props: {
                                            title: '上部高度(px)',
                                            attr: 'carouselTitlePT',
                                            param: 'size',
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData.carouselTitlePT.value,
                                            decimalNum: 0,
                                            callback: () => {
                                                this.getComH();
                                            }
                                        }
                                    },
                                    // {
                                    //     type: '/set/sliders.vue',
                                    //     props: {
                                    //         isShowSet: this.settingData.lineEm.isShowSet, //默认隐藏该设置项;
                                    //         title: '行距(倍)',
                                    //         attr: 'NamelineHeight',
                                    //         param:'number',
                                    //         minVal:1,
                                    //         maxVal:2,
                                    //         value: this.settingData.NamelineHeight.value,
                                    //         decimalNum: 1,
                                    //         callback:this.nameLineH,
                                    //     }
                                    // },
                                    // {
                                    //     type: '/set/sliders.vue',
                                    //     props: {
                                    //         title: '下部高度(px)',
                                    //         attr: 'carouselTitlePB',
                                    //         param:'size',
                                    //         minVal:0,
                                    //         maxVal:20,
                                    //         value: this.settingData.carouselTitlePB.value,
                                    //         decimalNum: 0,
                                    //         callback:()=>{
                                    //             this.ComponentsOfCalculated()
                                    //         }
                                    //     }
                                    // },
                                    // {
                                    //     type: '/set/setTextLayout.vue',
                                    //     props:{
                                    //         title:'文字布局',
                                    //         style:{
                                    //             textAlign:this.settingData.carouselTitAlign,
                                    //             callBack:function(a){
                                    //             this.settingData.carouselTitAlign = a
                                    //             zmEditor.$store.commit('saveOperationToHistory')
                                    //             }.bind(this)
                                    //         }
                                    //     }
                                    // },
                                    // {
                                    //     type: '/set/sliders.vue',
                                    //     props: {
                                    //         title: '边距缩进(px)',
                                    //         attr: 'carouselTitleT',
                                    //         param:'size',
                                    //         minVal:0,
                                    //         maxVal:20,
                                    //         value: this.settingData.carouselTitleT.value,
                                    //         decimalNum: 0,
                                    //         callback:this.productNameTxtI
                                    //     }
                                    // },
                                ]
                            },
                            // {
                            //     title: 'SKU',
                            //     type: 'sets',
                            //     props:[
                            //         {
                            //             type: "/set/switch/setWarp.vue",
                            //             props: {
                            //                 onOffBut: [{
                            //                     type: "/set/switch/switch.vue",
                            //                     props: {
                            //                         title: "显示SKU",
                            //                         attr: "skuSwitchShow",
                            //                         value: this.settingData.skuSwitchShow.value,
                            //                         callback:()=>{
                            //                             setTimeout(()=>{
                            //                                 this.ComponentsOfCalculated()
                            //                                 return
                            //                             },20)
                            //                             zmEditor.$store.commit('saveOperationToHistory')
                            //                         }
                            //                     }
                            //                 }],
                            //                 sonType:[
                            //                     {
                            //                         // type: '/set/setFont/setFont.vue',
                            //                         type: '/set/setMyFont/setFont2.vue',
                            //                         props: {
                            //                             // title: '文字设置',
                            //                             attr: 'skufont3',
                            //                             style:{
                            //                                 'fontFamily':this.settingData.skufont3.value.fontFamily,
                            //                                 'fontSize':this.settingData.skufont3.value.fontSize,
                            //                                 'color':this.settingData.skufont3.value.color,
                            //                                 'fontWeight':this.settingData.skufont3.value.fontWeight,
                            //                                 'fontStyle':this.settingData.skufont3.value.fontStyle,
                            //                                 callBack1:function(v){
                            //                                     this.settingData.skufont3.value.fontFamily = v
                            //                                 }.bind(this),
                            //                                 callBack2:function(v){
                            //                                     this.settingData.skufont3.value.fontSize = v
                            //                                     this.textRowF(this.settingData.textRow.value.text)
                            //                                 }.bind(this),
                            //                                 callBack3:function(v){
                            //                                     this.settingData.skufont3.value.color = v
                            //                                 }.bind(this),
                            //                                 callBack4:function(v){
                            //                                     this.settingData.skufont3.value.fontWeight = v
                            //                                 }.bind(this),
                            //                                 callBack5:function(v){
                            //                                     this.settingData.skufont3.value.fontStyle = v
                            //                                 }.bind(this),
                            //                             }
                            //                         },
                            //                     },
                            //                     {
                            //                         type: '/set/setTextLayout.vue',
                            //                         props:{
                            //                             title:'文字布局',
                            //                             style:{
                            //                                 textAlign:this.settingData.skutit,
                            //                                 callBack:function(a){
                            //                                     this.settingData.skutit = a
                            //                                     zmEditor.$store.commit('saveOperationToHistory')
                            //                                 }.bind(this)
                            //                             }
                            //                         }
                            //                     },
                            //                 ]
                            //             }
                            //         },
                            //     ]
                            // },
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
                                                    this.settingData.retailfont3.value.fontFamily = v
                                                }.bind(this),
                                                callBack2: function (v) {
                                                    this.settingData.retailfont3.value.fontSize = v
                                                    this.textRowF(this.settingData.textRow.value.text)
                                                }.bind(this),
                                                callBack3: function (v) {
                                                    this.settingData.retailfont3.value.color = v
                                                }.bind(this),
                                                callBack4: function (v) {
                                                    this.settingData.retailfont3.value.fontWeight = v
                                                }.bind(this),
                                                callBack5: function (v) {
                                                    this.settingData.retailfont3.value.fontStyle = v
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
                                            maxVal: 20,
                                            value: this.settingData.retailTitmarginTop.value,
                                            decimalNum: 0,
                                            callback: () => {
                                                this.getComH();
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
                                            maxVal: 20,
                                            value: this.settingData.retailmarginBottom.value,
                                            decimalNum: 0,
                                            callback: () => {
                                                this.getComH();
                                            }
                                        }
                                    },
                                    // {
                                    //     type: '/set/setTextLayout.vue',
                                    //     props:{
                                    //         title:'文字布局',
                                    //         style:{
                                    //             textAlign:this.settingData.retailtit,
                                    //             callBack:function(a){
                                    //                 this.settingData.retailtit = a
                                    //                 zmEditor.$store.commit('saveOperationToHistory')
                                    //             }.bind(this)
                                    //         }
                                    //     }
                                    // },
                                ]
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
                        type: '/set/switch/setDetails.vue',
                        props: {
                            title: '商品名称文字行数',
                            attr: "MtextRow",
                            value: this.settingData.MtextRow.value.text,
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
                    // {
                    //     type: '/set/switch/switch.vue',
                    //     props: {
                    //         title: "显示SKU",
                    //         attr: "skuSwitchShowM",
                    //         value: this.settingData.skuSwitchShowM.value,
                    //         callback:()=>{
                    //             this.settingData.isMsku = true
                    //             // setTimeout(()=>{
                    //             //     if(this.nowArr.length<3){
                    //             //         this.mobileGetDom(1)
                    //             //     }else{
                    //             //         this.mobileGetDom(2)
                    //             //     }
                    //             //     return
                    //             // },50)
                    //             this.getComH()

                    //         }
                    //     }
                    // },
                ]
            }
        },
    }
}
