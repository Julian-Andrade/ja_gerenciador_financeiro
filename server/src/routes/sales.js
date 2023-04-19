const { create, get, getId, remove, update } = require('../controllers/sales')
const { verifyToken } = require('../middleware/auth')

exports.salesRoutes = (app) => {
  app.post('/sales', verifyToken, create)
  app.get('/sales', verifyToken, get)
  app.get('/sales/:id', verifyToken, getId)
  app.put('/sales/:id', verifyToken, update)
  app.delete('/sales/:id', verifyToken, remove)
}
