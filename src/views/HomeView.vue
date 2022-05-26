<template>
  <div class="home">
    <!-- 准备多个元素 -->
    <autoDraggle
      :width="imgOptions.width"
      :height="imgOptions.height"
      :position="imgOptions.position"
      :isFocus="imgOptions.isFocus"
      @changeFocus="changeFocus"
      @changeSize="changeSize"
      @changePosition="changePosition">
      <img src="../assets/logo.png" alt="">
    </autoDraggle>
  </div>
</template>

<script>
// @ is an alias to /src
import autoDraggle from '@/components/autoDraggle.vue'
export default {
  name: 'HomeView',
  components: {
    autoDraggle
  },
  data () {
    return {
      imgOptions: {
        width: 300,
        height: 300,
        // 当前用户是否处于选中状态
        isFocus: false,
        position: {
          left: 100,
          top: 300
        }
      }
    }
  },
  methods: {
    changeFocus ({ flag }) {
      this.imgOptions.isFocus = flag
    },
    changeSize ({ width, height, left, top }) {
      if (width) {
        this.imgOptions.width = width
      }
      if (height) {
        this.imgOptions.height = height
      }
      if (left) {
        this.imgOptions.position.left = left
      }
      if (top) {
        this.imgOptions.position.top = top
      }
    },
    changePosition ({ left, top }) {
      this.imgOptions.position.left = left
      this.imgOptions.position.top = top
    }
  }
}
</script>
<style scope>
.home {
  padding: 20px;
}
</style>
