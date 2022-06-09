import { LoaderOptionsPlugin, Configuration } from "webpack";
import sass from "sass";
import { merge } from "webpack-merge";
import common from "./webpack.common.config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import Dotenv from "dotenv-webpack";

const config: Configuration = {
  mode: "production",
  devtool: 'source-map',
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../bundle"),
    filename: "js/[name].bundle.[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: sass }
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
      chunkFilename: "css/[id].[chunkhash].css",
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env.staging'),
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
    })
  ],
};

export default merge(common, config);
