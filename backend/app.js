import express from 'express'
import connectToMongo from './dbcon.js'
import dotenv from 'dotenv'
import cors from 'cors'

import userRouter from  './routes/userRoutes.js'
import expenseRouter from './routes/expenseRoutes.js'
import budgetRouter from './routes/budgetRoutes.js'
import reportRouter from './routes/reportRoutes.js'
import suggestionRouter from './routes/suggestionsRoutes.js'
import './services/monthlyReportJob.js'; // Ensure job file is loaded (for dev, not for cron)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


connectToMongo(process.env.MONGO_URI)

app.use('/user', userRouter)
app.use('/expense', expenseRouter)
app.use('/budget', budgetRouter)
app.use('/report', reportRouter)
app.use('/suggestion', suggestionRouter)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`)
})