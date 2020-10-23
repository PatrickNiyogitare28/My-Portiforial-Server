require('./modals/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRoutes = require('./routers/user.router');
const blogsRoutes = require('./routers/blogs.routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send("Welcome to Patrick Bland").status(200)
})
app.use('/api/users',usersRoutes);
app.use('/api/blogs',blogsRoutes);

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("App is running on port "+port);
    
})


