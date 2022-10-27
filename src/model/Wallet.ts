import mongoose from "mongoose"

export default class Wallet {
    private readonly id: string
    private name: string
    private description: string
    private balance: number

    constructor(id: string, name: string, description: string, balance: number) {
        this.validateId(id)
        this.validateName(name)
        this.validateDescription(description)
        this.validateBalance(balance)
        this.id = id
        this.name = name
        this.description = description
        this.balance = balance
    }

    private validateId(id: string) {
        if (id.toString().length !== 24)
            throw new Error('invalid id')
    }

    private validateName(name: string) {
        if (name.length < 3 || name.length > 20)
            throw new Error('invalid name')
    }

    private validateDescription(description: string) {
        if (description.length <= 0 || description.length > 100)
            throw new Error('invalid description')
    }

    private validateBalance(balance: number) {
        if (balance < 0)
            throw new Error('invalid balance')
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getDescription() {
        return this.description
    }

    public getBalance() {
        return this.balance
    }

    public setName(name: string) {
        this.validateName(name)
        this.name = name
    }

    public setDescription(description: string) {
        this.validateDescription(description)
        this.description = description
    }

    public setBalance(balance: number) {
        this.validateBalance(balance)
        this.balance = balance
    }
    
}