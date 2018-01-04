var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
        //loader: 'babel'
      },
    /*  { test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }*/
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=300000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' + 'includePaths[]=' +
                  (path.resolve(__dirname, './node_modules'))
      },
    ]
  }
};
