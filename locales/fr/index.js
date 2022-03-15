import home from './content/home.json'
let files = []

require.context('./content', true, /\.json$/).keys().forEach(url => {
  const file = require('./content/' + url.substring(2))
  // files[url.substring(2).replace('.json','')] = file
  files.push(file)
  console.log(file);
});

console.log(home);

export default {
  files
}