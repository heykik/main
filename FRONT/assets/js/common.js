$(function () {
    // base
    fn_common()
    // gnb
    // fn_layout()
    // contents
    fn_contents()
    // heaer, footer import
    // 퍼블리싱을 위한 작업이며 개발 시 하기 스크립트 주석처리 또는 제거 후 상단 fn_layout()만 실행
    fn_layoutImport();
})

const fn_gnb = () => {
    // 0105 gnb event
    const gnb = $("#header .gnb");
    // $(gnb).find('li:nth-child(4').addClass("on");
    // $(gnb).find('li:nth-child(4').children("div").stop().slideDown(200);
    // gnb.children("li:not('.sitemapBtn')").on('mouseenter focusin',function(){
    //     console.log('test');
    // 	$(this).addClass("on");
    // 	$(this).children("div").stop().slideDown(200);
    // });
    // gnb.children("li:not('.sitemapBtn')").on('mouseleave focusout',function(){
    // 	$(this).removeClass("on");
    // 	$(this).children("div").stop().slideUp(200);
    // });
    if (1160 >= $(window).width()) {
        $('nav .gnbOpen').hide();
        $('.mMenuBtn').on('click', (() => {
            $('html').toggleClass('unscroll');
            $('#header').toggleClass('active');
            $('nav').toggleClass('active');
        }))
        $('.depth01 > li > a').on('click', ((e) => {
            e.preventDefault();
            const target = $(e.currentTarget).parent('li');
            const depth = $(target).find('ul[class*="depth"]').length;
            const showState = $(target).hasClass('active');

            if (depth > 0 && !showState) {
                $(target).siblings('li').removeClass('active').find('.gnbOpen').slideUp(200);;
                $(target).addClass('active').find('.gnbOpen').slideDown(200);
            } else if (depth > 0 && showState) {
                $(target).removeClass('active').find('.gnbOpen').slideUp(200);
            }
        }));
    } else if ($(window).width() > 1160) {
        gnb.find(' > li > a').on('mouseenter hover focus', ((e) => {
            const depth = $(e.currentTarget).parent('li').find('.gnbOpen');
            $('#header').addClass('scroll');
            gnb.addClass('open');
            $(e.currentTarget).parent('li').siblings().find('.gnbOpen').slideUp();
            $(depth).slideDown(200);
        }))
        gnb.find('.gnbOpen').on('mouseleave focusout', ((e) => {
            if(!$('#container'.length > 0)){
                $('#header').removeClass('scroll');
            }
            setTimeout(() => {
                if (!gnb.find(':focus').length) {
                    gnb.removeClass('open');
                    $('.gnbOpen').slideUp(200);
                }
            }, 10); // 지연 시간 추가
        }))
    }
}

const fn_layout = () => {
    let header = $('#header'),
        familySite = $('.familySite');

    // 헤더 스크롤
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) header.addClass('scroll');
        else header.removeClass('scroll');
        // main 아닐 시 header에 scroll 클래스 추가하여 ui상태 변경하는 스크립트
        // 개발 시 확인 후 삭제 또는 활용 필요 
        if($('#container').length > 0){
            $('#header').addClass('scroll');
        }
    });

    // 관련사이트
    familySite.on('click', '.site', function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('ul').slideUp(200);
        } else {
            $(this).addClass('open');
            $(this).siblings('ul').slideDown(200);
        }
    });

    familySite.on("click", "ul li a", function (e) {
        e.preventDefault();
        $(".site").removeClass("on");
        $(this).closest("ul").slideUp(200);
        let $txt = $(this).text(),
            $src = $(this).attr("data-src"),
            btnMove = $(".btnMove");
        familySite.find(".site").text($txt);
        btnMove.attr("href", $src);
    });
    fn_gnb();
}

const fn_common = () => {
    // skip nav
    $("a[href^='#']").click(function (e) {
        const anchortarget = $(this).attr('href');
        $(anchortarget).attr('tabindex', -1).focus()
        $(anchortarget).removeAttr('tabindex')
    })
    if (window.location.hash) $(window.location.hash).attr('tabindex', -1).focus()

    var skipNav = $('#skipNav a')
    skipNav.focus(function () {
        skipNav.removeClass('on')
        $(this).addClass('on')
    })
    skipNav.blur(function () {
        skipNav.removeClass('on')
    })

    // file add
    $('[type="file"]').on('change', ((e)=>{
        const fakeInput = $(e.currentTarget).next('input[type="text"]');
        const fileNm = $(e.currentTarget).val().split('\\');

        fakeInput.val(fileNm[fileNm.length - 1]);
    }))

}

const fn_contents = () => {
    // tab
    $('.tabFunc').each(function () {
        let currIndex = 0
        const tab = $(this),
            tabTit = tab.find('> .tabTit ul li'),
            tabCont = tab.find('> .tabCont > div');

        const currEvent = (currIndex) => {
            tabTit.removeClass('curr').find('> a').removeAttr('title');
            tabTit.eq(currIndex).addClass('curr').find('> a').attr('title', '선택됨');
            tabCont.hide().eq(currIndex).show();
        }

        tabTit.each(function (idx) {
            const tabTitle = $(this).text();
            tabCont.eq(idx).prepend(`<h3 class="hide">${tabTitle}</h3>`);
            $(this).hasClass('curr') && (currIndex = idx);
            $(this).find('> a').click(function (e) {
                e.preventDefault();
                currEvent(idx);
            })
        })
        currEvent(currIndex);
    })

    // 데이트피커
	if($(".date").length){
        if(!$('.date input').length) return;
		$(".date input").datepicker({
			dateFormat: 'yy-mm-dd',
			showOtherMonths: true,
			showMonthAfterYear:true,
			changeYear: true,
			changeMonth: true,          
			showOn: "both",
			buttonImage: "../assets/images/icon/ico-date.svg",
			buttonImageOnly: true,
			buttonText: "선택",
			monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
		});
	}
    
    // 아코디언
    if($(".accordion").length){
        $(".accordion button").click(function() {
            var $button = $(this);
            var $content = $(this).parent("h4").next(".accoCon"); 

            $(".accoCon").not($content).slideUp();
            $(".accordion button").not($button).removeClass("on"); 

            $content.stop(true, true).slideToggle();
            $button.toggleClass("on");
        });
    }

    // 정보 및 검색영역 펼치기 / 닫기
    if ($(window).width() < 1161) {
        $('.btnDropdown').on('click', ((e) => {
            if($(e.currentTarget).hasClass('info')){
                $(e.currentTarget).toggleClass('on');
                $('.compLoca').slideToggle(200);
                $(e.currentTarget).text($(e.currentTarget).text() == '정보 숨기기' ? '정보 보기' : '정보 숨기기');
            }else{
                $(e.currentTarget).toggleClass('on');
                $(e.currentTarget).parent().siblings().slideToggle(200);
                $(e.currentTarget).text($(e.currentTarget).text() == '닫기' ? '펼치기' : '닫기');
            }
        }))
    }

    $('.btnHidden').on('click', ((e) => {
        $(e.currentTarget).toggleClass('on');
        $(e.currentTarget).text($(e.currentTarget).text() == '비밀번호 보기' ? '비밀번호 숨기기' : '비밀번호 보기');
    }))
}

// 레이어 팝업
function fn_layer(e,t,s) {
    var pdt = $('#'+e).find('> .inner').css('padding-top').replace(/[^-\d\.]/g, ''),
        pdb = $('#'+e).find('> .inner').css('padding-bottom').replace(/[^-\d\.]/g, '');
    $('#'+e).fadeIn(200).addClass('on');
    $('body, html').css({'overflow':'hidden'});
    $('#'+e).find('> .inner .layerCont').attr("tabindex",0).focus();
    $(window).resize(function(){
        $('#'+e).find('> .inner').css({'width':s+'px'});
        if($(window).width() > 767){
            $('#'+e).find('.layerCont').css({'max-height':$('#'+e).height()*0.9 - (Number(pdt) + Number(pdb))});
        }else{
            $('#'+e).find('.layerCont').css({'max-height':$('#'+e).height() - (Number(pdt) + Number(pdb))});
        }
    }).resize();
    $(t).addClass(e);
}

// 레이어 팝업 닫기
function fn_layer_close(t){
    var backFocus = $(t).closest(".layerPop").attr("id");
    $(t).closest(".inner").parent().fadeOut(200).removeClass("on");
    $("body, html").css({"overflow":"auto"});
    $("." + backFocus).focus();
    if($("#"+backFocus).hasClass("alertPop")){
        setTimeout(function(){
            $(".alertPop").remove();
        },200);
    }
}

const fn_layoutImport = () => {
    const _importHeader = $('#headerImport');
    const _importFooter = $('#footerImport');

    if (_importHeader.length > 0 && _importFooter.length > 0) {
        _importFooter.load('UI-F-0100.html #footer');
        _importHeader.load('UI-F-0100.html #header', (() => {
            fn_layout()
            if($('#container').length > 0) $('#header').addClass('scroll');
            return false;
        }));
    } else {
        // import 된 div 없어도 gnb 스크립트 실행
        fn_layout()
    }
}