class Team {
    private index: number

    constructor(index: number) {
        this.validate(index)
        this.index = index
    }

    private validate(index: number) {
        if (index <= 0 || index >= 1000)
            throw new Error('invalid index')
    }

    public getIndex() {
        return this.index
    }
}

export default Team