define('', '', function(require) {
	var B = require('backbone');

	var H = require('text!../../../tpl/wode/index.html');
	var list = require("view/list/wode");

	var V = B.View.extend({
		template: H,
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
			var h = $("body").height() - $("#js-navs").height();
			var $List = t.$el.find(".js-list");
			$List.height(h - $List.offset().top);
			/*示例化子试图*/
			t.List = new list({
				el: t.$el.find(".js-list")
			});
		}
	});
	return function(pars) {

		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})