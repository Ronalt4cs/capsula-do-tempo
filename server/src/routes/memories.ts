import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()

  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub
      },
      orderBy: {
        cratedAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        except: memory.content.substring(0.115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPuplic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPuplic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPuplic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPuplic,
        userId: request.user.sub,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPuplic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPuplic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPuplic,
        userId: '686a6dc2-724e-4e1a-a13c-83a0844e4c03',
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }


    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
