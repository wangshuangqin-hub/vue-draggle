<template>
  <div class="layer-content">
    <!-- 头部工具栏 -->
    <div class="multi-container">工具栏</div>
    <!-- 元素面板区域 -->
    <div class="layer-container">
      <!-- 左侧元素控件区域 -->
      <div class="layer-left"></div>
      <!-- 中间布局区域 -->
      <div class="layer-center"></div>
      <!-- 右侧属性栏区域 -->
      <div class="layer-right"></div>
    </div>
    <!-- <template v-for="(item,index) in draggleList">
      <div :key="index">
          <auto-draggle
            v-bind="item"
            :width="item.width"
            :height="item.height"
            :position="item.position"
            :isFocus="item.isFocus"
            @changeFocus="changeFocus"
            @changeSize="changeSize"
            @changePosition="changePosition"
            @handleMulti="handleMulti">
            <component v-bind:is="item.type"></component>
          </auto-draggle>
      </div>
    </template> -->
    <!-- 右侧展示属性栏 -->
    <!-- <div class="attribute-wrapper" v-if="attributeObj">
      <attribute v-bind="attributeObj"></attribute>
    </div> -->
  </div>
</template>
<script>
// import autoDraggle from '@/components/autoDraggle.vue'
// import imgDraggle from '@/components/img.vue'
// import formDraggle from '@/components/form.vue'
// import attribute from '@/components/attribute.vue'
// import treeDate from '@/components/tree.vue'
export default {
  components: {
    // autoDraggle,
    // imgDraggle,
    // formDraggle,
    // attribute,
    // treeDate
  },
  data () {
    return {
      isCtrls: false,
      // 属性面板名称
      attributeObj: null,
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
          },
          type: 'imgDraggle',
          title: '图片组件'
        },
        {
          index: '456',
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
          },
          type: 'formDraggle',
          title: '表单组件'
        },
        {
          index: '789',
          width: 200,
          height: 100,
          // 当前用户是否处于选中状态
          isFocus: false,
          position: {
            left: 300,
            top: 500
          },
          style: {
            backgroundColor: 'deeppink'
          },
          type: 'treeDate',
          title: '树形组件'
        }
      ]
    }
  },
  methods: {
    // 当前是否是多选元素
    handleMulti (ctrlFlag) {
      this.isCtrls = ctrlFlag
    },
    changeFocus ({ index, flag }) {
      // debugger
      // 只有点击空白页面的时候，才会传递false,这个时候取消所有选中元素的focus
      if (!flag) {
        this.draggleList.forEach(item => { item.isFocus = false })
        return
      }
      if (index) {
        // 当前点击的元素变成聚焦状态，其他元素失去焦点(如果按住ctrl多选元素，则点击的元素都变成聚焦状态)
        if (this.isCtrls) {
          // 多选
          const indexFocus = this.draggleList.findIndex(item => item.index === index)
          if (indexFocus > -1) {
            this.draggleList[indexFocus].isFocus = flag
          }
        } else {
          this.draggleList.forEach(item => {
            if (item.index === index) {
              item.isFocus = flag
              this.attributeObj = item
            } else {
              item.isFocus = !flag
            }
          })
        }
      }
    },
    changeSize ({ width, height, left, top, index }) {
      // 找到需要操作的元素
      const indexValue = this.draggleList.findIndex(item => {
        return item.index === index
      })
      const optionsObject = this.draggleList[indexValue]
      console.log(this.draggleList[indexValue].position, '移动结束的坐标位置')
      if (width) {
        optionsObject.width = width
      }
      if (height) {
        optionsObject.height = height
      }
      if (left) {
        optionsObject.position.left = left
      }
      if (top) {
        optionsObject.position.top = top
      }
    },
    changePosition ({ left, top, index }) {
      // 判断的当前是多选元素还是单选元素，如果是多选元素，则一起移动
      if (this.isCtrls) {
        this.draggleList.forEach((item, index) => {
          if (item.isFocus) {
            item.position.left += left
            item.position.top += top
          }
        })
      } else {
        const indexValue = this.draggleList.findIndex(item => {
          return item.index === index
        })
        const optionsObject = this.draggleList[indexValue]
        optionsObject.position.left += left
        optionsObject.position.top += top
      }
    }
  }
}
</script>
<style  scoped lang="scss">
.layer-content {
  height: 100%;
  .multi-container {
    height: 60px;
    line-height: 60px;
    background-color: antiquewhite;
  }
  .layer-container {
    background-color: pink;
    height: calc(100% - 60px);
    .layer-left {
      width: 350px;
      height: 100%;
      background-color: deeppink;
    }
  }
}
</style>
