import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import Wallet from "../../model/Wallet"
import WalletService from "../../service/wallet.service"

type readWalletBody = bodyAuthenticated & {   
}

type readWalletParam = AuthParam & {
    id: string
}

type readWalletResponse = {
    message: string,
    data: null | Wallet
}

export async function readWalletValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
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

export async function readWallet(req: Request<readWalletParam, any, readWalletBody, any>, res: Response<readWalletResponse>) {
    try {
        const walletService = new WalletService(req.body.team)
        const wallet = await walletService.readWalletById(req.params.id)
        if (wallet === null)
            return res.status(400).json({ message: 'wallet not found', data: null })
        return res.status(200).json({ message: 'wallet found', data: wallet })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}