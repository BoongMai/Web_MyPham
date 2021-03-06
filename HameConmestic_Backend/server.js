import express from 'express'
import cors from 'cors'
import products from './api/products.route.js'
import categories from './api/categories.route.js'
import users from './api/users.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/users', users)
app.use('*', (req, res) =>{
    res.status(404).json({error: 'NOT FOUND'})
})

export default app