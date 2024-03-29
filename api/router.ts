import { Router } from 'express'
import { upload } from './aws'
import locked from './locked'
import recordController, { newRecord, OneImage } from './controllers/record.controller'
import { answer } from './controllers/answered.controller'

const router = Router()

router.post('/saveRecord', upload.array('images', 4), newRecord)
router.use('/login', locked, (req, res) => res.sendStatus(200))
router.get('/records', locked, recordController)
router.get('/image/:key', OneImage)
router.post('/toggleAnswered', locked, answer)

export default router
