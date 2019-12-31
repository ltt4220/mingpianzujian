<template>
    <div class="color-list">
        <div 
            class="color-item" 
            v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
            :key="color.text"
        >
            {{color.text}}
            <div 
                class="color-item" 
                v-for="col in color.colo" v-dragging="{ item: col, list: color.colo, group: 'col' }"
                :key="col.text" :style="styleObject"
            >
            {{col.text}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        styleObject: {
            color: 'red',
            fontSize: '13px'
        },
        colors: [{
            text: "Aquamarine",
            colo:[
                {
                    text: "Skyblue"
                }, 
                {
                    text: "Burlywood"
                }
            ]
        }, {
            text: "Hotpink"
            ,
            colo:[
                {
                    text: "Crimson"
                }, 
                {
                     text: "Blueviolet"
                 }
            ]
        }, {
            text: "Gold",
            colo:[
                {
                    text: "Lightblue"
                }, 
                {
                    text: "Cornflowerblue"
                }
            ]
        }]
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
    this.$dragging.$on('dragend', () => {
        
    })
  }
}
</script>