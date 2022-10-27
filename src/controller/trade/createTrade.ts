import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import Trade from "../../model/Trade"
import Type from "../../model/Type"
import TradeService from "../../service/trade.service"

type createTradeBody = bodyAuthenticated & {
    type: Type,
    group: string,
    description: string,
    amount: number,
    date: string
}

type createTradeParam = AuthParam & {
    walletId: string
}

type createTradeResponse = {
    message: string,
    data: Trade | null
}

export async function createTradeValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            type: joi.string().pattern(/^spend$|^income$/).required(),
            group: joi.string().min(1).required(),
            description: joi.string(),
            amount: joi.number().required(),
            date: joi.string().isoDate().required()
        }).unknown().validateAsync(req.body)
        await joi.object({
            walletId: joi.string().length(24).required()
        }).unknown().validateAsync(req.params)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function createTrade(req: Request<createTradeParam, any, createTradeBody, any>, res: Response<createTradeResponse>) {
    try {
        const tradeService = new TradeService(req.body.team)
        const newTrade = await tradeService.createTrade(req.params.walletId, {
            type: req.body.type,
            group: req.body.group,
            description: req.body.description,
            amount: req.body.amount,
            date: new Date(req.body.date)
        })
        return res.status(201).json({ message: 'trade created', data: newTrade })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}