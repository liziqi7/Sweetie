define('', '', function(require) {
	var B = require('backbone');
	var M = require('base/model');
	var H = require('text!../../../tpl/role/index.html');
	// var list = require("view/list/haojian");
	var model = new M({
		// data: ST.PHPDATA.userInfo
	});
	var V = B.View.extend({
		model: model,
		template: H,
		isEnableLoadData: true,
		iTimer: null,
		isLoad:true,
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
			t.bindEvent();
		},
		bindEvent: function() {
			var t = this;
			t.killScroll(true);
			$(window).scroll(function() {
				if (!t.iTimer && t.isEnableLoadData &&t.isLoad&& window.location.hash.indexOf("#role/index") != -1) {
					t.iTimer = setTimeout(function() {
						if ($(document).height() - $("body").scrollTop() - $(window).height() < 100) {
							t.loadData();
						}
						t.clearTime();
					}, 200);
				}
				t.killScroll();
			});
		},
		count:0,
		loadData: function() { 
			var t=this;
			t.isLoad=false;
			
			setTimeout(function(){
				t.count++;
				var _html="";
				_html='<li>'
					+'<div class="role-comment-heart clean">'
					+'<div class="heart left">'
					+'<div class="hasheart" style="width:'+t.count*2+'0px;"></div>'
					+'</div>'
					+'<span class="right">186****0571</span>'
					+'</div>'
					+'<p>十分好评十分好评十分好评</p>'
					+'<p class="textright">2014年12月25日</p>'
					+'</li>';
				t.$el.find('.js-role-comment').append(_html);
				t.isLoad=true;
				if(t.count==3){
					t.isEnableLoadData=false;
					t.$el.find(".js-list-loading").hide();
				}
			},500);
		},
		clearTime: function() {
			var t=this;
			if (t.iTimer) {
				clearTimeout(t.iTimer);
			}
			t.iTimer = null;
		},
		killScroll: function(isKill) {
			var t = this;
			if ((!t.isEnableLoadData && window.location.hash.indexOf("#role/index") == -1) || !!isKill) {
				$(window).off('scroll');
				t.clearTime();
			}
		},
		goback: function() {
			if (window.history && window.history.length > 1) {
				window.history.back();
			} else {
				window.location.href = "#index/index";
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