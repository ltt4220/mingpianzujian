export default {
    computed: {
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
            this.ValidDataL(arr) //he
            if (arr.length > this.settingData.mobNum.value) {
                arr.length = this.settingData.mobNum.value;
            }
            return arr;
        },
        productStyle() {
            let mobBottom = this.settingData.mobLineH.value;
            let labelBg = this.settingData.fLabelBgColor.value;
            let _id = '#' + this.id + ' ';
            return `
            <style>
            ${_id}.zm-product-list .zm-product-mobileBox{
                margin-bottom:${mobBottom};
            }
            ${_id}.zm-product-list .zm-product-mobileBox:last-child{
                margin-bottom: 0px;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-imgBox .zm-product-img{
                cursor: pointer;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-cont .zm-product-title:hover{
                cursor: pointer;
            }
            ${_id}.zm-product-list .zm-product-mobileBox .zm-product-cont .zm-product-details:hover{
                cursor:pointer;
            }
        </style>`;
        }
    }
}
