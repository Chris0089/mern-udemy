const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

const database = require('./config/keys').mongoURL;

mongoose.Promise = global.Promise;
mongoose
    .connect(database, {useNewUrlParser:true})
    .then(() => console.log('Connected with MongoDB'))
    .catch(an_error => console.log(an_error));
    
app.get('/', 
    (request, response) => 
    response.send("Hey dude, how are you doing? Ontas? Te pago el uber."));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`My server is running on port ${port}`))