import { Router } from 'express'
import { signUp, login, logout, current } from '../../../controllers/auth'
import guard from '../../../middlewares/guard'
import validateSignup from './validation'

const router = new Router()

router.post('/signup', validateSignup, signUp)
router.post('/login', validateSignup, login)
router.post('/logout', guard, logout)
router.post('/current', guard, current)

export default router