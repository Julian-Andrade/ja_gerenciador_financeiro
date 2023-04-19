const { userRoutes } = require('./user')
const { authRoutes } = require('./auth')
const { salesRoutes } = require('./sales')

module.exports = (app) => {
  userRoutes(app)
  authRoutes(app)
  salesRoutes(app)
}
