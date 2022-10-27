import express from 'express'
import { createTeam, createTeamValidate } from '../controller/team/createTeam'
import { deleteTeam, deleteTeamValidate } from '../controller/team/deleteTeam'
import { readTeamValidate, readTeam } from '../controller/team/readTeam'

const router = express.Router()

router.get('/teams/:id', readTeamValidate, readTeam)
router.get('/teams', readTeamValidate, readTeam)
router.post('/team', createTeamValidate, createTeam)
router.delete('/team/:id', deleteTeamValidate, deleteTeam)

export default router