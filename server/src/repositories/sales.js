const { prisma } = require('../services/prisma')

// Criar um sale
exports.createSale = async (data) => {
  const sale = await prisma.sales.create({ data })
  return sale
}

// Listar todos os sales
exports.getSales = async () => {
  const sales = await prisma.sales.findMany({})
  return sales
}

// Listar sales pelo id
exports.getSaleById = async (id) => {
  const sale = await prisma.sales.findUnique({
    where: {
      id,
    },
  })
  return sale
}

// Criar update no sale
exports.updateSale = async (id, data) => {
  const sale = await prisma.sales.update({
    where: {
      id,
    },
    data,
  })
  return sale
}

// Remover uma sale
exports.removeSale = async (id) => {
  await prisma.sales.delete({
    where: {
      id,
    },
  })
  return
}
