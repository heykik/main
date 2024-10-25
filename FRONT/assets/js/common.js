$(function () {
    // base
    fn_common()
    // gnb
    fn_layout()
    // contents
    fn_contents()
})

const fn_layout = () => {
    let header = $('#header'),
        familySite = $('.familySite');

    // 헤더 스크롤
    $(window).scroll(function(){
        if($(window).scrollTop() > 0) header.addClass('scroll');
        else header.removeClass('scroll');
    });

    // 관련사이트
    familySite.on('click', '.site', function(e){
        e.preventDefault();
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $(this).siblings('ul').slideUp(200);
        }else{
            $(this).addClass('open');
			$(this).siblings('ul').slideDown(200);
        }
    });

    familySite.on("click", "ul li a", function(e){
        e.preventDefault();
        $(".site").removeClass("on");
        $(this).closest("ul").slideUp(200);
        let $txt = $(this).text(),
            $src = $(this).attr("data-src"),
            btnMove = $(".btnMove");
        familySite.find(".site").text($txt);
        btnMove.attr("href", $src);
    });
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

    // 스크롤 영역
	$('.tabTit ul').mCustomScrollbar({
        // theme: 'dark'
		// axis:'yx'
	});
}

$(window).ready(function(){
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
    if(1160 >= $(window).width() ){
        $('nav .gnbOpen').hide();
        $('.mMenuBtn').on('click', (()=>{
            $('html').toggleClass('unscroll');
            $('#header').toggleClass('active');
            $('nav').toggleClass('active');
        }))
        $('.depth01 > li > a').on('click', ((e)=>{
            e.preventDefault();
            const target = $(e.currentTarget).parent('li');
            const depth = $(target).find('ul[class*="depth"]').length;
            const showState = $(target).hasClass('active');

            if(depth > 0 && !showState){
                $(target).siblings('li').removeClass('active').find('.gnbOpen').slideUp(200);;
                $(target).addClass('active').find('.gnbOpen').slideDown(200);
            }else if(depth > 0 && showState){
                $(target).removeClass('active').find('.gnbOpen').slideUp(200);
            }
        }));
    }else if($(window).width() > 1160){
        console.log('sizing')
        gnb.find(' > li > a').on('mouseenter hover focus', ((e)=>{
            const depth = $(e.currentTarget).parent('li').find('.gnbOpen');
            $('#header').addClass('scroll');
            gnb.addClass('open');
            $(e.currentTarget).parent('li').siblings().find('.gnbOpen').slideUp();
            $(depth).slideDown(200);
        }))
        gnb.find('.gnbOpen').on('mouseleave focusout', ((e)=>{
            $('#header').removeClass('scroll');
            gnb.removeClass('open');
            // gnb.find('.gnbOpen').slideUp(200);
            $('.gnbOpen').slideUp(200);
        }))
    }
    $('.depth01 li:nth-child(2) .gnbOpen').slideDown(0)
});