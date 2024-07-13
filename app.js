const express = require('express')
const path = require('path')

const sequelize = require('./utils/database')
const bodyParser = require('body-parser')
const mainRoutes = require('./routes/mainRoutes')
const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(mainRoutes)

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>console.log(err))

