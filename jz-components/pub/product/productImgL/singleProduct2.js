export default {
      computed: {
        titleName() {
            this.settingData.productName == "" ? this.settingData.productName = this.mylists[0].name : "";
            return this.settingData.productName;
        },
        titPadding(){//文字区域整体边距缩进
            let paddingNum = this.settingData.TitTextIndent.value;
            let titH = this.settingData.titleAreaH/2
            let _id = "#"+this.id
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
        }
      }
}