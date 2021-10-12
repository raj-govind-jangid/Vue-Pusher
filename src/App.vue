<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container align-start fill-height> <ChatApp /> </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>
import ChatApp from './components/ChatApp';

export default {
  name: 'App',
  components: {
    ChatApp
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
