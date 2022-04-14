const { constants } = require('buffer')
const fs = require('fs')
const forms = require('./forms.json')
const stores = {
  path: 'stores/main/generated/content/',
  types: ['constant', 'radio', 'picker', 'range', 'job'],
}

const content = {
  constant: [],
  radio: [],
  picker: [],
  range: [],
  job: [],
}

for (const form in forms) {
  if (Object.hasOwnProperty.call(forms, form)) {
    const _form = forms[form]
    if (form === 'job') {
      const element = _form['inputs']
      for (const input in element) {
        content.job.push({
          name: input
        })
      }
    } else {
      for (const _content in _form) {
        if (Object.hasOwnProperty.call(_form, _content)) {
          const element = _form[_content]

          for (const input in element) {
            if (Object.hasOwnProperty.call(element, input)) {
              if (element[input].name && element[input].value) {
                content.constant.push({
                  name: element[input].name.toUpperCase(),
                  value: element[input].name,
                })
                content[element[input].type].push({
                  id: element[input].name,
                  value: element[input].value,
                })
              }
            }
          }
        }
      }
    }
  }
}

stores.types.forEach((type) => {
  switch (type) {
    case 'constant':
      content[type] = `export default {\n${content[type]
        .map(function (elem) {
          return `  ${elem.name}: '${elem.value}'`
        })
        .join(',\n')}\n}`
      break
    case 'range':
    case 'radio':
      content[type] = `export default [\n${content[type]
        .map(function (elem) {
          return `  { id: '${elem.id}', value: ${elem.value} }`
        })
        .join(',\n')}\n]`
      break
    case 'picker':
      content[type] = `export default [\n${content[type]
        .map(function (elem) {
          return `  { id: '${elem.id}', value: '${elem.value}' }`
        })
        .join(',\n')}\n]`
      break
    case 'job':
      content[type] = `export default [\n${content[type]
        .map(function (elem) {
          return `  { id: '${elem.name}' }`
        })
        .join(',\n')}\n]`
      break
    default:
      break
  }
})

stores.types.forEach((type) => {
  fs.writeFile(`${stores.path}${type}s.js`, content[type], (err) => {
    if (err) console.log(err)
    else {
      console.log(`${stores.path}${type}s.js written successfully`)
    }
  })
})