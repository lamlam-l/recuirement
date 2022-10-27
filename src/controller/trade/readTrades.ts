import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import Trade from "../../model/Trade"
import Type from "../../model/Type"
import TradeService from "../../service/trade.service"

type readTradesBody = bodyAuthenticated & {
}
type readTradesParam = AuthParam & {
    walletId: string
}
type readTradesQuery = {
    type?: Type
    group?: string
    start?: string
    end?: string
}

type readTradesResponse = {
    message: string
    data: Trade[] | null
}

export async function readTradesValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            walletId: joi.string().required(),
        }).unknown().validateAsync(req.params)
        await joi.object({
            type: joi.string().valid('income', 'expense'),
            group: joi.string(),
            start: joi.string().isoDate(),
            end: joi.string().isoDate(),
        }).unknown().and('start', 'end').validateAsync(req.query)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function readTrades(req: Request<readTradesParam, any, readTradesBody, readTradesQuery>, res: Response<readTradesResponse>) {
    try {
        const tradeService = new TradeService(req.body.team)
        const trades = await tradeService.readTrades(req.params.walletId, {
            type: req.query.type,
            group: req.query.group,
            dateFilter: (req.query.start && req.query.end) ? {
                start: new Date(req.query.start),
                end: new Date(req.query.end)
            } : undefined
        })
        return res.status(200).json({ message: 'success', data: trades })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}