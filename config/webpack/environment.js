const { environment } = require('@rails/webpacker')
const { resolve } = require('path')
const less = require('./loaders/less')

environment.loaders.prepend('less', less)

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
