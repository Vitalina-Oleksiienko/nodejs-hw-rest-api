import Contact from '../model/contact'

const listContacts = async(userId) => {
  const result = await Contact.find({ owner:userId })
  return result
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findById({ _id: contactId, owner: userId })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
  return result
}

const addContact = async (userId, body) => {
  const result = await Contact.create({...body, owner: userId })
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}