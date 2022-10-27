import { Request, Response } from "express"
import joi from 'joi'
import { AuthParam, bodyAuthenticated } from "../../middleware/authentication/auth"
import WalletService from "../../service/wallet.service"

type deleteWalletBody = bodyAuthenticated & {   
}

type deleteWalletParam = AuthParam & {
    id: string
}

type deleteWalletResponse = {
    message: string,
    data: null
}

export async function deleteWalletValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
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

export async function deleteWallet(req: Request<deleteWalletParam, any, deleteWalletBody  >, res: Response) {
    try {
        const walletService = new WalletService(req.body.team)
        await walletService.deleteWallet(req.params.id)
        return res.status(200).json({ message: 'wallet deleted', data: null })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}