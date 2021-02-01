import { set, connect } from 'mongoose'

const connectToDb = async () => {
  try {
    await connect(
      process.env.DB_URL || 'mongodb://localhost:27017/smile-assessment',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )

    set('debug', process.env.NODE_ENV === 'development')
    console.info('Connected to mongo!')
  } catch (err) {
    console.error(err, 'Could not connect to MongoDB')
  }
}

export default connectToDb
