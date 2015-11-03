var fs = require('fs');

var themes = {
    core: {path: '/Volumes/Home/yusen/Projects/GitHub/Regular UI/regular-ui/src/mcss/core/'},
    'default': {path: '/Volumes/Home/yusen/Projects/GitHub/Regular UI/regular-ui/src/mcss/default/'},
}

exports.get = function (req, res) {
    var cap = req.path.match(/^\/theme\/(.*?)\/(.*)$/);

    var theme = cap[1];
    if(!themes[theme])
        return res.send({code: 404, message: 'Cannot find this theme!'});

    var filepath = themes[theme].path + cap[2];

    if(!fs.existsSync(filepath) || !fs.statSync(filepath).isFile())
        return res.send({code: 404, message: req.path + ' is not exists!'});

    fs.readFile(filepath, function(err, data) {
        if(err)
            return res.send({code: 500, err: err});

        res.send({code: 200, result: data + ''});
    });
}