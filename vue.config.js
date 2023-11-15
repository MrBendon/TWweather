const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  // css: {
  //   loaderOptions: {
  // pass options to sass-loader
  // @/ is an alias to src/
  // so this assumes you have a file named `src/variables.sass`
  // Note: this option is named as "prependData" in sass-loader v8
  // sass: {
  //   additionalData: ``,
  // },
  // @import "./src/components/css/uilts/_variables.scss"
  // by default the `sass` option will apply to both syntaxes
  // because `scss` syntax is also processed by sass-loader underlyingly
  // but when configuring the `prependData` option
  // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
  // in that case, we can target the `scss` syntax separately using the `scss` option
  // scss: {
  //   additionalData: `./src/assets/css/utils/_variables.scss";
  //   @import "./src/assets/css/utils/_mixins.scss"`,
  // },
  // @import "./src/components/css/uilts/_variables.scss";
  // pass Less.js Options to less-loader
  //   },
  // },
});
