define('base/model', '', function(require) {
    var B = require('backbone');

    var model = B.Model.extend({
        _loaded:false,
        //重载数据获取方法
        sync: function(method, model, options) {
            var params = _.extend({
                type: 'get',
                url: model.url,
                dataType: "json",
                data: model.get("pars")
            }, options);
            return Jser.ajax(params);
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
                },
                error: function(collection, rs) {
                    //alert("e");
                }
            })
        }
    });

    return model;
}); 
