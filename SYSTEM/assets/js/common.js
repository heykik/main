/*** 레이아웃 시작 ***/
	// 레이아웃
	function fn_layout(){
		var wrap = $("#wrap"),
			header = $("#header"),
			depth01 = $("#wrap").not(".menuIco").find(".depth01"),
			depth02 = depth01.find("> li > ul"),
			depth03 = depth02.find("> li > ul"),
			depth04 = depth03.find("> li > ul"),
			contWrap = $(".contWrap");

		depth01.find("li").has("ul").addClass("more");
		fn_menu(); // GNB MENU ON/OFF

		// 상단 알림
		var notice = header.find(".notice"),
			btnNoti = notice.find("> a"),
			notiCont = notice.find("> ul");
		btnNoti.click(function(e){
			e.preventDefault();
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				notiCont.fadeOut(200);
			}else{
				$(this).addClass("on");
				notiCont.fadeIn(200);
			}
		});
		notiCont.mouseleave(function(){
			btnNoti.removeClass("on");
			$(this).fadeOut(200);
		});

		$(window).resize(function(){
			if(contWrap.find(".cont").length == 1){
				contWrap.find(".cont").css({"min-height":wrap.height() - 100 - $("h2").height() - 16});
			}
		}).resize();

		// GNB SCROLL
		$("#gnb .inner").mCustomScrollbar();
	}

	// GNB 현재 페이지
	function fn_gnb(dep01, dep02){
		var depth01 = $("#gnb .depth01"),
			depth02 = depth01.find("> li > ul"),
			depth03 = depth02.find("> li > ul"),
			depth04 = depth03.find("> li > ul");
		depth01.find("> li").eq(dep01).addClass("curr").find("> ul > li").eq(dep02).addClass("curr").find("> ul > li");
		depth01.find("li.more > a").append("<i>add</i>");
		depth03.find("li.more > a i:last-child").text("expand_more");
		depth01.find("li.more.curr > a > i:last-child").remove();
		depth01.find("li.more.curr > a").append("<i>remove</i>").siblings().show();
		depth03.find(">li.more.curr > a i:last-child").text("expand_less");

		// GNB 열고 닫기
		var wrap = $("#wrap"),
			gnb = $("#gnb"),
			btnMenu = gnb.find(".btnMenu");
		btnMenu.click(function(){
			depth01.find("> li").eq(dep01).addClass("curr").find("> ul > li").eq(dep02).addClass("curr").find("> ul > li");
			depth01.find("li.more > a i:last-child").text("add");
			depth03.find(">li.more > a i:last-child").text("expand_more");
			depth01.find("li.more.curr > a i:last-child").text("remove");
			depth03.find(">li.more.curr > a i:last-child").text("expand_less");
			if(wrap.hasClass("menuIco")){
				wrap.removeClass("menuIco");
				fn_menu();
				depth01.find("li.more.curr > a").siblings().show();
			}else{
				wrap.addClass("menuIco");
				depth01.find("li.more > a").off("click");
				depth01.find("li").removeClass("curr").find("ul").hide();
				depth01.find("> li").eq(dep01).addClass("curr");
			}
		});
	}

	// GNB MENU ON/OFF
	function fn_menu(){
		depth01 = $(".depth01");
		depth01.find("li.more > a").click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass("curr")){
				$(this).parent().removeClass("curr").find("ul").slideUp(200).find("li").removeClass("curr");
				$(this).parent().find("a i:last-child").text("add");
				$(this).parent().find(".depth03 a i:last-child").text("expand_more");
				if($(this).closest("ul").hasClass("depth03")){
					$(this).find("> i:last-child").text("expand_more");
				}else{
					$(this).find("> i:last-child").text("add");
				}
			}else{
				$(this).parent().siblings().removeClass("curr").find("ul").slideUp(200).find("li").removeClass("curr");
				$(this).parent().find("a i:last-child").text("add");
				$(this).parent().find(".depth03 a i:last-child").text("expand_more");
				$(this).parent().addClass("curr").find("> ul").slideDown(200);
				if($(this).closest("ul").hasClass("depth03")){
					$(this).parent().siblings().find("> a > i:last-child").text("expand_more");
					$(this).parent().find("> a > i:last-child").text("expand_less");
				}else{
					$(this).parent().siblings().find("> a > i:last-child").text("add");
					$(this).parent().find("> a > i:last-child").text("remove");
				}
			}
		});
	}
/*** 레이아웃 끝 ***/

/*** 파일 업로드 시작 ***/
	// 파일 선택
	function fn_file_change(){
		var fileArea = $(".fileArea");
		fileArea.each(function(){
			$(this).find("input[type=file]").change(function(){
				var thisVal = $(this).val();
				$(this).siblings("input").val(thisVal);
				$(this).siblings(".btnDel").css({"display":"flex"});
			});
		});
	}

	// 파일명 삭제
	function fn_file_reset(e){
		$(e).hide().siblings("input").val("");
	}
/*** 파일 업로드 끝 ***/

/*** 팝업 시작 ***/
    // 토스트 팝업
    function fn_noti_pop(e, i){
        var inHtml = "";
            inHtml += '<div class="notiPop">';
            inHtml += '<strong>알림!</strong>';
            inHtml += '<p>'+i+'</p>';
            inHtml += '</div>';
        $("body").append(inHtml).promise().done(function(){
            var bottom = $(window).height() - $(e).offset().top - 90,
                left =  $(e).offset().left + ($(e).outerWidth() / 2);
            $(".notiPop").css({"bottom":bottom, "left":left}).promise().done(function(){
                $(".notiPop").addClass("on").promise().done(function(){
                    setTimeout(function(){
                        $(".notiPop").removeClass("on").promise().done(function(){
                            setTimeout(function(){
                                $(".notiPop").remove();
                            },200);
                        });
                    },1500);
                });
            });
        });
    }

	// 얼럿 팝업
	function fn_alert(i,c) {
		var inHtml = "";
			inHtml += '<div class="layerPop alert" id="alertPop">';
			inHtml += '		<div class="inner">';
			inHtml += '			<div class="layerCont">';
			inHtml += '				<p>'+i+'</p>';
			inHtml += '				<div class="btnBottom center">';
			inHtml += '					<button type="button" class="btnR btnPB01" onclick="'+ c +'">확인</button>';
			inHtml += '					<button type="button" class="btnR btnPB02" onclick="fn_layer_close(this)">취소</button>';
			inHtml += '				</div>';
			inHtml += '			</div>';
			inHtml += '			<a href="javascript:void(0)" onclick="fn_layer_close(this)"><i>close</i><span class="hide">닫기</span></a>';
			inHtml += '		</div>';
			inHtml += '</div>';
		$("body").append(inHtml).promise().done(function(){
			i.replace('\n', '<br/>');
			$('#alertPop').fadeIn(200).addClass('on').promise().done(function(){
				$('#alertPop').find('> .inner .layerCont').attr("tabindex",0).focus();
			});
			$('body, html').css({'overflow':'hidden'});
			$('#alertPop').addClass("alertPop");
		});
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
/*** 팝업 끝 ***/

/*** MONTHPICKER 시작 ***/
	// 월 선택
	function fn_monthpicker(e, top, left){
		var inHtml = '';
			inHtml += '<div class="monthpicker">';
			inHtml += '<div class="tit">';
			inHtml += '<button type="button" class="btnPrev">이전</button>';
			inHtml += '<strong>2023</strong>';
			inHtml += '<button type="button" class="btnNext">다음</button>';
			inHtml += '</div>';
			inHtml += '<ul>';
			inHtml += '<li><a href="01">Jan.</a></li>';
			inHtml += '<li><a href="02">Feb.</a></li>';
			inHtml += '<li><a href="03">Mar.</a></li>';
			inHtml += '<li><a href="04">Apr.</a></li>';
			inHtml += '<li><a href="05">May.</a></li>';
			inHtml += '<li><a href="06">Jone.</a></li>';
			inHtml += '<li><a href="07">July.</a></li>';
			inHtml += '<li><a href="08">Aug.</a></li>';
			inHtml += '<li><a href="09">Sep.</a></li>';
			inHtml += '<li><a href="10">Oct.</a></li>';
			inHtml += '<li><a href="11">Nov.</a></li>';
			inHtml += '<li><a href="12">Dec.</a></li>';
			inHtml += '</ul>';
			inHtml += '</div>';
		var top = $(e).offset().top + $(e).height() - $(window).scrollTop(),
			left = $(e).offset().left;
		if($(".monthpicker").length < 1){
			$("body").append(inHtml);
		}
		var monthpicker = $(".monthpicker");
		setTimeout(function(){
			monthpicker.addClass("on").css({"top":top,"left":left});
			if($(e).find("input").val()){
				var year = $(e).find("input").attr("data-year"),
					month = $(e).find("input").attr("data-month");
				monthpicker.find(".tit strong").text("").text(year);
				monthpicker.find("ul li").eq(month -1).addClass("on");
			}
		},100);
		monthpicker.find(".tit button").click(function(){
			var year = $(this).siblings("strong");
			if($(this).hasClass("btnPrev")){
				year.text(Number(year.text()) - 1);
			}else{
				year.text(Number(year.text()) + 1);
			}
		});
		monthpicker.find("ul li a").click(function(event){
			event.preventDefault();
			fn_monthpicker_close();
			var year = monthpicker.find(".tit strong").text(),
				month = $(this).attr("href");
			$(this).parent().addClass("on");
			$(e).find("input").val(year+"-"+month).attr("data-year",year).attr("data-month",month);

			if($(e).closest("div").attr("class") == "dateWrap"){
				var monthP = $(e).siblings(".month");
				if(monthP.find("input").val()){
					var dYear = monthP.find("input").attr("data-year"),
						dMonth = monthP.find("input").attr("data-month");
					if($(e).index() == "2"){
						if(dYear > $(e).find("input").attr("data-year")){
							var i = "시작 년월보다 이후 년월을 선택하세요.";
							fn_noti_pop(e, i);
							$(e).find("input").val("").attr("data-year","").attr("data-month","");
						}else{
							if(dMonth >= $(e).find("input").attr("data-month")){
								var i = "시작 년월보다 이후 년월을 선택하세요.";
								fn_noti_pop(e, i);
								$(e).find("input").val("").attr("data-year","").attr("data-month","");
							}
						}
					}else{
						if(dYear < $(e).find("input").attr("data-year")){
							var i = "종료 년월보다 이전 년월을 선택하세요.";
							fn_noti_pop(e, i);
							$(e).find("input").val("").attr("data-year","").attr("data-month","");
						}else{
							if(dMonth <= $(e).find("input").attr("data-month")){
								var i = "종료 년월보다 이전 년월을 선택하세요.";
								fn_noti_pop(e, i);
								$(e).find("input").val("").attr("data-year","").attr("data-month","");
							}
						}
					}
				}
			}
		});
		$("*").scroll(function(){
			fn_monthpicker_close();
		});
		monthpicker.siblings("*").click(function(e){
			if(!$(e.target).hasClass("monthInput") ) {
				fn_monthpicker_close();
			}
		});
	}

	// 월 선택 닫기
	function fn_monthpicker_close(){
		var monthpicker = $(".monthpicker");
		if(monthpicker.hasClass("on")){
			monthpicker.removeClass("on").promise().done(function(){
				monthpicker.remove();
			});
		}
	}
/*** MONTHPICKER 끝 ***/

/*** 추가/삭제 시작 ***/
	// 공통 추가
	function fn_add(e){
		$(e).closest(".addArea").find(".addBox").each(function(){
			var $this = $(this),
				inHtml = $this.find("> *").html(),
				a = $this.html().replace(/\n|\r|\t/g, ""),
				b = a.replace(/<!--[^>](.*?)-->/g, ""),
				c = b.split('>');
			
			function fn_add_unit(){
				$this.append(c[0]+">"+inHtml+c[c.length - 2]+">").promise().done(function(){
					if($(this).find("*[id]").length){
						var index = $(this).find("> *:last-child").index();
						$(this).find("> *:last-child *[id]").each(function(){
							var id = $(this).attr("id");
							$(this).attr("id",id + index).removeClass("first");
						});
					}

					// 라벨값이 있을 경우
					if($(this).find("label").length){
						$(this).find("> *:last-child label").each(function(){
							var lFor = $(this).attr("for");
							$(this).attr("for",lFor + index);
						});
					}

					// 가이드 테스트 (이건 개발 최종으로 넘길 때는 삭제)
					$(this).find("*[id]").each(function(){
						var i = $(this).attr("id");
						$(this).val('현재 id값은 "'+i+'"입니다.');
					});
				});
			}

			// 파일 추가일 경우
			if($(e).closest(".addArea").hasClass("fileWrap")){
				fn_file_change();
				var fileWrap = $(e).closest(".fileWrap"),
					max = fileWrap.attr("max");
				if(max < fileWrap.find(".fileArea").length + 1){
					fn_noti_pop(fileWrap, "파일은 최대 "+max+"개까지 추가 가능합니다.");
				}else{
					fn_add_unit();
				}
			}else{
				fn_add_unit();
			}
		});
	}

	// 공통 삭제
	function fn_del(e){
		if($(e).closest("table").parent(".addArea").length == false){
			var $el = $(e).closest("div");
		}else{
			var $el = $(e).closest("tr");
		}
		var el = $el.siblings(),
			thisIndex = $el.index();
		if(el.length+1 > 1){
			$el.remove();
			if($el.find("*[id]").length){
				el.each(function(){
					var index = $(this).index(),
						iLength = index.length;
					el.eq(0).find("*[id]").addClass("first");
					$(this).find("*[id]").each(function(){
						var id = $(this).attr("id");
						if($(e).closest("table").parent(".addArea").length == false){
							var $el = $(this).closest("div");
						}else{
							var $el = $(this).closest("tr");
						}
						el.find("*[id]").removeClass("overTen");
						el.eq(9).nextAll().find("*[id]").addClass("overTen");
						
						console.log(thisIndex.length)
						
						if(thisIndex == 0){ // 첫번째 항목 선택 시
							$(this).attr("id",id.slice(0 , -1)).promise().done(function(){
								$(this).not(".first").attr("id",id.slice(0 , -1)+index);
							});
						}else{
							$(this).not(".first").attr("id",id.slice(0 , -1)+index);
							/*if($(this).is(".overTen")){
								$(this).attr("id",id.slice(0 , -2)+index);
							}else{
								$(this).not(".first").attr("id",id.slice(0 , -1)+index);
							}*/
						}
						
						// 라벨이 있을 경우
						if($(this).siblings("label").length){
							$(this).siblings("label").each(function(){
								var id = $(this).prev().attr("id");
								$(this).attr("for",id);
							});
						}

						// 가이드 테스트 (이건 개발 최종으로 넘길 때는 삭제)
						$el.find("*[id]").each(function(){
							var i = $(this).attr("id");
							$(this).val('현재 id값은 "'+i+'"입니다.');
						});
					});
				});
			}
		}else{
			var e = $el,
				i = "더이상 삭제하실 수 없습니다.";
			fn_noti_pop(e, i);
		}
	}
	// 선택한 파일 삭제 기능추가 2024-12-03 - s
	function fn_file_select(input) {
		var fileArea = $(input).closest('div');
		var fileNameInput = fileArea.find('input[type="text"]');
		var fileDelBtn = fileArea.find('.btnFileDel');
		
		if (input.files.length > 0) {
			fileNameInput.val(input.files[0].name);
			fileDelBtn.show();
		}
	}
	function fn_del_file(obj) {
		var fileArea = $(obj).closest('div');
		var fileInput = fileArea.find('input[type="file"]');
		var fileNameInput = fileArea.find('input[type="text"]');
		var fileDelBtn = fileArea.find('.btnFileDel');
		
		fileInput.val('');
		fileNameInput.val('');

		fileDelBtn.hide();
	}
	// 선택한 파일 삭제 기능추가 2024-12-03 - e
/*** 추가/삭제 끝 ***/



$(function() {
	/*>>>>>>>>>> 공통 <<<<<<<<<<*/
	// 레이아웃
	fn_layout();

	// 파일 선택
	fn_file_change();

	// 월 선택 onClick
	var month = $(".month");
	month.attr("onclick","fn_monthpicker(this)");
	month.find("input").attr("class","monthInput");
	
	// 데이트피커
	if($(".date").length){
		$(".date input").datepicker({
			dateFormat: 'yy-mm-dd',
			showOtherMonths: true,
			showMonthAfterYear:true,
			changeYear: true,
			changeMonth: true,          
			showOn: "both",
			buttonImage: "../assets/images/ico-date.svg",
			buttonImageOnly: true,
			buttonText: "선택",
			monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
		});
	}

	// 스크롤 영역
	$(".scrollArea, .dataTable").mCustomScrollbar({
		axis:"yx"
	});

	// 탭
	var tabFunc = $(".tabFunc");
	tabFunc.each(function(){
		var btnTab = $(this).find("> ul > li > a"),
			tabBox = $(this).find("> .tabBox > div"),
			liCurr = $(this).find("> ul li.curr").index();
		tabBox.not(":eq("+ liCurr +")").hide();
		btnTab.click(function(e){
			e.preventDefault();
			var i  = $(this).parent().index();
			btnTab.parent().removeClass("curr");
			tabBox.hide();
			$(this).parent().addClass("curr");
			tabBox.eq(i).show();
		});
	});

	// 리스트 전체선택
	var colTable = $(".colTable");
	colTable.each(function(){
		var $this = $(this),
			thChk = $this.find("thead th .checkbox.only input"),
			tdChk = $this.find("tbody td .checkbox.only input");
		tdChk.click(function(){
			var tLength = tdChk.closest("tbody").find("tr").length;
			if(tdChk.closest("tbody").find(".checkbox input:checked").length == tLength){
				thChk.prop("checked", "checked");
			}else{
				thChk.prop("checked", "");
			}
		});
		thChk.click(function(){
			if($(this).is(":checked")){
				tdChk.prop("checked", "checked");
			}else{
				tdChk.prop("checked", "");
			}
		});
	});
});