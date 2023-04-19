const { login } = require('../controllers/auth')

exports.authRoutes = (app) => {
  app.post('/login', login)
}
