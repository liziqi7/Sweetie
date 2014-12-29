define('', '', function(require) {
	var B = require('backbone');
	var L = require('text!../../../tpl/list/dingyue.html');
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
					li.innerHTML = '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic4.png" /></a><div class="pic-explain"><a href="#diantai/index" class="pic-diantai">听风听雨小窗眠' + generatedCount + '</a><div class="pic-erji">花思物语</div><div class="pic-guanzhu"><div class="pic-ren">123</div><div class="pic-xunzhang">1231</div></div></div>';
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
					li.innerHTML = '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic1.png" /></a><div class="pic-explain"><a href="#diantai/index" class="pic-diantai">听风听雨小窗眠' + generatedCount + '</a><div class="pic-erji">花思物语</div><div class="pic-guanzhu"><div class="pic-ren">123</div><div class="pic-xunzhang">1231</div></div></div>';
					el.appendChild(li, el.childNodes[0]);
					myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
			}
		}
	});
	return function(pars) {

		return new V({
			el: pars.el
		});
	}
})