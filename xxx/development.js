module.exports = {
  mode: 'development',
  entry: {
    main_css: './src/semantic.less',
    main_js: './src/ready.js',
    index_js: './src/index.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './examples'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery'
          },
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
