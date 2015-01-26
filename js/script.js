/**
 * Created by GuNs on 18-01-2015.
 */

if (window.ShadowDOMPolyfill) {
    // blunt hack for ShadowDOM Polyfill inability to wrap `document` and `document.body`
    jQuery.fn._init = jQuery.fn.init;
    jQuery.fn.init = function(selector, context) {
        if (selector && selector.nodeType) {
            selector = ShadowDOMPolyfill.wrapIfNeeded(selector);
        }
        return jQuery.fn._init(selector, context);
    }
}

//Preloading js
$(function($) {
    var cache = [];
    // Arguments are image paths relative to the current page.
    $.preLoadImages = function () {
        var args_len = arguments.length;
        for (var i = args_len; i--;) {
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }
});

$(window).load(function(){
    console.log($(window).width());
});