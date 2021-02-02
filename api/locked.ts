import { Handler } from 'express'
import expressBasicAuth from 'express-basic-auth'

const locked: Handler = (req, res, next) => {
  process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD
    ? expressBasicAuth({
        users: {
          [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD
        }
      })(req, res, next)
    : res.sendStatus(403)
}

export default locked
