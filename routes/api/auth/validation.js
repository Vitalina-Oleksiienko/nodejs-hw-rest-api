import Joi from 'joi'
import mongoose from 'mongoose'
import { HttpCode } from '../../../libs/constants'

const { Types } = mongoose

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
})

const resendSchema = Joi.object({
  email: Joi.string().email().required(),
})

const validateSignup = async (req, res, next) => {
  try {
   await signupSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: `Field ${err.message.replace(/"/g, '')}`
      })
  }
  next()
}

export const validateResend = async (req, res, next) => {
  try {
   await resendSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'missing required field email'
      })
  }
  next()
}

export default validateSignup