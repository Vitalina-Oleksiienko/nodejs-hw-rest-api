import { Router } from 'express'
import { signUp, login, logout, current } from '../../../controllers/auth'
import guard from '../../../middlewares/guard'
import validateSignup from './validation'
import wrapperError from '../../../middlewares/error-handler'

const router = new Router()

router.post('/signup', validateSignup, wrapperError(signUp))
router.post('/login', validateSignup, wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
router.post('/current', guard, wrapperError(current))

export default router