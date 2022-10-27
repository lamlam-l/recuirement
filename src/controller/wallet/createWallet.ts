import { Request, Response } from "express"
import joi from 'joi'
import { bodyAuthenticated } from "../../middleware/authentication/auth"
import WalletService from "../../service/wallet.service"

type createWalletBodyType = bodyAuthenticated & {
    name: string,
    description: string,
    balance: number
}

type createWalletResponse = {
    message: string,
    data: null | {
        id: string,
        name: string,
        description: string,
        balance: number
    }
}

export async function createWalletValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            name: joi.string().required(),
            description: joi.string().required(),
            balance: joi.number().positive().required()
        }).unknown().validateAsync(req.body)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function createWallet(req: Request<any, any, createWalletBodyType, any>, res: Response<createWalletResponse>) {
    try {
        const walletService = new WalletService(req.body.team)
        const newWallet = await walletService.createWallet({
            name: req.body.name,
            description: req.body.description
        })
        return res.status(201).json({ message: 'create wallet successful', data: {
            id: newWallet.getId(),
            name: newWallet.getName(),
            description: newWallet.getDescription(),
            balance: newWallet.getBalance()
        }})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}