var ajax = require('regular-ui/src/js/base/ajax');

var caches = {
    'core/base/var.mcss': '$brand-primary = #009cef;',
    'default/base/var.mcss': '@import "../../core/base/var.mcss";\n$brand-secondary;'

};

var mcssManager = {
    caches: caches
};




mcssManager.open = function(path) {
    return new Promise(function(resolve, reject) {
        if(caches[path])
            return resolve(caches[path]);

        ajax.get('/theme/' + path, function(result) {
            caches[path] = result;
            resolve(result);
        }.bind(this), function(error) {
            reject(error);
        });
    }.bind(this));
}

mcssManager.close = function() {

}

mcssManager.save = function() {

}

mcssManager.resolve = function(path) {
    path = path.replace(/^..\/..\/core/, 'core');
    return path;
}

mcssManager.import = function(path) {
    path = this.resolve(path);

    if(!caches[path])
        throw path + ' is not loaded!';

    var self = this;
    return caches[path].replace(/@import\s+['"](.*)['"]\s*;/g, function(m, $1) {
        return self.import($1);
    });
}

module.exports = mcssManager;