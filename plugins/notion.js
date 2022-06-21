import { Client } from '@notionhq/client'

export default ({ app }, inject) => {
  const client = new Client({ auth: process.env.TOKEN })
  inject('notion', client)
}
