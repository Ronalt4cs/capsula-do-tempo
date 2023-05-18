import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { boolean, z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {

  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        cratedAt: 'asc'
      }
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        except: memory.content.substring(0.115).concat('...')
      }
    })
  })

  app.get('/memories/:id', async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id
      }
    })

    return memory
  })

  app.post('/memories', async (req) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPuplic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPuplic } = bodySchema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPuplic,
        userId: '686a6dc2-724e-4e1a-a13c-83a0844e4c03'
      }
    })

    return memory
  })

  app.put('/memories/:id', async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPuplic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPuplic } = bodySchema.parse(req.body)

    const memoryUpdated = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPuplic,
        userId: '686a6dc2-724e-4e1a-a13c-83a0844e4c03'
      }
    })

    return memoryUpdated
  })

  app.delete('/memories/:id', async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.memory.delete({
      where: {
        id
      }
    })
  })
}