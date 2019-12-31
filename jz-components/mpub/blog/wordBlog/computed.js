export default {
    computed: {
        setMobList() {
            let listId = [];
            let arr = [];
            try {
                let fid = this.settingData.listsID;
                this.lists.forEach((item, i) => {
                    fid.forEach(ele => {
                        if (item.fId == ele.id) {
                            item.isIconEyeOn = ele.type //设置睁眼图标显示或隐藏==》默认显示;
                        }
                    })
                    item.fContentText = item.fContentText.replace(/\s/g, "").replace(/<br>/g,"").replace(/\<p\>[(&#8203;)​]?\<\/p\>/g, "");
                    item.fTime = this.transformation(item.fUpdateTime, this.settingData.blogTime.type);
                });
                if (this.settingData.defauletTypeName.value == "最新发布的博客") {
                    arr = JSON.parse(JSON.stringify(this.lists));
                } else {
                    if (fid.length == 0) {
                        arr = [];
                    } else {
                        this.lists.forEach((item, i) => {
                            let isLook = fid.some(ele => {
                                return item.fId == ele.id && ele.type
                            })
                            if (isLook) {
                                listId.push(item)
                            }
                        })
                        arr = listId;
                    }
                }
                if (arr.length > this.settingData.mobBlogNum.value) {
                    arr.length = this.settingData.mobBlogNum.value;
                }
            } catch (err) {
                console.log("指定博客数据为null")
            }
            return arr;
        }
    }
};
