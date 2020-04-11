const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path')
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
    inject: true
});


// module.exports = {
module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    
    // entry: {
    //     app: './src/index.js',
    //  },
    devServer: {
        contentBase: './src',
    },
    // output: {
        // path: path.resolve('dist'),
        // filename: 'bundled.js',
        // publicPath: 'static/media'
    //   },
    plugins: [
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
          }),
          htmlPlugin,
          new Dotenv()
      ].filter(Boolean),
      
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: 'static/assets/',
              publicPath: 'static/assets/',
              name: "[name].[ext]",
            },
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]",
          },
        },
      ],
    }
  };
};
