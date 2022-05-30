<template>
  <div class="auto-container" :style="styleObject" ref="autoContainer" data-title="substance">
    <!-- 遮罩层 -->
    <div class="mask" id="mask" v-if="isFocus">
      <!-- 给选中样式增加时间，拖拽可已改变大小 -->
      <div v-for="i in 8" :key="i" class="selected-item" :ref="'selecteditem'+i" @mousedown.prevent.stop="handleMouseDown(i,$event)"></div>
      <!-- 坐标线位置 -->
      <span class="vue-draggle__position">{{position.left+','+position.top}}</span>
      <div class="vue-draggle__line vue-draggle__line-top"></div>
      <div class="vue-draggle__line vue-draggle__line-left"></div>
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
      isDraggle: true,
      elTargetClassName: '',
      isDocument: false,
      // 用户当前是否按住多选了
      isCtrl: false
    }
  },
  created () {
    const _this = this
    document.onmousedown = (e) => {
      _this.isDocument = true
      // 当点击页面的时候，取消focus状态
      // 给页面绑定事件，当点击页面的时候，取消所有元素的选中状态
      document.addEventListener('mouseup', this.foo)
    }
  },
  mounted () {
    const _this = this
    const autoDraggle = this.$refs.autodom
    autoDraggle.addEventListener('mousedown', function (ev) {
      // 当元素被聚焦的时候才允许移动或改变大小
      if (_this.isFocus) {
        if (!document.onmousemove) {
          document.onmousemove = (e) => {
            _this.$emit('changePosition', { left: e.movementX, top: e.movementY, index: _this.index })
          }
        }
        // 鼠标弹起的时候解绑事件
        if (!document.onmouseup) {
          document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null
          }
        }
      }
      // 阻止默认事件，防止小bug
      ev.preventDefault()
      ev.stopPropagation()
    })
  },
  computed: {
    styleObject () {
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
      const _this = this
      this.$emit('changeFocus', { index: this.index, flag: true })
      // 绑定键盘事件，控制元素上下左右移动，每次按照1px移动，目前先写死
      document.onkeydown = (e) => {
        console.log(_this.index, '当前激活元素的索引')
        // 元素不能写死，要获取获得焦点的元素
        if (_this.isFocus) {
          // let leftKx = _this.position.left
          // let TopKy = _this.position.top
          const offsetParam = {
            top: 0,
            left: 0,
            index: _this.index
          }
          switch (e.keyCode) {
            case 38:
              // 上
              // TopKy -= 1
              offsetParam.top = -1
              break
            case 39:
              // 右
              // leftKx += 1
              offsetParam.left = 1
              break
            case 40:
              // 下
              // TopKy += 1
              offsetParam.top = 1
              break
            case 37:
              // 左
              // leftKx -= 1
              offsetParam.left = -1
              break
            case 17:
              _this.$emit('handleMulti', true)
          }
          // 只有按住方向键的时候才改变元素位置
          if ([37, 38, 39, 40].includes(e.keyCode)) {
            // _this.$emit('changePosition', { left: leftKx, top: TopKy, index: _this.index })
            _this.$emit('changePosition', offsetParam)
          }
        }
      }
      // // 绑定键盘弹起事件，一旦弹起，取消元素多选开关，让用户变成单选
      // document.onkeyup = (e) => {
      //   if (e.keyCode === 17) {
      //     this.$emit('handleMulti', false)
      //   }
      // }
    },
    // 取消选中状态
    foo (e) {
      if (this.isDocument) {
        this.$emit('changeFocus', false)
        // 当点击页面之后，取消所有元素选中，那么也同时取消多选
        this.$emit('handleMulti', false)
        document.removeEventListener('mouseup', this.foo)
        // 这个时候也移除页面的键盘事件
        document.onkeydown = null
      }
    },
    handleMouseDown (i, ev) {
      // 小点的拖拽事件
      const _this = this
      // let firstTime = ''
      // let lastTime = ''
      this.isDocument = false
      const autoContainer = this.$refs.autoContainer
      this.elTargetClassName = ev.target.className
      console.log(i, ev.target.className, '当前点击的元素是啥')
      // 给拖拽点增加标识，判断用户是推拽还是点击
      // firstTime = new Date().getTime()
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
      if (autoContainer.setCapture) {
        autoContainer.setCapture()
      }
      ev.stopPropagation()
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
        // console.log(width, height, left, top)
        // 改变父组件大小的值
        _this.$emit('changeSize', { width, height, left, top, index: this.index })
        e.stopPropagation()
      }
      // 鼠标弹起的时候解绑事件
      document.onmouseup = (el) => {
        el.stopPropagation()
        document.onmousemove = document.onmouseup = null
        // lastTime = new Date().getTime()
        // if ((lastTime - firstTime) < 200) {
        //   // 代表此时是点击事件
        //   _this.isDraggle = true
        // } else {
        //   // 代表此时是拖拽事件
        //   _this.isDraggle = false
        // }
        // 释放全局捕获
        if (autoContainer.releaseCapture) {
          autoContainer.releaseCapture()
        }
      }
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
  background: blue;
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
  border:1px solid blue;
}
.vue-draggle__line {
  position: absolute;
}
.vue-draggle__line-left {
  width: 10000px;
  height: 0;
  border-top:1px dashed blue;
  top: 0;
  transform: translateX(-100%);
}
.vue-draggle__line-top {
  width: 0;
  height: 10000px;
  border-left:1px dashed blue;
  top: 0;
  transform: translateY(-100%);
}
.vue-draggle__position {
  position: absolute;
  left: -70px;
  top: -25px;
  color:blue;
}
/* 设置选中样式的位置 */
</style>
