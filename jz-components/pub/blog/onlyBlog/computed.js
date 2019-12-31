export default {
    computed: {
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
              ${_fId}.zm-component-blog-title:hover{color:${color};}
              ${_fId}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;cursor: pointer;}
              ${_fId}.zm-component-blog-title-a:hover{color:${color};text-decoration: none;cursor: pointer;}
              ${_fId}.zm-component-details{color:${disOldCol};text-decoration: none;cursor: pointer;}
              ${_fId}.zm-component-details:hover{color:${disCol};text-decoration: none;cursor: pointer;}
              ${_fId}.zm-component-blog-bgImg:hover{
                cursor: pointer;
              }
              ${_fId}span .zm-component-blog-box{
                margin-bottom:${boxBottom};
              }
              ${_fId}span:last-Child .zm-component-blog-box{
                margin-bottom:0;
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
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
                    if (item.fvideo.length > 0) {
                        item.bgUrl = item.fImg[0];
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
