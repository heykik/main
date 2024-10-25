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