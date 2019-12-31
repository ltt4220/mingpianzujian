export default {
    computed: {
        svgHtml() {
            let svg = this.settingData.arrowIcon.value.iconClass;
            return svg.replace('<svg', `<svg  style="width: ${this.settingData.carouselArrow.width+'px'};height:120px;fill:${this.settingData.arrowColor.value};"`);
        },
        ulWidth(){
            let cont  = parseFloat(this.settingData.ProductViewCarousel.imgWidth) * this.lists.length + parseFloat((this.lists.length-1) * this.settingData.ProductViewCarousel.liMarginLeft);
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
        assignData() {
            let _this = this;
            let arr = [];
            cutData(_this.lists)

            function cutData(_data) {
                _data.forEach(item => {
                    if (item.childItem != null && item.childItem != undefined && item.childItem.length != 0) {
                        cutData(item.childItem)
                    } else {
                        try {
                            arr.push(item);
                        } catch (err) {
                            console.log(arr)
                        }
                    }
                })
            }
            arr = arr.splice(0, 20)
            this.ValidDataL(arr)
            return arr
        }
    }
}
