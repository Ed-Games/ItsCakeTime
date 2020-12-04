const express = require('express')

const routes = require('./routes')

const cors = require('cors');

const app = express()

app.use(cors());

app.use(routes)

app.use(express.json())


app.listen(3333)