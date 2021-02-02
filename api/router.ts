import { Router } from 'express'
import { upload } from './aws'
import locked from './locked'
import recordController, { newRecord } from './controllers/record.controller'
import { answer } from './controllers/answered.controller'

const router = Router()

router.post('/saveRecord', upload.array('images', 4), newRecord)
router.use('/login', locked, (req, res) => res.sendStatus(200))
router.get('/records', locked, recordController)
router.post('/answered', locked, answer)

export default router
