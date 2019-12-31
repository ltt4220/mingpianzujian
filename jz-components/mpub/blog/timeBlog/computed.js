export default {
    computed: {
        changemsg() {
            var _this = this;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            let _id = '#' + this.id + ' ';
            return `<style> 
            ${_id}span .zm-component-blog-box,${_id}span .zm-component-blog-boxMeblie{
             margin-bottom:${boxBottom};
           }
           ${_id}span:last-Child .zm-component-blog-boxMeblie{
             margin-bottom:0;
           }
           </style>`;
        },
        pageList() {
            let _this = this;
            let arr = _this.lists.filter(item => {
                return item.isShowBlog;
            });

            if (arr.length > this.settingData.blogNum.value) {
                arr.length = this.settingData.blogNum.value;
            }
            return arr;
        }
    }
};
