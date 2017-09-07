module.exports = {
  entry: "./src/code/main.jsx",
  output: {
    path: __dirname + "/www/js/",
    filename: "app.js",
  },
  resolve: {
    extensions: [ ".js", ".jsx" ],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader",
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader",
    }],
  },
  devServer: {
    contentBase: "./www",
    inline: true,
  },
};
