import express from 'express'
import cors from 'cors'
import routes from './Routes.js'

const app = express()
const port = 3001

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})