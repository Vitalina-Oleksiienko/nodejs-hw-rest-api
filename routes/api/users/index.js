import { Router } from 'express'
import { uploadAvatar, verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users'
import guard from '../../../middlewares/guard'
import { upload } from '../../../middlewares/upload'
import wrapperError from '../../../middlewares/error-handler'
import {validateResend} from '../auth/validation'


const router = new Router()

router.patch('/avatar', guard, upload.single('avatar'), wrapperError(uploadAvatar))
router.get('/verify/:token', wrapperError(verifyUser))
router.post('/verify', validateResend, wrapperError(repeatEmailForVerifyUser))

export default router