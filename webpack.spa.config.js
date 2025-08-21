const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    admin: path.resolve(__dirname, "src/admin/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist/admin"),
    filename: "[name].bundle.js",
    publicPath: "/",
    clean: true,
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.pug$/,
        loader: "pug-plain-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({ extensions: ["js", "vue"], emitWarning: true }),
    new HtmlWebpackPlugin({
      title: "Admin Vue App",
      template: path.resolve(__dirname, "src/admin/index.html"),
      filename: "index.html",
    }),
    isProd &&
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/admin"),
    },
    port: 8080,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
  performance: {
    hints: false,
  },
};
