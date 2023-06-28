const { getUser } = require('../repositories/auth')

const { authValidation } = require('../validations/auth')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const data = await authValidation.parse(req.body)

    const user = await getUser(data.email)

    // Validação de usuário não existente
    if (!user) throw { message: 'Usuário não encontrado!' }

    // Validação de usuário existente
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      )
      return res.status(200).send({ token })
    }
    {
      return res.status(401).send({ message: 'Usuário e/ou senha incorretos!' })
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
