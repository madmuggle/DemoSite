module.exports = {
  entry: "./src/js/main.jsx",
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
    }],
  },
  devServer: {
    contentBase: "./www",
    inline: true,
  },
};
