const path = require('path')

module.exports = {
  mode: process.env.mode || 'development',
  entry: {
    mte: './src/index.js',
    test: './test/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                plugins: [
                  ['@babel/plugin-proposal-decorators', {
                    decoratorsBeforeExport: true
                  }],
                  '@babel/plugin-proposal-private-methods',
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            ]
          }
        }
      }
    ]
  }
}
