import express from 'express'
import bcrypt from 'bcryptjs'
import { Pool } from 'pg'
import 'dotenv/config'

const app = express()
app.use(express.json())

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432
})

app.get('/', (req, res) => {
  res.send("Hello User")
})

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const query = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `

    const values = [name, email, passwordHash]
    const result = await pool.query(query, values)

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error(error.message)

    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' })
    }

    res.status(500).json({ error: 'Server error' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})