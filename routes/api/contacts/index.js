import { Router } from 'express'
import { getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts'
import { createValidate, updateValidate, idValidate, updateValidateFavorite } from './validation'

const router = new Router()

router.get('/', getContacts)

router.get('/:id', idValidate, getContactById)

router.post('/', createValidate, addContact)

router.delete('/:id', idValidate, removeContact)

router.put('/:id', idValidate, updateValidate, updateContact)

router.patch('/:id/favorite', idValidate, updateValidateFavorite, updateContact)

export default router

