import common from "./webpack.config.js";
import webpack from "webpack";
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

export default {
    ...common,
    ...{
        mode: 'development'
    }
}