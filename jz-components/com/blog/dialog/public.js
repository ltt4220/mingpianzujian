let publicer = publicer || {};
publicer = {
    choiceModules(obj) {
        console.log(obj,"++++++++++++________________********")
        window.choiceModulesDataValue = obj;
        $("body")
            .find(":first")
            .before(
                '<iframe style="position:fixed;left:0;top:0;z-index:13000;border: none;"  src="public/index.html" width="100%" height="100%" id="choiceModules" allowtransparency="true" scrolling="no"></iframe>'
            );
    },
    group(d, type) {
        var num = 0,
            typeCount = [],
            map = {};
        d.forEach(function(obj) {
            var value = map[String(obj[type])];
            if (value !== void 0) {
                typeCount[value].push(obj);
            } else {
                map[obj[type]] = num;
                typeCount[num] = [].concat([obj]);
                num++;
            }
        });
        return typeCount;
    },
    grouping(data) {
        let _this = this;
        var arg = [].slice.call(arguments, 1),
            arr = data;
        for (var i = 0, l = arg.length; i < l; i++) {
            var newArr = [];
            if (arr[0].constructor === Array) {
                arr.forEach(function(arrChild) {
                    newArr = newArr.concat(publicer.group(arrChild, arg[i]));
                });
            } else {
                newArr = publicer.group(arr, arg[i]);
            }
            arr = newArr;
        }
        return arr;
    }
};
export default publicer;
