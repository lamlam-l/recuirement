import { Request, Response } from "express"
import joi from 'joi'
import Team from "../../model/Team"
import TeamService from "../../service/team.service"
import { DuplicateIdError } from "../../utils/error"

type CreateTeamBody = {
    id: number
}

type CreateTeamResponse = {
    message: string,
    data: null
}

export async function createTeamValidate(req: Request<any, any, any, any>, res: Response, next: Function) {
    try {
        await joi.object({
            id: joi.number().positive().max(100).required()
        }).validateAsync(req.body)
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function createTeam(req: Request<any, any, CreateTeamBody>, res: Response<CreateTeamResponse>) {
    try {
        await TeamService.createTeam(new Team(req.body.id))
        return res.status(200).json({ message: 'team created', data: null })
    } catch (error) {
        if (error instanceof DuplicateIdError) {
            return res.status(400).json({ message: error.message, data: null })
        } else if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}