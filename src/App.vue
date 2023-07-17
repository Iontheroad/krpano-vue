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
  box-sizing: border-box;
  padding: 20px;
  // height: calc(100% - 40px);
  height: 100%;
}
</style>
