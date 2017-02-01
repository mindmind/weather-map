var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
       context: __dirname,
       entry: {
        app: ['./js/main.js'],
       },
       output: {
          path: "./public/js/",
          filename: "bundle.js"
       },
       devtool: 'source-map',
       module: {
        loaders: [
           {
            loader: "babel-loader",
            exclude: /node_modules/,
            test: /\.js?$/,
            query: {
              plugins: ['transform-runtime'],
              presets: ['es2015', 'stage-0', 'react'],
            }
           },
           { 
              test: /\.scss$/, 
              loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!sass-loader",
              }),
          }
        ]
       },
       plugins: [
        new ExtractTextPlugin("../css/bundle.css"),
       ],
};
