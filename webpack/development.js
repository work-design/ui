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
      }
    ]
  }
};
