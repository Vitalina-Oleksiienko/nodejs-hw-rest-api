import jsonwebtoken from 'jsonwebtoken'
import repositoryUsers from '../repository/users'
import { HttpCode } from '../libs/constants'

const SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (token) => {
  try {
    const verify = jsonwebtoken.verify(token, SECRET_KEY)
    return !!verify
  } catch (error) {
    return false
  }
}

const guard = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  const isValidToken = verifyToken(token)
  if (!isValidToken) {
    return res
    .status(HttpCode.UNAUTHORIZED)
      .json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized'
      })
  }
  const payload = jsonwebtoken.decode(token)
  const user = await repositoryUsers.findById(payload.id)
  if (!user || user.token !== token) {
    return res
    .status(HttpCode.UNAUTHORIZED)
      .json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized'
      })
  }
  req.user = user
  next()
}

export default guard