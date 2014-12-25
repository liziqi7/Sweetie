define(function(require, exports) {
    var B = require('backbone');
    //导航菜单视图
    var navView = B.View.extend({
        el: $("#js-navs"),
        map: {
            "dingyue": 0,
            "haojian": 1,
            "index": 2,
            "xiaoxi": 3,
            "wode": 4,
            "zuzhi": 4
        },
        events: {
            "touchstart .navlist span": "changeNav"
        },
        initialize: function() {
            var t = this;
            t.navs = this.$el.find(".navlist li");
            return t;
        },
        initNav: function(m) {
            var t = this,
                idx;
            if (idx = this.map[m], idx != undefined) {
                this.$el.show();
                //激活导航
                t.navs.each(function(i, v) {
                    $(this).toggleClass("on", i == idx);
                });
            } else {
                this.$el.hide();
            }
        },
        //导航切换
        changeNav: function(e) {
            e.preventDefault();
            var t = this,
                em = e.currentTarget;
            var page = $(em).data("page");
            //激活导航
            t.navs.each(function(i, v) {
                $(this).toggleClass("on", v == em.parentElement);
            });
            console.log("#" + page + "/index");
            window.location.hash = "#" + page + "/index";
        }
    });

    //配置路由
    var motelRouter = B.Router.extend({

        routes: {
            '': 'index',
            'base': 'error',
            ':model(/:action)(/*condition)': 'loadmodel',
            '404': "error",
            "*error": "error"
        },
        error: function() {
            this.loadmodel('error', 'index');
            /*
            window.setTimeout(function(){
                location.hash="#";
            },3000);
           */
            return false;
        },
        /*初始化,预留做登录用户检测*/
        initialize: function() {
            //初始化导航菜单视图
            this.nav = new navView();
        },
        index: function() {
            this.loadmodel('index', 'index');
        },
        //按照module/action(/conditions) 格式
        loadmodel: function(md, ac, con) {
            var self = this;
            this.nav.initNav(md);
            //动态创建元素
            var el = B.$("#" + md + "_" + ac),
                cj = {
                    model: md,
                    action: ac
                };
            //参数获取转换   将参数字符串'a:123/b:456'转换为json对象{a:123, b:456}
            if (con && con.indexOf(':') > -1) {
                con.replace(/(\w+)\s*:\s*([\w-]+)/g, function(a, b, c) {
                    if (b != "model" && b != "action") b && (cj[b] = c);
                });
            }
            //动态生成容器
            if (!el.length) B.$("<section />").attr("id", md + "_" + ac).appendTo($("#js-wrap"));
            B.$("#js-wrap").children("section").hide();
            //加载model目录下对应的模块
            var view = md + ac;
            if (!App.Views[view]) {
                $("#js-loading").show();
                require.async(['view', md, ac || "index"].join('/'), function(cb) {
                    if (cb) {
                        scrollTop();
                        hideLoad();
                        App.Views[view] = cb(cj);
                    } else {
                        // location.hash="404";
                    }
                })
            } else {
                //done
                if (cj.diyid) {
                    if (cj.id) {
                        App.Views[view].changeId && App.Views[view].changeId(cj.diyid, cj.id);
                    } else {
                        App.Views[view].changeId && App.Views[view].changeId(cj.diyid);
                    }
                } else {
                    App.Views[view].$el.show();
                    // $(window).trigger('resize');
                }

                scrollTop();
            }
        },
    });
    function hideLoad() {
        setTimeout(function() {
            $("#js-loading").hide();
        }, 300);
    }

    function scrollTop() {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100)
    }
    //定义全局变量App
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        initialize: function() {
            new motelRouter();
            B.history.start();
        }
    };

    exports.run = App.initialize;
});