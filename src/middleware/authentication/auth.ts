import { Request, Response } from 'express'
import Joi from 'joi'
import Team from '../../model/Team'
import TeamService from '../../service/team.service'

export type AuthParam = {
    teamId: number
}

export type bodyAuthenticated = {
    team: Team
}

type AuthResponse = {
    message: string,
    data: null
}

export default async function auth(req: Request<AuthParam, any, bodyAuthenticated, any>, res: Response<AuthResponse>, next: Function) {
    try {
        await Joi.object({
            teamId: Joi.number().positive().max(100).required()
        }).unknown().validateAsync(req.params)
        const team = await TeamService.readTeam(req.params.teamId)
        if (team === null)
            return res.status(401).json({ message: 'team not found', data: null })
        req.body.team = team
        next()
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message, data: null })
        else
            return res.status(400).json({ message: 'unknown error', data: null })
    }
}