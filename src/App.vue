<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <i style="display: inline-block; margin:0 10px">|</i>
    <router-link to="/multi">multi</router-link>
    <router-view/>
  </div>
</template>

<style>
#app {
  padding-top: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}
#app,html,body {
  height: 100%;
  width: 100%;
}
* {
 margin: 0;
 padding: 0;
}
</style>
