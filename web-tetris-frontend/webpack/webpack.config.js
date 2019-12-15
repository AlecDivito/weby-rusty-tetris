const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // interprets @import and @url()
          'css-loader',
          // Complies Sass to CSS
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(['src/index.html']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.wasm']
  }
};
