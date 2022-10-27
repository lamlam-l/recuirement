import { Request, Response } from "express"
import joi from 'joi'
import TeamService from "../../service/team.service"
import WalletService from "../../service/wallet.service"

type deleteTeamParam = {
    id: number
}

type deleteTeamResponse = {
    message: string,
    data: null
}

export async function deleteTeamValidate(req: Request<any, any, any, any>, res: Response<deleteTeamResponse>, next: Function) {
    try {
        await joi.object({
            id: joi.number().positive().max(100).required()
        }).validateAsync(req.params)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function deleteTeam(req: Request<deleteTeamParam>, res: Response<deleteTeamResponse>) {
    try {
        await TeamService.deleteTeam(req.params.id)
        return res.status(200).json({ message: 'delete successful', data: null })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}