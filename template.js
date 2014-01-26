#!/usr/bin/env node

var Module = require('module')
var path = require('path')

var files = []

var modules = files.map(function(file){
  var mod = new Module(file.id, module)
  mod.paths = Module._nodeModulePaths(path.dirname(file.id))
  mod.filename = file.id
  mod.deps = file.deps
  mod.source = file.source
  mod.require = function(request){
    var id = this.deps[request]
    var mod = cache[id]
    if (mod) return load(mod)
    return Module._load(request, this)
  }
  return mod
})

var cache = modules.reduce(function(cache, mod){
  cache[mod.filename] = mod
  return cache
}, {})

// remove byte order maker
function stripBOM(str) {
  if (str.charCodeAt(0) === 0xFEFF) return str.slice(1)
  return str
}

function load(mod){
  if (!mod.loaded) {
    mod.loaded = true
    mod._compile(stripBOM(mod.source), mod.filename)
  }
  return mod.exports
}

// load entry
module.exports = load(modules[0])