var g_allowed_href = 0;

var
	TAB_HOME 			= 0,
	TAB_PROFILE 	= 1,
	TAB_ACTIVITY 	= 2,
	TAB_SCHEDULE 	= 3
	TAB_NTWK 			= 4,
	TAB_POSTAPROJ = 5,
	TAB_GSLEAGUE 	= 6
;

var g_checkinglostinput = 0;
var g_parent_url = '';

function goStartPage(){
	//alert(1);
	if (!g_separate){
		openHome();
	} else {
		//openHome(); return;
		openProfile(); return;
		//createActivity();
		openActivityList();
		//openUserPage(1);
		//openActPage(47);	// view		
		
		var func = function(){
			if (g_curr_activity){
				
				// test edit
				var row = 4;
				var jobj = $('.my_datatable[dt_type=assessments]').find('>tbody>tr:nth-child('+row+')>td:nth-child(3)');
				
				// 1. edit
				editAssessment(jobj[0]);
				
				// 2. view
				//openAssessment(row, 'coordinator', g_user_id, g_user.username);
				//openAssessment(row, 'assessor', g_user_id, g_user.username);
				//openAssessment(row, 'participant', g_user_id, g_user.username);
				
			} else {
				setTimeout(func, 1000);
			}
		}
		func();
	}
	
	// working scrolltop example
	//$(document).on("scroll", function(){
	//	console.log($(window).scrollTop());
	//});
}

////////////////////////////////////////////////////////////////////////////

function initAll(){
	//alert('initAll');
	g_parent_url = window.location.href;
	var index = g_parent_url.lastIndexOf('/');
	if (index > 8){
		g_parent_url = g_parent_url.substring(0, index + 1);
	}
	//alert(g_parent_url);	

	$('body').show();
	
	// get os, platform and screensize
	getHardwareSpec();
	
	// first set the defeault xeditable
	$.fn.editable.defaults.url = './svrop.php';
	$.fn.editable.defaults.send = 'always';
	$.fn.editable.defaults.pk = 1;
	$.fn.editable.defaults.onblur = 'submit';
	//$.fn.editable.defaults.params = params;
	//$.fn.editable.defaults.pk = g_user.email;	// working (has to remove data-pk first)
	//$.fn.editable.defaults.success = function(response, newValue){
	//	console.debug(response);
	//}
	//$.fn.editable.defaults.error = function(response, newValue){
		//console.error(response);
	//	if (response.status != 200){
	//		console.error(response.responseText);
	//	}
	//}
	//$(window).scroll(function(){
	//	console.debug($(window).scrollTop());
	//});
	//$.fn.dataTable.Responsive.defaults = true;
	//alert($.fn.dataTable.Responsive.defaults);

	// http://gsgd.co.uk/sandbox/jquery/easing/
	jQuery.easing.def = "easeOutQuad";
	
	//return;
	//$('.dropmenu').mouseout(function(){
		//$(this).hide();
	//});
	// top buttons
	drawSvg($('.svg_container'));		
		
	/////////////////////////////////////////////////////////////////////////////
	// EDITOR
	/////////////////////////////////////////////////////////////////////////////
	// spinner
	$('.assessment_spinner').spinner();

	initProgress();
	initSkillCanvas();
	initTopmenu();
	initHome();
	initActivity();
	initAssessment();
	initActPage();
	initSchedule();
	hideTemporarily();	

	// calender
	$.datetimepicker.setLocale('en');
	
	//setBalloonNumber('todolist', 3);
	//setBalloonNumber('notice', 3);
	//setBalloonNumber('msg', 5);
	
	////////////////////////////////////////////////////////////////////////
	// TABS
	////////////////////////////////////////////////////////////////////////
	$("#tabs").tabs({
		
		//////////////////////////////////////////////////////////////////////////////////

		beforeActivate: function(event, ui){
			//return false;
			if (g_checkinglostinput){
				console.debug('beforeactivate to tab: double skipped...');
				event.stopPropagation();
				return false;
			}
			var
				jobj = ui.newTab.find('a'),
				href = jobj.attr('href'),
				tab_index = getTabIndex(href)
			;
			if (!g_allowed_href) g_allowed_href = href;
			if (g_allowed_href != href){
				console.debug('beforeactivate to tab: checkloseinput...', tab_index, href);
				g_checkinglostinput = 1;
				if (checkLoseInput('lose all the input',
					function(){
						var tab_index = getTabIndex(href);
						console.log('confirmed to tab:', tab_index, href);
						g_allowed_href = href;
						$("#tabs").tabs("option", "active", tab_index);
					}
				)){
					event.stopPropagation();
					return false;
				} else {
					g_checkinglostinput = 0;
					console.log('direct to tab:', tab_index, href);
					g_allowed_href = href;
				}
			}
		},
		
		//////////////////////////////////////////////////////////////////////////////////

		activate: function(event, ui){
			var
				jobj = ui.newTab.find('a'),
				href = jobj.attr('href'),
				tab_index = getTabIndex(href)
			;
			if (g_allowed_href != href) {
				console.debug('cancelled to tab...', tab_index, href);
				event.stopPropagation();
				return;
			}  else {
				console.debug('activate to tab...', tab_index, href);
			}
			stopVideo();
			$('.dropmenu, .tab_page').hide();
			switch (href){
			
				case '#tab_home':
					openHome();
					break;
				
				case '#tab_profile':
					$('#tab_profile').show();
					//showProfileDesc(1);				
					break;
				
				case '#tab_network':
					openNetwork();
					break;				
					
				case '#tab_activity':
					openActivityList();
					break;
					
				case '#tab_schedule':
					openSchedule();
					break;
			}
			event.stopPropagation();
		},
	});
	
	$('#tabs a')
		.hover(function(e){
			//closeDropmenu();
			
			var jobj = $(this);
			var tab = jobj.attr('href');
			//console.debug(tab);
			switch (tab){

				case '#tab_profile':
					//openDropmenu(jobj, 'profile');
					break;
					
				case '#tab_activity':
					//openDropmenu(jobj, 'activity');
					break;

				case '#tab_home':
				case '#tab_profile':
				case '#tab_network':
				case '#tab_schedule':
				case '#tabs-5':
					closeDropmenu();
					break;
			}
		})
		
	////////////////////////////////////////////////////////////////////////
	// dropmenu
	////////////////////////////////////////////////////////////////////////
	$('.dropmenu').menu().hide();
/*	
	$('.dropmenu-item')
		.click(function(e){
			var jobj = $(this);
			checkLoseInput('lose all the input', function(){
				var menuitem = jobj.attr('menuitem');
				console.debug('dropmenu-item', menuitem);
				if (menuitem.indexOf('search') == 0){
					$('.search_page').hide();
				} else if (menuitem.indexOf('tabs') == 0){
					$('.ui-tabs-panel').hide();
					$('.tab_page').hide();
				}
				stopVideo();
				switch (menuitem){
				
					case 'lang_THA':
					case 'lang_ENG':
						var lang = href.split('_')[1];
						var lang2 = window['LG_'+lang];
						switchLang(lang2);
						break;
				}
			});
		});
		//.on('mouseleave mouseout', function(e){
	$(document)
		.on('mousemove', function(e){
			//if ($('.dropmenu:visible').length){
			if (g_dropmenu_opened){
				var jtarget = $(e.target);
				if (jtarget.closest('.dropmenu').length){
					//console.debug('still over dropmenu');
				} else if (jtarget.closest('.ui-tabs-nav').length){
					//console.debug('still over nav');
				} else {
					closeDropmenu();
				}
			}
		})
		.click(function(){
			if (g_dropmenu_opened){
				closeDropmenu();
			}
		})
*/

	$('.action_button')
		.click(function(event){
			openDropmenu($(this), 'action', event);
		});
	$('.but_users_import')
		.click(function(event){
			openDropmenu($(this), 'import', event);
		});
	$('.import2_button')
		.click(function(event){
			openDropmenu($(this), 'import2', event);
		});
		
	// autogrow: http://www.technoreply.com/autogrow-textarea-plugin-3-0/
	$('.ta_question').autoGrow();
	$('.assess_comment').autoGrow();
	$('textarea.autogrow').autoGrow();
	
	// start page
	$('.tab_page').hide();
	$("#tabs").tabs("option", "active", TAB_HOME);

	// show pages
	//$('#tbl_root').show();	
	
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
	
	// autosize (autogrow)
	autosize($('textarea.autogrow'));

	// CHANGE SAME BUTTON CLICKED
	$('a[href=\\#tab_home]').click(function(){
		var selected = $('#tabs li[aria-selected=true] a').attr('href');
		if (selected == '#tab_home'){
			//openHome();
		}
	});
	$('a[href=\\#tab_profile]').click(function(){
		var selected = $('#tabs li[aria-selected=true] a').attr('href');
		if (selected == '#tab_profile'){
			openProfile();
		}
	});
	$('a[href=\\#tab_activity]').click(function(){
		var selected = $('#tabs li[aria-selected=true] a').attr('href');
		if (selected == '#tab_activity'){
			if (!checkLoseInput('lose all the input',	function(){
					openActivityList();
				})
			){
				openActivityList();
			}
		}
	});	
	$('a[href=\\#tab_network]').click(function(){
		var selected = $('#tabs li[aria-selected=true] a').attr('href');
		if (selected == '#tab_network'){
			openNetwork();
		}
	});


	$('#dialog_msg .trumbowyg-editor').keypress(function(event){
		if (event.which == 13) {
			event.preventDefault();
			sendMsg();
		}		
	});
	
	$('.msg_button').click(function(event){
		openMsg('');
		event.stopPropagation();
	});

	// clear selection
	$('#tbl_skills input.custom-combobox-input').val('');
	$('#div_edit_assessment input.custom-combobox-input').val('');
	
	// placeholder for div_skills
	$('.div_skills input').attr('placeholder', 'Select or input a generic skill')
	
	//$('.activitiy_title').click(function(e){
	//	var jobj = $(this);
		//console.debug(jobj);
	//	openActivityEdit();
	//});
	
	$('.activity_header select').change(function(e){
		var jselect = $(this),
			index = jselect[0].selectedIndex;
		console.debug('change', index);
		var jtbl = jselect.parents('.activity_tbl'),
				jdiv = jtbl.find('.activity_div')
		;
		if (index == 2){
			jdiv.slideUp();
		} else {
			jdiv.slideDown();
		}
	});
	
	$('#topmenu_logout').mouseup(function(){
		goLogOut();
	});
	
	switchLang(LG_ENG);
	//switchLang(LG_THA);

	// SET LOGIN MYINFO (APP)
	var jsonstr = "{\"status\":\"2\",\"uri\":\"" + getImgUrl(g_user.img_id, 'user') + "\",\"name\":\"" + g_user.username + "\"}"; 
	changeprofile(jsonstr);	
	
	// SET LOGIN MYINFO (WEB)
	updateMyInfo();
	updateImgPhoto($('.myinfo_photo'), g_user.img_id, 'user');

	///////////////////////////////////////////////////////////////
	// profile blocks (draggable: drag and drop)
	/////////////////////////////////////////////////////////////////
	var jblocks = $('#profile_blocks');
	if (g_platform != 'ios' && g_platform != 'android'){
		jblocks
			.sortable({
			
				placeholder: 'ui-state-highlight',
				
				// http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
				helper: function(event, ui){
					var $clone =  $(ui).clone();
					$clone.css('position','absolute');
					return $clone.get(0);
				},
				
				update: function( event, ui ){
					console.debug('update');
					var order = [];
					jblocks.find('.profile_divs').each(function(){
						order.push($(this).attr('type'));
					});
					// send to server
					call_svrop(
						{
							type:		'profile_order',
							email:	g_user.email,
							pwd:		g_user.pwd,
							order:	order,
						},
						function (obj){
							console.debug('succeeded', obj);
							g_user.profile.order = order;
						},
						function (obj){
							console.error('failed', obj);
						}
					);
				},
				revert: true,
				// http://stackoverflow.com/questions/2995329/if-i-do-jquery-sortable-on-a-contenteditable-items-i-then-cant-focus-mouse
				//cancel: ':input, button, .contenteditable .btn .btn-group',
				//cancel: ':not([class*=profile_header])',
				cancel: 'input,textarea,button,select,option,:input,button,.contenteditable,.btn,.btn-group,.editable,.profile_divs,span',
			})
		//.on( "sortchange", function( event, ui ) {console.debug('sortchange');});
	}			
	//var cancel = jblocks.sortable( "option", "cancel" ); console.error(cancel);

	////////////////////////////////////////////////////
	// before unload check lose input
	////////////////////////////////////////////////////
	//$( window ).unload(function(){
	window.onbeforeunload = function(e){
		var suspended = checkLoseInput('lose all the input');	// no success => no dialog
		console.debug('unloading...', suspended);
		if (suspended){
			return 'Lose the input?';
		}
	};

	/////////////////////////////////////////////////////////	
	// RESIZE
	/////////////////////////////////////////////////////////
	$(window).resize(function(){
		
		// refresh the size
		getHardwareSpec();
		
		// check platform
		checkPlatform();		
		
		if (g_curr_user){
			
			// FOR PROFILE REVIEW
			var skills = getSkillsWithBreakdown_user(g_curr_user);
			drawSkillCanvas('cvs_skills_userpage', skills, 0);			
				
		} else {
			switch (g_curr_tab){
				
				case TAB_HOME:
					var skills = getSkillsWithBreakdown_user(g_user);
					drawSkillCanvas('cvs_skills_home', skills, 0);
					break;
					
				case TAB_PROFILE:
					var skills = getSkillsWithBreakdown_user(g_user);
					drawSkillCanvas('cvs_skills_profile', skills, 0);				
					break;

				case TAB_ACTIVITY:
					break;
					
				case TAB_SCHEDULE:
					refreshSchedule();
					break;
			}
		}
	});	

	// refresh the size
	getHardwareSpec();
	
	// check platform
	checkPlatform();		
	
	// checking of query string user_id
	var user_id = getParameterByName('user_id');
	var act_id = getParameterByName('act_id');
	if (user_id){
		openUserPage(user_id);
	} else if (act_id){
		openActPage(act_id);
	} else {
		goStartPage();
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
	if (!display){
		$('.display_page').hide();
	}
	//$(name).slideToggle();
	$(name).css('display', display?'none':'block');
}

///////////////////////////////////////////////////////////////////////
var myuser = '';
/*
function toggleMyUser(){
	if (myuser == 'samson'){
		setMyUser('ian');
	} else {
		setMyUser('samson');
	}
}
*/
///////////////////////////////////////////////////////////////////////

//function setMyUser(user){
/*	
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
	//$('.curriculum_myself').html(curriculum);
	//var p = $('.photo_myself').parent();	p.html('<img src="./people/' + photo + '.jpg" class="photo_myself"/>')
*/	
//	$('.name_myself').html(user['name']);
//	$('.photo_myself,.photo_myself2').attr('src', user['photo']);//'./people/' + photo)	
//}


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

function isVisible(jobj){
	var display = jobj.css('display');
	if (display == 'none'){
		return false;
	} else {
		return true;
	}
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

//////////////////////////////////////////////////////////////////////
 var	g_activity_index = 0,
			g_task_index = 0
			
;

////////////////////////////////////////////////////////////////////
/*
function createSelect(){
	for (var i = 1; i < g_activity_arr.length; i++){
		var activity = g_activity_arr[i];
		var type = i < 4 ? 'oclx' : 'yolox';
		var selected = '';	//= i == 1 ? ' selected' : '';
		$('#cb_exp_name_' + type + ' select').append('<option value="' + i + ' ' + selected + '">'+activity.title+'</option>');
	}
}
*/

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

///////////////////////////////////////////////////////

function openEvaPage(){
	//$('#dialog_eva').show();
	var activity = g_activity_arr[g_activity_index],
			task = activity && g_task_index >= 0?activity.tasks[g_task_index]:'';
	;
	$('#eva_title').html(activity.title);
	$('#eva_task').html(task.title);
	$('#eva_date').html(task.start);

	$('.dropmenu, .tab_page').hide();
	$('#tab_evaluation').show();
}

////////////////////////////////////////////////////////////////////
var
	g_details_button = '<button class="details_button"><span class="svg_container" svg="details" svgfill="black" svgsize="16"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 18.453 18.453" style="width: 16px; height: 16px;" xml:space="preserve"><rect x="2.711" y="4.058" width="8.23" height="1.334"></rect><path d="M14.972,14.088c0.638-1.127,0.453-2.563-0.475-3.49c-0.549-0.549-1.279-0.852-2.058-0.852c-0.779,0-1.51,0.303-2.059,0.852s-0.852,1.279-0.852,2.059c0,0.777,0.303,1.508,0.852,2.059c0.549,0.547,1.279,0.85,2.057,0.85c0.507,0,0.998-0.129,1.434-0.375l3.262,3.262l1.101-1.102L14.972,14.088z M13.664,13.881c-0.652,0.652-1.796,0.652-2.448,0c-0.675-0.676-0.675-1.773,0-2.449c0.326-0.326,0.762-0.506,1.225-0.506s0.897,0.18,1.224,0.506s0.507,0.762,0.507,1.225S13.991,13.554,13.664,13.881z" fill="black"></path><path d="M13.332,16.3H1.857c-0.182,0-0.329-0.148-0.329-0.328V1.638c0-0.182,0.147-0.329,0.329-0.329h11.475c0.182,0,0.328,0.147,0.328,0.329V8.95c0.475,0.104,0.918,0.307,1.31,0.597V1.638C14.97,0.735,14.236,0,13.332,0H1.857C0.954,0,0.219,0.735,0.219,1.638v14.334c0,0.902,0.735,1.637,1.638,1.637h11.475c0.685,0,1.009-0.162,1.253-0.76l-0.594-0.594C13.772,16.347,13.426,16.3,13.332,16.3z" fill="black"></path><rect x="2.711" y="7.818" width="8.23" height="1.334"></rect></svg></span>&nbsp; Details</button>',
	g_pecentage_spinner = '<input class="assessment_spinner" value="0" style="width:25px"/>'
;


/////////////////////////////////////////////////////////////////////////

function showErrDialog(title, msg){
	//console.debug('onError', obj);
	$('#div_errmsg').text(msg);
	$('#dialog-message')
		.attr('title', title)
		.dialog({
			resizable: false,
			height:180,
			modal: true,
			buttons: {
				Close: function() {
					$( this ).dialog( "close" );
				}
			}			
		});	
}

////////////////////////////////////////////////////////////////////

function openMsg(partner, bAddTheirMsg){
	if (partner == ''){
	}
	//$('#div_msg_partner').text(partner);
	// clear first
	$('#div_msgout_inner').html('');
	$('#dialog_msg .trumbowyg-editor').html('');
	g_msg_index = 0;
	if (bAddTheirMsg){
		addTheirMsg();
	}
	$('#dialog_msg').dialog({
		modal: true,
		autoOpen: true,
		resizable: false,
		width:'auto',		
		height:'auto',		
		buttons: {
			Send: function(){
				sendMsg();
			},
			Close: function(){
				$(this).dialog("close");
			},
		},	
	});
	setTimeout(function(){
		$('#dialog_msg .trumbowyg-editor').focus();	
	}, 500);
}

////////////////////////////////////////////////////////////////////////

var g_msg_arr = [
			'How are you?',
			'I\'m fine. Thanks. And you?',
			'I am fine too.',
			'Have you completed the assessments?',
			'Yes.',
			'That is great! I have completed the survey and now I am working on reflective journal.',
			'Cool!',
			'Let me read your essay later.',
			'Okay.',
		],
		g_msg_index = 0,
		g_timeout_theirmsg = 0
;
function addTheirMsg(){
	var time = getDateString();
	var msg = g_msg_arr[g_msg_index];
	if (++g_msg_index >= g_msg_arr.length) g_msg_index = 0;
	$('#div_msgout_inner').append('<div class="bubble them">'+time+msg+'</div>');	
	clearTimeout(g_timeout_theirmsg);
	g_timeout_theirmsg = 0;
	scrollMsg();
}

////////////////////////////////////////////////////////////////////////

function addMyMsg(){
	var time = getDateString();
	var msg = g_msg_arr[g_msg_index];
	if (++g_msg_index >= g_msg_arr.length) g_msg_index = 0;
	$('#div_msgout_inner').append('<div class="bubble me">'+time+msg+'</div>');	
	scrollMsg();
}

////////////////////////////////////////////////////////////////////////

function scrollMsg(){
	var h = 0;
	$('#div_msgout_inner div').each(function(){
		h += $(this).height() + 100;
	})
	//console.debug('scrollMsg', h);
	$('#div_msgout').animate({
    scrollTop: h,
	});
}

////////////////////////////////////////////////////////////////////////

function sendMsg(){
	// send previous message
	if (g_timeout_theirmsg){
		addTheirMsg();
	}
	var msg = $('#dialog_msg .trumbowyg-editor').html();
	addMyMsg();
	$('#dialog_msg .trumbowyg-editor')
		.html('')
		.focus()
	;
	g_timeout_theirmsg = setTimeout(addTheirMsg, 1000);
}


///////////////////////////////////////////////////////////////////////////////

function switchLang(lang){
	console.debug('switchLang', lang);
	g_curr_lang = lang;
	$.each(g_lang_map, function(index, value) {
    //console.debug(index, value);
		var text = value[lang],
			jobj = $(index)
		;
		if (!jobj.length){
			//console.error(index, ' cannot find the index');
			//debugger;
		} else {
			var tagname = jobj.prop("tagName");
			//console.debug(tagname, text);
			switch (tagname){
				case 'INPUT':
					jobj.attr('placeholder', text);
					break;
				default:
					jobj.text(text);
					break;
			}
		}
	});
}

///////////////////////////////////////////////////////////////////////////////

function getLangStr(index){
	return g_lang_map[index][g_curr_lang];
}

//////////////////////////////////////////////////////////

function onWinResize(){
/*
	console.debug('onWinResize', $(this));
	var
		nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight),
		h1 = $('#td_topmenu').height(),
		h2 = $('#ui-tabs-nav').height(),
		h = nScreenH - h1 - h2 - 100
	;
	console.debug(h);
	$('#div_scheduler').height(h);
*/	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var g_dropmenu_opened = 0;
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
	//var jtr = jobj.parent().parent().parent().parent().parent(),
	//		g_activity_index = jtr.attr('index'),
	//		g_task_index = jtr.attr('taskindex'),
	//		tasktype = jtr.attr('tasktype')
	//;
	//console.debug('openDropmenu', menu);	//, g_activity_index, g_task_index, tasktype); debugger;
	switch (menu){
		case 'action':
			// PER ACTIVITY
			var jtr = jobj.parent().parent();
			// global variable!!
			g_activity_index = jtr.attr('index');
			g_task_index = -1;
			console.debug('openDropmenu1', menu, g_activity_index);
			
			var jtd = jtr.find('td:nth-child(3)')
			var role = jtd.text().trim().substring(0,1).toLowerCase();
			switch (role){
				case 'c':	// coordinator
				case 'a':
					jmenu.find('li:nth-child(1)').hide();	// view details
					jmenu.find('li:nth-child(2)').show();	// view/edit details
					
					jmenu.find('li:nth-child(5)').show();	// view details
					jmenu.find('li:nth-child(6)').show();	// view/edit details
					break;
					
				case 'p': // participant
					jmenu.find('li:nth-child(1)').show();
					jmenu.find('li:nth-child(2)').hide();
					
					jmenu.find('li:nth-child(5)').hide();	// view details
					jmenu.find('li:nth-child(6)').hide();	// view/edit details
					break;
			}
			break;
			
		case 'searchact':
			// PER TASK
			var jtr = jobj.parent().parent().parent().parent().parent();
			// GLOBAL VARIABLE!!
			g_activity_index = jtr.attr('index');
			g_task_index = jtr.attr('taskindex');
			var tasktype = jtr.attr('tasktype');
			console.debug('openDropmenu2', menu, g_activity_index, g_task_index, tasktype);
			var tasktype2 = tasktype.toLowerCase();
			var s1 = "#dropmenu_searchact li a[href!='\\#search_"+ tasktype2 +"']",
					s2 = "#dropmenu_searchact li a[href='\\#search_"+ tasktype2 +"']"
			;
			//console.debug(tasktype2, g_activity_index);
			$(s1).parent().hide();
			$(s2).parent().show();
			console.debug(tasktype);
			//console.debug($('#dropmenu_searchact li:last-child a').length);
			switch (tasktype){
				case 'GS':
					$('#dropmenu_searchact li a[href=\\#search_gsgrades').parent().show();
					break;
				case 'EVA':
					$('#dropmenu_searchact li a[href=\\#search_asmmarks').parent().show();
					break;
			}
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
			case 'lang':
				event.stopPropagation();
				break;
		}
	}
	g_dropmenu_opened = 1;
}

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	//console.trace('closeDropMenu')
	$('.dropmenu').hide();
	g_dropmenu_opened = 0;
}

//////////////////////////////////////////////////////////////////////
 
function switchTabClass(index){
	//ui-tabs-active ui-state-active
	$('[aria-selected=true]').attr('aria-expanded', 'false');
	$('[aria-expanded=true]').attr('aria-selected', 'false');
	$('[role=tab]').removeClass('ui-tabs-active').removeClass('ui-state-active');
	$('[aria-controls=' + index + ']')
		.addClass('ui-tabs-active').addClass('ui-state-active')
		.attr('aria-expanded', 'true').attr('aria-selected', 'true')
	;
}

//////////////////////////////////////////////////////////////////////

function getTabIndex(href){
	var tab_index = -1;
	switch (href){
		case '#tab_home':		tab_index = 0; break;
		case '#tab_profile':	tab_index = 1; break;
		case '#tab_activity':	tab_index = 2; break;
		case '#tab_schedule':	tab_index = 3; break;
		case '#tab_network':	tab_index = 4; break;
	}
	return tab_index;
}

//////////////////////////////////////////////////////////////////////

function setShortPlaceHolder(jroot){
	switch (g_platform){
		case 'ios':
		case 'android':
			var jtoken = jroot.find('.my_tokenfield[tt_type=users]');
			jtoken.next().next().find('.tt-input').attr('placeholder', 'User names');
			jroot.find('.my_tokenfield[tt_type=skills]').next().next().find('.tt-input').attr('placeholder', 'Skills');
			break;
	}
}

//////////////////////////////////////////////////////////////////////

function goLogOut(){
	confirmDialog('Are you sure to log out?', function(){
		console.debug('logout');
		setCookie('login', 0);
		// log out from the app
		var jsonstr = "{\"status\":\"1\",\"uri\":\"\",\"name\":\"\"}";
		changeprofile(jsonstr);
		var url = './login.php?';
		if (g_separate){
			url += 'separate=1';
		}
		window.location.href = url;
	});
}

////////////////////////////////////////////////////////////////////////////

function checkPlatform(){
	
	if (g_platform == ''){
		g_platform = 'web';
	}
	
	//alert(g_platform);
	switch (g_platform){
		case 'ios':
		case 'android':
			// body scrollbars
			$('body').css({
				//'overflow-y': 'hidden',
				'overflow-x': 'hidden',
			});
			// hide unused topmenu items
			$('#tbl_topmenu>tbody>tr>td:nth-child(1), #tbl_topmenu>tbody>tr>td:nth-child(3)').hide();

			// smaller image
			$('#home_photo, #profile_photo, #userpage_photo, .activity_photo_edit').css({
				width: 100,
				height: 100,
			});
			$('#tbl_my_profile .userinfo .btn').width(80);
			
			// hide logout button
			$('#top_panel').parent().hide();
			
			// hide navigation bar
			$('.ui-tabs-nav').hide();
			break;
			
		case 'web':
			// change to web home, profile and user page
			$('#web_home, #web_profile, #web_userpage').show();
			$('#mobile_home, #mobile_profile, #mobile_userpage').hide();
			
			///////////////////////////////////////////////////////
			// home
			///////////////////////////////////////////////////////
			['myinfo_photo', 'user_info', 'tbl_userstat', 'tbl_gauge', 'user_skills'].forEach(function(name){
				$('#web_home .td_' + name).append($('#mobile_home .' + name));
			});
			///////////////////////////////////////////////////////
			// profile
			///////////////////////////////////////////////////////
			// rearrange profile
			['tbl_photo', 'user_info'].forEach(function(name){
				$('#web_profile .td_' + name).append($('#mobile_profile .' + name));
			});
			// tidy up profile
			$('#web_profile .td_tbl_photo2').remove();
			///////////////////////////////////////////////////////
			// user page
			///////////////////////////////////////////////////////
			// rearrange user page
			['photo', 'username', 'position', 'location', 'tbl_userstat', 'tbl_gauge'
				,'tbl_skills'
				,'div_canvas_userpage'
				,'div_userpage_oclx',
				,'div_userpage_yolox',
			].forEach(function(name){
				$('#web_userpage .td_' + name).append($('#mobile_userpage .' + name));
			});
			break;
	}	
	// placeholder (too long)
	setShortPlaceHolder($('#div_activity_edit'));
}
