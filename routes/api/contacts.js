import { Router } from 'express'
import { getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts'
import { createValidate, updateValidate, idValidate, updateValidateFavorite } from './validation'
import guard from '../../../middlewares/guard'

const router = new Router()

router.get('/', guard, getContacts)

router.get('/:id', guard, idValidate, getContactById)

router.post('/', guard, createValidate, addContact)

router.delete('/:id', guard, idValidate, removeContact)

router.put('/:id', guard, idValidate, updateValidate, updateContact)

router.patch('/:id/favorite', guard, idValidate, updateValidateFavorite, updateContact)

export default router
