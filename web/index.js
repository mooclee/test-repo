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
	//return;
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
				//default:
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
					
				case '#tabs-1':
				case '#tabs-2':
				case '#tabs-3':
				case '#tabs-5':
					closeDropmenu();
					break;
			}
		})
		//.mouseleave(function(){
		//	closeDropmenu();
		//});
	;
	
	// autogrow
	// http://www.technoreply.com/autogrow-textarea-plugin-3-0/
	$('.ta_question').autoGrow();
	
	$('.but_trash').button({
		text: false,
		icons: {	primary: "ui-icon-trash"}
	}).mouseup(function(){	// work for mobile too
		onDelete(this);
	});
	
	
	$('#tbl_root').show();

	// testing
	$("#tabs").tabs("option", "active", TAB_OCLA);
	$('.ocla_page').hide();
	$('#tabs-4c').show();
}

/////////////////////////////////////////////////////////////////////////////////////

function onDelete(but){
	//if (confirm('Are you sure to delete this?')){
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        "Yes": function() {
          $( this ).dialog( "close" );
					
					var jbut = $(but),
							jtd = jbut.parent(),
							jtr = jtd.parent(),
							jtbody = jtr.parent(),
							jtrs = jtbody.find('tr'),
							length = jtrs.length,
							index = jtrs.index(jtr)
					;
					//console.debug(index, length);
					if (index == length - 1){
						jtr.find('textarea').val('').css('height', '');
						jtr.find('div.autogrow-textarea-mirror').html('');
					} else {
						jtr.remove();
					}

					$('.div_details').each(function(){
						var num = 1;
						$(this).find('.assessment_num').each(function(){
							$(this).text((num++) + '.');
						});
						var code = 65; // begin from A
						$(this).find('.mcq_letter').each(function(){
							$(this).text(String.fromCharCode(code++) + '.');
						});
					});
				
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });		
		
	//}
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
	var display = jmenu.css('display');
	if (display == 'none')
	{
		jmenu.show().offset({left:x, top:y}).hide();
		//jmenu.show().hide();
		jmenu.fadeIn('swing');
		//jmenu.show();
	} else {
		//jmenu.show();
	}
 }

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	//console.trace('closeDropMenu')
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