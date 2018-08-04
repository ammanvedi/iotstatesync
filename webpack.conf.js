module.exports = {
  output: {
      filename: 'iotstatesync.js',
      library: 'IOTStateSync',
      libraryTarget: 'window'
  },
  devtool: 'eval-source-map',
  watch: false,
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015','stage-2']
              }
          }
      ]
  }
}
