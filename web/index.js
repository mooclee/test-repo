var
	TAB_HOME = 0,
	TAB_PROFILE = 1,
	TAB_NTWK = 2,
	TAB_OCLA = 3
;


jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

/////////////////////////////////////////////////////////////////

function initAll(){
	
	// top buttons
	$('.svg_container').each(function(){
		var jobj = $(this),
			svg = jobj.attr('svg'),
			html = svg_obj[svg],
			jhtml = $(html);
		var svgfill = jobj.attr('svgfill'),
				svgsize = jobj.attr('svgsize')
		;
		jhtml
			.find('path,ellipse,circle,polygon')
			.attr('fill', svgfill ? svgfill : '#ffffff')
		;
		if (svgsize){
			jhtml.width(svgsize).height(svgsize)
		}
		jobj.prepend(jhtml);
		//console.debug(jobj.outerHTML());
	});
	
	// move balloon
	
	// tooltip
	$( document ).tooltip();
	
	$( document ).click(function(){
		closeDropmenu();
	});

	// profile blocks
	$('#profile_blocks').sortable({
		placeholder: 'ui-state-highlight',
		// http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
		helper: function(event, ui){
			var $clone =  $(ui).clone();
			$clone.css('position','absolute');
			return $clone.get(0);
		},		
	}).disableSelection();

	// resize
	//$(window).resize(onSize);
	
	// dropmenu
	$('.dropmenu').menu().hide();
	$('#dropmenu_ocla	a').click(function(e){
		var jobj = $(this);
		var id = jobj.attr('href');
		//console.debug(id);
		$("#tabs").tabs("option", "active", TAB_OCLA);
		$('.ocla_page').hide();
		$(id).show();
	});
	
	// EDITOR
	$('.editor').trumbowyg({
    btns: [
//        ['viewHTML'],
//        ['formatting'],
//        'btnGrp-semantic',
				['bold', 'italic', 'underline', 'strikethrough'],
        ['superscript', 'subscript'],
        ['link'],
        ['insertImage'],
        'btnGrp-justify',
        'btnGrp-lists',
        ['horizontalRule'],
        ['removeformat'],
  //      ['fullscreen']
    ],
		autogrow: true,
	});
	
	// editor
	//$('.editor').trumbowyg('html', "<b>Internship 101</b> is a course for students to prepare their internship programme.");
	
	// combobox
	$('.assessment_combobox').combobox();
	
	// spinner
	$('.assessment_spinner').spinner();
	
	// calender
	$.datetimepicker.setLocale('en');
	$('.assessment_datetime').datetimepicker();                	
	
	setBalloonNumber('todolist', 3);
	setBalloonNumber('notice', 3);
	setBalloonNumber('msg', 5);

	// TABS
	//var starttab = 0;	// home
	//var starttab = 1;	// profile
	//var starttab = 2;	// network
	//var starttab = 3;	// ocla
	$("#tabs").tabs({
		//active: starttab,
		activate: function(event, ui){
			//console.debug('activate');
			//closeDropmenu();
			$('.ocla_page').hide();
			
			var jobj = ui.newTab.find('a');
			var tab = jobj.attr('href');
			switch (tab){
				case '#tabs-4a':
					//toggleDropmenu(jobj, 'ocla');
					//event.stopPropagation();
					$('#tabs-4a').show();
					break;
				default:
					break;
			}
		}
	});
	$('#tabs a')
		.hover(function(){
			var jobj = $(this);
			var tab = jobj.attr('href');
			switch (tab){
				case '#tabs-4a':
					openDropmenu(jobj, 'ocla');
					//event.stopPropagation();
					break;
				default:
					closeDropmenu();
					break;
			}
		})
		//.mouseleave(function(){
		//	closeDropmenu();
		//});
	;
	
	// textarea
	$('.ta_question').autoGrow();
	
	$('#tbl_root').show();

	// testing
	$("#tabs").tabs("option", "active", TAB_OCLA);
	$('.ocla_page').hide();
	$('#tabs-4c').show();

	
}

//////////////////////////////////////////////////////////////////////

//function onSize(){
//}

//////////////////////////////////////////////////////////////////////
 
 function setBalloonNumber(name, num){
	var jobj = $('#topmenu_'+name), jballoon = jobj.find('.balloon'), jtext = jobj.find('.balloon2');
	if (num){
		if (num > 99){
			num = 99;
		}
		var offset = jobj.offset(), x = offset.left, y = offset.top, w = jobj.width(), w1 = num.toString().lenth*10;
		jtext.text(num);
		jballoon.show();
	} else {
		jballoon.hide();
	}
 }

//////////////////////////////////////////////////////////////////////
 
 function openDropmenu(obj, menu){
	var jobj = $(obj), jmenu = $("#dropmenu_"+menu);
	var offset = jobj.offset(),
		y = offset.top + jobj.height() + 11,
		x = offset.left
	;
	if (jmenu.css('display') == 'none'){
		jmenu.show().offset({left:x, top:y}).hide();
		//jmenu.show().hide();
		jmenu.fadeIn('swing');
	}
 }

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	$('.dropmenu').hide();
}

//////////////////////////////////////////////////////////////////////
 
function toggleDropmenu(obj, menu){
	var jobj = $(obj), jmenu = $("#dropmenu_"+menu);
	if (jmenu.css('display') != 'none'){
		console.debug('toggleDropMenu', 'close');
		jmenu.hide();
	} else {
		console.debug('toggleDropMenu', 'open');
		openDropmenu(obj, menu);
	}
}

//////////////////////////////////////////////////////////////////////
 
function openDetails(obj){
	var jobj = $(obj);
	var jtr = jobj.parent().parent().next();
	jtr.find('div.div_details').slideToggle('swing', function(){
		//jtr.slideToggle();
	});	// must be with div
}

 