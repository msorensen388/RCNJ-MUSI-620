const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');
const GoogleFontsPlugin = require('@floscom/google-fonts-webpack-plugin');

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    }),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Anton' }
      ],
      local: false,
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
      path.resolve('../../node_modules')
    ]
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    open: true,
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;
