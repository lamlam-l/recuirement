import Type from "./Type"

export default class Trade {
    private readonly id: string
    private readonly type: Type
    private group: string
    private description: string
    private amount: number
    private date: Date

    constructor(id: string, type: Type, group: string, description: string, amount: number, date: Date) {
        this.validateId(id)
        this.validateGroup(group)
        this.validateDescription(description)
        this.validateAmount(amount)
        this.id = id
        this.type = type
        this.group = group
        this.description = description
        this.amount = amount
        this.date = date
    }

    private validateId(id: string) {
        if (id.length !== 24)
            throw new Error('invalid id')
    }
    
    private validateGroup(group: string) {
        if (group.length < 3 || group.length > 20)
            throw new Error('invalid group')
    }

    private validateDescription(description: string) {
        if (description.length > 100)
            throw new Error('invalid description')
    }

    private validateAmount(amount: number) {
        if (amount <= 0)
            throw new Error('invalid amount')
    }

    public getId() {
        return this.id
    }

    public getType() {
        return this.type
    }

    public getGroup() {
        return this.group
    }

    public getDescription() {
        return this.description
    }

    public getAmount() {
        return this.amount
    }

    public getDate() {
        return this.date
    }

    public setGroup(group: string) {
        this.validateGroup(group)
        this.group = group
    }

    public setDescription(description: string) {
        this.validateDescription(description)
        this.description = description
    }

    public setAmount(amount: number) {
        this.validateAmount(amount)
        this.amount = amount
    }

    public setDate(date: Date) {
        this.date = date
    }

}