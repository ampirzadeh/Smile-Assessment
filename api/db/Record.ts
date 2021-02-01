import mongoose, { Document, Schema } from 'mongoose'
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix
} from '~/@types'

export interface Record extends StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix {
  hasBeenAnsweredTo: boolean
}
// {
//   gender: genders
//   age: ageRanges
//   sufferings: sufferings
//   concerns?: string
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   image: string
//   interestedTreatments: interestedTreatments[]
//   reason: reason
//   teethDislike: string
//   smileRate: number
// }
export interface IRecord extends Document, Record {}

const RecordSchema = new Schema(
  {
    gender: {
      type: String,
      required: false
    },
    age: {
      type: String,
      required: false
    },
    sufferings: {
      type: Array,
      required: false
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: false
    },
    smileRate: {
      type: Number,
      required: false,
      min: 1,
      max: 10
    },
    reasons: {
      type: Array,
      required: false
    },
    teethDislike: {
      type: String,
      required: false
    },
    treatments: {
      type: Array,
      required: false
    },
    concerns: {
      type: String,
      required: false
    },
    hasBeenAnsweredTo: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

const Record = mongoose.model<IRecord>('Record', RecordSchema)

export default Record
