/*
 * jQuery localLinker v0.1 
 *
*/
 
(function ($, window) {

    $.fn.localLinker = function (options) {
        var $this = this;
        var settings = $.extend({
            defaultTopMargin: 0,
            scrollDuration: 1000,
            easing: 'easeInOutExpo',
            imageSrcChangeWhenScrollInSection: false
        }, options);

        $this.bind('click', function (event) {
            var $anchor = $(this);
            var margin = $anchor.data("margin");

            $('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top + (margin ? margin : settings.defaultTopMargin) }, settings.scrollDuration);
            event.preventDefault();
        });
        
        if (settings.imageSrcChangeWhenScrollInSection === true) {
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                var currentLocalLinker = _getCurrentLocalLinker(scrollTop, $this, settings.defaultTopMargin);

                $('img', $this).each(function () {
                    var target = $(this);
                    target.attr('src', target.attr('src').replace('_on', '_off'));
                });

                if (currentLocalLinker === undefined) return;
                $('img', currentLocalLinker).attr('src', $('img', currentLocalLinker).attr('src').replace('_off', '_on'));
            });
        }
        return this;
    };

    function _getCurrentLocalLinker(scrollTop, localLinkers, defaultTopMargin) {
        var currentLinker = undefined;

        localLinkers.each(function () {
            var $anchor = $(this);
            var $targetSection = $($anchor.attr('href'));
            var margin = $anchor.data("margin") ? $anchor.data("margin") : defaultTopMargin;

            if ($anchor.is(':visible') == false || $targetSection.offset() === undefined) return;

            if (scrollTop >= Math.floor($targetSection.offset().top - margin)) {
                currentLinker = $anchor;
            }
        });
        return currentLinker;
    }
}(jQuery, window));