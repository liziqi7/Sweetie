define('', '', function(require) {
	var B = require('backbone');

	var H = require('text!../../../tpl/xiaoxi/index.html');
	var list = require("view/list/xiaoxi");

	var V = B.View.extend({
		template: H,
		events: {
			"touchstart .js-xiaoxi-tab div": "doTab"
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
			var h = $("body").height() - $("#js-navs").height();
			var $List = t.$el.find(".js-list");
			$List.height(h - $List.offset().top);
			/*示例化子试图*/
			t.List = new list({
				el: t.$el.find(".js-list")
			});
		},
		doTab: function(e) {
			var t = this;
			var idx = $(e.currentTarget).data("idx");
			t.$el.find(".js-xiaoxi-tab div").each(function(i, v) {
				$(this).toggleClass("on", i == idx);
			});	
			t.List.doTab(idx);
		}
	});
	return function(pars) {

		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})