import WalletDB from '../database/wallet'
import Team from '../model/Team'
import Wallet from '../model/Wallet'
import TeamService from './team.service'

class WalletService {
    private team: Team

    constructor(team: Team) {
        this.team = team
    }

    async readWalletById(id: string) {
        const walletDB = await WalletDB.findById(id)
        if (walletDB === null)
            return null
        if (walletDB.teamId !== this.team.getIndex())
            return null
        return new Wallet(walletDB._id.toString(), walletDB.name, walletDB.description, walletDB.balance)
    }

    async readWallets() {
        const walletsDB = await WalletDB.find({
            teamId: this.team.getIndex()
        })
        return walletsDB.map(walletDB => new Wallet(walletDB._id.toString(), walletDB.name, walletDB.description, walletDB.balance))
    }

    async createWallet({
        name,
        description,
    }: {
        name: string,
        description: string,
    }) {
        if (await WalletDB.findOne({ name }) !== null)
            throw new Error("Name already exists")
        const newWalletDB = new WalletDB({
            name,
            description,
            balance: 0,
            teamId: this.team.getIndex()
        })
        const newWallet = new Wallet(newWalletDB._id.toString(), name, description, 0)
        await newWalletDB.save()
        return newWallet
    }

    async updateWallet(id: string, {
        name,
        description
    }: {
        name?: string,
        description?: string
    }) {
        if (await WalletDB.findOne({ name }) !== null)
            throw new Error("Name already exists")
        const newWallet = await WalletDB.findOneAndUpdate({
            _id: id,
            teamId: this.team.getIndex()
        }, {
            name,
            description
        })
        if (newWallet === null)
            throw new Error('wallet not found')
        return new Wallet(
            newWallet._id.toString(),
            name ? name : newWallet.name,
            description ? description : newWallet.description,
            newWallet.balance
        )
    }

    async deleteWallet(id: string) {
        const wallet = await WalletDB.findOneAndDelete({
            _id: id,
            teamId: this.team.getIndex()
        })
        if (wallet === null)
            throw new Error('wallet not found')
    }
    
    async deleteWallets() {
        await WalletDB.deleteMany({
            teamId: this.team.getIndex()
        })
    }

    async updateBalance(id: string, amount: number) {
        const wallet = await WalletDB.findOneAndUpdate({
            _id: id,
            teamId: this.team.getIndex()
        }, {
            $inc: { balance: amount }
        })
        if (wallet === null)
            throw new Error('wallet not found')
        return new Wallet(
            wallet._id.toString(),
            wallet.name,
            wallet.description,
            wallet.balance + amount
        )
    }
}

export default WalletService