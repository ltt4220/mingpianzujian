export default {
    computed: {
        setText() {
            this.settingData.mobNum.num == this.lists.length ? (this.text = "没有更多了!", this.textColor = "#BCBCBC") : (this.text = "加载更多", this.textColor = "#6B6B6B");
            return {
                text: this.text,
                color: this.textColor
            };
        },
        setPageShow() {
            let cont;
            cont = parseFloat(this.mobileStyle.height); //产品总高度;
            return cont;
        },
        setMobLists() {
            let _this = this;
            let arr = [];
            cutData(_this.lists);

            function cutData(_data) {
                _data.forEach(item => {
                    if (item.childItem != null && item.childItem != undefined && item.childItem.length != 0) {
                        cutData(item.childItem)
                    } else {
                        arr.push(item);
                    }
                })
            }
            this.ValidDataL(arr)
            if (arr.length > this.settingData.mobNum.num) {
                arr.length = this.settingData.mobNum.num;
            }
            return arr;
        },
        productStyle() {
            let mobBottom = this.settingData.mobLineH.value;
            let labelBg = this.settingData.fLabelBgColor.value;
            let _id = '#' + this.id + ' ';
            return `
            <style>
            ${_id}.zm-product-list{
                display: -moz-flex;
                display: -webkit-flex;
                display: -ms-flex;
                display: flex;
                -moz-flex-wrap: wrap;
                -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                justify-content:space-between;
            }
            ${_id}.zm-product-list .zm-product-box{
                width: calc((100% - 10px) / 2);
            }
            ${_id}.zm-product-list .zm-product-box:nth-child(n+3){
                margin-top:${mobBottom};
            }
            ${_id}.zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img:hover{
                cursor: pointer;
            }
            ${_id}.zm-product-content .zm-product-box .zm-product-title:hover{
                cursor: pointer;
            }
        </style>`;
        }
    }
}
