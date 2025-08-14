$(window).on("load", function () {
  $(".preloader").fadeOut(500, function () {
    $(".wrapper").fadeIn(500);
  });
});

$(document).ready(function () {

	$(function () {
		$('.menu-toggler').click(function () {
			$('html').toggleClass('open-menu');
		});
	});

	$(function () {
		$('.side-bar').prepend('<div class="side-menu"></div><div class="side-mega-menu"></div>');
		$('.header .main-menu').contents().clone().appendTo('.side-menu');
		$('header .mega-menu-toggler').contents().clone().prependTo('.side-mega-menu').wrapAll('<h4></h4>');
		$('header .mega-main-menu').contents().clone().appendTo('.side-mega-menu').wrapAll('<ul></ul>');

		$(".side-mega-menu .menu-sub-item").each(function () {

			var megaMenuClick = $(this).find('h5');
			var servicesSubList = $(this).find('> .nav');

			$(megaMenuClick).click(function () {
				servicesSubList.toggleClass('active');
			});

		});
	});
	$(window).scroll(function () {
		var height = $(window).scrollTop();

		if (height > 560) {
			$('header').addClass('sticky');
		} else {
			$('header').removeClass('sticky');
		}
	});
	$('.main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: true,
		pauseOnHover: false,
		pauseOnFocus: false,
		responsive: [{
			breakpoint: 991,
			settings: {
				arrows: false,
			}
		}]
	});

	$('.slider-1').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		dots: false,
		focusOnSelect: false,
		pauseOnHover: true,
		infinite: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4
			}
		},{
			breakpoint: 991,
			settings: {
				slidesToShow: 4
			}
		},{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		},{
			breakpoint: 575,
			settings: {
				slidesToShow: 2
			}
		}]
	});
	$('.slider-2').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		focusOnSelect: true,
		pauseOnHover: false,
		infinite: false,
		responsive: [{
			breakpoint: 991,
			settings: {
				slidesToShow: 2
			}
		},{
			breakpoint: 768,
			settings: {
				slidesToShow: 1.3
			}
		}]
	});
	$('.slider-3').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: false,
		focusOnSelect: true,
		pauseOnHover: false,
	});

});
