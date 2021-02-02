import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'

export const s3 = new AWS.S3()
export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET as string,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) =>
      cb(
        null,
        `${Date.now()}.${file.mimetype
          .replace('image/', '')
          .replace('ata:', '')}`
      )
  })
})
export const getS3Object = (Key: string) =>
  new Promise((resolve, reject) =>
    s3.getObject(
      {
        Key,
        Bucket: process.env.BUCKET as string
      },
      (err, data) => {
        if (err) reject(err)
        else {
          const type = Key.split('.')[Key.split('.').length - 1]
          resolve(`data:image/${type};base64,${data.Body?.toString('base64')}`)
        }
      }
    )
  )
