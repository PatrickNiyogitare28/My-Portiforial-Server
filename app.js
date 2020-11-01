require('./modals/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRoutes = require('./routers/user.router');
const blogsRoutes = require('./routers/blogs.routes');
const inquiryRoutes = require('./routers/inquiries.routes');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(morgan('dev'));
app.get('/',(req,res)=>{
    res.send("Welcome to Patrick Bland").status(200)
})
app.use('/uploads/blogs',express.static('uploads/blogs'))
app.use('/api/users',usersRoutes);
app.use('/api/blogs',blogsRoutes);
app.use('/api/inquiries',inquiryRoutes);


module.exports = app