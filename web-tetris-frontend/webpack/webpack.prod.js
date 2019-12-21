const common = require("./webpack.config.js");
const webpack = require("webpack");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    ...common,
    ...{
        mode: 'development'
    }
}