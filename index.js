require('dotenv').config()
const http = require('http')
const url = require('url')
const mongoose = require('mongoose')

const hostname = 'localhost';

const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('success connect db');
});

const AddNewUser = async (req) => {
    const user = new User({name : req});
    await user.save()
}

const server = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);
    if(reqUrl.pathname == '/' && req.method === 'GET'){
        console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
        service.getAllUser(req,res);
    }else if(reqUrl.pathname == '/' && req.method === 'POST'){
        console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
        service.addNewUser(req,res);
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});

var env = process.env.NODE_ENV || 'development';

switch (env) {
    case 'development':
        // Setup development config
        server.listen(port, hostname, () => {
            console.log(`server running at http://${hostname}:${port}`);
        })
        break;
    default:
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
        // Setup production config
        break;
}