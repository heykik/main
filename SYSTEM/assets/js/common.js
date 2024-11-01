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
	function fn_gnb(dep01, dep02, dep03, dep04){
		var depth01 = $("#gnb .depth01"),
			depth02 = depth01.find("> li > ul"),
			depth03 = depth02.find("> li > ul"),
			depth04 = depth03.find("> li > ul");
		depth01.find("> li").eq(dep01).addClass("curr").find("> ul > li").eq(dep02).addClass("curr").find("> ul > li").eq(dep03).addClass("curr").find("> ul > li").eq(dep04).addClass("curr");
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
            console.log("aaa");
			depth01.find("> li").eq(dep01).addClass("curr").find("> ul > li").eq(dep02).addClass("curr").find("> ul > li").eq(dep03).addClass("curr").find("> ul > li").eq(dep04).addClass("curr");
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

/*** TREE 시작 ***/
	// 트리
	function fn_tree(){
		var treeWrap = $(".treeWrap");
		treeWrap.mCustomScrollbar();
		treeWrap.each(function(){
			var tree = $(this);
			tree.find(".mCSB_container > ul > li").addClass("first on");
			if(tree.hasClass("allCheck")){
				tree.find("li li").prepend('<button type="button" onclick="fn_tree_check(this)"><i>check</i></button>');
			}else{
				tree.find("li li").not(":has(ul)").prepend('<button type="button" onclick="fn_tree_check(this)"><i>check</i></button>');
			}
			tree.on('click', 'a', function(e){
				e.preventDefault();
				fn_folder_controll($(this));
			});
			tree.on('click', 'p', function(){
				tree.find("li").removeClass("on check");
				$(this).parent().addClass("on");
			});
			tree.on('dblclick', 'p > input', function(){
				//fn_folder_controll($(this).parent());
				$(this).removeAttr("disabled").focus().closest("li").addClass("modi");
				 fn_tree_enter();
			});
		});
	}

	// 트리 메뉴 체크
	function fn_tree_check(e){
		$(e).closest(".treeWrap").find("li").removeClass("on");
		if($(e).parent().hasClass("check")){
			$(e).parent().removeClass("check");
			$(e).parent().has("ul").find("li").removeClass("check");
		}else{
			$(e).parent().addClass("check");
			$(e).closest(".treeWrap").find("li.check").has("ul").find("li").addClass("check");
		}
	}

	// 트리 전체 접힘/열림
	function fn_tree_control(e, t){
		var treeWrap = $("#"+t);
		if($(e).hasClass("on")){
			 $(e).removeClass("on").text("").append("<i>view_timeline</i>전체펼침");
			 treeWrap.find("ul ul").hide();
			 treeWrap.find("a i").text("add").closest("li").removeClass("open").find("> p > i").text("folder");
		}else{
			$(e).addClass("on").text("").append("<i>shelf_auto_hide</i>전체접힘");
			 treeWrap.find("ul ul").show();
			 treeWrap.find("a i").text("remove").closest("li").addClass("open").find("> p > i").text("folder_open");
		}
	}

	// 트리 폴더 열고/닫힘
	function fn_folder_controll(e){
		if($(e).closest("li").hasClass("open")){
			$(e).closest("li").has("ul").find("a i").text("add").closest("li").removeClass("open").find("> p > i").text("folder").closest("li").find("ul").slideUp(50);
		}else{
			if($(e).closest("li").find("> p > a").length){
				$(e).closest("li").find("> p > a i").text("remove").closest("li").addClass("open").find("> p > i").text("folder_open").closest("li").find("> ul").slideDown(50);
			}
		}
		
		if($(e).closest("li.first").hasClass("open") == false){
			 $(e).closest(".treeWrap").siblings(".btnTop").find(".btnPL04").removeClass("on").text("").append("<i>view_timeline</i>전체펼침");
		}
	}

	// 트리 파일 삭제
	function fn_tree_del(t){
		var treeWrap = $("#"+t),
			$this = treeWrap.find(".check");
		$this.each(function(){
			var pareLi = $(this).parent().parent(),
				siblLi = $(this).siblings("li"),
				prevLi = $(this).prev("li"),
				nextLi = $(this).next("li");
			if($this.length){
				$(this).remove();
				if(pareLi.find("> ul > li").length == false){
					pareLi.find("> ul").remove();
					pareLi.addClass("on").removeClass("open").find("> p > i").text("draft").siblings("a").remove();
					if(pareLi.hasClass("first") == false){
						pareLi.prepend('<button type="button" onclick="fn_tree_check(this)"><i>check</i></button>');
					}
				}
				if(siblLi.length){
					$(".on").siblings().removeClass("on").find(".on").removeClass("on");
					$(".on").find(".on").removeClass("on");
					$(".on").parent().parent().find(".on").removeClass("on");
					if(prevLi.length){
						prevLi.addClass("on");
					}else{
						nextLi.addClass("on");
					}
				}
			}
		});
		if($this.length == false){
			if(treeWrap.find(".first").hasClass("on")){
				fn_noti_pop(treeWrap,'최상위 폴더는 삭제할 수 없습니다.');
			}else{
				fn_noti_pop(treeWrap,'삭제할 항목을 선택하세요.');
			}
		}
	}

	// 트리 파일 추가
	function fn_tree_add(t){
		var treeWrap = $("#"+t),
			innerHtml = '<li><button type="button" onclick="fn_tree_check(this)"><i>check</i></button><p><i>draft</i><input type="text" title="파일명" value="파일명" disabled></p></li>';
		if(treeWrap.find(".on > ul").length){
			treeWrap.find(".on > ul").append(innerHtml);
		}else{
			treeWrap.find(".on").append('<ul>' + innerHtml + '</ul>').find("ul").show();
			treeWrap.find(".on").addClass("open").find("> p").prepend('<a href=""><i>remove</i></a>').find("> i").text("folder_open");
			if(treeWrap.hasClass("allCheck") == false){
				if(treeWrap.find(".on").find("> button").length){
					treeWrap.find(".on").find("> button").remove();
				}
			}
		}
		if(treeWrap.find(".check").length){
			fn_noti_pop(treeWrap,'파일명을 클릭하세요.');
		}
		if(treeWrap.find(".on").hasClass("open") == false){
			treeWrap.find(".on").addClass("open").find("> p > i").text("folder_open");
			treeWrap.find(".on").find("> ul").show();
		}
		// 파일명 수정
		var input = treeWrap.find(".on").find("> ul > li:last-child");
		input.addClass("modi").find("> p > input").removeAttr("disabled").val("").attr("placeholder","파일명").focus();
		fn_tree_enter();
	}

	// 트리 파일/폴더명 수정
	function fn_tree_modi(t){
		var treeWrap = $("#"+t),
			input = treeWrap.find(".on");
		input.addClass("modi").find("> p > input").removeAttr("disabled").focus();
		fn_tree_enter();
	}

	// 트리 인풋 벗어난 경우
	function fn_tree_enter(){
		var name = $(".modi > p input");
		name.focusout(function(){
			$(this).closest("li").removeClass("modi").find("> p > input").attr("disabled","disabled");
			if($(this).val().length == 0){
				$(this).attr("placeholder","파일명을 입력하세요.");
			}
		});
		name.keyup(function(){
			if (event.keyCode === 13) {
				$(this).closest("li").removeClass("modi").find("> p > input").attr("disabled","disabled");
				if($(this).val().length == 0){
					$(this).attr("placeholder","파일명을 입력하세요.");
				}
			}
		});
	}

	// 트리 위치 위로 이동
	function fn_tree_up(t){
		var treeWrap = $("#"+t),
			i = treeWrap.find(".check").index();
		if(treeWrap.find(".check").length == 1){
			if(i < 1){
				fn_noti_pop(treeWrap,'더이상 위로 위치이동은 불가능합니다.');
			}else{
				treeWrap.find(".check").insertBefore(treeWrap.find(".check").prev("li"), i);
			}
		}else if(treeWrap.find(".check").length == 0){
			fn_noti_pop(treeWrap,'이동할 항목을 선택하세요.');
		}else{
			
			fn_noti_pop(treeWrap,'이동할 항목을 하나만 선택하세요.');
		}
	}

	// 트리 위치 아래로 이동
	function fn_tree_down(t){
		var treeWrap = $("#"+t),
			i = treeWrap.find(".check").index();
		if(treeWrap.find(".check").length == 1){
			if(i == treeWrap.find(".check").siblings("li").length){
				fn_noti_pop(treeWrap,'더이상 아래로 위치이동은 불가능합니다.');
			}else{
				treeWrap.find(".check").insertAfter(treeWrap.find(".check").next("li"), i+1);
			}
		}else if(treeWrap.find(".check").length == 0){
			fn_noti_pop(treeWrap,'이동할 항목을 선택하세요.');
		}else{
			fn_noti_pop(treeWrap,'이동할 항목을 하나만 선택하세요.');
		}
	}
/*** TREE 끝 ***/

/*** 위치이동 시작 ***/
	// 공통 위치이동 (UP)
	function fn_up(e){
		var $this = $(e).closest(".move"),
			i = $this.index();
		if(i < 1){
			fn_noti_pop($this,'더이상 위로 위치이동은 불가능합니다.');
		}else{
			$this.insertBefore($this.prev(), i).promise().done(function(){
				if($(this).parent(".addBox").length && $(this).find("*[id]").length){
					fn_id($(e));
				}
			});
		}
	}

	// 공통 위치이동 (DOWN)
	function fn_down(e){
		var $this = $(e).closest(".move"),
			i = $this.index();
		if(i == $this.siblings().length){
			fn_noti_pop($this,'더이상 아래로 위치이동은 불가능합니다.');
		}else{
			$this.insertAfter($this.next(), i+1).promise().done(function(){
				if($(this).parent(".addBox").length && $(this).find("*[id]").length){
					fn_id($(e));
				}
			});
		}
	}

	// 위치이동 아이디 맞춤
	function fn_id(e){
		var ele = $(e),
			move = $(e).closest(".addBox").find("> *"),
			thisIndex = $(e).closest(".move").index();
		move.find("*[id]").removeClass("first second");
		move.eq(0).find("*[id]").addClass("first");
		move.eq(1).find("*[id]").addClass("second");
		move.each(function(){
			$(this).find("*[id]").each(function(){
				var index = $(this).closest(".move").index(),
					id = $(this).attr("id");
				if(ele.hasClass("btnUp")){
					if(thisIndex == 0){
						if($(this).is(".first")){
							$(this).attr("id",id.slice(0 , -1));
						}else{
							if($(this).is(".second")){
								$(this).attr("id",id+index);
							}
						}
					}else{
						$(this).not(".first").attr("id",id.slice(0 , -1)+index);
					}
				}else{
					if(thisIndex == 1){
						if($(this).is(".second")){
							$(this).attr("id",id+index);
						}
						if($(this).is(".first")){
							$(this).attr("id",id.slice(0 , -1));
						}
					}else{
						$(this).not(".first").attr("id",id.slice(0 , -1)+index);
					}
				}

				// 라벨이 있을 경우
				if($(this).siblings("label").length){
					$(this).siblings("label").each(function(){
						var id = $(this).prev().attr("id");
						$(this).attr("for",id);
					});
				}
			});

			// 가이드 테스트 (이건 개발 최종으로 넘길 때는 삭제)
			move.find("td + td *[id]").each(function(){
				var index = $(this).closest(".move").index();
					i = $(this).attr("id");
				$(this).val('현재 id값은 "'+i+'"입니다');
			});
		});
	}
/*** 위치이동 끝 ***/

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
/*** 추가/삭제 끝 ***/

// 리스트 테이블 선택된 리스트 삭제
function fn_chk_del(t){
	$("body, html").css({"overflow":"auto"});
	$("#"+t).find("tbody td .checkbox.only input:checked").closest("tr").remove().promise().done(function(){
		var thLength = $("#"+t).find("thead th").length,
			inHtml = "";
			inHtml += "<tr>";
			inHtml += "<td colspan='"+thLength+"' class='noData'>";
			inHtml += "<p><i>info</i> 리스트가 없습니다.</p>";
			inHtml += "</td>";
			inHtml += "</tr>";
		if($("#"+t).find("tbody tr").length == 0){
			$("#"+t).find("tbody").append(inHtml);
		}
	});
}

// 공통 삭제
function fn_remove(t){
	$(t).closest(".remove").remove();
}

$(function() {
	/*>>>>>>>>>> 공통 <<<<<<<<<<*/
	// 레이아웃
	fn_layout();

	// 파일 선택
	fn_file_change();

	// 트리
	fn_tree();

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
			buttonImage: "../assets/images/ico-date.png",
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
	// Show/Hide 박스
	var boxSlide = $(".boxSlide");
	boxSlide.each(function(){
		var $this = $(this);
		boxSlide.find("dl.open > dt > a > i").text("expand_less");
		boxSlide.find("dl.open > dd").show();
		$this.find("> dl > dt > a").click(function(e){
			e.preventDefault();
			if($(this).closest("dl").hasClass("open")){
				$(this).closest("dl").removeClass("open").find("> dt > a > i").text("expand_less");
				$(this).closest("dl").find("dd").slideUp(100);
			}else{
				if($this.hasClass("accoFunc")){
					$this.find(" > dl").removeClass("open").find("> dt > a > i").text("expand_less");
					$this.find(" > dl dd").slideUp(100);
				}
				$(this).closest("dl").addClass("open").find("> dt > a > i").text("expand_more");
				$(this).closest("dl").find("dd").slideDown(100);
			}
		});
	});

	// 체크시 입력 폼 활성화
	var chkFunc = $(".chkFunc");
	chkFunc.each(function(){
		var $this = $(this),
			btnChk = $this.find(".checkbox > input:first-child");
		btnChk.each(function(){
			if($(this).is(":checked")){
				if($(this).attr("type") == "radio"){
					$this.find("select").attr("disabled","");
					$this.find("input").attr("readonly","");
				}
				$(this).parent().find("*:disabled, *:read-only").removeAttr("disabled").removeAttr("readonly");
			}else{
				$(this).parent().find("select").attr("disabled","disabled");
				$(this).parent().find("input").attr("readonly","readonly");
			}
		});
		btnChk.click(function(){
			if($(this).is(":checked")){
				if($(this).attr("type") == "radio"){
					$this.find("select").attr("disabled","");
					$this.find("input").attr("readonly","");
				}
				$(this).parent().find("*:disabled, *:read-only").removeAttr("disabled").removeAttr("readonly");
			}else{
				$(this).parent().find("select").attr("disabled","disabled");
				$(this).parent().find("input").attr("readonly","readonly");
			}
		});
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

	// 숫자 입력
	var num = $(".num");
	num.each(function(){
		$(this).find("button").click(function(){
			var i = Number($(this).siblings("input").val());
			if($(this).hasClass("btnUp")){
				$(this).siblings("input").val(i+1);
			}else{
				if(i > 0){
					$(this).siblings("input").val(i-1);
				}else{
					fn_noti_pop(this,'더이상 감소는 불가능합니다.');
				}
			}
		});
		$(this).find("input").keyup(function() {
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
	});

	// 리스트 전체선택
	var listTable = $(".listTable");
	listTable.each(function(){
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

	// 별점
	var eval = $(".eval");
	eval.each(function(){
		var evalVal = $(this).find("p").text(),
			btnEval = $(this).find("a");
		$(this).find("p span").css({"width":100/5*evalVal + "%"});

		btnEval.click(function(e){
			e.preventDefault();
			btnEval.removeClass("on");
			$(this).addClass("on").prevAll().addClass("on");

			var i = $(this).text();
			$(this).closest("div").siblings().find("span").text(i);
		});
	});

	// 검색 상세 열고닫기
	var searchWrap = $(".searchWrap");
	searchWrap.each(function(){
		var btnToggle = $(this).find(".btnToggle"),
			slideRow = $(this).find(".slideRow");
		btnToggle.click(function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				slideRow.slideDown(0);
			}else{
				$(this).addClass("on");
				slideRow.slideUp(0);
			}
		});
	});
});


// 파일 드레그앤 드랍 2023-10-25 수정
// 파일 첨부
$(document).ready(function() {
	$(".btnFileAdd input").bind('change', function() {
		selectFile(this.files, $(this));
	});
});

var fileDrag = $(".fileDrag");

// 파일 리스트 번호
var fileIndex = 0;
// 등록할 전체 파일 사이즈
var totalFileSize = 0;
// 파일 리스트
var fileList = new Array();
// 파일 사이즈 리스트
var fileSizeList = new Array();
// 등록 가능한 파일 사이즈 MB
var uploadSize = 1000;
// 등록 가능한 총 파일 사이즈 MB
var maxUploadSize = 500;
// 파일 리스트
var dataTransfer = new DataTransfer()
var dataTransferList = [];

$(function() {
	// 파일 드롭 다운
	fileDropDown();
});

// 파일 드롭 다운
function fileDropDown() {
	var dropZone = $(".dropZone");
	dropZone.each(function(){
		var $this = $(this);
		//Drag기능
		$(this).on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css('background-color', '#E3F2FC');
		});
		$(this).on('dragleave', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css('background-color', '#FFFFFF');
		});
		$(this).on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css('background-color', '#E3F2FC');
		});
		$(this).on('drop', function(e) {
			e.preventDefault();
			$(this).css('background-color', '#FFFFFF');
			var files = e.originalEvent.dataTransfer.files;
			if (files != null) {
				if (files.length < 1) {
					fn_noti_pop($(this).closest(".fileDrag"),'폴더는 업로드 불가합니다.');
					return;
				} else {
					var thisEl = $(this).closest(".fileDrag").find("input:file[id^='inputFile']");
					selectFile(files, thisEl, true);
				}
			} else {
				fn_noti_pop($(this).closest(".fileDrag"),'ERROR');
			}
		});
	})
}

// 파일 선택시
function selectFile(fileObject, thisElement, drop) {
	var files = null;
	if (fileObject != null) {
		// 파일 Drag 이용하여 등록시
		if(drop){
			if (!$(thisElement)[0].files.length) {
				files = fileObject;
			} else {
				// 파일이 있는데 추가 드롭다운 되는 경우
				var beforeFiles = Array.from($(thisElement)[0].files),
				filesAdd = Array.from(fileObject);
				beforeFiles.push(...filesAdd);
				beforeFiles.forEach(file => { dataTransfer.items.add(file); });
				files = dataTransfer.files;
			}
		}else {
			files = fileObject;
		}
	}
	// 다중파일 등록
	if (files != null) {
		$(".fileDrag").each(function(){
			if (files != null && files.length > 0) {
				thisElement.closest(".fileDrag").find(".fileDragDesc").hide();
				thisElement.closest(".fileDrag").find(".fileList").show();
			} else {
				thisElement.closest(".fileDrag").find(".fileDragDesc").show();
				thisElement.closest(".fileDrag").find(".fileList").hide();
			}
		});

		for (var i = 0; i < files.length; i++) {
			// 파일 이름
			var fileName = files[i].name;
			var fileNameArr = fileName.split("\.");
			// 확장자
			var ext = fileNameArr[fileNameArr.length - 1];

			var fileSize = files[i].size; // 파일 사이즈(단위 :byte)
			if (fileSize <= 0) {
				return;
			}
			var fileSizeKb = fileSize / 1024; // 파일 사이즈(단위 :kb)
			var fileSizeMb = fileSizeKb / 1024; // 파일 사이즈(단위 :Mb)

			var fileSizeStr = "";
			if ((1024*1024) <= fileSize) { // 파일 용량이 1메가 이상인 경우
				fileSizeStr = fileSizeMb.toFixed(2) + " Mb";
			} else if ((1024) <= fileSize) {
				fileSizeStr = parseInt(fileSizeKb) + " kb";
			} else {
				fileSizeStr = parseInt(fileSize) + " byte";
			}
			if (fileSizeMb > uploadSize) {
				// 파일 사이즈 체크
				fn_noti_pop(thisElement.closest(".fileDrag"),"용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
				break;
			} else {
				// 드롭 리스트가 있는데 추가로 넣을 경우
				if (i === 0) { 
					totalFileSize = 0;
					fileList = [];
					fileSizeList = [];
					thisElement.closest(".fileDrag").find(".fileList").html('');
				}
				// 전체 파일 사이즈
				totalFileSize += fileSizeMb;
				// 파일 배열에 넣기
				fileList[fileIndex] = files[i];
				// 파일 사이즈 배열에 넣기
				fileSizeList[fileIndex] = fileSizeMb;
				// 업로드 파일 목록 생성
				var inputId = thisElement.attr('id'),
					inputNum = inputId.substring(inputId.length - 1, inputId.length);
				addFileList(thisElement, fileIndex, fileName, fileSizeStr, inputId, inputNum);
				// 파일 번호 증가
				fileIndex++;
				// 드롭다운 업로드 파일 input 반영
				$(thisElement)[0].files = files;
			}
		}
	} else {
		fn_noti_pop(thisElement.closest(".fileDrag"),'ERROR');
	}
}

// 업로드 파일 목록 생성
function addFileList(thisElement, fIndex, fileName, fileSizeStr, inputId, inputNum) {
	var html = "";
		html += "<li id='fileName" + fIndex + "'>";
		html += "<p>"+ fileName + " (" + fileSizeStr +") </p>";
		html += "<button type='button' class='btn btnPL02' onclick='fn_deleteFile(this)'><i>delete</i>삭제</button>";
		html += "</li>"
	$('#fileList' + inputNum).append(html);
}

// 업로드 파일 삭제
function fn_deleteFile(t) {
	var fileDrag = $(t).closest(".fileDrag"), 
		deleteFileIndex = $(t).closest("li").index(), 
		deleteElement = fileDrag.find("input[type=file]"), 
		dataTransfer = new DataTransfer(), 
		files = deleteElement[0].files, 
		fileArray = Array.from(files);
	// 파일 배열에서 삭제
	totalFileSize -= fileSizeList[deleteFileIndex];
	fileList.splice(deleteFileIndex, 1);
	fileSizeList.splice(deleteFileIndex, 1);
	// 드롭다운 업로드 파일 input 반영
	fileArray.splice(deleteFileIndex, 1);
	fileArray.forEach(file => { dataTransfer.items.add(file); });
	deleteElement[0].files = dataTransfer.files;

	$(t).closest("li").remove();
	if (fileDrag.find(".fileList li").length > 0) {
		fileDrag.find(".fileDragDesc").hide();
		fileDrag.find(".fileList").show();
	} else {
		fileDrag.find(".fileDragDesc").show();
		fileDrag.find(".fileList").hide();
	}
}
// 업로드 파일 모두 삭제
function fn_deleteAllFile(t) {
	var fileDrag = $(t).closest(".fileDrag");
	fileDrag.find(".fileList li").remove();
	fileDrag.find(".fileDragDesc").show();
	fileDrag.find(".fileList").hide();
	fileDrag.find("input[type=file]").val('');
}