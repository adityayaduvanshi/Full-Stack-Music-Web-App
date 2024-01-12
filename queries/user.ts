import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getUser = async (id: string | number) => await prisma.user.findUnique({
  where: {
    id: id,
  },
})

export {
  getUser
}