import { Handler } from 'express'
import Record from '../db/Record'

export const answer: Handler = async (req, res) => {
  try {
    const record = await Record.findById(req.body.id)
    if (record) {
      record.hasBeenAnsweredTo = !record?.hasBeenAnsweredTo
      record.save()
    }
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }
}
