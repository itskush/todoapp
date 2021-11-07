<template>
  <div id="app" class="container">
    <router-view/>
    <div class="nav">
      <router-link v-show="currentRouteName !== 'users'" class="router-buttom" to="/">Users</router-link>
      <router-link v-show="currentRouteName !== 'tasks' && 'tasksId'"  class="router-buttom" to="/tasks">Tasks</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app {
  font-family: 'Roboto' ,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: rgb(242, 242, 242) url("~@/assets/background.png") no-repeat fixed center center;
  background-size: cover;
  overflow-y: auto;
}

body {
  height: 100vh;
  min-height: 100vh;
  font-size: 1rem;
  font-weight: 400;
}

html {
  overflow-y: hidden !important;
}

.nav {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 40px;
  padding: 0.5rem 1rem;
  font: inherit;
  color: inherit;
  text-decoration: none;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 25px;
  box-shadow: rgb(0 0 0 / 13%) 0 0 13px 0;
  cursor: pointer;
  z-index: 2;
  :hover {
    background-color: rgb(242, 242, 242);
  }
}
</style>
