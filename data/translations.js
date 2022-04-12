const fs = require('fs')
const slugify = require('slugify')
const forms = require('./forms.json')
const locales = {
  path: 'locales/',
  types: ['en', 'fr'],
  folder: '/content/',
}

for (const form in forms) {
  if (Object.hasOwnProperty.call(forms, form)) {
    const _form = forms[form]
    locales.types.forEach((type) => {
      const name =
        locales.path +
        type +
        locales.folder +
        slugify(form, { replacement: '_', lower: true }) +
        '.json'

      const content = {}
      content.title = _form.title
      for (const _content in _form) {
        if (Object.hasOwnProperty.call(_form, _content)) {
          const element = _form[_content]

          for (const input in element) {
            if (Object.hasOwnProperty.call(element, input)) {
              if (
                element[input].locales &&
                element[input].type &&
                element[input].name
              ) {
                content[
                  slugify(`${element[input].type}_${element[input].name}`, {
                    replacement: '_',
                    lower: true,
                  })
                ] = element[input].locales[type]
              } else if (element[input].locales) {
                content[`${input}`] = element[input].locales[type]
              }
            }
          }
        }
      }

      fs.writeFile(name, JSON.stringify(content, null, 2), (err) => {
        if (err) console.log(err)
        else {
          console.log(`${name} written successfully`)
        }
      })
    })
  } else {

  }
}
