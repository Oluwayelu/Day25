/*
Day 25 of 30 Days of Code

Task:
    

Created on Apr 16 3:32:28pm 2020
Updated on Apr 17 5:02:06pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const db = require('./config/config').mongoURI

const user = require('./routes/api/Users')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let whitelist = ['https://localhost:4000', 'https://ecx-day-25.herokuapp.com/']
var corsOption = {
    origin: (origin, call) => {
        if(!origin) return call(null, true)
        if(whitelist.indexOf(origin) === -1){
            var msg = 'The CORS policy for this origin does not allow access from the particular origin'
            return call(new Error(msg), false)
        }
        return call(null, true)
    }
}

app.use(cors(corsOption))

app.use(morgan(':method :url :status :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs'))
}))

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}, () => {
    console.log('mongoDB connected')
})

//routes
app.use('/', user)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
