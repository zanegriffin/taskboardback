require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const passport = require("passport")


//import routes
const userRouter = require('./controllers/user')
const taskRouter = require('./controllers/task')

//middleware
app.use(cors())
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());
app.use(morgan('dev'))

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport)



//test route
app.get("/", (req, res) => {
    res.json({ hello: "Hello World!" });
});

//active routes
app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)

app.listen(PORT, () => {
    console.log(`Your are listening on port ${PORT}`);
  });