import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import Trade from "../../model/Trade"
import TradeService from "../../service/trade.service"
import WalletService from "../../service/wallet.service"

type readTradeBody = bodyAuthenticated & {   
}

type readTradeParam = AuthParam & {
    id: string
}

type readTradeResponse = {
    message: string,
    data: null | Trade
}

export async function readTradeValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            id: joi.string().length(24).required()
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

export async function readTrade(req: Request<readTradeParam, any, readTradeBody, any>, res: Response<readTradeResponse>) {
    try {
        const tradeService = new TradeService(req.body.team)
        const trade = await tradeService.readTrade(req.params.id)
        if (trade === null)
            return res.status(400).json({ message: 'trade not found', data: null })
        return res.status(200).json({ message: 'trade found', data: trade })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}