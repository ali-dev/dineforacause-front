const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const S3Uploader = require('webpack-s3-uploader');

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
    inject: true
});

const s3Plugin = new S3Uploader({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    // sessionToken: 'asdsaad' // the optional AWS session token to sign requests with
  },
  s3UploadOptions: {
    Bucket: 'cause-cuisine-site-assets',
    CacheControl: 'max-age=315360000, no-transform, public',
  },
})
const criticalPlugin = new HtmlCriticalWebpackPlugin({
  base: path.resolve(__dirname, 'dist'),
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  minify: true,
  extract: true,
  width: 375,
  height: 565,
  penthouse: {
    blockJSRequests: false,
  }
})


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

  if (isProduction) {
    return {
    
      entry: {
          app: './src/index.js'
       },
      devServer: {
          // contentBase: isProduction ? './dist': './src',
          contentBase: path.resolve(__dirname, 'dist')
      },
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: "[name].js",
          publicPath: isProduction ? 'https://assets-staging.causeandcuisine.com/' : path.resolve(__dirname, '/'),
        },
      plugins: [
            isProduction ? envVars : new Dotenv(), 
            new MiniCssExtractPlugin({
              filename: "assets/css/[name].[contenthash:8].css",
              chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
            }),
            htmlPlugin,
            s3Plugin
            // criticalPlugin
        ].filter(Boolean),
      optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        }
      },
      devServer: {
          historyApiFallback: true
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|json)$/,
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
          // {
          //   test: /\.svg$/,
          //   use: ["@svgr/webpack"],
          // },
          {
            test: /\.(png|jpg|jpf|gif|svg)$/,
            loader: 'url-loader', //require.resolve("file-loader")
            options: {
              outputPath: 'assets/images/',
              // publicPath: 'assets/images/',
              limit: 8192, //50000,
              name: "[name].[ext]",
            },
          },
          { 
            test: /\.(woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader', //?limit=100000
            options: {
              limit: 8192//50000
            }, 
          } 
        ],
      }
    };
  } else {
    /// Development 

    return {
      entry: {
          app: './src/index.js'
       },
      devServer: {
          // contentBase: isProduction ? './dist': './src',
          contentBase: path.resolve(__dirname, 'dist')
      },
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: "[name].js",
          publicPath: isProduction ? 'https://assets-staging.causeandcuisine.com/' : path.resolve(__dirname, '/'),
        },
      plugins: [
            isProduction ? envVars : new Dotenv(), 
            new MiniCssExtractPlugin({
              filename: "assets/css/[name].[contenthash:8].css",
              chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
            }),
            htmlPlugin,
            // criticalPlugin
        ].filter(Boolean),
      optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        }
      },
      devServer: {
          historyApiFallback: true
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|json)$/,
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
            test: /\.(png|jpg|jpf|gif|svg)$/,
            loader: 'url-loader', //require.resolve("file-loader")
            options: {
              outputPath: 'assets/images/',
              // publicPath: 'assets/images/',
              limit: 50000,
              name: "[name].[ext]",
            },
          },
          { 
            test: /\.(woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader', //?limit=100000
            options: {
              limit: 50000
            }, 
          } 
        ],
      }
    };



  }
  
};
