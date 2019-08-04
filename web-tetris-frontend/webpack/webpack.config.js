const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    bootstrap: path.join(__dirname, "../src/bootstrap.ts"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bootstrap.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(['src/index.html'])
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.wasm']
  }
};
