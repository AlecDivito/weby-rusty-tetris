const common = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = {
    ...common,
    ...{
        devtool: 'inline-source-map',
        mode: 'development'
    }
}