import { Handler } from 'express'
import { getS3Object } from '../aws'
import Record, { Record as RecordInterface } from '../db/Record'

export const newRecord: Handler = async (req, res) => {
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

    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneNumberRegEx = /^\d+$/
    if (
      (!!email && !emailRegEx.test(email.toLocaleLowerCase())) ||
      (!!phone && !phoneNumberRegEx.test(phone.toString()))
    )
      res.sendStatus(400)

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
      sufferings: ((sufferings as unknown) as string).split(','),
      reasons: ((reasons as unknown) as string).split(','),
      treatments: ((treatments as unknown) as string).split(','),
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
}

const AllRecords: Handler = async (req, res) => {
  try {
    const dbQuery: { [key: string]: any } | any = {}
    if (req.query.search)
      dbQuery['$text'] = {
        $search: req.query.search.toString(),
        $caseSensitive: false
      }

    dbQuery.hasBeenAnsweredTo = req.query.show_answered === 'true'

    const records = await Record.find(dbQuery)
      .skip(
        (parseInt(req.query.page as string) - 1) *
          parseInt(req.query.per_page as string)
      )
      .limit(parseInt(req.query.per_page as string) || 10)
      .sort('-createdAt')

    const recordsCount = await Record.countDocuments(dbQuery)

    res.json({
      records,
      success: true,
      recordsCount
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, error })
  }
}

const OneRecord: Handler = async (req, res, next) => {
  try {
    const record = await Record.findById(req.query.id)

    res.json({
      record
    })
  } catch (error) {
    console.log(error)
  }
}

export const OneImage: Handler = async (req, res, next) => {
  try {
    getS3Object(req.params.key).then(d => {
      res.json({ d })
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

const recordController: Handler = async (req, res, next) => {
  if (req.query.id) {
    OneRecord(req, res, next)
  } else {
    AllRecords(req, res, next)
  }
}
export default recordController
