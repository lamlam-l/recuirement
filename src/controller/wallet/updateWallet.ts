import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import Wallet from "../../model/Wallet"
import WalletService from "../../service/wallet.service"

type updateWalletBody = bodyAuthenticated & {
    name?: string,
    description?: string,
    balance?: string
}

type updateWalletParam = AuthParam & {
    id: string
}

type updateWalletResponse = {
    message: string,
    data: null | Wallet
}

export async function updateWalletValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            name: joi.string(),
            description: joi.string(),
            balance: joi.number().positive()
        }).unknown().validateAsync(req.body)
        await joi.object({
            id: joi.string().required().length(24)
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

export async function updateWallet(req: Request<updateWalletParam, any, updateWalletBody, any>, res: Response<updateWalletResponse>) {
    try {
        const walletService = new WalletService(req.body.team)
        const walletUpdated = await walletService.updateWallet(req.params.id, {
            name: req.body.name,
            description: req.body.description
        })
        return res.status(200).json({ message: 'wallet updated', data: walletUpdated })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}