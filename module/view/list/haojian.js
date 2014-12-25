define('', '', function(require) {
	var B = require('backbone');
	var L = require('text!../../../tpl/list/haojian.html');
	var ISCROLL = require('plusin/iscroll');

	var V = B.View.extend({
		template: L,
		events: {
			"touchstart .js-list-pic li": "doSelect"
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
			var oPullDown = t.$el.find(".pullDown");
			var oPullUp = t.$el.find(".pullUp");
			var oPullDowniconfont = oPullDown.find(".iconfont");
			var oPullUpiconfont = oPullUp.find(".iconfont");
			var oPullDownLabel = oPullDown.find(".pullDownLabel");
			var oPullUpLabel = oPullUp.find(".pullUpLabel");
			var pullDownOffset = oPullDown.height();
			var pullUpOffset = pullDownOffset;
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			var myScroll = new ISCROLL(t.$el.find(".wrapper")[0], {
				topOffset: pullDownOffset,
				// 还原
				onRefresh: function() {
					if (oPullDowniconfont.hasClass('icon-shuaxin')) {
						oPullDowniconfont.removeClass("icon-shuaxin").addClass("icon-xiangxia");
					} else if (oPullUpiconfont.hasClass('icon-shuaxin')) {
						oPullUpiconfont.removeClass("icon-shuaxin").addClass("icon-xiangshang");
					}
				},
				onScrollMove: function() {
					//判断当前滚动是到顶端还是底端；					
					if (this.y > 0) {
						if (!oPullDowniconfont.hasClass('icon-xiangshang')) {
							oPullDowniconfont.removeClass("icon-xiangxia").addClass("icon-xiangshang");
							this.minScrollY = 0;
						}
					} else if (this.y < 0 && oPullDowniconfont.hasClass('icon-xiangshang')) {
						oPullDowniconfont.removeClass("icon-xiangshang").addClass("icon-xiangxia");
						this.minScrollY = -pullDownOffset;
					} else if (this.y < (this.maxScrollY - pullDownOffset)) {
						if (!oPullUpiconfont.hasClass('icon-xiangxia')) {
							oPullUpiconfont.removeClass("icon-xiangshang").addClass("icon-xiangxia");
							this.maxScrollY = this.maxScrollY;
						}
					} else if (this.y > (this.maxScrollY + pullDownOffset) && oPullUpiconfont.hasClass('icon-xiangxia')) {
						oPullUpiconfont.removeClass("icon-xiangxia").addClass("icon-xiangshang");
						this.maxScrollY = pullUpOffset;
					}
					// console.log(this.y)
				},
				onScrollEnd: function() {
					// 刷新
					if (oPullDowniconfont.hasClass('icon-xiangshang')) {
						oPullDowniconfont.removeClass("icon-xiangshang").addClass("icon-shuaxin");
						pullDownAction();
					} else if (oPullUpiconfont.hasClass('icon-xiangxia')) {
						oPullUpiconfont.removeClass("icon-xiangxia").addClass("icon-shuaxin");
						pullUpAction();
					}
				}
			});
			setTimeout(function() {
				myScroll.refresh();
			}, 100);
			var generatedCount = 0;

			function pullDownAction() {
				setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
					var el, li, i;
					el = t.$el.find(".js-list-pic")[0];
					li = document.createElement('li');
					generatedCount++;
					li.innerHTML = ' <div class="hao-pic"><img src="resource/images/jian2.png"></div><div class="hao-explain"><div class="hao-name">推荐<em>一起偶发的风' + generatedCount + '</em></div><span class="hao-num">1700<em></em></span></div><div class="hao-buy">购买</div>';
					el.insertBefore(li, el.childNodes[0]);
					myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
			}

			function pullUpAction() {
				setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
					var el, li, i;
					el = t.$el.find(".js-list-pic")[0];
					generatedCount++;
					li = document.createElement('li');
					li.innerHTML = '<div class="hao-pic"><img src="resource/images/jian2.png"></div><div class="hao-explain"><div class="hao-name">推荐<em>一起偶发的风' + generatedCount + '</em></div><span class="hao-num">1700<em></em></span></div><div class="hao-buy">购买</div>';
					el.appendChild(li, el.childNodes[0]);
					myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
			}
		},
		doSelect: function(e) {
			var t = this;
			var eli = e.currentTarget;
			t.$el.find(".js-list-pic li").each(function(i, v) {
				$(this).toggleClass("on", v == eli);
			});
			// alert(1);
		}
	});
	return function(pars) {

		return new V({
			el: pars.el
		});
	}
})