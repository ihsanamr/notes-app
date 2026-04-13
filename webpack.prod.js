const { merge } = require("webpack-merge");
const path = require("path");
const common = require(path.join(__dirname, "webpack.common.js"));

module.exports = merge(common, {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
});
