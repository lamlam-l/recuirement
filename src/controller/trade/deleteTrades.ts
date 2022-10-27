import { Request, Response } from "express"
import joi from 'joi'

type Body = {   
}
type Param = {
}
type query = {
}
// type Response = {
// }

export async function Validate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        // await joi.object({}).validateAsync(req)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function something(req: Request<Param, any, Body, query>, res: Response) {
    try {
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}