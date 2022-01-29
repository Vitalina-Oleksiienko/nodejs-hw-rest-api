import { Router } from 'express'
import { getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts'
import { createValidate, updateValidate, idValidate, updateValidateFavorite } from './validation'
import wrapperError from '../../../middlewares/error-handler'
import guard from '../../../middlewares/guard'

const router = new Router()

router.get('/', guard, wrapperError(getContacts))

router.get('/:id', guard, idValidate, wrapperError(getContactById))

router.post('/', guard, createValidate, wrapperError(addContact))

router.delete('/:id', guard, idValidate, wrapperError(removeContact))

router.put('/:id', guard, idValidate, updateValidate, wrapperError(updateContact))

router.patch('/:id/favorite', guard, idValidate, updateValidateFavorite, wrapperError(updateContact))

export default router

