module.exports = {
  plugins: [
    require('cssnano')({
      discardComments: true,
      minifyGradients: true,
      reduceInitial: true,
      svgo: true,
      reduceDisplayValues: true,
      reduceTransforms: true,
      autoprefixer: true,
      zindex: true,
      convertValues: true,
      reduceTimingFunctions: true,
      calc: true,
      colormin: true,
      orderedValues: true,
      minifySelectors: true,
      minifyParams: true,
      normalizeCharset: true,
      discardOverridden: true,
      normalizeString: true,
      normalizeUnicode: true,
      minifyFontValues: true,
      discardUnused: true,
      normalizeUrl: true,
      functionOptimiser: true,
      filterOptimiser: true,
      reduceBackgroundRepeat: true,
      reducePositions: true,
      core: true,
      mergeIdents: true, //unsafe
      reduceIdents: true, //unsafe
      mergeLonghand: true,
      discardDuplicates: false,
      mergeRules: true,
      discardEmpty: true,
      uniqueSelectors: false,
      styleCache: true
    }),
    //require('postcss-discard-duplicates')({discardDuplicates: false})
  ]
}