const express = require('express')
const bodyParser = require('body-parser');

require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task') 
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRoute')
var routes = require('./routes/routes');


const app = express()
app.use(bodyParser.json())
// app.use(userRouter)
// app.use(taskRouter)
routes(app);


const port = process.env.PORT || 3000





// ************************************ Server Starter 
app.listen(port, ()=> {
    console.log('Server is up at port ' + port)
})