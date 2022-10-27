import TradeDB from "../database/trade"
import Team from "../model/Team"
import Trade from "../model/Trade"
import Type from "../model/Type"
import WalletService from "./wallet.service"

class TradeService {
    private team: Team

    constructor(team: Team) {
        this.team = team
    }

    async readTrade(id: string) {
        const tradeDB = await TradeDB.findById(id)
        if (tradeDB === null)
            return null
        const walletService = new WalletService(this.team)
        const wallet = await walletService.readWalletById(tradeDB.walletId)
        if (wallet === null)
            throw new Error('something went wrong')
        return new Trade(tradeDB._id.toString(), tradeDB.type as Type, tradeDB.group, tradeDB.description, tradeDB.amount, tradeDB.date)
    }

    async readTrades(walletId: string, filter?: {
        type?: Type,
        group?: string,
        dateFilter?: {
            start: Date,
            end: Date
        }
    }) {
        const walletService = new WalletService(this.team)
        const wallet = await walletService.readWalletById(walletId)
        if (wallet === null)
            throw new Error('wallet not found')
        const DBfilter: any = {}
        if (filter?.type)
            DBfilter.type = filter.type
        if (filter?.group)
            DBfilter.group = filter.group
        if (filter?.dateFilter) {
            DBfilter.date = {
                $gte: filter.dateFilter.start,
                $lte: filter.dateFilter.end
            }
        }

        console.log({...DBfilter});
        
        
        const tradesDB = await TradeDB.find({walletId, ...DBfilter})
        return tradesDB.map(tradeDB => 
            new Trade(tradeDB._id.toString(), tradeDB.type as Type, tradeDB.group, tradeDB.description, tradeDB.amount, tradeDB.date)
        )
    }

    async createTrade(walletId: string, {
        type,
        group,
        description,
        amount,
        date
    }: {
        type: Type,
        group: string,
        description?: string,
        amount: number,
        date: Date
    }) {
        const walletService = new WalletService(this.team)
        const wallet = await walletService.readWalletById(walletId)
        if (wallet === null)
            throw new Error('wallet not found')
        if (!description)
            description = ''
        const tradeDB = new TradeDB({
            walletId,
            group,
            description,
            amount,
            type,
            date
        })
        const trade = new Trade(tradeDB._id.toString(), tradeDB.type as Type, tradeDB.group, tradeDB.description, tradeDB.amount, tradeDB.date)
        await tradeDB.save()
        return trade
    }

    async updateTrade(id: string, {
        type,
        group,
        description,
        amount,
        date
    }: {
        type?: Type,
        group?: string,
        description?: string,
        amount?: number,
        date?: Date
    }) {
        throw new Error("unimplemented")
    }

    async deleteTrade(id: string) {
        throw new Error("unimplemented")
    }

    async deleteTrades(walletId: string) {
        throw new Error("unimplemented")
    }

}

export default TradeService