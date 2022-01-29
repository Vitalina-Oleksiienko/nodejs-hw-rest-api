import { HttpCode } from '../../libs/constants'
import AuthService from '../../service/auth'
import { EmailService, SenderSendgrid } from '../../service/email'
import { CustomError } from '../../libs/custom-error'

const authService = new AuthService()

const signUp = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await authService.isUserExist(email)
  if (isUserExist) {
    throw new CustomError(HttpCode.CONFLICT, 'Email in use')
  }
  const userData = await authService.create(req.body) 
  const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid(),
  )
  const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verificationToken,
    )
  delete userData.verificationToken
  return res
    .status(HttpCode.CREATED)
    .json({ status: 'success', code: HttpCode.CREATED, data: {...userData, isSendEmailVerify: isSend} })
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.getUser(email, password)
  if (!user) {
    throw new CustomError(HttpCode.UNAUTHORIZED, 'Invalid credentials')
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)

  const data = {
    'token': token,
    'user': {
      'email': user.email,
      'subscription': user.subscription
    }
  }
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data })
}

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.NO_CONTENT, data: {} })
}

const current = async (req, res, next) => { 
  const response = {
    'email': req.user.email,
    'subscription': req.user.subscription
  }
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: {response} })
}

export {signUp, login, logout, current}