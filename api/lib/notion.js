import { Client } from '@notionhq/client'
import properties from './dbModData'
const client = new Client({
  auth: 'secret_ytJwjM4cSGKzFFG6hZNMjMWMYqVYOfGW82xLJAZVzdE',
})

const addBabyRequest = async (body) => {
  // const databaseId = 'ac8c6a801c3d4f5a80136c862373545d'
  // Object.keys(properties.properties).forEach((key) => {
  //   if (properties.properties[key].hasOwnProperty('rich_text')) {
  //     properties.properties[key].rich_text[0].plain_text = body[key] || ' '
  //     properties.properties[key].rich_text[0].text.content = body[key] || ' '
  //   } else {
  //     properties.properties[key].title[0].plain_text = body[key] || ' '
  //     properties.properties[key].title[0].text.content = body[key] || ' '
  //   }
  // })

  const data = {
    parent: { database_id: 'ac8c6a801c3d4f5a80136c862373545d' },
    properties: body.properties,
  }

  return await client.pages.create(data).catch((err) => {
    throw new Error(err.body)
  })
}

export { addBabyRequest }
