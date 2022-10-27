require('dotenv').config({ path: '.env.local' })

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import route from './router/index'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


function connectToDatabase() {
    try {
        const dbUrl = process.env.DATABASE_URL as string
        mongoose.connect(dbUrl, {
            dbName: 'recruitment',
        })
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

connectToDatabase()

route(app)

// import TeamService from './service/team.service'
// import Team from './model/Team'
// import { DuplicateIdError } from './utils/error'

// TeamService.readTeams([10, 20, 30, 4, 5, 6]).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);    
// })

app.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`)
})
