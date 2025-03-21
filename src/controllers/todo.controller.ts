import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from '@hono/zod-validator'

const todoSchema = z.object({
    id: z.number(),
    wing: z.string(),
    title: z.string(),
    lessionDetails: z.string(),
});

type Todo = z.infer<typeof todoSchema>;

const createTodoSchema = todoSchema.omit({ id: true });

export const todoController = new Hono()
    .post("/createTodo", zValidator("json", createTodoSchema), async (c) => {
        const Todo = c.req.valid("json")
        console.log(Todo)
        return c.json({ Todo })
    })