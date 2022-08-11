<script setup lang="ts"></script>

<template>
  <img src="./assets/logo.png" class="logo" alt="Logo" />
  <h1 class="title">vue-mushroom-admin</h1>
  <h3>开发中，敬请期待</h3>
</template>

<style>
body {
  background-color: #242424;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  height: 80vh;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.title {
  margin-top: 0;
}
</style>
