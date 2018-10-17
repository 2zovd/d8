$(function() {

	svg4everybody();

	//crypto show
	$('.crypto-rate__item_arrow').on('click', function() {
		$(this).toggleClass('active');
		$('.crypto-rate__inner').toggleClass('active');
	});

	//news tabs
	$('.news-tab__link').click(function() {
		$('.news-tab__link').removeClass('news-tab__link_active');
		$(this).toggleClass('news-tab__link_active');
		$('.news-column').toggleClass('active');
	});

	// nav

	$('.btn-nav').click(function() {

		if($('.btn-nav').hasClass('active')) {

			$(this).toggleClass('active');
			$('.main-nav').removeClass('main-nav_active');
			$('.crypto-rate').css('display', 'flex');
			$('.news-tab').css('display', 'flex');
			$('.main-search__field').removeClass('.main-search__field_active');
			$('.main-logo').removeClass('main-logo_hide');
			$('.btn-search').removeClass('btn-search_active');
			$('.main-nav__footer').removeClass('main-nav__footer_active');
			$('.main-search__field').addClass('main-search__field_mobile');
			$('.main-search__button').addClass('main-search__button_mobile');
			$('.main-search').removeClass('main-search_active');
			$('.main-search__field').removeClass('main-search__field_mobile');
			$('.main-search__button').removeClass('main-search__button_mobile');

		} else {

			$(this).toggleClass('active');
			$('.main-nav').addClass('main-nav_active');
			$('.main-logo').addClass('main-logo_hide');
			$('.btn-search').addClass('btn-search_active');
			$('.main-nav__footer').addClass('main-nav__footer_active');

		}

	})



	// search
	$('.btn-search').click(function() {
		//$('.btn-nav').removeClass('active');
		$('.main-nav').removeClass('main-nav_active');
		//$('.main-logo').addClass('main-logo_hide');
		$('.btn-search').removeClass('btn-search_active');
		$('.main-nav__footer').removeClass('main-nav__footer_active');
		$('.main-search').addClass('main-search_active');
		$('.crypto-rate').css('display', 'none');
		$('.news-tab').css('display', 'none');
		$('.main-search__field').addClass('main-search__field_mobile');
		$('.main-search__button').addClass('main-search__button_mobile');
	})

	// tags
	$('.category-header__btn').click(function() {
		$(this).toggleClass('category-header__btn_active');
		$('.category-header__dropdown').toggleClass('category-header__dropdown_active');
	})

	$('.tags-row__link').click(function() {
		$('.tags-row__link').removeClass('tags-row__link_active');
		$(this).addClass('tags-row__link_active');
	})

	//posts

	$('.btn-posts').click(function() {
		$(this).html('Show less');
		//$('.post-wrapper').removeClass('d-sm-none');
		//$('.post__image').addClass('d-block');
	})

	// hide all navs


	// link dots more
	$('.main-nav__link_dots').click(function() {
		$('.main-nav').toggleClass('main-nav_active');
	})

	//profile nav
	$('.header-settings__profile').click(function() {
		$('.profile-nav').toggleClass('profile-nav_active');
	})

});