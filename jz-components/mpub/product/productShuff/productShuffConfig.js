export default {
    computed: {
        vienH() { //光标悬浮遮罩颜色
            let viehoverC = this.settingData.carouselVien.value
            let _id = "#" + this.id
            return `<style>
                ${_id} .zm-component-product-carousel-vien:hover{
                    background-color:${viehoverC} !important;
                }
            </style>`
        },
        rotateN() { //手机端换一批图标旋转样式
            let rotateDeg = this.settingData.rotateDeg
            let _id = "#" + this.id
            return `<style>
                ${_id} .rotateC{
                    transform:rotate(${rotateDeg}deg);
                    -ms-transform:rotate(${rotateDeg}deg); 	/* IE 9 */
                    -moz-transform:rotate(${rotateDeg}deg); 	/* Firefox */
                    -webkit-transform:rotate(${rotateDeg}eg); /* Safari 和 Chrome */
                    -o-transform:rotate(${rotateDeg}deg); 	/* Opera */
                }
            </style>`
        },
        NameHC() { //光标悬浮文字颜色
            let nameHoverC = this.settingData.NameHoverColor.value
            let _id = "#" + this.id
            return `<style>
                    ${_id} .zm-component-product-carousel-title:hover{
                        color:${nameHoverC} !important;
                    }
            </style>`
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
            return arr
        },
    }
}
