define('', '', function(require) {
	var B = require('backbone');

	var H = require('text!../../../tpl/index/index.html');
	// var slides = require("view/slides/index");
	// var list = require("view/list/index");

	var V = B.View.extend({
		template: H,
		events: {

		},
		initialize: function() {
			var t = this;
			t.render();
		},
		//待优化
		render: function() {
			var t = this,
				data = {};
			var html = _.template(t.template, data);
			t.$el.show().html(html);
            Jser.loadimages();
		}
	});
	return function(pars) {

		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})