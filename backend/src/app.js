const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes = require('./routes/auth.route')
const scheduleRoutes = require('./routes/schedule.routes')




const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.use('/api/auth',authRoutes)
app.use('/api/auth',scheduleRoutes)


module.exports = app