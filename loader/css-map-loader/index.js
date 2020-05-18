const path = require('path')
const validateOptions = require('schema-utils')
const _ = require('lodash')
const { getOptions } = require('loader-utils')

const schema = {
  type: 'object',
  properties: {},
}

/**
 * 优化sourcemap
 */
module.exports = function(source, sourceMap) {
  console.log(source)

  const options = getOptions(this)
  const cb = this.async()

  validateOptions(schema, options || {}, {
    name: 'css-map Loader',
  })

  if (sourceMap) {
    if (sourceMap.file) {
      _.remove(sourceMap.sources, (src) => {
        return src === sourceMap.file
      })
      sourceMap.sources = sourceMap.sources.map((src) => {
        return src.replace(path.join(sourceMap.file, '../'), '').replace(/\\/g, '/')
      })
      delete sourceMap.file
    } else {
      sourceMap.sources = sourceMap.sources.map((src) => {
        return path.join(sourceMap.sourceRoot, src).replace(/\\/g, '/')
      })
    }
    sourceMap.sourceRoot = 'file:///'
  }

  cb(null, `${source}`, sourceMap)

  return null
}
