const { environment } = require('@rails/webpacker')
const { resolve } = require('path')

const env = environment.toWebpackConfig()
env.resolve.modules = env.resolve.modules.concat(resolve('node_modules'))

env.output = Object.assign(env.output, {
  filename: '[name].js'
})
debugger
module.exports = env
