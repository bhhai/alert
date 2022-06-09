import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const config: Configuration = {
  entry: "./src/main.tsx",
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(jpg|jpe?g|png|gif|woff2?|ttf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[contenthash][ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {},
      }),
      new CssMinimizerPlugin({}),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/assets/images/logo-alert.png",
      title: "Alert",
    }),
  ],
};

export default config;
