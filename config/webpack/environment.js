const { environment } = require('@rails/webpacker')
const { resolve } = require('path')
const less = require('./loaders/less')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

environment.loaders.prepend('less', less)
environment.plugins.delete('MiniCssExtract')
environment.plugins.delete('Compression')
environment.plugins.delete('Compression Brotli')
environment.plugins.append(
  'MiniCssExtract',
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[name].chunk.css'
  })
)

const env = environment.toWebpackConfig()
env.resolve.modules = env.resolve.modules.concat(resolve('node_modules'))
const x = {
  semantic: './assets/semantic.less'
}
env.entry = Object.assign(env.entry, x)
env.output = Object.assign(env.output, {
  filename: '[name].js'
})
debugger
module.exports = env
