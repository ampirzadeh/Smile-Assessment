# Storing a new record

- `email`: `string`, email of the user
- `gender`: `male` or `female`
- `age`: `number`, age of the user
- `firstName`: `string`, first name of the user
- `lastName`: `string`, last name of the user
- `phone:`: `string`, phone number of the user
- `smileRate`: `number`, the patient's rating of their smile between `1` and `10`
- `sufferings`: `array` of items that the patient is suffering from
  - Sensitive teeth
  - Bad breath
  - Mouth ulcers
  - Yellow tongue
  - Painful teeth
  - Stained teeth
  - Crooked teeth
  - Gaps or spaces
  - Bleeding gums
  - Wobbly teeth
- `reasons`: `array` of reasons why the patient is filling the form
  - For improved self confidence
  - I would like to eat with more ease
  - For my career reasons
  - For a special event
  - Another
- `teethDislike`: `string` about why the patient dislikes their teeth
- `concerns`: `string` about what the patient is concerned about
- `treatments`: `array` of treatments the user is interested in
  - Whiter teeth
  - Repair chipped teeth
  - Close spaces and gaps
  - Replace old dental treatment
  - Tooth coloured fillings
  - Straighter teeth
  - Replace missing teeth
  - Stabilise my denture
  - Replace wobbly & loose teeth
  - Help with my eating
  - Remove stains
  - Treat bleeding gums
  - Another reason

**The provided values are only examples and any value can be used**


Due to images being in the request body, `Content-Type` must be set to `multipart/form-data` and while using `multipart/form-data`
it is not possible to use arrays or numbers.
So, they'll must just be provided as strings (arrays being like: `['a', 'b', 'c']` => `a,b,c` - `Array.join(',')`)
