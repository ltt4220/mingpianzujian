export default {
    computed: {
        setMarBot() {
            let contTop = parseFloat(this.settingData.ContmarginTop.value);
            let firstH = parseFloat(this.settingData.firstHeight.value);
            let cont = parseFloat(contTop + firstH) + 'px';
            let num = parseInt(this.settingData["lineHeightNum"].value);
            if (num == 0) {
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
            let _id = '#' + this.id + ' ';
            return `<style> 
               ${_id}.zm-component-blog-title{color:${oldColor};}
               ${_id}.zm-component-blog-title:hover{color:${color};cursor: pointer;}
               ${_id}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;cursor: pointer;transition: all 0.2s;}
               ${_id}.zm-component-blog-title-a:hover{color:${color};text-decoration: none;cursor: pointer;}
               ${_id}.zm-component-details{
                text-decoration: none;
                cursor: pointer;
               }
               ${_id}.zm-component-details:hover{
                text-decoration: none;
                cursor: pointer;
               }
               ${_id}.zm-component-blog-bgImg:hover{
                cursor: pointer;
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
        },
        setList() {
            let listId = [];
            let arr;
            try {
                let fid = this.settingData.listsID;
                this.lists.forEach((item, i) => {
                    fid.forEach(ele => {
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
                    if (fid.length == 0) {
                        arr = [];
                    } else {
                        this.lists.forEach((item, i) => {
                            let isLook = fid.some(ele => {
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
        }
    }
};
