function loadVideo(videoCode) {
    var youTubeVid = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + videoCode + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
    $('.video-box .vid, .video-box iframe').replaceWith(youTubeVid);
}

function setTopPadding(viewportWidth, siteHeaderHeight) {
    if (viewportWidth >= 600) {
        $('body').css('padding-top', siteHeaderHeight);
    } else {
        $('body').css('padding-top', 0);
    }
}

$(document).ready(function () {


    // set top padding to accomodate fixed header
    var viewportWidth = $(window).width();
    var siteHeaderHeight = $('.site-header').height();
    setTopPadding(viewportWidth, siteHeaderHeight);


    // mobile menu toggle handler
    $('.mobile-menu-toggle').click(function () {
        $('.main-nav').slideToggle();
    });

    // tabs handler
    $('.tab').click(function () {
        $('.tab, .tab-panel').removeClass('selected');
        var panelToShow = $(this).attr('aria-controls');
        $(this).addClass('selected');
        $('#' + panelToShow).addClass('selected');
    });

    var headerHeight;
    var onThisPagePosition = $('.on-this-page').offset();
    //window scroll handler
    $(window).on("scroll  touchmove", function () {

        var scrollTop = $(document).scrollTop();
        headerHeight = $('header').height();


        // minimise header
        if (scrollTop > 100) {
            $('.site-header').addClass('shrink');
        } else {
            $('.site-header').removeClass('shrink');
        }

        // fix on this page menu when scrolls up
        if (viewportWidth > 600) {
            if (scrollTop >= (onThisPagePosition.top - headerHeight * 0.7)) {
                $('.on-this-page').addClass('fixed');
                $('.on-this-page').css('top', headerHeight);
            } else {
                $('.on-this-page').removeClass('fixed');
                $('.on-this-page').css('top', 'auto');
            }
        }
    });

    //smooth scroll
    $('a[href*="#"]:not([href="#"])').click(function () {
        var scrollPosition;
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (viewportWidth > 600) {
                scrollPosition = target.offset().top - 260;
            } else {
                scrollPosition = target.offset().top
            }


            if (target.length) {
                $('html,body').animate({
                    scrollTop: scrollPosition
                        // 260 to clear fixed header and on this page menu
                }, 1000);
                return false;
            }
        }
    });


    $(window).resize(function () {
        // reset top padding to accomodate fixed header when window resized
        viewportWidth = $(window).width();
        siteHeaderHeight = $('.site-header').height();
        setTopPadding(viewportWidth, siteHeaderHeight);
        // make on this page position static in mobile viewports
        if (viewportWidth < 600) {
            $('.on-this-page').removeClass('fixed');
            $('.on-this-page').css('top', 'auto');
        }
    });

    /* video play list */
    //video select handler
    $('.video-select').hover(function () {
        $(this).addClass('hovered').next().show();
    });
    $('.video-menu').mouseleave(function () {
        $('.video-menu ul').hide().prev().removeClass('hovered');
    });
    //video select handler
    $('.video-playlist').on('click', 'a', function (event) {
        event.preventDefault();
        var videoCode = $(this).attr('data-video-code');
        loadVideo(videoCode);
    });

    /* slide show */
    var numSlides = $('.slide-show-slides img').length;
    var finalMargin = numSlides * 100 - 100;
    var currentMargin = 0;
    $('.slide-show .control').click(function (event) {
        event.preventDefault();
        if (!($(this).hasClass('disabled'))) {
            if ($(this).hasClass('next')) {
                if (currentMargin < finalMargin) {
                    currentMargin += 100;
                    if (currentMargin == 100) {
                        $('.prev.control').removeClass('disabled');
                    }
                    if (currentMargin == finalMargin) {
                        $('.next.control').addClass('disabled');
                    }
                }
            } else {
                if (currentMargin > 0) {
                    currentMargin -= 100;
                    if (currentMargin == 0) {
                        $('.prev.control').addClass('disabled');
                    }
                    if (currentMargin == finalMargin - 100) {
                        $('.next.control').removeClass('disabled');
                    }
                }
            }
            $('.slide-show-slides').animate({
                marginLeft: '-' + currentMargin + '%'
            });
        }
    });

    /* mailing list sign up */
    $('.mailing-list-link').click(function (event) {
        event.preventDefault();
        $('.mailing-list').fadeIn();
    });
    $('.mailing-list-close').click(function (event) {
        event.preventDefault();
        $('.mailing-list').fadeOut();
    });

    /* info box show/hide */
    $('.info.button').click(function (event) {
        event.preventDefault();
        $(this).next().toggleClass('open');
    });
    $('.info-box-wrapper').click(function () {
        $(this).removeClass('open');
    });

    /* vertical nav toggle */
    $(".v-nav-toggle").click(function (event) {
        event.preventDefault();
        $(this).next().toggleClass('open');
    });
});
