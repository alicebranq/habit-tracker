import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./prisma"
import dayjs from "dayjs"


export async function appRoutes(app: FastifyInstance){
    app.post('/habits', async (req, res) => {
        const createHabbitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6),
            )
        })

        const { title, weekDays } = createHabbitBody.parse(req.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today, 
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDays
                        } 
                    })
                }
            }
        })
    })


}

