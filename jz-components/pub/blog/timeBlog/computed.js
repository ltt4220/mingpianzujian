export default {
    computed: {
        changemsg() {
            var _this = this;
            var color = _this.settingData.hoverColor.value;
            var oldColor = _this.settingData.Familyfont.value.color;
            var disCol = _this.settingData.DishoverColor.value;
            var disOldCol = _this.settingData.blogScale.value;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            var contIndent = _this.settingData.ContTextIndent.value;
            let _id = '#' + this.id + ' ';
            return `<style> 
               ${_id}.zm-component-blog-title{color:${oldColor};}
               ${_id}.zm-component-blog-title:hover{color:${color};}
               ${_id}.zm-component-blog-title-a{color:${oldColor};text-decoration: none;}
               ${_id}.zm-component-blog-title-a:hover{color:${color};text-decoration: underline;}
               ${_id}.zm-component-details{color:${disOldCol};text-decoration: none;}
               ${_id}.zm-component-details:hover{color:${disCol};text-decoration: underline;}
               ${_id}span .zm-component-blog-box{
                margin-bottom:${boxBottom};
              }
              ${_id}span:last-Child .zm-component-blog-box{
                margin-bottom:0;
              }
              ${_id}.zm-component-blog-word>p:first-child{
                text-indent:${contIndent};
              }
              </style>`;
        },
        pageList() {
            this.settingData.total = this.lists.length;
            this.settingData.display = parseInt(this.settingData.blogNum.value);
            let arr = this.lists.filter(item => {
                return item.isShowBlog;
            });
            let [page, cur, blogNum, lists] = [arr, this.settingData.current, this.settingData.display, []];
            let start = (cur - 1) * blogNum;
            let end = start + blogNum;
            let maxCur = Math.ceil(this.settingData.total / blogNum);
            if (cur == maxCur) {
                end = this.settingData.total;
            } else if (cur > maxCur) {
                start = (maxCur - 1) * blogNum;
                end = start + blogNum;
            }
            page.forEach((item, i) => {
                if (i >= start && i < end) {
                    lists.push(item)
                }
            });
            return lists;
        }
    }
};
