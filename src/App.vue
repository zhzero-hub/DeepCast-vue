<template>
  <div id="app">
    <el-container>
      <el-header>
        <MainHeader></MainHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
        <h1>Main</h1>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'

export default {
  components: {
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
