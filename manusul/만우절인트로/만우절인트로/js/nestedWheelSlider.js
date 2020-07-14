(function ($, window) {
    $.fn.nestedWheelSlider = function (options) {
        var defaults = {
            nestedSlideSelector: '.nested-slide',
            nestedSlideNextButtonSelector: '.nested-next-btn',
            nestedSlidePrevButtonSelector: '.nested-prev-btn',
            transitionDelay: 500,
            onChangeCallback: undefined
        };
        var settings = $.extend(defaults, options);
        var $sliders = this;
        var currentSlideIdx = 0;
        var timerId;
        var waitFlag = false;

        this.each(function () {
            $(settings.nestedSlideNextButtonSelector, $(this)).click(function () {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                $sliders.next();
            });

            $(settings.nestedSlidePrevButtonSelector, $(this)).click(function () {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                $sliders.prev();
            });
        });

        $('html').on('mousewheel DOMMouseScroll', function (e) {
            var direction = (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) ? 'down' : 'up';
            if (verticalScrollPresent()) {
                if(needTo_letTheScrollMove(direction)) {
                    return;
                }
                $(window).scrollTop(0);
            }
            changeSlide(direction);
        });

        function verticalScrollPresent() {
            return (window.document.documentElement.scrollHeight !== window.document.documentElement.clientHeight);
        }

        function needTo_letTheScrollMove(direction) {
            return (direction === 'down' && !isScrolledToTheBottom()) || (direction === 'up' && !isScrolledToTheTop());
        }

        function isScrolledToTheBottom() {
            var buffer = 1;
            return $(window).scrollTop() + $(window).height() > $(window.document).height() - buffer;
        }

        function isScrolledToTheTop() {
            var buffer = 1;
            return $(window).scrollTop() < buffer;
        }

        this.next = function () {
            changeSlide('down');
        };

        this.prev = function () {
            changeSlide('up');
        };

        this.slideTo = function (moveToIdx) {
            if (currentSlideIdx === moveToIdx) {
                return;
            }
            var direction = moveToIdx > currentSlideIdx ? 'forward' : 'back';
            $sliders.each(function (idx) {
                if (!isPassedThroughThisSlide(idx, moveToIdx, direction)) {
                    return;
                }
                var $nestedSlides = $(this).find(settings.nestedSlideSelector);
                if ($nestedSlides.length > 0) {
                    adjustNestedSlideIdx($(this), idx, $nestedSlides, direction);
                }
            });
            currentSlideIdx = moveToIdx;
            $sliders.eq(moveToIdx).data('nested-slide-index', 0);
            showSlide(moveToIdx, 0);
        };

        function isPassedThroughThisSlide(slideIdx, moveToIdx, direction) {
            return direction === 'forward' ? slideIdx < moveToIdx : slideIdx > moveToIdx;
        }

        function adjustNestedSlideIdx($slide, idx, $nestedSlides, direction) {
            var nestedSlideIdx = direction === 'forward' ? $nestedSlides.length - 1 : 0;
            $slide.data('nested-slide-index', nestedSlideIdx);
            updateNestedButtonStatus($slide, nestedSlideIdx);
            showSlide(idx, nestedSlideIdx);
        }

        function changeSlide(direction) {
            if (waitFlag) {
                return;
            }
            waitFlag = true;
            var $currentSlide = $sliders.eq(currentSlideIdx);

            var shouldChangeNested = isParentOrChildToChange($currentSlide, direction) === 'child';
            if (shouldChangeNested) {
                var nestedSlideIdx = $currentSlide.data('nested-slide-index') || 0;
                nestedSlideIdx = nestedSlideIdx + (direction === 'down' ? 1 : -1);
                $currentSlide.data('nested-slide-index', nestedSlideIdx);
                updateNestedButtonStatus($currentSlide, nestedSlideIdx);
                showSlide(currentSlideIdx, nestedSlideIdx);
                setDelayTimer();
                return;
            }

            var hasNextSlideInThatDirection =
                currentSlideIdx !== (direction === 'down' ? $sliders.length - 1 : 0);
            if (hasNextSlideInThatDirection) {
                currentSlideIdx = currentSlideIdx + (direction === 'down' ? 1 : -1);
                showSlide(currentSlideIdx);
            }

            setDelayTimer();
        }

        function setDelayTimer() {
            clearTimeout(timerId);
            timerId = setTimeout(function () {
                waitFlag = false;
            }, settings.transitionDelay);
        }

        function isParentOrChildToChange($currentSlide, direction) {
            var $nestedSlides = $currentSlide.find(settings.nestedSlideSelector);
            if ($nestedSlides.length === 0) {
                return 'parent';
            }
            var nestedSlideIdx = $currentSlide.data('nested-slide-index') || 0;

            if (direction === 'down') {
                var isLastChild = nestedSlideIdx === $nestedSlides.length - 1;
                return isLastChild ? 'parent' : 'child';
            } else {
                var isFirstChild = nestedSlideIdx === 0;
                return isFirstChild ? 'parent' : 'child';
            }
        }

        function updateNestedButtonStatus($currentSlide, nestedSlideIdx) {
            var $nestedSlides = $currentSlide.find(settings.nestedSlideSelector);
            var isLastChild = nestedSlideIdx === $nestedSlides.length - 1;
            if (isLastChild) {
                $(settings.nestedSlideNextButtonSelector, $currentSlide).addClass(
                    'disabled'
                );
            } else {
                $(settings.nestedSlideNextButtonSelector, $currentSlide).removeClass(
                    'disabled'
                );
            }
            var isFirstChild = nestedSlideIdx === 0;
            if (isFirstChild) {
                $(settings.nestedSlidePrevButtonSelector, $currentSlide).addClass(
                    'disabled'
                );
            } else {
                $(settings.nestedSlidePrevButtonSelector, $currentSlide).removeClass(
                    'disabled'
                );
            }
        }

        function showSlide(slideIdx, nestedIdx) {
            $sliders
                .removeClass('on')
                .eq(slideIdx)
                .addClass('on');
            if (nestedIdx !== undefined) {
                $sliders
                    .eq(slideIdx)
                    .find(settings.nestedSlideSelector)
                    .removeClass('on')
                    .eq(nestedIdx)
                    .addClass('on');
            }
            if (options.onChangeCallback) {
                options.onChangeCallback(slideIdx, nestedIdx);
            }
        }

        if (options.onChangeCallback) {
            options.onChangeCallback(currentSlideIdx);
        }

        return this;
    };
})(jQuery, window);