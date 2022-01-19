import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../libs/constants'

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts()
  return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: contacts })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const getContact = await repositoryContacts.getContactById(id)
  if (getContact) {
    return res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data: { getContact } })
  }
  return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const addContact = async (req, res, next) => {
  if (req.body) {
    const newContact = await repositoryContacts.addContact(req.body)
    return res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.OK, data: { contact: newContact } })
  }
  return res.status(HttpCode.BAD_REQUEST).json({ tatus: 'error', code: HttpCode.BAD_REQUEST, message: 'Missing required name field' })
}

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const delContact = await repositoryContacts.removeContact(id)
  if (delContact) {
    return res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data: { delContact } })
  }
  return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const updateContact = async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.updateContact(id, req.body)
  if (contact) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

export { getContacts, getContactById, addContact, removeContact, updateContact }