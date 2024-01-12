import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getUser = async (id: number | bigint) => await prisma.users.findUnique({
  where: {
    id: id,
  },
})

export {
  getUser
}