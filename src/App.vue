<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: { HelloWorld },

  methods: {},
};
</script>

<style lang="scss">
#app {
  position: relative;
  padding: 20px;
}
</style>
