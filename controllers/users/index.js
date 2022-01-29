import repositoryUsers from '../../repository/users'
import { HttpCode } from '../../libs/constants'
import { UploadFileService, LocalFileStorage, CloudFileStorage } from '../../service/file-storage'
import { EmailService, SenderSendgrid, SenderNodemailer } from '../../service/email'
import { CustomError } from '../../libs/custom-error'

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user,
  )

  const avatarUrl = await uploadService.updateAvatar()

 res
    .status(HttpCode.OK)
   .json({ status: 'success', code: HttpCode.OK, data: {avatarUrl}})
}

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken)

  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Verification successful' },
    })
  }
  throw new CustomError(HttpCode.BAD_REQUEST, 'Invalid token')
}

const repeatEmailForVerifyUser = async (req, res, next) => {
 const { email } = req.body
  const user = await repositoryUsers.findByEmail(email)
  if (user) {
    const { email, name, verificationToken } = user
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid(),
    )

    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken,
    )
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Verification email sent' },
      })
    }
    return res.status(HttpCode.SE).json({
      status: 'error',
      code: HttpCode.SE,
      data: { message: 'Service Unavailable' },
    })
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    data: { message: 'User with email not found' },
  })
}
  
export {uploadAvatar, verifyUser, repeatEmailForVerifyUser}