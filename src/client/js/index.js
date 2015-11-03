var Component = require('regular-ui/src/js/base/component');
var template = require('text!./index.html');
var _ = require('regular-ui/src/js/base/util');

var ListView = require('regular-ui/src/js/module/listView');
var mcssManager = require('./util/mcssManager.js');

// var mcss = require('mcss');

var component = new Component({
    template: template,
    config: function() {
        _.extend(this.data, {
            tools: [
                {name: 'Button'},
                {name: 'DatePicker'},
                {name: 'Pager'}
            ]
        });
    },
    large: function() {
        var style = document.getElementById('style');
        var content = style.textContent;

        content = content.replace(/(\.ru-btn\{\s+padding:0 )(\d+)px;/, function(m, $1, $2) {
            return $1 + (+$2 + 1) + 'px;';
        });

        // mcss().translate(content).done(function(result) {
        //     style.textContent = result;
        // });

        style.textContent = content;
       
    }
}).$inject('#view');


mcssManager.open('flat.css').then(function(result) {
    // mcss({
    //     filename: '/'
    // }).translate(result).done(function(result2) {
    //     var style = document.getElementById('style');
    //     style.textContent = result2;
    // }).fail(function(error) {
    //     console.error(error.message);
    // });
    var style = document.getElementById('style');
    style.textContent = result;
});

// console.log(mcssManager.import('default/base/var.mcss'));
// mcssManager.open('default/base/var.mcss', function(result) {
//     console.log(result);
// });

