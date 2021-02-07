require('dotenv')
import express from 'express'
import connectToDb from './db/connect'
import helmet from 'helmet'
import cors from 'cors'
import router from './router'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

connectToDb()

app.use('/', router)

// Export express app
export default app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
