<template>
    <div class="selectColor" :id='_id' ref="selectColorDom" @click="openColPicker">
        <span class="zm-colorPicker-switch" :style="{backgroundColor:this.prop.style.color}"></span>
    </div>
</template>

<script>
    export default {
        name:'color-picker',
        props:['prop'],
        data:function(){
            return {
                id:'colorPicker_'
            }
        },
        computed:{
            _id:function(){
                return this.id + (Math.random()*100000000).toString().slice(0,7)
            },
            colVal(){
                return this.prop.style.color
            }
        },
        methods:{
            syncColorToComponent(newColor,changedStatus){
                // console.log('-=-=-=-=-=-=changedStatus-=-=-=-=',changedStatus , this.prop.mode,this.prop  )
                 if(changedStatus !== "Toning"){

                     let arr = newColor.split('') ;
                     arr[arr.length-2] == ',' && (arr.splice(arr.length-2,1),(newColor = arr.join(''))) ;
                     this.prop.style.color = newColor;
                     this.$emit('syncColor',newColor,changedStatus);
                     this.prop.style.callBack3(newColor) ;  
                 }
            },
            // openColPicker(){
            //     const rect = this.$el.getBoundingClientRect();
            //     let left;
            //     if(rect.right + 350 > this.$root.$el.clientWidth){
            //         left = rect.right - 350
            //     }else{
            //         left = rect.right
            //     }
            //     this.$store.state.colorPicker.mold = true;
            //     this.$store.commit('changeColor',this.colVal)
            //     this.$store.state.colorPicker.callback = this.syncColorToComponent;
            //     this.$store.state.colorPicker.position = {left: left,top: rect.bottom}
            // }
            openColPicker(){

                console.log('11111111111111111111111111')
                const rect = this.$el.getBoundingClientRect();
                let scrollTop = $('#zm-main').scrollTop;
                let pageHeight = zmEditor.$store.state.page.nowWinHeight;
 
                let left,top;
              
                if(rect.right + 380 > this.$root.$el.clientWidth){
                    left = rect.right - 380
                }else{
                    left = rect.right
                }
                // modify 2018-9-11 11:36:04 修改点击色块距离底部近时,显示不完整
                let bHeight = pageHeight - event.pageY;
                if(bHeight <380){
                    top = pageHeight - 400;
                }else{
                    top = rect.bottom;
                }
                this.$store.state.colorPicker.mold = false;
                setTimeout(() => {
                    this.$store.state.colorPicker.mold = true;
                    this.$store.commit('changeColor',this.colVal)
                    this.$store.state.colorPicker.callback = this.syncColorToComponent;
                    this.$store.state.colorPicker.position = {left: left,top: top}
                }, 30);
            }
        },
         beforeCreate:function(){
             console.log('9999999999999999999999999')
            //颜色格式转换函数(将十六进制的颜色转为rgba颜色值)
            String.prototype.colorChange = function(){
                let sColor = this.toLowerCase();
                //十六进制颜色值的正则表达式
                let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                //如果是16进制颜色
                if(sColor && reg.test(sColor)){
                    if(sColor.length === 4){
                        let sColorNew = '#';
                        for(var i = 1; i < 4; i+=1){
                            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值
                    let sColorChange = [];
                    for(var i = 1; i < 7; i+=2){
                        sColorChange.push(parseInt('0x'+sColor.slice(i,i+2)))
                    }
                    return 'rgba(' + sColorChange.join(',') + ',1)';
                }
                return sColor;
            }
        }, 

        mounted(){
            let colVal = this.prop.style.color; //当前颜色拾取器的背景色
            let rgbArr;
            let _color;
            if(colVal.indexOf('rgb') > -1){
                //颜色值是以rgb开头的
                rgbArr = colVal.split('(')[1].split(')')[0].split(',')
            }else if(colVal.indexOf('#') > -1){
                let rgbaColor = colVal.colorChange();
                rgbArr = rgbaColor.split('(')[1].split(')')[0].split(',')
            }
            _color = {
                r:rgbArr[0].trim(),
                g:rgbArr[1].trim(),
                b:rgbArr[2].trim()
            }
        }
    }
</script>

<style scoped>


.selectColor {
    margin: 8px 3px 0px 0px ;
    float: left;
    width: 30px;
    height: 30px;
  }
    .zm-colorPicker-switch{
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 1px #c9c9c9;
    }
    .zm-colorPicker-switch:hover{
        /* box-shadow: 0 0 5px #3089d5; */
        cursor: pointer
    }
</style>


