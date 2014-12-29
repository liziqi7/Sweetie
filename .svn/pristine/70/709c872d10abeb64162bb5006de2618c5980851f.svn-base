define('', '', function(require) {
	var B = require('backbone');
	var L = require('text!../../../tpl/list/index.html');
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
        			loadimages();
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
			var generatedCount = 6;

			function pullDownAction() {
				setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
					var el, li, i;
					el = t.$el.find(".js-list-pic")[0];
					li = document.createElement('li');
					generatedCount++;
					generatedCount = generatedCount % 11;
					li.innerHTML = '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic.png" data-src="resource/images/pic' + generatedCount + '.png" /><div class="pic-label"><div class="pic-bg"></div><div class="pic-txt">夜未央-每晚' + generatedCount + '点等你</div></div></a>' + '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic.png"  data-src="resource/images/pic' + (generatedCount + 1) + '.png" /><div class="pic-label"><div class="pic-bg"></div><div class="pic-txt">夜未央-每晚' + generatedCount + '点等你</div></div></a>';
					el.insertBefore(li, el.childNodes[0]);
					generatedCount++;
					generatedCount = generatedCount % 11;
					myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
			}

			function pullUpAction() {
				setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
					var el, li, i;
					el = t.$el.find(".js-list-pic")[0];
					generatedCount++;
					generatedCount = generatedCount % 11;
					li = document.createElement('li');
					li.innerHTML = '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic.png"  data-src="resource/images/pic' + generatedCount + '.png" /><div class="pic-label"><div class="pic-bg"></div><div class="pic-txt">夜未央-每晚' + generatedCount + '点等你</div></div></a>' + '<a href="javascript:;" class="list-a pic-frame"><img src="resource/images/pic.png"  data-src="resource/images/pic' + (generatedCount + 1) + '.png" /><div class="pic-label"><div class="pic-bg"></div><div class="pic-txt">夜未央-每晚' + generatedCount + '点等你</div></div></a>';
					el.appendChild(li, el.childNodes[0]);
					generatedCount++;
					generatedCount = generatedCount % 11;
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