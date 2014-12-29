define('', '', function(require) {
	var B = require('backbone');
	var L = require('text!../../../tpl/list/zuzhi.html');
	var ISCROLL = require('plusin/iscroll');

	var V = B.View.extend({
		template: L,
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
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			t.myScroll = new ISCROLL(t.$el.find(".wrapper")[0]);
			setTimeout(function() {
				t.myScroll.refresh();
			}, 100);
		}
	});
	return function(pars) {

		return new V({
			el: pars.el
		});
	}
})