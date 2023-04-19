const {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  removeSale,
} = require('../repositories/sales')

const { salesValidation } = require('../validations/sales')

exports.create = async (req, res) => {
  try {
    // Validação
    const data = await salesValidation.parse(req.body)

    const sale = await createSale(data)
    res.status(200).send(sale)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.get = async (req, res) => {
  try {
    const sales = await getSales()
    res.status(200).send(sales)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getId = async (req, res) => {
  try {
    const saleById = await getSaleById(req.params.id)
    res.status(200).send(saleById)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.update = async (req, res) => {
  try {
    const sale = await updateSale(req.params.id, req.body)
    res.status(200).send(sale)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    await removeSale(req.params.id)
    res.status(200).send(sale)
  } catch (error) {
    res.status(400).send(error)
  }
}
