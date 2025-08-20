const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const env = process.env.NODE_ENV;
const isProd = env === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    about: "./src/assets/scripts/about.js",
    auth: "./src/assets/scripts/auth.js",
    works: "./src/assets/scripts/works.js",
    blog: "./src/assets/scripts/blog.js",
    vendor: ["vue"],
  },
  output: {
    path: path.resolve(__dirname, "dist/assets/scripts"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    clean: true,
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
    minimize: isProd,
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
      vue$: isProd
        ? "vue/dist/vue.esm-bundler.js"
        : "vue/dist/vue.esm-bundler.js",
    },
    extensions: [".js", ".vue", ".json"],
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
  ],
};
