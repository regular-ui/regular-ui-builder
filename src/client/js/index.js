var Component = require('regular-ui').Component;
var template = require('text!./index.html');
var _ = require('regular-ui')._;

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
    }
}).$inject('#view');