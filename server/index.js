//required packages
const express = require('express')
const cors = require('cors')

//app instance
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//endpoints
const {getChildren, addChild, deleteChild, editChild} = require('./controller')

app.get('/children', getChildren)
app.post('/addChild',addChild)
app.delete(`/deleteChild/:id`, deleteChild)
app.put('/editChild/:id', editChild)

//app.listen
app.listen(4000, () => console.log('Server running at port 4000'))