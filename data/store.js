const fs = require('fs')
const forms = require('./forms.json')
const stores = {
  path: 'stores/main/generated/content/',
  types: ['constants', 'ranges'],
}

const content = {
  constants: [],
  ranges: [],
}

for (const form in forms) {
  if (Object.hasOwnProperty.call(forms, form)) {
    const _form = forms[form]

    for (const input in _form) {
      if (Object.hasOwnProperty.call(_form, input)) {
        const element = _form[input]
        if (element.name && element.value) {
          content.constants.push({
            name: element.name.toUpperCase(),
            value: element.name,
          })
          content.ranges.push({ id: element.name, value: element.value })
        }
      }
    }
  }
}

content.constants = `export default {\n${content.constants
  .map(function (elem) {
    return `  ${elem.name}: '${elem.value}'`
  })
  .join(',\n')}\n}`
content.ranges = `export default [\n${content.ranges
  .map(function (elem) {
    return `  { id: '${elem.id}', value: ${elem.value} }`
  })
  .join(',\n')}\n]`
stores.types.forEach((type) => {
  fs.writeFile(`${stores.path}${type}.js`, content[type], (err) => {
    if (err) console.log(err)
    else {
      console.log(`${stores.path}${type}.js written successfully`)
    }
  })
})
