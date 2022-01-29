import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../libs/constants'
import { CustomError } from '../../libs/custom-error'

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user
  const contacts = await repositoryContacts.listContacts(userId)
  return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: contacts })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const getContact = await repositoryContacts.getContactById(userId, id)
  if (getContact) {
    return res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data: { getContact } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const addContact = async (req, res, next) => {
  if (req.body) {
    const { id: userId } = req.user
    const newContact = await repositoryContacts.addContact(userId, req.body)
    return res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.OK, data: { contact: newContact } })
  }
  throw new CustomError(HttpCode.BAD_REQUEST, 'Missing required name field')
}

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const delContact = await repositoryContacts.removeContact(userId, id)
  if (delContact) {
    return res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data: { delContact } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const updateContact = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await repositoryContacts.updateContact(userId, id, req.body)
  if (contact) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

export { getContacts, getContactById, addContact, removeContact, updateContact }