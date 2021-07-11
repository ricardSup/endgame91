const url = require('url');
const User = require('./models/user');

exports.testRequestGet = function(req, res){
    const reqUrl = url.parse(req.url, true);
    console.log(reqUrl.query.name);

    var response = {
        "text": "Hello " + reqUrl.query.name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response))
}

exports.getAllUser = async (req,res) => {
    var listUser;
    try {
        listUser = await User.find({});
    } catch(err){
        console.error.bind(console);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(listUser));
}

exports.addNewUser = function(req,res){
    body = '';
    req.on('data', function(chunk){
        body += chunk;
        if (body.length > 1e6)
        req.connection.destroy()
    })

    req.on('end', function () {
        var post = JSON.parse(body);

        const newUser = new User;
        newUser.Name = post.Name;
        newUser.DateOfBirth = post.DateOfBirth;
        newUser.save();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post.Name));
    });
}