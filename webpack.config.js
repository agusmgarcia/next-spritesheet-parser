const { loadEnvConfig } = require("@next/env");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const getCustomTransformers = require("ts-transform-paths").default;
const webpack = require("webpack");

/** @type (mode:"development"|"production"|undefined) => import("webpack").Configuration */
module.exports = (mode) => ({
  devServer: {
    port: 3000,
  },
  entry: path.resolve(__dirname, "pages", "_app.tsx"),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                jsx: "react-jsx",
              },
              getCustomTransformers,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "out"),
  },
  plugins: [
    new webpack.EnvironmentPlugin(getEnvFiles(mode)),
    new HtmlWebpackPlugin({
      inject: "body",
      meta: { viewport: "width=device-width, initial-scale=1" },
      title: "Spritesheet Parser",
    }),
    new CopyPlugin({ patterns: [{ from: "public", to: "out" }] }),
  ],
  resolve: {
    alias: { "#src": path.resolve(__dirname, "src") },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});

function getEnvFiles(environment) {
  return loadEnvConfig(
    process.cwd(),
    environment === "development"
      ? true
      : environment === "test"
        ? undefined
        : false,
  ).combinedEnv;
}
