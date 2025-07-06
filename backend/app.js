import express from 'express'
import connectToMongo from './dbcon'
import dotenv from 'dotenv'

import userRouter from  './routes/userRoutes'
import expenseRouter from './routes/expenseRoutes'
import budgetRouter from './routes/budgetRoutes'
import reportRouter from './routes/reportRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())


connectToMongo(process.env.MONGO_URI)

app.use('/user', userRouter)
app.use('/expense', expenseRouter)
app.use('/budget', budgetRouter)
app.use('/report', reportRouter)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`)
})