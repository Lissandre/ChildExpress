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
      for (const input in _form) {
        if (Object.hasOwnProperty.call(_form, input)) {
          const element = _form[input]
          if (element.locales && element.type && element.name) {
            content[
              slugify(`${element.type}_${element.name}`, {
                replacement: '_',
                lower: true,
              })
            ] = element.locales[type]
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
  }
}
