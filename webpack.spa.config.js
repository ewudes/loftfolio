const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    admin: path.resolve(__dirname, "src/admin/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist/admin"),
    filename: "[name].bundle.js",
    clean: true, // очищает dist при сборке
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
    },
    extensions: [".js", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "vue"],
      emitWarning: true,
    }),
    new HtmlWebpackPlugin({
      title: "Admin Vue App",
      filename: "index.html",
      template: path.resolve(__dirname, "src/admin/index.html"),
    }),
    new VueLoaderPlugin(),
    ...(isProd
      ? [
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
          }),
          new webpack.LoaderOptionsPlugin({
            minimize: true,
          }),
        ]
      : []),
  ],
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  performance: {
    hints: false,
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
};
