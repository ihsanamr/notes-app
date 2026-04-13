const { merge } = require("webpack-merge");
const path = require("path");
const common = require(path.join(__dirname, "webpack.common.js"));

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    port: 8080,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
