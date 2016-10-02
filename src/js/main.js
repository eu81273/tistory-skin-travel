require('./prism');

$(document).ready(function () {

	var $navigation = $('nav, .blog-overlay');
	var $article = $('article');
	var $header = $('.blog-logo, .blog-open-nav');
	var $posting = $('.blog-post');

	var previousPostion = 0;
	var previousDirection = undefined;

	var currentPostion = 0;
	var currentDirection = undefined;

	//스크롤링을 하면,
	$('.blog-post').on('scroll resize', function (event) {
		//현재 위치 구하기
		currentPostion = $posting.scrollTop();

		//변화가 있는 경우에만,
		if (previousPostion !== currentPostion) {
			//현재 방향 구하기
			currentDirection = previousPostion < currentPostion;
			//포지션 업데이트
			previousPostion = currentPostion;

			//방향이 변화된 경우,
			if (previousDirection !== currentDirection) {
				//방향 업데이트
				previousDirection = currentDirection;
				//아래쪽 스크롤인 경우 숨기기
				$header.toggleClass('is-hide', currentDirection);
			}
		}

		return false;
	});

	//메뉴 버튼을 누르면,
	$('.blog-open-nav').on('click', function (event) {
		//History API를 지원하는 경우에만,
		if (typeof history.pushState === 'function') {
			history.pushState('open-nav', 'nav');
		}

		$navigation.toggleClass('is-visible', true);
		$article.toggleClass('scale-down', true);

		return false;
	});

	//백버튼을 위해 히스토리 API 활용
	$(window).on('popstate', function (event) {
		//jQuery의 경우 event가 아닌 originalEvent 에 state가 저장됨
		var status = event.state || event.originalEvent.state;

		//메뉴가 오픈된 경우
		if (status == 'open-nav') {
			$navigation.toggleClass('is-visible', true);
			$article.toggleClass('scale-down', true);
		}

		else {
			$navigation.toggleClass('is-visible', false);
			$article.toggleClass('scale-down', false);
		}

		return false;
	});

	//닫기 버튼이나 오버레이를 누르면,
	$('.blog-close-nav, .blog-overlay').on('click', function (event) {
		//History API를 지원하는 경우에만,
		if (typeof history.pushState === 'function') {
			history.back();
		}

		$navigation.toggleClass('is-visible', false);
		$article.toggleClass('scale-down', false);

		return false;
	});

	//검색을 시도하면,
	$('#search').on('keypress', function (event) {
		//정상적으로 검색어를 입력한 경우,
		if(event.keyCode === 13 && $(this).val().length > 0) {
			window.location.href = "/search/" + $(this).val().replace(new RegExp("%", "g"), "%25").replace(new RegExp("\\?", "g"), "%3F").replace(new RegExp("#", "g"), "%23");
			return false;
		}
	});

	//포스팅 삭제를 시도하면,
	$('#delete').on('click', function (event) {
		var url = 'http://' + window.location.hostname;
		var post = $(this).attr("href");

		if (window.confirm('이 포스트를 삭제하시겠습니까?')) {
			$.ajax({
				url: url + '/oldmin/entry/removeEntry' + post + '?__T__=' + Number(new Date()),
				method: 'get',
				headers: {
					'X-Alt-Referer': url
				},
				success: function () {
					window.location.href = url;
				}
			});
		}

		return false;
	});

	//이미지를 감싼 imageblock 클래스 제거
	$('.imageblock > img').unwrap();

	//prism 호환성 추가
	$("pre[class^='brush']").each(function (index, element, language) {
		language = element.className && element.className.substr(6);
		language = ("text" == language || "html" == language || !language) && "markup" || "js" == language && "javascript" || language;
		$(element).removeClass().wrapInner('<code class="language-' + language + '"></code>');
	});
});
