import express from 'express'
import { addBabyRequest } from './lib/notion'

const app = express()
app.use(express.json())

app.post('/request-project', async (req, res) => {
  const body = req.body

  await addBabyRequest(body)
    .then((response) => {
      res.status(200).json({ response }).end()
    })
    .catch((error) => {
      throw new Error(error)
    })
})

module.exports = app
