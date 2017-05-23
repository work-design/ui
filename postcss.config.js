module.exports = {
  plugins: [
    require('cssnano')({core: true, reduceDisplayValues: true, discardDuplicates: true}),
    //require('postcss-discard-duplicates')({discardDuplicates: false})
  ]
}