import { Request, Response } from "express"
import joi from 'joi'
import { bodyAuthenticated } from "../../middleware/authentication/auth"
import Wallet from "../../model/Wallet"
import WalletService from "../../service/wallet.service"

type readWalletsBody = bodyAuthenticated & {
    
}

type readWalletsResponse = {
    message: string,
    data: null | Wallet[]
}

export async function readWallets(req: Request<any, any, readWalletsBody>, res: Response<readWalletsResponse>) {
    try {
        const walletService = new WalletService(req.body.team)
        const wallets = await walletService.readWallets()
        return res.status(200).json({ message: 'wallets found', data: wallets })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}