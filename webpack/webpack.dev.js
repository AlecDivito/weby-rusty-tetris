import common from "./webpack.config.js";
import webpack from "webpack";

export default {
    ...common,
    ...{
        devtool: 'inline-source-map',
        mode: 'development'
    }
}