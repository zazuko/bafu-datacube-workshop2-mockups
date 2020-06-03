<template>
  <div id="app">
    <b-navbar shadow>
      <template slot="brand">
        <b-navbar-item>
          <img src="zazuko-logo.svg" alt="Zazuko" class="logo">
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ name: 'Cubes' }">
          Cubes
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'DimensionManager' }">
          Managed Dimensions
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-dropdown label="bob@bafu.admin.ch">
          <b-navbar-item href="#">
            Logout
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
.page {
  padding: 1.5rem 1.5rem 0 1.5rem;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo {
  height: 40px;
}
</style>
