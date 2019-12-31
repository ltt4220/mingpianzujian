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
            let [page, cur, proNum, lists] = [arr, this.settingData.current, this.settingData.display, []];
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
            return lists;

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
            let col = parseInt(this.settingData.ranksNum.colsVal);
            let colBot = parseInt(this.settingData.ranksNum.colsVal) + 1;
            let labelBg = this.settingData.fLabelBgColor.value;
            let fontHColor = this.settingData.fontColor.value;
            let fontColor = this.settingData.titleFont.value.color;
            let _id = '#' + this.id + ' ';
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
                    cursor:pointer;
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
                    cursor:pointer;
                }
                ${_id}.zm-product-content .zm-product-mobileBox .zm-product-details:hover{
                    cursor:pointer;
                }
            </style>`;
            return computer;
        }
    }
}
