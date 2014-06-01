#!/usr/bin/env node

var Module = require('module')
var path = require('path')
var cache = Module._cache

var files = []

var modules = files.map(function(file){
  var mod = new Module(file.id, module)
  mod.paths = Module._nodeModulePaths(path.dirname(file.id))
  mod.filename = file.id
  mod.deps = file.deps
  mod.source = file.source
  mod.require = req
  cache[mod.filename] = mod
  return mod
})

function req(request){
  var id = this.deps[request]
  var mod = cache[id]
  if (mod) return load(mod)
  return Module._load(request, this)
}

function load(mod){
  if (!mod.loaded) {
    mod.loaded = true
    mod._compile(mod.source, mod.filename)
  }
  return mod.exports
}

// load entry
module.exports = load(modules[0])
