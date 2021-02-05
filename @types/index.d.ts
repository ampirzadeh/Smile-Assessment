export type genders = 'male' | 'female'
export type ageRanges = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+'
export type reasons =
  | 'For improved self confidence'
  | 'I would like to eat with more ease'
  | 'For my career reasons'
  | 'For a special event'
  | 'Other'
export type sufferings =
  | 'Sensitive teeth'
  | 'Bad breath'
  | 'Mouth ulcers'
  | 'Yellow tongue'
  | 'Painful teeth'
  | 'Stained teeth'
  | 'Crooked teeth'
  | 'Gaps or spaces'
  | 'Bleeding gums'
  | 'Wobbly teeth'
export type treatments =
  | 'Whiter teeth'
  | 'Repair chipped teeth'
  | 'Close spaces and gaps'
  | 'Replace old dental treatment'
  | 'Tooth coloured fillings'
  | 'Straighter teeth'
  | 'Replace missing teeth'
  | 'Stabilise my denture'
  | 'Replace wobbly & loose teeth'
  | 'Help with my eating'
  | 'Remove stains'
  | 'Treat bleeding gums'
  | 'Another reason'
export type StepOne = {
  [key: string]: any
  gender: genders
  age: ageRanges
  smileRate: number
}
export type StepTwo = {
  [key: string]: any
  sufferings: sufferings[]
  concerns?: string
}
export type StepThree = {
  [key: string]: any
  reasons: reasons[]
  teethDislike: string
}
export type StepFour = {
  [key: string]: any
  treatments: treatments
}
export type StepFive = {
  [key: string]: any
  images: string[]
}
export type StepSix = {
  [key: string]: any
  firstName: string
  lastName: string
  email: string
  phone: string
}
