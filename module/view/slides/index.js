define('', '', function(require) {
	var B = require('backbone');
	var S = require('text!../../../tpl/slides/index.html');
	var SWIPE=require('plusin/swipe');

	var V = B.View.extend({
		template: S,	
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

			new SWIPE(t.$el.children()[0],{
				auto:2000,
				speed:800,
				// stopPropagation: true,
                continuous: true,
				callback: function(index, element) {
					t.$el.find(".slides-dots").find("li").each(function(i,v){
                     t.$(this).toggleClass("on",i==index);
                	});
				}
			});
		}
	});
	return function(pars) {

		return new V({
			el: pars.el
		});
	}
})