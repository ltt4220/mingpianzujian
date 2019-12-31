let video = {
    choiceModules(obj) {
        window.choiceModulesDataValue = obj
        var box = document.getElementsByTagName('body')[0]
        var frame = document.createElement('iframe')
        frame.setAttribute('src', 'public/index.html')
        frame.setAttribute('id', 'choiceModules')
        frame.setAttribute('allowtransparency', 'true')
        frame.setAttribute('scrolling', 'no')
        frame.setAttribute('style', 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:13000;border: none;')
        box.appendChild(frame)
    },
}
export default video;
