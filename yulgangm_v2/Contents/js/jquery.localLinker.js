/*
 * jQuery localLinker v0.1 
 *
*/

(function ($, window) {

    $.fn.localLinker = function (options) {
        var localLinkers = this;
        //default
        var settings = $.extend({
            defaultTopMargin: 0,
            scrollDuration: 1000,
        //easeInOutQuint ,easeInOutExpo , easeOutExpo ...
            //easing: 'easeInOutExpo',
        //haveImgChange?
            imageSrcChangeWhenScrollInSection: false
        }, options);

        localLinkers.bind('click', function (event) {
            var $anchor = $(this);
            var margin = $anchor.data("margin");

            $('html, body').stop().animate({ scrollTop: $($anchor.data('href')).offset().top + (margin ? margin : settings.defaultTopMargin) }, settings.scrollDuration);
            event.preventDefault();
        });

        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            var currentLocalLinker = _getCurrentLocalLinker(scrollTop, localLinkers, settings.defaultTopMargin);

            localLinkers.removeClass('active');
            if (currentLocalLinker === undefined) return;
            currentLocalLinker.addClass('active');
        });
       
        return this;
    };

    function _getCurrentLocalLinker(scrollTop, localLinkers, defaultTopMargin) {
        var currentLinker = undefined;

        localLinkers.each(function () {
            var $anchor = $(this);
            var $targetSection = $($anchor.data('href'));
            var margin = $anchor.data("margin") ? $anchor.data("margin") : defaultTopMargin;

            if ($anchor.is(':visible') == false || $targetSection.offset() === undefined) return;

            if (scrollTop >= Math.floor($targetSection.offset().top - margin)) {
                currentLinker = $anchor;
            }
        });
        return currentLinker;
    }
}(jQuery, window));