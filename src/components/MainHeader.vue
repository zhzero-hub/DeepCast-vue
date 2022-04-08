<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="SystemController">训练控制台</el-menu-item>
    <el-menu-item index="ServiceController">服务中心</el-menu-item>
    <el-menu-item index="PlayerController">播放中心</el-menu-item>
    <el-menu-item index="4">效率分析</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {
      activeIndex: 'SystemController'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
    }
  }
}
</script>

<style scoped>

</style>
