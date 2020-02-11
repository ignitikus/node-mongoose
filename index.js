const express = require('express')
const app = express()
const morgan =require('morgan')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})
   .then(()=>console.log(`MongoDB connected`))
   .catch(err=>console.log('Oops! Mongo error', err))

const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', userRoutes)


app.listen(port, ()=>{
   console.log(`Listening on port:${port}`)
})