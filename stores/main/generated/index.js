const generatedValues = {}

require
  .context('./content', true, /\.js$/)
  .keys()
  .forEach((url) => {
    const file = require('./content/' + url.substring(2)).default
    generatedValues[url.substring(2).replace('.js', '')] = file
  })

export default generatedValues
