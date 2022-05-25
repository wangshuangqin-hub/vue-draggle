<template>
  <div>
    <template v-for="(item,index) in draggleList">
      <div :key="index">
          <auto-draggle
            v-bind="item"
            :width="item.width"
            :height="item.height"
            :position="item.position"
            :isFocus="item.isFocus"
            @changeFocus="changeFocus"
            @changeSize="changeSize">
            <component v-bind:is="currentTabComponent"></component>
          </auto-draggle>
      </div>
    </template>
  </div>
</template>
<script>
import autoDraggle from '@/components/autoDraggle.vue'
import imgDraggle from '@/components/img.vue'
import formDraggle from '@/components/form.vue'
export default {
  components: {
    autoDraggle,
    imgDraggle,
    formDraggle
  },
  /*         {
          width: 100,
          height: 100,
          // 当前用户是否处于选中状态
          isFocus: false,
          position: {
            left: 100,
            top: 100
          },
          style: {
            backgroundColor: 'red'
          }
        },
        {
          width: 200,
          height: 200,
          // 当前用户是否处于选中状态
          isFocus: false,
          position: {
            left: 300,
            top: 300
          },
          style: {
            backgroundColor: 'green'
          }
        },
        {
          width: 300,
          height: 300,
          // 当前用户是否处于选中状态
          isFocus: false,
          position: {
            left: 500,
            top: 500
          },
          style: {
            backgroundColor: 'yellow'
          }
        } */
  data () {
    return {
      currentTabComponent: 'imgDraggle',
      // 先准备一个默认的值
      draggleList: [
        {
          // 使用多元素时需要增加索引id
          index: '123',
          width: 100,
          height: 100,
          // 当前用户是否处于选中状态
          isFocus: false,
          position: {
            left: 100,
            top: 100
          },
          style: {
            backgroundColor: 'green'
          }
        }
      ]
    }
  },
  methods: {
    changeFocus ({ index, flag }) {
      const indexValue = this.draggleList.findIndex(item => {
        return item.index === index
      })
      this.draggleList[indexValue].isFocus = flag
    },
    changeSize () {

    }
  }
}
</script>
<style  scoped lang='scss'>

</style>
