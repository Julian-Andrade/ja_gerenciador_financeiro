const { prisma } = require('../services/prisma')

// Criar usuário
exports.createUser = async (data) => {
  const user = await prisma.users.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  })

  return user
}

// Listar usuário
exports.getUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  })
  return users
}

// Buscar usuário pelo id
exports.getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  })

  return user
}

// Criar update no usuário
exports.updateUser = async (id, data) => {
  const user = await prisma.users.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  })

  return user
}

// Remove um usuário
exports.removeUser = async (id) => {
  await prisma.users.delete({
    where: {
      id,
    },
  })
  return
}
