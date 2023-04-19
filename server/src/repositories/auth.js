const { prisma } = require('../services/prisma')

exports.getUser = async (email) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  })
  return user
}
