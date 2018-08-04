module.exports = {
  output: {
      filename: 'kalendar.js',
      library: 'kalendar',
      libraryTarget: 'var'
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
