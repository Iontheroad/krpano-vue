<template>
  <div id="app">
    <KrpanoView />
  </div>
</template>

<script>
import KrpanoView from "./components/KrpanoView.vue";
export default {
  name: "App",
  components: { KrpanoView },

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
