const config = require('config');
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

require('dotenv').config()

mongoose.connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to mongodb successfully....'))
.catch(err =>console.log('Failed to connect to mongodb!',err));

require('./users.modal');
require('./blogs.modal');
require('./inquiry.modal');
require('./comments.modal');
