module.exports = {
  entry: "./src/main.jsx",
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
    }],
  },
  devServer: {
    contentBase: "./www",
    inline: true,
  },
};
