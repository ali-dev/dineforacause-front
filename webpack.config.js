const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
    inject: true
});

const definePlugin = new webpack.DefinePlugin({
    'process.env.REACT_APP_APPSYNC_URL': process.env.REACT_APP_APPSYNC_URL,
    'process.env.REACT_APP_APPSYNC_API_KEY': process.env.REACT_APP_APPSYNC_API_KEY,
    'process.env.REACT_APP_IS_RELEASED': process.env.REACT_APP_IS_RELEASED,
  });


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
        // path: path.resolve('dist'),
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundled.js',
        // publicPath: 'static/media'
      },
    plugins: [
        //   new Dotenv(),
          definePlugin,
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
          }),
          htmlPlugin,
        //   definePlugin,
          
      ].filter(Boolean),
      
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
          exclude: /node_modules/,
          use: [
            //  "extract-loader", 
            MiniCssExtractPlugin.loader, //isProduction ? MiniCssExtractPlugin.loader : "style-loader" 
            "css-loader",
            // 'postcss-loader'
            // "resolve-url",
          ],
        },
        // {
        //   test: /\.(png|jpeg|jpg|gif)$/i,
        //   use: {
        //     loader: "url-loader",
        //     options: {
        //       limit: 8192,
        //       outputPath: 'assets/images/',
        //       publicPath: 'assets/images/',
        //       name: "[name].[ext]",
        //     },
        //   },
        // },
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
        // {
        //     test: /\.(eot|otf|ttf|woff|woff2)$/,
        //     loader: "file-loader",
        //     options: {
        //       outputPath: 'assets/fonts/',
        //       //   publicPath: './assets/fonts/',
        //       publicPath: '../fonts/',
              
        //       name: "[name].[ext]",
        //     },
        //   },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' } 
      ],
    }
  };
};
