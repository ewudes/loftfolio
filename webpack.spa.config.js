const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    admin: path.resolve(__dirname, "src/admin/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist/admin"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "vue"], // какие файлы проверять
      emitWarning: true,
    }),
  ],
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
        options: {
          loaders: {
            scss: ["vue-style-loader", "css-loader", "postcss-loader"],
          },
        },
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
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js", // для Vue 3
    },
    extensions: [".js", ".vue", ".json"], // убираем "*"
  },
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  performance: {
    hints: false,
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Admin Vue App",
      filename: "index.html",
      template: path.resolve(__dirname, "src/admin/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
};

if (process.env.NODE_ENV) {
  module.exports.entry = Object.assign(module.exports.entry, {
    admin: path.resolve(__dirname, "src/admin/main.js"),
  });
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
