import { Request, Response } from "express"
import joi from 'joi'
import Team from "../../model/Team"
import TeamService from "../../service/team.service"

type ReadTeamParam = {
    id: number | undefined
}

type ReadTeamResponse = {
    message: string,
    data: null | Team | Team[]
}

export async function readTeamValidate(req: Request<any, any, any, any>, res: Response<ReadTeamResponse>, next: Function) {
    try {
        await joi.object({
            id: joi.number().positive().max(100)
        }).validateAsync(req.params) as ReadTeamParam
        next()
    } catch (error) {
       if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}

export async function readTeam(req: Request<ReadTeamParam>, res: Response<ReadTeamResponse>) {
    try {
        if (req.params.id === undefined) {
            const teams = await TeamService.readTeams()
            return res.status(200).json({ message: 'get teams successful', data: teams })
        }
        const team = await TeamService.readTeam(req.params.id)
        if (team === null)
            throw new Error('team not found')
        return res.status(200).json({ message: 'get team successful', data: team })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message, data: null })
        } else {
            return res.status(400).json({ message: 'unknown error', data: null })
        }
    }
}
