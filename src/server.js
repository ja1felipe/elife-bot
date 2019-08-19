const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const handles = require('./handlers.js')
const password = process.env.Password
const PORT = process.env.PORT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === password) {
        console.log('nice')
        res.status(200).send(req.query['hub.challenge'])
    } else {
        console.log('fail')
        res.status(400)
    }
})

app.post('/webhook', (req, res) => {
    let data = req.body
    if (data && data.object === 'page') {
        data.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if (event.message) {
                    //console.log(event)
                    handles.handleInput(event)
                }
            })
        })
        res.sendStatus(200)
    }
})

app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port: ${PORT || 3000}`)
})