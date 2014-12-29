define('', '', function(require) {
	var B = require('backbone');
	var L = require('text!../../../tpl/list/diantai.html');
	var ISCROLL = require('plusin/iscroll');

	var V = B.View.extend({
		template: L,
		randomAudio: 0,
		events: {
			"touchstart .btn_play": "doPlayAudio",
			"touchstart .btn_xunhuan": "doLoopAudio",
			"touchstart .btn_houtui": "doRewindAudio",
			"touchstart .btn_qianjin": "doForwardAudio",
			"touchstart .btn_suiji": "doRandomAudio"
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
			global_h5audio = t.oAudio = t.$el.find(".h5audio_media")[0];
			t.bindEvent();
		},
		bindEvent: function() {
			var t = this;
			var oAudio = t.oAudio;
			oAudio.addEventListener("playing", function() {
				t.$el.find(".btn_play").addClass("btn_Pause");
			}, true);
			oAudio.addEventListener("pause", function() {
				t.$el.find(".btn_play").removeClass("btn_Pause");

			}, true);
			var aFile = ["resource/mp3/fm.mp3", "resource/mp3/live.mp3", 'resource/mp3/ye.mp3'];
			idx = 0;
			oAudio.addEventListener("ended", function() {
				if (!oAudio.loop) {
					if (t.randomAudio) {
						var cacheFile = aFile.splice(idx, 1);
						if (cacheFile.length > 0) {
							idx = randomNum(0, cacheFile.length)
						}
					} else {
						idx++;
						idx = idx % aFile.length;
					}
					oAudio.src = aFile[idx];
					oAudio.play();
				}
			}, true);

			function randomNum(startNum, endNum) {
				if (startNum < endNum) {
					return Math.floor(Math.random() * (endNum - startNum)) + startNum;
				} else {
					return startNum;
				}
			}
			oAudio.addEventListener("timeupdate", progressBar, true);
			var obtnPpro = t.$el.find(".btn_pro")[0];
			var $Playon = t.$el.find(".play_on")
			var w = $Playon.width();
			var oPlayon = $Playon[0];
			t.$el.find(".btn_houtui").on("touchstart", function() {
				$(this).addClass("btn_houtui2");
			}).on("touchend", function() {
				$(this).removeClass("btn_houtui2");
			});

			t.$el.find(".btn_qianjin").on("touchstart", function() {
				$(this).addClass("btn_qianjin2");
			}).on("touchend", function() {
				$(this).removeClass("btn_qianjin2");
			});

			function progressBar() {
				var elapsedTime = Math.round(oAudio.currentTime);
				var dist = elapsedTime / oAudio.duration * 100;
				oPlayon.style.webkitTransform = 'translateX(' + dist + '%)';
			}
			obtnPpro.addEventListener("touchstart", start, false);
			var delta = {};
			var start = {};

			function start(event) {
				this.addEventListener('touchmove', move, false);
				this.addEventListener('touchend', end, false);
			};

			function move(event) {
				if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
				event.preventDefault();
				var touches = event.touches[0];
				var x = touches.pageX;
				if (x >= 0 && x <= w) {
					dist = x / w * 100;
					oPlayon.style.webkitTransform = 'translateX(' + dist + '%)';
					oAudio.currentTime = oAudio.duration * dist / 100;
				}
			};

			function end(event) {
				this.removeEventListener('touchmove', move, false)
				this.removeEventListener('touchend', end, false)
			}
		},
		doPlayAudio: function() {
			var t = this;
			var oAudio = t.oAudio;
			if (oAudio.paused) {
				oAudio.play();
				t.$el.find(".btn_play").addClass("btn_Pause");
			} else {
				oAudio.pause();
				t.$el.find(".btn_play").removeClass("btn_Pause");
			}
		},
		doLoopAudio: function() {
			var t = this;
			var oAudio = t.oAudio;
			oAudio.loop = !oAudio.loop;
			if (oAudio.loop) {
				t.$el.find(".btn_xunhuan").addClass("btn_xunhuan2");
				if (t.randomAudio) {
					t.doRandomAudio();
				}
			} else {
				t.$el.find(".btn_xunhuan").removeClass("btn_xunhuan2");
			}
		},
		doRewindAudio: function() {
			var t = this;
			var oAudio = t.oAudio;
			oAudio.currentTime -= 15.0;
		},
		doForwardAudio: function() {
			var t = this;
			var oAudio = t.oAudio;
			oAudio.currentTime += 15.0;
		},
		doRandomAudio: function() {
			var t = this;
			var oAudio = t.oAudio;
			t.randomAudio = !t.randomAudio;
			if (t.randomAudio) {
				t.$el.find(".btn_suiji").addClass("btn_suiji2");
				if (oAudio.loop) {
					t.doLoopAudio();
				}
			} else {
				t.$el.find(".btn_suiji").removeClass("btn_suiji2");
			}
		}
	});
	return function(pars) {

		return new V({
			el: pars.el
		});
	}
})