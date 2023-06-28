const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  removeUser,
} = require('../repositories/user')

const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
  try {
    // Criptografar a senha
    req.body.password = bcrypt.hashSync(req.body.password, 10)

    const user = await createUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.get = async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getId = async (req, res) => {
  try {
    const userById = await getUserById(req.params.id)
    res.status(200).send(userById)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.update = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    await removeUser(req.params.id)
    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
}
