export default {
      computed:{
        NameHC(){//光标悬浮文字颜色
            let nameHoverC = this.settingData.NameHoverColor.value
            let _id = "#"+this.id
            return `<style>
                    ${_id} .zm-component-product-title-text:hover{
                        color:${nameHoverC} !important;
                    }
            </style>`
        }
      }  
}