module.exports = {
  entry: './src/js/script.js',
  output: {
    filename: './build/bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'public/fonts/[name].[ext]',
            emitFile: false
          }
        }]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?-url',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  }
};