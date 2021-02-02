import { Handler } from "express";
import Record from "../db/Record";

export const answer: Handler = async (req, res) => {
  try {
    await Record.findOneAndUpdate(req.body.id, { hasBeenAnsweredTo: true })

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }
}