const files = {}

require.context('./content', true, /\.json$/).keys().forEach(url => {
  const file = require('./content/' + url.substring(2))
  createNestedObject(files, url.substring(2).replace('.json', '').split('/'), file)
})

function createNestedObject(base, names, value) {
  let lastName = arguments.length === 3 ? names.pop() : false
  for (let i = 0; i < names.length; i++) {
    base = base[names[i]] = base[names[i]] || {}
  }
  if (lastName) base = base[lastName] = value
  return base
}

export default files