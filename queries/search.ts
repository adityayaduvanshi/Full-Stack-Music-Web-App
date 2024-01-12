import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const songSearchQuery = async (search: string) => await prisma.songs.findMany({
  orderBy: {
    _relevance: {
      fields: ['title', 'author'],
      search,
      sort: 'asc'
    }
  }
});

export {
  songSearchQuery
}