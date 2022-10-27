export class DuplicateIdError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'DuplicateIdError'
    }
}