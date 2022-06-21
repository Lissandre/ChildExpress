const glob = require('glob')
const path = require('path')
const dir_root = path.join(__dirname, './')
const patt = path.join(dir_root, '*.json')
const files = {}

glob.sync(patt).forEach(function (file) {
  const fileContent = require(file)
  createNestedObject(
    files,
    file
      .replace('.json', '')
      .replace(dir_root.replace(/\\/g, '/'), '')
      .split('/'),
    fileContent
  )
})

function createNestedObject(base, names, value) {
  let lastName = arguments.length === 3 ? names.pop() : false
  for (let i = 0; i < names.length; i++) {
    base = base[names[i]] = base[names[i]] || {}
  }
  if (lastName) base = base[lastName] = value
  return base
}

module.exports.files = files
