define('base/model', '', function(require) {
    var B = require('backbone');

    var model = B.Model.extend({
        _loaded: true,
        //重载数据获取方法
        sync: function(method, model, options) {
            var params = _.extend({
                type: 'get',
                url: model.url,
                dataType: "json",
                data: model.get("pars")
            }, options);
            return Jser.getJSON(params.url, params.data, params.success, params.error, params.method, params.dateType);
        },
        initialize: function() {
            var t = this;

            t.on("change:pars", function() {
                t.fetchData();
            });
            t.on("change:action", function() {
                t.fetchData();
            });
        },
        fetchData: function() {
            var t = this;
            this.url = this.get("action");

            t.fetch({
                cache: true,
                success: function(rs) {
                    t._loaded = true;
                    t.set("data", rs.data);
                    // window.console && console.log(t.get("data"));
                },
                error: function(collection, rs) {
                    //alert("e");
                    t.set("erro", {
                        data: rs,
                        rd: new Date().getTime()
                    });
                }
            })
        }
    });

    return model;
});