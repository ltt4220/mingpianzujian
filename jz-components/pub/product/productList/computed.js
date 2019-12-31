export default {
    computed: {
        setPageShow() {
            let cont;
            cont = parseFloat(this.style.height); //产品总高度不包括分页;
            return cont;
        },
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
            let imgColor = this.settingData.pictureBackHover.value;
            let pictureSize = this.settingData.pictureSize.num;
            let left = this.settingData.BoxMarginLeft.value; //BOX边距;
            let bottom = this.settingData.BoxMarginBottom.value; //BOX行距;
            let col = parseInt(this.settingData.ranksNum.colsVal);
            let colBot = parseInt(this.settingData.ranksNum.colsVal) + 1;
            let labelBg = this.settingData.fLabelBgColor.value;
            let _id = '#' + this.id + ' ';
            let computer = `
            <style>
                ${_id}.zm-product-content .zm-product-box{
                    border-color:${boxColor}; 
                    margin-left:${left};
                }
                ${_id}.zm-product-content .zm-product-box:nth-child(${col}n+1){
                    margin-left:0px;
                }
                ${_id}.zm-product-content .zm-product-box:nth-child(n+${colBot}){
                    margin-top:${bottom};
                }
                ${_id}.zm-product-content .zm-product-box:hover{
                    border-color:${boxHoverColor};
                }
                ${_id}.zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img{
                    z-index: 0;
                    background-position:${pictureSize};
                    transform:none;
                    transition: all 0.25s;
                }
                ${_id}.zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img:hover{
                    cursor: pointer;
                }
                ${_id}.zm-product-content .zm-product-box div .zm-product-title:hover{
                    cursor:pointer;
                }
            </style>`;
            return computer;
        },
        getMarginLeft() {
            return zmEditor.$store.state.page.marginLeft;
        },
        getNowWinWidth() {
            return zmEditor.$store.state.page.nowWinWidth
        }
    }
}
