const files = {}

require.context('./content', true, /\.json$/).keys().forEach(url => {
  const file = require('./content/' + url.substring(2))
  files[url.substring(2).replace('.json','')] = file
})

export default files