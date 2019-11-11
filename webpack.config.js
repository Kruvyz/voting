const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const is_prop = process.env.NODE_ENV || 'production';

module.exports = {
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/main.js',
    publicPath: '/'
  },
  mode: is_prod ? 'production' : 'development',
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        use: [
          require.resolve('babel-loader'),
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
  ]
}
