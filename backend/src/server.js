const express = require('express')
const routes = require('./routes')
const cors = require('cors');
const path = require('path')
const fs = require('fs')

const uploads = path.resolve(__dirname,'..','uploads')
const app = express()

app.use(cors());

app.use(routes)

app.use(express.json())

if(!fs.existsSync(uploads)){

    fs.mkdirSync(uploads)
}

app.use('/uploads', express.static(uploads))

app.listen(process.env.PORT || 3333)