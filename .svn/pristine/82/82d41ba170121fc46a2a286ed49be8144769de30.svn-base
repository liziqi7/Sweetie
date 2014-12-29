define('', '', function(require) {
	var B = require('backbone');
	var M = require('base/model');
	var H = require('text!../../../tpl/zhifu/index.html');
	// var list = require("view/list/haojian");
	var model = new M({
		// data: ST.PHPDATA.userInfo
	});
	var V = B.View.extend({
		model: model,
		template: H,
		events: {
			"click .js-back": "goback"
		},
		initialize: function() {
			var t = this;
			if (t.model._loaded) {
				t.render();
			} else {
				t.listenTo(t.model, "sync", function() {
					t.render();
				});
			}
		},
		//待优化
		render: function() {
			var t = this,
				data = {};
			var html = _.template(t.template, data);
			t.$el.show().html(html);
			var _txt="您的订单已生成，我们的工作人员会在24小时内联系你确认订单，请保持电话畅通，谢谢";
			Jser.alert(_txt);
		},
		goback: function() {
			if (window.history && window.history.length > 1) {
				window.history.back();
			} else {
				window.location.href = "#role/index";
			}
		},
		changeId: function() {
			var t = this;
			if (t.model._loaded) {
				t.render();
			} else {
				t.model.fetchData();
			}
		}
	});
	return function(pars) {

		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})