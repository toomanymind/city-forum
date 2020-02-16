const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const app = express()

const route = require('./pages/route')
const api = require('./server/api')
const auth = require('./server/auth')


app.set('views', [path.join(__dirname, 'pages')])
app.set('view engine', 'ejs')
app.use(express.static('files'))
app.use('/static', express.static('static'))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))








app.use('*', auth)
app.use('/api', api)
app.use('/', route)







app.listen(8090, () => console.log('app listening on port 8090!'))
