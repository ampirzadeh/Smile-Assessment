require('dotenv')
import express from 'express'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
import multer from 'multer'
import connectToDb from './db/connect'
import Record, { Record as RecordInterface } from './db/Record'

const app = express()

app.use(express.json())

connectToDb()

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'smileassessmentbucket',
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

const getS3Object = (Key: string) =>
  new Promise((resolve, reject) =>
    s3.getObject(
      {
        Key,
        Bucket: 'smileassessmentbucket'
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

app.post('/images', async (req, res) => {
  const objects: string[] = req.body.objects

  return Promise.all(
    objects.length === 1
      ? [getS3Object(objects[0])]
      : objects.length === 2
      ? [getS3Object(objects[0]), getS3Object(objects[1])]
      : objects.length === 3
      ? [
          getS3Object(objects[0]),
          getS3Object(objects[1]),
          getS3Object(objects[2])
        ]
      : objects.length === 4
      ? [
          getS3Object(objects[0]),
          getS3Object(objects[1]),
          getS3Object(objects[2]),
          getS3Object(objects[3])
        ]
      : []
  )
    .then(images => {
      res.json({ images })
    })
    .catch(res => {
      console.log(`Error Getting Templates: ${res}`)
    })
})

// Import API Routes
app.post('/saveRecord', upload.array('images', 4), async (req, res) => {
  try {
    const {
      email,
      gender,
      age,
      firstName,
      lastName,
      phone,
      smileRate,
      sufferings,
      reasons,
      teethDislike,
      concerns,
      treatments
    }: RecordInterface = req.body

    const imageNames: Array<string> = []
    const fileArray = req.files

    for (let i = 0; i < fileArray.length; i++) {
      imageNames.push((fileArray as any)[i].key)
    }

    const record = await Record.create({
      images: imageNames,
      email,
      gender,
      age,
      firstName,
      lastName,
      phone,
      concerns,
      smileRate,
      sufferings: sufferings.split(','),
      reasons: reasons.split(','),
      treatments: treatments.split(','),
      teethDislike
    })
    res.json({
      success: true,
      record,
      message: 'Your info was saved successfully!'
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, error })
  }
})

app.get('/records', async (req, res) => {
  try {
    const search = new RegExp(`^.*${req.query.search}.*$`, 'g')

    const records = await Record.find(
      req.query.search
        ? {
            hasBeenAnsweredTo: false,
            $or: [
              { firstName: search },
              { lastName: search },
              { email: search },
              { phone: search }
            ]
          }
        : { hasBeenAnsweredTo: false }
    )
      .skip(
        (parseInt(req.query.page as string) - 1) *
          parseInt(req.query.per_page as string)
      )
      .limit(parseInt(req.query.per_page as string) || 10).sort('-createdAt')

    const recordsCount = await Record.countDocuments({
      hasBeenAnsweredTo: false
    })

    res.json({
      records,
      success: true,
      recordsCount
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, error })
  }
})

// Export express app
export default app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
