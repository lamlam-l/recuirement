import TeamDB from '../database/team'
import Team from '../model/Team'
import { DuplicateIdError } from '../utils/error'
import WalletService from './wallet.service'

class TeamService {

    constructor() {

    }

    static async readTeam(id: number) {
        const team = await TeamDB.findOne({
            index: id
        })
        if (team === null)
            return null
        return new Team(team.index)
    }

    static async createTeam(team: Team) {
        if (await TeamDB.findOne({
            index: team.getIndex()
        }) !== null)
            throw new DuplicateIdError('duplicate ID')
        const newTeam = new TeamDB({
            index: team.getIndex()
        })
        await newTeam.save()
        return true
    }

    static async deleteTeam(id: number) {
        const team = await TeamDB.findOneAndDelete({
            index: id
        })
        if (team === null)
            throw new Error('team not found')
        const walletService = new WalletService(new Team(team.index))
        await walletService.deleteWallets()
    }

    static async readTeams() {
        const teams = await TeamDB.find({})
        return teams.map(team => new Team(team.index))
    }
}

export default TeamService