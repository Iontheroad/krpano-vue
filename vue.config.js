const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@public": path.resolve(__dirname, "public"),
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
