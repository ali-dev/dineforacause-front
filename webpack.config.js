const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
    inject: true
});


const envVars = new webpack.EnvironmentPlugin({
    REACT_APP_APPSYNC_URL: process.env.REACT_APP_APPSYNC_URL, // use 'development' unless process.env.NODE_ENV is defined
    REACT_APP_APPSYNC_API_KEY: process.env.REACT_APP_APPSYNC_API_KEY,
    REACT_APP_IS_RELEASED: process.env.REACT_APP_IS_RELEASED,
  });


  // @todo maybe needed for public url?
// const definePlugin = new webpack.DefinePlugin({
//     'process.env.PUBLIC_URL': process.env.PUBLIC_URL,
//   });


// module.exports = {
module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    
    entry: {
        app: './src/index.js',
     },
    devServer: {
        // contentBase: isProduction ? './dist': './src',
        contentBase: path.resolve(__dirname, 'dist')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundled.js',
      },
    plugins: [
          isProduction ? envVars : new Dotenv(), 
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
          }),
          htmlPlugin,
      ].filter(Boolean),
    devServer: {
        historyApiFallback: true
    },  
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"            
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, //isProduction ? MiniCssExtractPlugin.loader : "style-loader" 
            "css-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: require.resolve("file-loader"),
          options: {
            outputPath: 'assets/images/',
            // publicPath: 'assets/images/',
            name: "[name].[ext]",
          },
        },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' } 
      ],
    }
  };
};
