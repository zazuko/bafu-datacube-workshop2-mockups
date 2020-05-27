<template>
  <div id="app">
    <b-navbar>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ name: 'Mapper' }">
          Mapper
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Designer' }">
          Designer
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
