window.Jser = {
    loadimages: function(el) {
        el = el || "body";
        var lazy = $(el).find("[data-src]");
        lazy.each(function(i) {
            loadImg.call(this);
        });
        function loadImg() {
            var t = this;
            var source = t.getAttribute("data-src");
            var img = new Image();
            img.src = source;
            img.onload = function() {
                t.setAttribute("src", source);
                $(t).removeAttr("data-src");
            }
            img.onerror = function() {
                t.setAttribute("src", "resource/images/loadimg.png")
            }
        }
    }
}
