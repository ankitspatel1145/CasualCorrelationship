const path = require("path");
const webpack = require("webpack");

const config = {
  entry: path.join(__dirname, "./src/scripts.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  plugins: [new webpack.ProgressPlugin()],
  devtool: "source-map"
};

module.exports = config;
