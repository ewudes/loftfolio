const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const env = process.env.NODE_ENV;

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    about: "./src/assets/scripts/about.js",
    auth: "./src/assets/scripts/auth.js",
    works: "./src/assets/scripts/works.js",
    blog: "./src/assets/scripts/blog.js",
    vendor: ["vue"],
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    minimize: env === "production",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
  resolve: {
    alias: {
      vue$:
        env === "development" ? "vue/dist/vue.esm.js" : "vue/dist/vue.min.js",
    },
  },
  devtool: env === "development" ? "eval-source-map" : false,
};
