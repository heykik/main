// 레이아웃
function fn_layout(){
    var wrap = $('#wrapper'),
        header = $('#header'),
        gnb = $('#gnb'),
        lnb = wrap.not('.menuIco').find('.lnb');

    lnb.find('li').has('ul').addClass('more');

    // GNB SCROLL
	$('#gnb .left').mCustomScrollbar();

    // GNB 열고 닫기
    btnMenu = gnb.find('.btnMenu');
    btnMenu.on('click', function(){
        console.log('aaa');
        if(wrap.hasClass('menuIco')){
            wrap.removeClass('menuIco');
            $(this).removeClass('open').text('메뉴 닫기');
        }else{
            wrap.addClass('menuIco');
            $(this).addClass('open').text('메뉴 열기');
        }
    });
}

// GNB 메뉴
function fn_menu(){
    depth01 = $('.lnb');
    if(depth01.find('li.more.curr').length) depth01.find('li.more.curr').children('.smenu').slideDown(200); // 2024-10-10
    depth01.find('li.curr')
    depth01.on('click', 'li.more > a', function(e){
        e.preventDefault();
        if($(this).parent().hasClass('curr')){
            $(this).parent().removeClass('curr').find('ul').slideUp(200).find('li').removeClass('curr');
        }else {
            depth01.find('li').removeClass('curr').find('ul').slideUp(200);
            $(this).parent().addClass('curr').find('> ul').slideDown(200);
        }
    });
}

// 레이어 팝업
function fn_layer(e,t,s) {
	var pdt = $('#'+e).find('> .inner').css('padding-top').replace(/[^-\d\.]/g, ''),
		pdb = $('#'+e).find('> .inner').css('padding-bottom').replace(/[^-\d\.]/g, '');
	$('#'+e).fadeIn(200).addClass('on');
	$('body, html').css({'overflow':'hidden'});
	$('#'+e).find('> .inner .cont').attr('tabindex',0).focus();
	$(window).resize(function(){
		$('#'+e).find('> .inner').css({'width':s+'px'});
		if($(window).width() > 767){
			$('#'+e).find('.cont').css({'max-height':$('#'+e).height()*0.9 - (Number(pdt) + Number(pdb))});
		}else{
			$('#'+e).find('.cont').css({'max-height':$('#'+e).height() - (Number(pdt) + Number(pdb))});
		}
	}).resize();
	$(t).addClass(e);
}

// 레이어 팝업 닫기
function fn_layer_close(t){
	var backFocus = $(t).closest('.layerPop').attr('id');
	$(t).closest('.inner').parent().fadeOut(200).removeClass('on');
	$('body, html').css({'overflow':'auto'});
	$('.' + backFocus).focus();
}

// 2024-10-10
// 파일선택
function fn_file(){
    let file = $('.file_list').find("input[type=file]");
    file.each(function(){
        $(this).change(function(){
            var i = $(this).val();
            $(this).siblings().val(i);
        });
    }); 
}
//-- 2024-10-10

$(function() {
	/*>>>>>>>>>> 공통 <<<<<<<<<<*/
	// 레이아웃
	fn_layout();

    // GNB
    fn_menu();

	// 스크롤 영역
	$('.colTable').mCustomScrollbar({
		axis:'yx'
	});

    // 파일선택 - 2024-10-10
	fn_file();
});