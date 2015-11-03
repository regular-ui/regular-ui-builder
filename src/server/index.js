var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var mcssController = require('./controller/mcss.js');

app.use(express.static('public'));
app.get(/theme\/(.*)/, mcssController.get);

var server = app.listen(3333, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:3333');
});

fs.watch(__dirname, {persistent: false, recursive: true}, function(event, filename) {
    var fullname = path.join(__dirname, filename);

    if(fullname === __filename)
        return;

    try {
        var filepath = require.resolve(fullname);
        if(require.cache[filepath]) {   
            require.cache[filepath] = undefined;
            console.log('\033[34m[' + event + 'd]', filename, '\033[0m');
            // require.cache[filepath] = require(filepath);
        }
    } catch(e) {}
});