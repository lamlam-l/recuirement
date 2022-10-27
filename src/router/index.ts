import { Express } from 'express'
import team from './team'
import wallet from './wallet'
import trade from "./trade"

export default function route(app: Express) {
    app.use('/api', team)
    app.use('/api', wallet)
    app.use('/api', trade)
}