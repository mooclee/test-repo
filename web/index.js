var
	TAB_HOME = 0,
	TAB_PROFILE = 1,
	TAB_NTWK = 2,
	TAB_OCLX = 3,
	TAB_YOLOX = 4,
	TAB_ACTIVITY = 3
;

var g_editor_opts = {
	lang: 'en',
	fixedBtnPane: true,
	btnsGrps: {
		test: ['strong', 'em'] // Custom nammed group
	},
	btnsDef: {
			// Customizables dropdowns
			align: {
					dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
					ico: 'justifyLeft'
			},
			image: {
					dropdown: ['insertImage', 'upload'],//, 'base64', 'noembed'],
					ico: 'insertImage'
			},
			//createTable: {
			//	ico: 'createTable',
			//}
	},
	btns: [
			//['createTable'],
			['bold', 'italic', 'underline'],//, 'strikethrough'],
			['formatting'],
			['align'],
			['unorderedList', 'orderedList'],
			//['superscript', 'subscript'],
			['link'],
			['image'],
			['foreColor', 'backColor'],
			//['preformatted'],
			['horizontalRule'],
			['removeformat'],
			['viewHTML'],
//					['fullscreen', 'close']
			//['undo', 'redo'],
			['script', 'style'],
	],
	autogrow: true,
};

jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

/////////////////////////////////////////////////////////////////

function initAll(){
	//return;
	
	// top buttons
	drawSvg($('.svg_container'));
	
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
	
	/////////////////////////////////////////////////////////////////////////////
	// EDITOR
	/////////////////////////////////////////////////////////////////////////////
	$.extend(true, $.trumbowyg.langs, {
			fr: {
					align: 'Alignement',
					image: 'Image'
			}
	});

	$('.editor').trumbowyg(g_editor_opts);	
	
	// combobox
	$('.profile_combobox').combobox();
	$('.assessment_combobox').combobox();
	
	createSelect();
	
	// combobox event
	$('#cb_profile_activity input')
		.on("autocompleteselect", function(event, ui){
			//console.debug(label);
			var label = ui.item.label;
			switch (label){
				
				case 'OCL-X':
					$('#cb_exp_name_oclx').show();
					$('#cb_exp_name_yolox').hide();
					showProfileDesc(1);
					var txt = $('#cb_exp_name_oclx select option')[0].text;
					$('#cb_exp_name_oclx input').val(txt);
					break;
					
				case 'YOLO-X':
					$('#cb_exp_name_oclx').hide();
					$('#cb_exp_name_yolox').show();
					showProfileDesc(4);
					var txt = $('#cb_exp_name_yolox select option')[0].text;
					$('#cb_exp_name_yolox input').val(txt);
					break;
		}
	});
	
	$('#cb_exp_name_oclx input')
		.on("autocompleteselect", function(event, ui){
			var value = parseInt(ui.item.option.value);
			showProfileDesc(value);
		});

	$('#cb_exp_name_yolox input')
		.on("autocompleteselect", function(event, ui){
			var value = parseInt(ui.item.option.value);
			showProfileDesc(value);
		});
		
	showProfileDesc(1);
	var txt = $('#cb_exp_name_oclx select option')[0].text;
	$('#cb_exp_name_oclx input').val(txt);
	
	// spinner
	$('.assessment_spinner').spinner();
	
	// https://datatables.net/reference/option/dom
	
	createActivity();
	//createTask();
	$('.datatable').DataTable({
			//dom: '<"top"i>rt<"bottom"flp><"clear">',
			dom: '',
			//dom: '<"top"f>',
	});
	
	$('.datatable').on('draw.dt', function(){
		console.debug('redraw datatable');
		var jtbl = $(this),
				id = jtbl.attr('id')
		;
		console.debug('redraw', id);
		removeUnneedSorting(jtbl);
		if (id == 'tbl_search_activity'){
			toggleAllTasks(1);		
		}
	});
	removeUnneedSorting($('.datatable'));	
 
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
			stopVideo();
			$('.dropmenu, .ocla_page').hide();
			var jobj = ui.newTab.find('a');
			var href = jobj.attr('href');
			console.debug(href);
			switch (href){
				
				case '#tabs-2':
					showProfileDesc(1);				
					break;
				
				case '#tabs-3':
					//openCreateActivity(0);
					break;
				
				//case '#tabs-4a':
				//	$('#tabs-4a').show();
				//	break;
					
				//case '#tabs-5a':
				//	$('#tabs-5a').show();
				//	break;
					
				case '#tabs-8b':
					$('#tabs-8b').show();
					setTimeout(function(){
						//createTask();
						toggleAllTasks(1);
					}, 50);
					break;
			}
		}
	});
	
	$('#tabs a')
		.hover(function(){
				
			var jobj = $(this);
			var tab = jobj.attr('href');
			//console.debug(tab);
			switch (tab){
				
				case '#tabs-4a':
					openDropmenu(jobj, 'ocla');
					//event.stopPropagation();
					break;

				case '#tabs-5a':
					openDropmenu(jobj, 'yolox');
					//event.stopPropagation();
					break;
				
				case '#tabs-8b':
					openDropmenu(jobj, 'activity');
					break;
					
				case '#tabs-1':
				case '#tabs-2':
				case '#tabs-3':
				case '#tabs-5':
					closeDropmenu();
					break;
			}
		})
	;
	// dropmenu
	$('.dropmenu').menu().hide();
	$('.dropmenu a').click(function(e){
		var jobj = $(this);
		var href = jobj.attr('href');
		console.debug('dropmenu', href);
		
		if (href.indexOf('#search') == 0){
			$('.search_page').hide();
		} else if (href.indexOf('#tabs') == 0){
			$('.ui-tabs-panel').hide();
			$('.ocla_page').hide();
			if (href.indexOf('#tabs-4') == 0){
				$("#tabs").tabs("option", "active", TAB_OCLX);
			} else if (href.indexOf('#tabs-5') == 0){
				$("#tabs").tabs("option", "active", TAB_YOLOX);
			}
		}
		
		stopVideo();
		switch (href){
			case '#tabs-8a':// create activity
				openCreateActivity(0);
				break;
				
			case '#search_eva':
			case '#search_asm':
			case '#search_stp':
			case '#search_ntc':
			case '#search_msg':
			case '#search_gs':
				var type = href.split('_')[1].toUpperCase();
				openActivityAction(type);
				break;
			
			case '#search_view':
			case '#search_viewedit':
				openCreateActivity(1);
				break;
			case '#search_sendmsg':
				openSendMsg();
				break;
			case '#search_searchppl':
				openSearchPeople();
				break;
		}
		//return;
		//setTimeout(
		//	function(){
		//		$(href).show();
		//	}, 50);	// just after all the page are hidden
	});
	$('.action_button')
		.click(function(event){
			openDropmenu($(this), 'action', event);
		});
	$('.import_button')
		.click(function(event){
			openDropmenu($(this), 'import', event);
		});
	$('.import2_button')
		.click(function(event){
			openDropmenu($(this), 'import2', event);
		});
	// autogrow
	// http://www.technoreply.com/autogrow-textarea-plugin-3-0/
	$('.ta_question').autoGrow();
	
	$('.but_trash').button({
		text: false,
		icons: {	primary: "ui-icon-trash"}
	}).mouseup(function(){	// work for mobile too
		onDelete(this);
	});
		
	// start page
	$('.ocla_page').hide();
	$("#tabs").tabs("option", "active", TAB_HOME);

	// show pages
	$('#tbl_root').show();	
	
	// combobox
	$('.skill_combobox').combobox();

	// toggle
	$('.toggle_stamp').toggles({
		drag: true, // allow dragging the toggle between positions
		click: true, // allow clicking on the toggle
		text: {
			on: 'Yes', // text for the ON position
			off: 'No' // and off
		},
		on: false, // is the toggle ON on init
		animate: 150, // animation time (ms)
		easing: 'swing', // animation transition easing function
		checkbox: null, // the checkbox to toggle (for use in forms)
		clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
		width: 50, // width used if not set in css
		height: 20, // height if not set in css
		type: 'compact' // if this is set to 'select' then the select style toggle will be used
	});
	
	$('.toggle_type').toggles({
		type: 'select',
		//type: 'compact' // if this is set to 'select' then the select style toggle will be used
		drag: true, // allow dragging the toggle between positions
		click: true, // allow clicking on the toggle
		text: {
			on: 'OCL-X', 		// text for the ON position
			off: 'YOLO-X', 	// and off
		},
		on: false, // is the toggle ON on init
		animate: 150, // animation time (ms)
		easing: 'swing', // animation transition easing function
		checkbox: null, // the checkbox to toggle (for use in forms)
		clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
		width: 100, // width used if not set in css
		height: 20, // height if not set in css
	});
	
	$('.toggle_type').on('toggle', function(e, active) {
		$('#td_activity_type').text(active?'(Out-of-Class Experience)':'(You-Only-Live-Once Experience)')
	}).data('toggles').toggle(true);
	
	$('.toggle_stamp2').toggles({
		type: 'select',
		//type: 'compact' // if this is set to 'select' then the select style toggle will be used
		drag: true, // allow dragging the toggle between positions
		click: true, // allow clicking on the toggle
		text: {
			on: 'Yes', // text for the ON position
			off: 'No' // and off
		},
		on: false, // is the toggle ON on init
		animate: 150, // animation time (ms)
		easing: 'swing', // animation transition easing function
		checkbox: null, // the checkbox to toggle (for use in forms)
		clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
		width: 100, // width used if not set in css
		height: 20, // height if not set in css
	});
	
	$('.toggle_stamp2').on('toggle', function(e, active) {
		$('#td_stamp2').text(active?'(Stamp proof is required from the coordinator)':'(Stamp proof is NOT required from the coordinator)')
	}).data('toggles').toggle(true);
		
	// default toggle on
	//$('#toggle_activity_type').data('toggles').toggle(true);
	
	// jquery.star-rating-svg
	// http://github.com/nashio/star-rating-svg
	$('.gs_rating').starRating({
    initialRating: 0,
		totalStars: 5,
		starSize: 24,
		strokeWidth: 0,
		useGradient: false,		
		emptyColor: 'lightgray',
		hoverColor: 'salmon',
		activeColor: 'cornflowerblue',		
    disableAfterRate: false,
    callback: function(currentRating, $el){
      //console.log('index: ', currentIndex, 'currentRating: ', currentRating, ' DOM element ', $el);
      //$('.live-rating').text(currentIndex);
			// save
			$($el).attr('rating', currentRating)
			
			// find overall
			var jtbody = $el.parent().parent().parent();
			//console.debug(currentRating, jtbody);
			var number = 0, total = 0;
			jtbody.find('.gs_rating').each(function(){
				var rating = parseFloat($(this).attr('rating'));
				if (typeof(rating) != 'undefined' &&  !isNaN(rating)){
					total += rating;
				}
				number++;
			});
			var av = Math.floor((total / number) * 10) / 10;
			//console.debug('total=', total, 'number=', number, 'av=', av);
			
			// FIND & SET GAUGE
			var jgauge = jtbody.parent().parent().parent().find('.status_gauge');
			var gauge0 = jgauge.data().gauge;
			gauge0.set(av);
			jgauge.parent().find('.preview-textfield').text(av);
			//setGauge(jgauge, 0);
    },
    onHover: function(currentIndex, currentRating, $el){
		},
    onLeave: function(currentIndex, currentRating, $el){
      //console.log('index: ', currentIndex, 'currentRating: ', currentRating, ' DOM element ', $el);
      //$('.live-rating').text(currentRating);
    },
  });
	$('.gs_rating2').starRating({
    initialRating: 0,
		totalStars: 5,
		starSize: 24,
		strokeWidth: 0,
		useGradient: false,		
		emptyColor: 'lightgray',
		hoverColor: 'salmon',
		activeColor: 'cornflowerblue',		
    disableAfterRate: false,
    callback: function(currentRating, $el){
      //console.log('index: ', currentIndex, 'currentRating: ', currentRating, ' DOM element ', $el);
    },
    onHover: function(currentIndex, currentRating, $el){
		},
    onLeave: function(currentIndex, currentRating, $el){
      //console.log('index: ', currentIndex, 'currentRating: ', currentRating, ' DOM element ', $el);
      //$('.live-rating').text(currentRating);
    },
  });
	
	$('.open_assessment_button').click(function(){
		console.debug('open_assessment_button');
		//$( '#dialog_eva' ).dialog( "close" );
		//$( '#dialog_assessment' ).dialog( "open" );
		//return false;
		//window.
	});
	
	$('#dialog_assessment').dialog({
		modal: true,
		autoOpen: false,
		width: 'auto',
		height: 'auto',
		buttons:{
			Ok: function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			},
		}
	});
	// 
	// http://bernii.github.io/gauge.js/
	//
	var gauge = $('.status_gauge').gauge({
		lines: 12, // The number of lines to draw
		angle: 0.15, // The length of each line
		lineWidth: 0.44, // The line thickness
		pointer: {
			length: 0.49, // The radius of the inner circle
			strokeWidth: 0.053, // The rotation offset
			color: '#000000' // Fill color
		},
		limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
		colorStart: '#6FADCF',   // Colors
		colorStop: '#8FC0DA',    // just experiment with them
		strokeColor: '#E0E0E0',   // to see which ones work best for you
		generateGradient: true,
		percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
	});
	gauge.each(function(){
		var jgauge = $(this);
		var jtext = jgauge.parent().find('div');
		var gauge0 = jgauge.data().gauge;
		//gauge0.setTextField(jtext[0]);
		gauge0.animationSpeed = 32; // set animation speed (32 is default value)
		gauge0.maxValue = 5; // set max gauge value
		var user = jgauge.attr('user'),
			value = 0
		;
		switch (user){
			case 'samson': value = 3.6; break;
			case 'chole': value = 3.6; break;
		}
		gauge0.set(value);		
	});

	// autosize (autogrow)
	autosize($('textarea.autogrow'));
	
	// uniform checkbox
	$('input[type=checkbox]').uniform();
	
	$('#cb_assessment,#cb_notice,#cb_message').change(function(){
		toggleAllTasks(1);
	});
	$('.details_button').click(function(){
		toggleDetails(this);
	});
	
	$('.tbl_chole td').click(function(){
		openCholePage(1);
	});
	$('a[href=\\#tabs-3]').click(function(){
		openCholePage(0);
	});
	$('a[href=\\#tabs-8b]').click(function(){
		console.debug('tabs-8b');
		$('#tabs-8a').hide();
		$('#tabs-8b').show();
	});
	
	$('#dialog_sendmsg .trumbowyg-editor').keypress(function(event){
		if (event.which == 13) {
			event.preventDefault();
			sendMsg('#dialog_sendmsg');
		}		
	});
	$('#dialog_msg .trumbowyg-editor').keypress(function(event){
		if (event.which == 13) {
			event.preventDefault();
			sendMsg('#dialog_msg');
		}		
	});
	
	setMyUser('samson');
	//setMyUser('ian');

	// exit for production version
	if (g_bProduction){
		return;
	}
		
	//$("#tabs").tabs("option", "active", TAB_ACTIVITY); $('.ocla_page').hide(); $('#tabs-8a').show();	// create activity
	$("#tabs").tabs("option", "active", TAB_ACTIVITY); $('.ocla_page').hide(); $('#tabs-8b').show();		// search activity
	//$("#tabs").tabs("option", "active", TAB_NTWK); openCholePage(1);	// search other's homepage
	//$("#tabs").tabs("option", "active", TAB_PROFILE);
	//$("#tabs").tabs("option", "active", TAB_ACTIVI);
	//return;
	
	///////////////////////
	// TESTING
	///////////////////////
	// show tab
	//$('.ui-tabs-panel').hide();
	//$('.ocla_page').hide();
	
	// OCLX
	//$("#tabs").tabs("option", "active", TAB_OCLX);
	//$('.ocla_page').hide(); $('#tabs-4d').show();
	//var but = $('#tabs-4d .details_button')[0];
	//but.onclick();
		
	// YOLO
	//$("#tabs").tabs("option", "active", TAB_YOLOX);
	//$('.ocla_page').hide(); $('#tabs-5c').show();
	//var but = $('#tabs-5c .details_button')[0];
	//but.onclick();
}

/////////////////////////////////////////////////////////////////////////////////////

function onDelete(but){
	//if (confirm('Are you sure to delete this?')){
    $( "#dialog-confirm" ).dialog({
      modal: true,
      resizable: false,
      height:180,
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
 
function toggleDetails(obj){
	stopVideo();
	var jobj = $(obj);
	var jtr = jobj.parent().parent().next();
	jtr.find('div.div_details').slideToggle('swing');	// must be with div
}

//////////////////////////////////////////////////////////////////////
 
function toggleAddExp(){
	$("#div_add_exp").slideToggle('swing');	// must be with div
}

//////////////////////////////////////////////////////////////////////
 
function togglePage(name){
	stopVideo();
	var display = $(name).css('display') != 'none';
	if (display){
		//$(name).slideToggle();
	} else {
		$('.display_page').hide();
	}
	//$(name).slideToggle();
	$(name).css('display', display?'none':'block');
}

///////////////////////////////////////////////////////////////////////
var myuser = '';

function toggleMyUser(){
	if (myuser == 'samson'){
		setMyUser('ian');
	} else {
		setMyUser('samson');
	}
}

///////////////////////////////////////////////////////////////////////

function setMyUser(user){
	myuser = user;
	var photo = '', name = '', curriculum = '';
	switch (user){
		case 'samson':
			photo = 'm03.jpg';
			name = 'Samson Chan';
			curriculum = 'Social Science Year 2';
			break;
		case 'ian':
			photo = 'p11.jpg';
			name = 'Ian Smith';
			curriculum = 'Social Science Professor';
			break;
	}
	$('.name_myself').html(name);
	$('.curriculum_myself').html(curriculum);
	$('.photo_myself,.photo_myself2').attr('src', './people/' + photo)
	//var p = $('.photo_myself').parent();	p.html('<img src="./people/' + photo + '.jpg" class="photo_myself"/>')
	
}


///////////////////////////////////////////////////////////////////////

function stopVideo(){
	$('video').each(function(){
			this.pause();
//			this.stop();
	})
}

///////////////////////////////////////////////////////////////////////

function showProfileDesc(index){
	var obj = g_activity_arr[index];
	//console.debug('showProfileDesc', index, obj.youtube);
	$('#div_profile_desc').html(obj.text);
	$('#img_profile_desc').attr('src', obj.img);
	$('#addexp_priv1').prop('checked', true);
	$('#video_profile_desc').html('<iframe class="ifrm_youtube" src="' + obj.youtube + '" frameborder="0" allowfullscreen></iframe>');
}

// <video width="800" height="480" controls="1"><source type="video/mp4"/></video>
//$('#video_profile_desc').html('<video width="800" height="480" controls="1"><source type="video/mp4" src="' + obj.video + '"/></video>');
//console.debug(obj.video, $('#video_profile_desc').html());

///////////////////////////////////////////////////////////////////////

function toggleEdit(jobj){
	//e.g. div_yolo1
	jobj.toggleClass('editor');
	if (jobj.hasClass('editor')){
		var h = jobj.height();
		jobj.attr('height0', h)
		jobj.trumbowyg(g_editor_opts);	
	} else {
		jobj.trumbowyg('destroy');
		var h = parseInt(jobj.attr('height0'));
		jobj.height(h);
	}
}

///////////////////////////////////////////////////////////////////////

function changePerson(name){
	console.debug('changePerson', name)
	$('.ocla_page').hide();
	$("#tabs").tabs("option", "active", TAB_HOME);
	setMyUser('samson');
}

///////////////////////////////////////////////////////////////////////

function isVisible(jobj){
	var display = jobj.css('display');
	if (display == 'none'){
		return false;
	} else {
		return true;
	}
}

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	//console.trace('closeDropMenu')
	$('.dropmenu').hide();
		//$('.dropmenu, .ocla_page').hide();
}

//////////////////////////////////////////////////////////////////////

function createActivity(){
	$('.dropmenu, .ocla_page').hide();
	$('#tabs-8a').show();
}

//////////////////////////////////////////////////////////////////////

function openModal(jdiv){
	//console.debug(jdiv[0].outerHTML);
	jdiv.dialog({
		modal:true,
		width: 'auto',
		height: 'auto',
		buttons:{
			Ok: function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			},
		}
	})
}

///////////////////////////////////////////////////////////////
// remove sorting from unname column
///////////////////////////////////////////////////////////////

function removeUnneedSorting(jtbl){
	jtbl.find('.sorting').each(function(){
		var jobj = $(this),
			text = jobj.text().trim()
		;
		if (text == '' || text == 'Weight %'){
			jobj.removeClass('sorting');
		}
	});
}


/////////////////////////////////////////////////////////////////

function drawSvg(jobj){
	jobj.each(function(){
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
		jobj.find('svg').remove();
		jobj.prepend(jhtml);
		//console.debug(jobj.outerHTML());
	});
}

///////////////////////////////////////////////////////////////

function createActivity(){
	// assign desc
	for (var i = 1; i < g_activity_arr.length; i++){
/*	
		var obj = g_activity_arr[i];
		$('.div_title[index='+i+']').html(obj.title);
		$('.div_date[index='+i+']').html(obj.date);
		$('.div_desc[index='+i+']').html(obj.text);
		$('.img_act[index='+i+']').attr('src', obj.img);
		$('.ifrm_youtube[index='+i+']').attr('src', obj.youtube);
*/
		var a = g_activity_arr[i];
		var tr =
			'<tr index="' + i + '">'
				+ '<td>' + a.type + '</td>'
				+ '<td>' + a.title + '</td>'
				+ '<td>' + a.role + '</td>'
				+ '<td>' + a.start + '</td>'
				+ '<td>' + a.end + '</td>'
				+ '<td>' + a.status + '</td>'
				+ '<td>'
					+ '<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>'
				+ '</td>'
			+ '</tr>'
		;
		$('#tbody_search_activity').append(tr);
	}
	// REDRAW SVG
	drawSvg($('#tbody_search_activity .svg_container'));	
}

///////////////////////////////////////////////////////////////

function toggleAllTasks(bForceOpen){
	console.debug('toggleAllTasks', bForceOpen?1:0);
	
	var created = createTask();
	
	// FILTER
	var assessment = $('#cb_assessment').prop('checked')?1:0,
			notice = $('#cb_notice').prop('checked')?1:0,
			message = $('#cb_message').prop('checked')?1:0
	;
	// CHECK VISIBLITY
	var visible = 0;
	$('.div_act_details').each(function(){
		var jdiv = $(this);
		if (isVisible(jdiv)){
			visible++;
		}
	});
	// SHOW/HIDE EACH ROW
	$('.div_act_details').each(function(){
		var jdiv = $(this),
				type = jdiv.attr('tasktype')
		;
		var bShow = 0;
		switch (type){
			case 'GS':
			case 'EVA':
			case 'ASM':
			case 'STP':
				if (assessment)	bShow = 1;
				break;
			case 'NTC':	if (notice)			bShow = 1;	break;
			case 'MSG':	if (message)		bShow = 1;	break;
		}
		if ((bForceOpen || !visible) && bShow){
			jdiv.parent().parent().show();
			if (created){
				jdiv.show();
			} else {
				jdiv.slideDown('slow', function(){});
			}
		} else {
			jdiv.slideUp('slow', function(){
				jdiv.parent().parent().hide();
			});
		}
	});

	
}

///////////////////////////////////////////////////////////////

function openCholePage(bShow){
	console.debug('chole', bShow);
	$("#tabs").tabs("option", "active", TAB_NTWK);
	if (bShow){
		$('#div_ntwk').hide();
		$('#div_chole').slideDown();
	} else {
		$('#div_ntwk').show();
		$('#div_chole').slideUp();
	}
}

///////////////////////////////////////////////////////////////

function openCreateActivity(bSetTab){
	$("#tabs").tabs("option", "active", TAB_ACTIVITY);
	$('#tabs-8b').hide();	
	setTimeout(function(){	// settimeout prevent scrolling down
		$('#tabs-8a').show();	
		var obj = g_activity_arr[2];
		$('#div_search_desc').html('<iframe class="ifrm_youtube" src="' + obj.youtube + '" frameborder="0" allowfullscreen></iframe>');
	}, 100);
	
}


//////////////////////////////////////////////////////////////////////
 var	g_search_index = 0,
			g_task_index = 0
;
function openDropmenu(obj, menu, event){
	var jobj = $(obj), jmenu = $("#dropmenu_" + menu);
	var offset = jobj.offset(),
		y = offset.top + jobj.height(),
		x = offset.left,
		w = jmenu.width(),
		screenw = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth),
		border = 30
	;
	if (x + w + border > screenw){
		x = screenw - w - border;
	} 
	console.debug('openDropmenu', menu);//, x, y);
	switch (menu){
		case 'action':
			var jtr = jobj.parent().parent();
			var jtd = jtr.find('td:nth-child(3)')
			var role = jtd.text().trim().substring(0,1).toLowerCase();
			switch (role){
				case 'c':	// coordinator
					jmenu.find('li:nth-child(1)').hide();	// view details
					jmenu.find('li:nth-child(2)').show();	// view/edit details
					break;
					
				case 'p': // participant
					jmenu.find('li:nth-child(1)').show();
					jmenu.find('li:nth-child(2)').hide();
					break;
			}
			break;
			
		case 'searchact':
			var jtr = jobj.parent().parent().parent().parent().parent(),
					tasktype = jtr.attr('tasktype')
			;
			g_search_index = jtr.attr('index');
			g_task_index = jtr.attr('taskindex');
			var tasktype2 = tasktype.toLowerCase();
			var s1 = "#dropmenu_searchact li a[href!='\\#search_"+ tasktype2 +"']",
					s2 = "#dropmenu_searchact li a[href='\\#search_"+ tasktype2 +"']"
			;
			//console.debug(tasktype2, g_search_index);
			$(s1).parent().hide();
			$(s2).parent().show();
			break;
			
		default:
			y += 11;
			break;
	}
	var display = jmenu.css('display');
	if (!isVisible(jmenu)){
		$('.dropmenu').hide();
		jmenu.show().offset({left:x, top:y});
		jmenu.hide().fadeIn('swing');
	}
	if (event){
		switch (menu){
			case 'action':
			case 'import':
			case 'import2':
			case 'searchact':
				event.stopPropagation();
				break;
		}
	}
}

///////////////////////////////////////////////////////////////////////////

function createTask(){
	var created = 0;
	//if (!$('#tbl_search_activity .td_task').length){
	if (!$('.div_act_details').length){
		// CREATE TASK LIST
		$('#tbody_search_activity > tr[role=row]').each(function(){
			var jtr = $(this),
					index = parseInt(jtr.attr('index'))	// activity index
			;
			var trs = '';
			if (!isNaN(index)){
				var profile = g_activity_arr[index];
				if (profile && profile.tasks){
					var tasks = profile.tasks;
					for (var i = tasks.length - 1; i >= 0; i--){
						var task = tasks[i];
						var svg = '', btnsvg = '', btntext = '';
						switch (task.type){
							case 'GS':
							case 'ASM':
							case 'EVA':
							case 'STP':
								svg = 'pin'; ;
								btnsvg = 'fill';
								btntext = 'Perform';
								break;
							case 'NTC':
								svg = 'notice';
								btnsvg = 'eye';
								btntext = '&nbsp;&nbsp;View&nbsp;&nbsp;';
								break;
							case 'MSG':
								svg = 'message';
								btnsvg = 'reply';
								btntext = 'Response';
								break;
						}
						// ADD TO DATATABLE ROW
						$(
							'<tr>'
								+ '<td>&nbsp;</td>'
								+ '<td classx="td_task" colspan="6">'
									+ '<div class="div_act_details" tasktype="' + task.type + '" taskindex="' + i + '" index="'+index+'">'
										+ '<table cellspacing="0" cellpadding="0" border="0">'
											+ '<tr>'
												+ '<td>'
													+ '<span class="svg_container" svg="' + svg + '" svgfill="black" svgsize="16"></span>'
													+ '&nbsp;' + task.title
												+ '</td>'
												+ '<td style="width:100px; text-align:center">' + task.start + '</td>'
												+ '<td style="width:100px; text-align:center">' + task.end + '</td>'
												+ '<td style="width:80px;">&nbsp;</td>'
												+ '<td style="width:25px; text-align:center">'
													+ '<span class="svg_container searchact_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>'
												+ '</td>'
											+ '</tr>'
										+ '</table>'
									+ '</div>'
								+ '</td>'
							+ '</tr>'
						).insertAfter(jtr);
						created++;
					}
				}
			}
		});
		if (created){
			
			// link button click
			$('.searchact_button')
				.click(function(event){
					console.debug('searchact...');
					openDropmenu($(this), 'searchact', event);
				});
			
			// REDRAW SVG
			drawSvg($('#tbody_search_activity .svg_container'));
		}
	}
	return created;
}

////////////////////////////////////////////////////////

function openActivityAction(type, index){
	var btns = 0;
	switch (type){
		case 'GS':
		case 'ASM':
		case 'EVA':
		case 'STP':
			btns = {
				Save: function() {
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				},
			};		
			break;
		case 'NTC':
		case 'MSG':
			btns = {
				Send: function(){
					sendMsg('#dialog_msg');
				},
				Close: function() {
					$( this ).dialog( "close" );
				},
			};		
			break;
	}
	var type2 = type.toLowerCase();
	console.debug('openActivityAction', type2, g_search_index);
	
	var activity = g_activity_arr[g_search_index],
			task = activity.tasks[g_task_index]
	;
	$('#'+type2+'_title').text(activity.title);
	$('#'+type2+'_date').text(activity.start + ' - ' + activity.end);
	
	$('#dialog_'+type2).dialog({
		modal:true,
		width: 'auto',
		height: 'auto',
		buttons: btns,
	});
	switch (type){
		
		case 'GS':
			$('#tbl_gs span.gs_rating').each(function(){
				$(this)
					.attr('rating','')
					.starRating('setRating', 0);
			});
			$('#gs_task').html(task.title);
			setGauge('#tbl_gs .status_gauge', 0);
			break;
			
		case 'ASM':
			if (task.question){
				console.debug(task.question);
				$('#asm_question').html(task.question);
			}
			break;
			
		case 'EVA':
			$('#tbl_eva span.gs_rating2').each(function(){
				$(this)
					.attr('rating','')
					.starRating('setRating', 0);
			});
			$('#eva_task').html(task.title);
			break;
			
		case 'NTC':
			$('#td_search_ntc_contents').html(task.html);
			break;
			
		case 'MSG':
			$('#dialog_msg .trumbowyg-editor').focus();
			break;
		
	}
}

////////////////////////////////////////////////////////////////////

function createSelect(){
	for (var i = 1; i < g_activity_arr.length; i++){
		var activity = g_activity_arr[i];
		var type = i < 4 ? 'oclx' : 'yolox';
		var selected = '';//= i == 1 ? ' selected' : '';
		$('#cb_exp_name_' + type + ' select').append('<option value="' + i + ' ' + selected + '">'+activity.title+'</option>');
	}
}

////////////////////////////////////////////////////////////////////

function setGauge(selector, value){
	//console.debug(typeof(selector));
	//var obj = typeof(selector) == 'object' ? selector : $(selector);
	//obj
	$(selector)
		.gauge('set', value)
		.parent().find('.preview-textfield').html(value);
}

////////////////////////////////////////////////////////////////////

function sendMsg(selector){
	//$('#div_msgout').append($('<div class="div_mymsg">'+$('#dialog_msg .trumbowyg-editor').html()+'</div>'));
	$(selector + ' .trumbowyg-editor').html('');
	$(selector + ' .trumbowyg-editor').focus();
}

function openSendMsg(){
	$('#dialog_sendmsg').dialog({
		modal: true,
		autoOpen: true,
		resizable: false,
		width:'auto',		
		height:'auto',		
		buttons: {
			Send: function(){
				sendMsg('#dialog_sendmsg');
			},
			Close: function() {
				$( this ).dialog( "close" );
			},
		},	
	});

}

///////////////////////////////////////////////////////

function openSearchPeople(){
	$('#dialog_people').dialog({
		modal: true,
		autoOpen: true,
		resizable: false,
		width:'auto',		
		height:'auto',		
		buttons: {
			Close: function() {
				$( this ).dialog( "close" );
			},
		},	
	});
	
}