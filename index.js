
var graph = require('sourcegraph')
var when = require('result').when
var fs = require('fs')

var file = require.resolve('./template')
var template = fs.readFileSync(file, 'utf8').split('[]')

/**
 * sourcegraph options
 * @type {Object}
 */

var options = {
  env: 'node',
  transpile: [
    '*.json', function(src){
      return 'module.exports = ' + src
    }
  ]
}

/**
 * inline `entry`
 *
 * @param {String} entry
 * @return {String}
 */

function inline(entry){
  return when(graph(entry, options), build)
}

/**
 * convert an array of files to executable source
 *
 * @param {Array} files
 * @return {String}
 */

function build(files){
  // sort for consistent output
  var entry = files.shift()
  files.sort(function(a, b){
    if (b.id < a.id) return 1
    if (b.id > a.id) return -1
    return 0
  })
  files.unshift(entry)

  var arr = JSON.stringify(files, function(key,val){
    if (key != 'aliases') return val
  })
  return template[0] + arr + template[1]
}

module.exports = inline
