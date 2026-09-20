import express from 'express'

const app = express()


app.get('/', (req, res) => {
  res.send("Hello User")
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})