import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

export default {
  entry: "./js/bootstrap.ts",

  output: {
    path: resolve(process.cwd(), "dist"),
    filename: "bundle.js",
    clean: true,
  },

  experiments: {
    asyncWebAssembly: true,
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader",
          {
            loader:
              "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: ["import"]
              }
            }
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    // new WasmPackPlugin({
    //  crateDirectory: resolve(process.cwd(), "crate"),
    //  target: 'bundler'
    // }),

    new MiniCssExtractPlugin(),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  devServer: {
    port: 9966,
    static: { directory: resolve(process.cwd(), "dist") },
    hot: true,
  },
};