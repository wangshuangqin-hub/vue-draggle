<template>
  <div class='attribute-container'>
    <p class="attribute-title">元素名称: {{title}}</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="w">
        <el-input v-model="formInline.width"></el-input>
      </el-form-item>
      <el-form-item label="h">
        <el-input v-model="formInline.height"></el-input>
      </el-form-item>
      <el-form-item label="x">
        <el-input v-model="formInline.left"></el-input>
      </el-form-item>
      <el-form-item label="y">
        <el-input v-model="formInline.top"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'attributeVue',
  inheritAttrs: false,
  props: {
    title: String,
    width: Number,
    height: Number,
    position: Object
  },
  computed: {
    formInline () {
      return {
        width: this.width,
        height: this.height,
        left: this.position.left,
        top: this.position.top
      }
    }
  }
}
</script>
<style  scoped>
.attribute-container {
  text-align: left;
  height: 100%;
  padding-left: 15px;
}
.attribute-title {
  padding: 10px;
  text-align: center;
}
</style>
