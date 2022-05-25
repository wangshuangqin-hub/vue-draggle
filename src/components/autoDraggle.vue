<template>
  <div class="auto-container" :style="styleObject" ref="autoContainer" data-title="substance">
    <!-- 遮罩层 -->
    <div class="mask" v-if="isFocus">
      <!-- 给选中样式增加时间，拖拽可已改变大小 -->
      <div v-for="i in 8" :key="i" class="selected-item" :ref="'selecteditem'+i" @mousedown="handleMouseDown(i,$event)"></div>
    </div>
    <div @click.prevent.stop="handleFocus" class="auto-dom" ref="autodom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    width: Number,
    height: Number,
    position: Object,
    // 当前元素是否被选中
    isFocus: Boolean,
    index: String
  },
  data () {
    return {
      // isFocus: false
    }
  },
  mounted () {
    const _this = this
    const autoDraggle = this.$refs.autodom
    autoDraggle.addEventListener('mousedown', function (ev) {
      // 当元素被聚焦的时候才允许移动或改变大小
      if (_this.isFocus) {
        // 获取最外层盒子的偏移量
        const autoContainer = _this.$refs.autoContainer
        // 获取盒子距离浏览器可视窗口的水平距离和垂直距离
        const offsetLeftX = autoContainer.offsetLeft
        const offsetTopY = autoContainer.offsetTop
        console.log(offsetLeftX, offsetTopY)
        // 在这里绑定事件，点击空白位置，取消选中状态
        document.onmousemove = (e) => {
          console.log(2222222222)
          // 判断当前元素是否是选中状态，只有选中状态得元素才可以拖动
          // 获取鼠标得平移位置，重新赋值给盒子
          const disX = e.clientX - ev.clientX
          const disY = e.clientY - ev.clientY
          autoContainer.style.left = offsetLeftX + disX + 'px'
          autoContainer.style.top = offsetTopY + disY + 'px'
        }
        // 鼠标弹起的时候解绑事件
        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null
        }
      }
      // 阻止默认事件，防止小bug
      ev.preventDefault()
      ev.stopPropagation()
    })
  },
  computed: {
    styleObject () {
      // debugger
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        left: this.position.left + 'px',
        top: this.position.top + 'px'
      }
    }
  },
  methods: {
    handleFocus () {
      debugger
      // 判断是多元素还是单元素
      if (this.index) {
        this.$emit('changeFocus', { index: this.index, flag: true })
      } else {
        this.$emit('changeFocus', { flag: true })
      }
      // 当聚焦的时候给页面绑定点击事件
      // 给页面绑定事件，当点击页面的时候，取消所有元素的选中状态
      document.addEventListener('click', this.foo)
    },
    // 取消选中状态
    foo () {
      this.$emit('changeFocus', false)
      document.removeEventListener('click', this.foo)
    },
    handleMouseDown (i, ev) {
      // 小点的拖拽事件
      const _this = this
      const autoContainer = this.$refs.autoContainer
      console.log(i, ev, '当前点击的元素是啥')
      // 记录鼠标结束的位置
      const mouseDownX = ev.clientX
      const mouseDownY = ev.clientY
      // 要判断鼠标是往那个方向拖动，应该获取目标元素的偏移量和宽高

      const T0 = autoContainer.offsetTop
      const B0 = autoContainer.offsetTop + autoContainer.offsetHeight
      const L0 = autoContainer.offsetLeft
      const R0 = autoContainer.offsetLeft + autoContainer.offsetWidth
      const W = autoContainer.offsetWidth
      const H = autoContainer.offsetHeight
      // 判断改变方块的大小，确认当前用户是想改变哪个方位的大小
      // 左
      const changeL = mouseDownX <= L0
      // 右
      const changeR = mouseDownX >= R0
      // 上
      const changeT = mouseDownY <= T0
      // 下
      const changeB = mouseDownY >= B0
      console.log(changeL, '左', changeR, '右', changeT, '上', changeB, '下', '判断当前点击的是哪一个方向')
      if (autoContainer.setCapture) {
        autoContainer.setCapture()
      }
      document.onmousemove = (e) => {
        // 记录鼠标结束的坐标位置
        // debugger
        const mouseMoveX = e.clientX
        const mouseMoveY = e.clientY
        // 根据方向进行大小的改变
        let width, height, left, top
        // 左
        if (changeL) {
          width = mouseDownX - mouseMoveX + W
          // 改变元素的便宜量
          left = L0 - (mouseDownX - mouseMoveX)
        }
        // 右
        if (changeR) {
          width = mouseMoveX - mouseDownX + W
        }
        // 上
        if (changeT) {
          height = mouseDownY - mouseMoveY + H
          // 改变元素偏移量
          top = T0 - (mouseDownY - mouseMoveY)
        }
        if (changeB) {
          height = mouseMoveY - mouseDownY + H
        }
        console.log(width, height, left, top)
        // 改变父组件大小的值
        _this.$emit('changeSize', { width, height, left, top })
      }
      // 鼠标弹起的时候解绑事件
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
        // 释放全局捕获
        if (autoContainer.releaseCapture) {
          autoContainer.releaseCapture()
        }
      }
      ev.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto-container {
  display: inline-flex;
  position: absolute;
}
.auto-dom {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
}
img {
  height: 100%;
  width: 100%;
}
.selected-item {
  width: 10px;
  height: 10px;
  background: #2d7ff0;
  position: absolute;
  z-index: 2;
}
.selected-item:first-child  {
  left:-5px;
  top:-5px;
}
.selected-item:nth-child(2) {
  left:50%;
  transform: translateX(-50%);
  top:-5px;
}
.selected-item:nth-child(3) {
  right:-5px;
  top:-5px;
}
.selected-item:nth-child(4) {
  left:-5px;
  transform: translateY(-50%);
  top:50%;
}
.selected-item:nth-child(5) {
  right:-5px;
  transform: translateY(-50%);
  top:50%;
}
.selected-item:nth-child(6) {
  left:-5px;
  bottom:-5px;
}
.selected-item:nth-child(7) {
  left:50%;
  transform: translateX(-50%);
  bottom:-5px;
}
.selected-item:nth-child(8) {
  right:-5px;
  bottom:-5px;
}
.mask {
  position: absolute;
  left: -10px;
  right:-10px;
  top:-10px;
  bottom: -10px;
  /* background: palegoldenrod; */
  opacity: 0.3;
  z-index: 1;
  border:1px solid #2d7ff0;
}
/* 设置选中样式的位置 */
</style>
