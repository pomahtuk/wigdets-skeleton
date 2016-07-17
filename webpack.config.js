const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.BUILD;

config = {
  devtool: 'eval-source-map',
  entry: {
    app: './src/js/map.js',
    // search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: './dist',
  },
  module: {
    loaders: [
      { test: /\.png$/, loader: 'url?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
      { test: /\.gif$/, loader: 'file' },
      // Extract css files
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=' +
          '[name]--[local]---[hash:base64:5]!postcss-loader?sourceMap',
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName='
          + '[name]--[local]---[hash:base64:5]!sass?sourceMap!postcss-loader?sourceMap',
      },
    ],
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

if (isProduction) {
  delete config.devtool;
}

module.exports = config;
