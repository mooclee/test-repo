
var
		g_saved_activity = 0,

		g_but_add = '<button type="button" class="btn btn-sm btn-list-edit" onclick="addDtRow(this)" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-plus"></i></button>',
	
		g_percent_slider = '<div class="basicLinked"></div>',
		
		//g_editable_ass_title = '<div data-name="assessment_title" data-mode="inline" data-type="text" data-title="Enter the title" data-emptytext="The title" data-showbuttons="bottom" data-placement="bottom" data-url="" data-inputclass="editable_assessment_title" class="editable_assessment_title editable" show_trash="0"></div>',
		
		g_but_trash_act = 
		g_but_trash_ass =
		g_but_trash_user = 
		g_but_trash_skill = 
		g_but_trash_item = '<button type="button" class="btn btn-danger btn-sm btn-list-trash" onclick="deleteDtRow(this)" data-toggle="tooltip" title="Remove"><i class="glyphicon glyphicon-trash"></i></button>'
		
;

//////////////////////////////////////////////////////////////////////////////////////////////////////

//glyphicon glyphicon-edit
function initActivityEdit(){
	console.debug('initActivityEdit');
	
	// show page
	var	jdiv = $('#div_activity_edit');
	
	/////////////////////////////////////////////////////////////////////////
	// ACT_TYPE
	/////////////////////////////////////////////////////////////////////////
	var jtoggle = jdiv.find('.toggle_type');
	if (jtoggle.length){
		jtoggle
			.toggles({
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
				width: 80, // width used if not set in css
				height: 20, // height if not set in css
			})
			.on('toggle', function(e, active) {
				var className = active?'.text_oclx_full':'.text_yolox_full';
				jdiv.find('.toggle_type_text')
					.text('('+getLangStr(className)+')')
					.addClass(className);
			})
			.data('toggles')
			.toggle(false) // default = true
	}
	setDateTimePicker(jdiv);
		
	// DESC
/*	
	var data_type = 'wysihtml5';
	//if (g_platform == 'ios'){	data_type = 'textarea';}	// workaround for ios forever loading
	//if (g_platform == 'android'){	data_type = 'textarea';}	// workaround for edit reload
	//data_type = 'textarea';	// testing
	
	var s = '<div class="editable"'
		+ ' data-name="activity_desc"'
		+ ' data-mode="inline"'
		+ ' data-type="' + data_type + '"'
		+ ' data-showbuttons="bottom"'
		+ ' data-title="Enter the description of the activity"'
		+ ' data-emptytext="The description of the activity"'
		+ ' data-inputclass="input_wysihtml5"'
		+ '	data-url=""'
		+ ' show_trash="0"'
		+ ' data-unsavedclass="unsavededitable"'
	//	+ ' style="height:100px"'
		+ '></div>';
	jdiv.find('.div_act_desc').html(s);
	//jdiv.find('.wysihtml5-sandbox').css('height', '');
*/	
	//////////////////////////////////////////////////////////////////
	// ACTIVITY PHOTO UPLOAD
	//////////////////////////////////////////////////////////////////
	$("#inp_activity_photo").change(function(){
			var img_id = $('.activity_photo_edit').attr('img_id');
			uploadPhoto($(this), 0, 0, img_id, function(img_id2){	// don't add act_id first
				//updateActivityPhoto(img_id2);
				updateImgPhoto($('.activity_photo_edit'), img_id2, 'activity');
			},
			function(resp){
			}
		);
	});
	
	//////////////////////////////////////////////////////
	// ADD PARTICIPANT
	//////////////////////////////////////////////////////
	initTypeahead_tokenfield_users('#div_activity_edit .div_participants');
	initDT_users('#div_activity_edit .div_participants');
	
	//////////////////////////////////////////////////////
	// ADD GENERIC SKILLS (IMPRESSION)
	//////////////////////////////////////////////////////
	var jtoggle = jdiv.find('.toggle_impression');
	if (jtoggle.length){
		jtoggle.toggles({
			//type: 'select',
			type: 'compact', // if this is set to 'select' then the select style toggle will be used
			drag: true, // allow dragging the toggle between positions
			click: true, // allow clicking on the toggle
			text: {
				on: '<span class="text_enable"></span>', // text for the ON position
				off: '<span class="text_disable"></span>' // and off
			},
			on: true, // is the toggle ON on init
			animate: 150, // animation time (ms)
			easing: 'swing', // animation transition easing function
			checkbox: null, // the checkbox to toggle (for use in forms)
			clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
			width: 80, // width used if not set in css
			height: 25, // height if not set in css
		})
		.on('toggle', function(e, active) {
			if (active){
				$('#div_edit_skills').show();
				$('#div_edit_skills').slideDown()	// show
			} else {
				$('#div_edit_skills').slideUp();	// hide
				$('#div_edit_skills').hide();
			}
		})
		.data('toggles')
		.toggle(false)	// default is true
		;
	}
	initTypeahead_tokenfield_users('#div_edit_skills');
	
	//////////////////////////////////////////////////////////////////
	// CHECKBOX
	//////////////////////////////////////////////////////////////////
	setupPanelists('#div_edit_skills');	// call once only

	//////////////////////////////////////////////////////
	// ASSESSMENT
	//////////////////////////////////////////////////////
	
	// ENABLE TOGGLE
	var jtoggle = jdiv.find('.toggle_assessment');
	if (jtoggle.length){
		jtoggle.toggles({
			//type: 'select',
			type: 'compact', // if this is set to 'select' then the select style toggle will be used
			drag: true, // allow dragging the toggle between positions
			click: true, // allow clicking on the toggle
			text: {
				on: '<span class="text_enable"></span>', // text for the ON position
				off: '<span class="text_disable"></span>' // and off
			},
			on: true, // is the toggle ON on init
			animate: 150, // animation time (ms)
			easing: 'swing', // animation transition easing function
			checkbox: null, // the checkbox to toggle (for use in forms)
			clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
			width: 80, // width used if not set in css
			height: 25, // height if not set in css
		})
		.on('toggle', function(e, active) {
			//$('#td_stamp2').text(active?'(Stamp proof is required from the coordinator)':'(Stamp proof is NOT required from the coordinator)')
			if (active){
				$('#div_edit_assessment').show();
				$('#div_edit_assessment').slideDown()	// show
			} else {
				$('#div_edit_assessment').slideUp();	// hide
				$('#div_edit_assessment').hide();
			}
		})
		.data('toggles')
		//.toggle(false)	// default is true
	}
	
	///////////////////////////////////////////////////////////////////////////////////
	// ADD ASSESSMENT
	///////////////////////////////////////////////////////////////////////////////////
	var s = "";
	for (var key in method_arr){
		var method = method_arr[key] ? method_arr[key] : '';
		s += '<option value="' + key + '">' + method + '</option>';
	}
	$('.select_methods').html(s);		//.select2();
	$('#tbl_assessment .but_additem').click(function(){
		addAssessment();
	});
	
	// DATATABLE
	var jtbl = $('.my_datatable[dt_type=assessments]'), dt = 0;
	if (!jtbl.hasClass('datatable')){
		dt = jtbl
			.DataTable({
				ordering: false,
				rowReorder: true,
				autoWidth: false,
				bPaginate: false,
				dom: '',
				language:{
					emptyTable: '',
					zeroRecords: '',
				},
				autoWidth: false,
				columnDefs: [
				],		
			});
	} else {
		dt = jtbl.DataTable();
	}		

	//////////////////////////////////////////////////////////////////////////////////////
	// ACTIVITY BUTTONS
	//////////////////////////////////////////////////////////////////////////////////////
	jdiv.find('.btn_clear').click(function(){
		//checkLoseInput('clear all the input', function(){
		confirmDialog('Are you sure you want to clear all the input on the editing activity?', function(){
			clearEditActivity();
		});
	});
	jdiv.find('.btn_cancel').click(function(){
		if (!checkLoseInput('cancel all the input', function(){
			openActivityList();
		})){
			openActivityList();
		}
	});
	jdiv.find('.btn_delete').click(function(){
		var act_id = parseInt($('#div_activity_edit').attr('act_id'));
		deleteActivity(act_id);
	});
	jdiv.find('.btn_save').click(function(){
		setTimeout(function(){	// add timeout else cannot hide the xeditable input
			saveActivity(0);
		}, 1);
	});
	jdiv.find('.btn_publish').click(function(){
		// validation before publish
		if (validateBeforePublish()){
			confirmDialog('Are you sure to publish the activity?', function(){
				setTimeout(function(){	// add timeout else cannot hide the xeditable input
					saveActivity(1);
				}, 1);
			});
		}
	});
	
	// init uploader for activity
	initUploader(jdiv.find('.uploader'), jdiv.find('.uploader_gallery'), 'activity', {act_id: 0}, function(media_arr, media_id_arr){
		console.debug('onUpdate', media_id_arr);
		g_curr_activity.media = media_id_arr;
	});
	
	/////////////////////////////////////////////////////////////////////////
	// EDITABLE
	/////////////////////////////////////////////////////////////////////////
	var jeditable = jdiv.find('.editable');
	//console.debug('*', jeditable);
	jeditable.editable();		
}

/////////////////////////////////////////////

var g_basicLinkPolicy = 'next';//'all'; // instead of next

function initBasicLinked(jtbl){
	// init slider and set event listener when any one is changed
	jtbl.find('.basicLinked:not(.ui-slider)').slider().on( 'slide slidechange slidestart slidestop', function( event, ui ){
		jtbl.find('.basicLinked').each(function(){
			var	slider = $(this),
				v2 = slider.slider('option', 'value')
			;
			//console.debug(v2);
			slider.parent().next().text(v2 + '%');
		});
	});
	if (jtbl.find('.basicLinked').length == 1){
		jtbl.find('.basicLinked:first').slider('value', 100);
	}	
}

///////////////////////////////////////////////////////

function addDtRow(obj){
	var
		jobj = $(obj),
		jtr = jobj.closest('tr'),
		jtbl = jobj.closest('table'),
		method = jtbl.attr('method'),
		jtbl_id = jtbl.attr('id'),
		dt = jtbl.DataTable(),
		row = dt.row(jtr),
		data = row.data(),
		num_of_sliders = dt.rows().count()
	;
	if (g_platform != 'ios' && g_platform != 'android'){
		jtr.find('[data-toggle=tooltip]').tooltip(); // render bootstrap tooltip
	}
	jtr.find('.mcq_answer_correct').tooltip('show');	// show correct arrow label: http://www.cssarrowplease.com/
	addAssessmentItem(method);
}

/////////////////////////////////////////////////////////////////////

function evenlyDistributeSliders(jtbl){
	var
		dt = jtbl.DataTable(),
		num_of_sliders = dt.rows().count()
	;
	if (num_of_sliders > 0){
		var average = Math.round(100 / num_of_sliders);
		jtbl.find('.basicLinked').linkedSliders('destroy');	// remove basiclinked avoid onchange event
		var others = 0;
		jtbl.find('.basicLinked')
			.each(function(){
				var v = 0;
				if (!--num_of_sliders){
					v = 100 - others;
				} else {
					v = average;
					others += v;
				}
				$(this).slider('option', 'value', v);
			})
		jtbl.find('.basicLinked').linkedSliders({policy: g_basicLinkPolicy});	// create sliders again
	}
}

////////////////////////////////////////////////////////////////////////////

var g_lightbox = 0;

function closeLightBox(){
	
	changeBodyView(1); return;
	
	$('html, body').css('overflow', 'auto');
	
	if (typeof(setNewWinDiv) == 'function'){
		
		backwin('close', g_curr_return_obj);
		
	} else if (g_lightbox2){
		
		g_lightbox2.close();
		g_lightbox2 = 0;
		
	} else {
		
		if (g_lightbox){
			g_lightbox.close();
			g_lightbox = 0;
		}
		$('.tbl_actpage [data-toggle=tooltip]').tooltip('enable');//.remove();
		
		// checkloseinput
		if (g_saved_assessment_view){
			g_saved_assessment_view = 0;
		}	
	}
}


///////////////////////////////////////////////////////////////////////////////////////////

function deleteDtRow(obj){
	
	//var jobj = typeof(obj) == 'string' ? $(obj) : obj,
	var jobj = $(obj),	
			jtr = jobj.closest('tr'),
			jtbl = jobj.closest('table'),
			dt_type = jtbl.attr('dt_type'),
			dt = jtbl.DataTable(),
			row = dt.row( jtr ),
			count = dt.rows().count()
	;
	console.debug('deleteDtRow', dt_type);	
		
	switch (dt_type){
	
		case 'activities':
/*		
			var act_id = 0;
			if (jtr.hasClass('child')){
			} else {
				act_id = parseInt(row.data()[0]);
			}
*/
			var act_id = parseInt(row.data()[0]); 			
			deleteActivity(act_id);
			break;
	
		case 'assessments':
			//////////////////////////////////////////////////////////////////////////////////
			// ASSESSMENT
			//////////////////////////////////////////////////////////////////////////////////
			// find ass_id
			//var index = parseInt(jtr.find('>td').eq(0).text()) - 1;
			//var ass_id = parseInt(jtr.find('>td').eq(0).text());
			// delete and redraw the table
			var cols = row.data(),
				ncol = cols.length,
				ass_id = parseInt(cols[ncol-2])	// a hidden one
				//method = cols[ncol-1]
			;
			deleteAssessment(ass_id);
/*			
			confirmDialog('Are you sure you want to delete this assessment?', function(){
				// REMOVE FROM DT
				row.remove().draw();
				// POST-OPERATIONS
				dt.data().count() ? jtbl.show() : jtbl.hide();
				evenlyDistributeSliders(jtbl);
				// delete from the local storage
				if (g_assessments[index]){
					delete g_assessments[index];
					g_assessments.splice(index, 1);
				}
				if (!g_assessments.length){
					g_assessments = [];
				} else {
					// REORDER THE VISIBLE NUMBER
					reorderDT(dt, jtbl);
					// REORDER THE ARRAY (OTHERWISE MAY LOSE DATA)
					for (var i = 0; i < g_assessments.length; i++){
						var assessment = g_assessments[i];
						assessment.ass_id = i + 1;
					}
				}
				//console.debug(g_assessments);
			});
*/			
			break;
			
		case 'abs':
		case 'lcn':
		case 'mcq':
		case 'prt':
		case 'ref':
		case 'sur':
		
			//////////////////////////////////////////////////////////////////////////////////
			// ASSESSMENT ITEMS
			//////////////////////////////////////////////////////////////////////////////////
			confirmDialog('Are you sure you want to delete this item?', function(){
			
				// REMOVE FROM DT
				row.remove().draw();
				
				// POST-OPERATIONS
				evenlyDistributeSliders(jtbl);
				
				//console.debug('after deletion', jtbl.outerHTML());
				
				// REORDER THE VISIBLE NUMBER
				reorderDT(dt, jtbl);
				
				// ADD THE FIRST ASSESSMENT IF EMPTY
				if (!jtbl.find('>tbody>tr>td:not(.dataTables_empty)').length){
					var method = jtbl.attr('dt_type');
					addAssessmentItem(method);
				}
				
			});
			break;
			
		default:
			//////////////////////////////////////////////////////////////////////////////////
			// USERS,SKILLS: NO WARNING, JUST SHOW OR HIDE
			//////////////////////////////////////////////////////////////////////////////////
			// REMOVE FROM DT
			row.remove().draw();
			// POST-OPERATIONS
			dt.data().count() ? jtbl.show() : jtbl.hide();		
			break;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////

function getActIdFromRow(obj){
	var jobj = $(obj),
			jtr = jobj.closest('tr'),
			jtbl = jobj.closest('table'),
			jtbl_id = jtbl.attr('id'),
			dt = jtbl.DataTable()
			row = dt.row( jtr ),
			data = row.data(),
			act_id = data[data.length - 1]
	;
	console.debug(jobj);
	return act_id;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function addSkills(skills, jtbl){//, onSuccess){
	//console.debug('addSkills', skills);
	//if (!$.isArray(skills)){	// not an array (object)
	if (skills instanceof jQuery){
		var jinput = skills;
		skills = getTTValue(jinput);	// a numarr
		var skills2 = {};
		for (var i in skills){
			var skill_name = skills[i];
			skills2[skill_name] = jsonclone(template_act_assessment_skills);
		}
		skills = skills2;
		jtbl = jinput.closest('table').parent().find('.dataTable');
	}
	if (!skills){
		console.error('error skills2');
		return;
	} else if (!getObjCount(skills)){
		console.error('no any skills');
		return;
	}
	// empty the list first
	var dt = jtbl.DataTable();
	//for (var i = 0; i < skills.length; i++){
	//	var skill_name = skills[i];
	for (var skill_name in skills){
		// CHECK DUPLICATE
		var bRepeated = 0;
		dt.rows().every(function(){
			var cols = this.data(),
				skill_name2 = cols[0];
			if (skill_name2 && skill_name2 == skill_name){
				bRepeated = 1;
			}
		});
		if (bRepeated){
			console.error('repeated skill='+skill_name);
		} else {
			//console.debug(skill);
			// ADD TO THE TABLE
			jtbl.show();
			dt
				.row
				.add([skill_name, g_but_trash_skill])
				.draw();
			if (g_platform != 'ios' && g_platform != 'android'){
				jtbl.find('[data-toggle=tooltip]').tooltip(); 	// render tooltip
			}
		}
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function updateActivityToUser(activity){
	var
		act_id = parseInt(activity.act_id),
		user_activities = g_user.profile.activity,
		user_activity = 0
	;
	// find if it already exists
	for (var i = 0; i < user_activities.length; i++){
		if (user_activities[i].act_id == act_id){
			// found, update the exisitng one
			user_activity = user_activities[i];
			break;
		}
	}
	// if not create a new one
	if (!user_activity){
		user_activity = jsonclone(template_user_activity);
		user_activities.push(user_activity);
	}
	// update all the fields
	user_activity.act_id	= activity.act_id;
	user_activity.published	= activity.published;
	user_activity.title		= activity.title;
	user_activity.act_type	= activity.act_type;
	user_activity.start		= activity.start;
	user_activity.end 		= activity.end;
/*
	if (!user_activity.impression){
		user_activity.impression = {};
	}	
	if (!user_activity.impression.panelists){
		user_activity.impression.panelists = {};
	}	
	user_activity.impression.skill = {};
	for (var skill_name in  activity.impression.skills){
		user_activity.impression.skill[skill_name] = {};
	}
*/	
	user_activities.sort(sortByDate);
}

///////////////////////////////////////////////////////////////////////////

function publishActivityToUser(uact){
	var
		act_id = parseInt(uact.act_id),
		user_activities = g_user.profile.activity,
		user_activity = 0
	;
	// find if it already exists
	for (var i = 0; i < user_activities.length; i++){
		if (user_activities[i].act_id == act_id){
			// found, update the exisitng one
			user_activities[i] = uact;
			uact = 0;
			break;
		}
	}
	// not found
	if (uact){
		user_activities.push(uact);
	}
	user_activities.sort(sortByDate);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function removeActivityFromUser(act_id){
	for (var i = 0; i < g_user.profile.activity.length; i++){
		if (g_user.profile.activity[i].act_id == act_id){
			g_user.profile.activity.splice(i, 1);
			break;
		}
	}
}

///////////////////////////////////////////////////////

function editActivity(act_id){
	console.debug('editActivity', act_id);
	$('.tab_page').hide();
	$('#div_activity_edit').show();
	if (g_curr_activity && act_id == g_curr_activity.act_id){
		editActivity2(g_curr_activity);
	} else {
		call_svrop(
			{
				type: 'get_activity',
				act_id: act_id,
			},
			function (obj){
				var activity = obj.activity;
				editActivity2(obj.activity);
			},
			function (obj){
				console.error('failed', obj);
			}
		);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function editActivity2(activity){
	
	// SET GLOBAL VARIABLE
	g_curr_activity = activity;
	
	var act_id = activity.act_id;
	
	console.debug('editActivity2', 'act_id='+act_id, activity);
	
	$("#tabs").tabs("option", "active", TAB_ACTIVITY);
	$('.tab_page').hide();
	$('#tab_activity, #div_activity_edit').show();
	
	// clear edit activity
	clearEditActivity();
	
	// FILL IN DATA HERE
	var jdiv = $('#div_activity_edit');
	jdiv.attr('act_id', activity.act_id);
	
	// PHOTO
	jdiv.find('.activity_photo_edit')
		.attr('img_id', activity.img_id)
		.css('visibility', 'hidden')
		.load(function(){
			$(this).css('visibility', 'visible')
		})
		.attr('src', getActImgSrc(activity.img_id))
	;
	
	// TITLE
	jdiv.find('.editable[data-name=activity_title]').editable('setValue', activity.title);
		
	// DESC
	var desc = activity.desc, jdesc = jdiv.find('.editable[data-name=activity_desc]'), data_type = jdesc.attr('data-type');
	if (data_type == 'textarea'){
		desc = stripHtmlTags(desc);
	}
	jdesc.editable('setValue', desc);
	
	
	var jtoggle = jdiv.find('.toggle_type');
	if (jtoggle.length){
		jtoggle.data('toggles').toggle(activity.act_type == 'OCL-X');
	}
	jdiv.find('.start_datetime').val(activity.start);
	jdiv.find('.end_datetime').val(activity.end);			

	if (!activity.impression.enabled){
		var jtoggle = jdiv.find('.toggle_impression');
		if (jtoggle.length){
			jtoggle.data('toggles').toggle(false);
		}
	}
	
	// ADD ASSESSMENTS
	if (activity.assessment && activity.assessment.assessments){
		for (var i in activity.assessment.assessments){
			var	assessment = activity.assessment.assessments[i];
			addAssessment(assessment.method, assessment);
		}
	}
	if (activity.assessment && !activity.assessment.enabled){
		var jtoggle = jdiv.find('.toggle_assessment');
		if (jtoggle.length){
			jtoggle.data('toggles').toggle(false);
		}
	}
	
	// ADD PARTICIPANTS
	g_saved_activity_onSuccess = 3;
	if (activity.participants && activity.participants.length){
		addUsers(activity.participants, jdiv.find('.div_participants .my_datatable[dt_type=users]'), function(){
			console.debug('saved_activity1');
			if (--g_saved_activity_onSuccess == 0){
				g_saved_activity = getEditActivity();
				console.debug('saved_activity1A', g_saved_activity);
			}
		});
	}
	
	// ADD IMPRESSION
	setPanelists(jdiv.find('#div_edit_skills'), activity.impression.skills, activity.impression.panelists, function(){
		console.debug('saved_activity2');
		if (--g_saved_activity_onSuccess == 0){
			g_saved_activity = getEditActivity();
			console.debug('saved_activity2A', g_saved_activity);
		}
	});

	// ADD MEDIA
	var juploader = jdiv.find('.uploader');
	juploader.uploader('getMedia', 'activity', {act_id: activity.act_id}, function(){
		console.debug('saved_activity3');
		if (--g_saved_activity_onSuccess == 0){
			g_saved_activity = getEditActivity();
			console.debug('saved_activity3A', g_saved_activity);
		}
	})	
}

////////////////////////////////////////////////////////////////////////////

function clearEditActivity(){
	var jdiv = $('#div_activity_edit');
	
	// ID
	jdiv.attr('act_id', 0);
	
	// photo
	updateImgPhoto($('.activity_photo_edit'), 0, 'activity');
	
	// title
	jdiv.find('[data-name=activity_title]').editable('setValue', '');
	
	// type
	var jtoggle = jdiv.find('.toggle_type');
	if (jtoggle.length){
		jtoggle.data('toggles').toggle(true);
	}
	
	// period (from tomorrow to the day after tomorrow)
	jdiv.find('.start_datetime').val(getDateString_start());
	jdiv.find('.end_datetime').val(getDateString_end());
	
	// desc
	jdiv.find('[data-name=activity_desc]').editable('setValue', '');
	
	// participants
	clearTokenfield(jdiv.find('.my_tokenfield[tt_type=users]'), 1);
	
	// users
	jdiv.find('.my_datatable[dt_type=users]').hide().DataTable().clear().draw();
		
	// generic skills (enable)
	var jtoggle = jdiv.find('.toggle_impression');
	if (jtoggle.length){
		jtoggle.data('toggles').toggle(true);
	}
	
	// generic skills (list)
	clearSkills('#div_edit_skills');
	
	// panelists
	clearPanelists('#div_edit_skills');
	
	// assessments (enable)
	var jtoggle = jdiv.find('.toggle_assessment');
	if (jtoggle.length){
		jtoggle.data('toggles').toggle(true);
	}
	
	// assessments (method)
	var jdiv2 = jdiv.find('#div_edit_assessment');
	jdiv2.find('.select_methods').prop('selectedIndex', 0);
	
	// assessments (table)
	jdiv2.find('.my_datatable[dt_type=assessments]').hide().DataTable().clear().draw();
	
	$('.uploader_gallery').html('');
	
	g_assessments = [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function getEditActivity(){
	var
		jdiv = $('#div_activity_edit');
		
	var
		act_id = parseInt(jdiv.attr('act_id')),
		img_id = parseInt($('.activity_photo_edit').attr('img_id'))
	;	
	var act_type = 'OCL-X';
	var jtoggle = jdiv.find('.toggle_type');
	if (jtoggle.length){
		act_type = jtoggle.data('toggles').active ? 'OCL-X' : 'YOLO-X';
	}
	var start = jdiv.find('.start_datetime').val();
	var end = jdiv.find('.end_datetime').val();
	var title = jdiv.find('.editable[data-name=activity_title]').editable('getValue', true);
	console.debug('title='+title);
		
	var desc = jdiv.find('.editable[data-name=activity_desc]').editable('getValue', true);
	var participants = getUsers(jdiv.find('.div_participants'));
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// IMPRESSION
	/////////////////////////////////////////////////////////////////////////////////////////////
	var jdiv_imp = jdiv.find('#div_edit_skills');
	var jtoggle = jdiv.find('.toggle_impression');
	var enabled1 = jtoggle.length && jtoggle.data('toggles').active ? 1 : 0;
	var skills = getSkillsFromTbl('#div_edit_skills', 0);
	var panelists = getPanelists('#div_edit_skills');
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// ASSESSMENTS
	/////////////////////////////////////////////////////////////////////////////////////////////
	var jdiv_ass = jdiv.find('#div_edit_assessment');
	var jtoggle = jdiv.find('.toggle_assessment');
	if (jtoggle.length){
		var enabled2 = jtoggle.data('toggles').active ? 1 : 0;
		// UPDATE FROM TABLE
		var jtbl2 = $('#div_edit_assessment .my_datatable[dt_type=assessments]'),
			 jtrs = jtbl2.find('>tbody>tr');
		jtrs.each(function(){
			// for each role
			var jtr = $(this);
				title = '',
				 weight = 0,
				 //jtbody = jtr.parent(),
				 jtd = jtr.find('td')
			;
			if (!jtd.hasClass('dataTables_empty')){
				var 
					//ass_id = parseInt(jtr.find('>td:first-child').text()),
					//index = ass_id - 1,
					index = jtrs.index(jtr),
					title = jtr.find('>td:nth-child(2)>div').editable('getValue', true)
					//weight = parseInt(jtr.find('>td:nth-child(5)').text())
				;
				g_assessments[index].title = title;
				g_assessments[index].weight = weight;
			}
		});
	}
	// to prevent getting only the pointers
	var assessments = jsonclone(g_assessments);
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// MEDIA
	/////////////////////////////////////////////////////////////////////////////////////////////
	var juploader = jdiv.find('.uploader');
	var media_id_arr = juploader.uploader('getMediaIDArr');
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// UPDATE TEMPLATE
	/////////////////////////////////////////////////////////////////////////////////////////////
	var activity = jsonclone(template_activity);

	activity.act_id = act_id;
	activity.img_id = img_id;
	activity.act_type = act_type;
	activity.title = title;
	activity.desc = desc;
	activity.start = start;
	activity.end = end;
	activity.coordinator_id = g_user_id;
	activity.participants = participants;

	activity.impression.enabled = enabled1;
	activity.impression.skills = skills;
	activity.impression.panelists = panelists;
		
	activity.assessment.enabled = enabled2;
	activity.assessment.assessments = assessments;
	
	activity.media = media_id_arr;
	
	//console.debug('skills', skills);
	console.debug('activity', activity);
	
	return activity;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// reorder by the 1st column as an index
// *** must turn the ordering in datatable options off first
/////////////////////////////////////////////////////////////////////////////////////////////////////

function reorderDT(dt, jtbl){
	for (var i = 0; i < dt.rows().count(); i++){
		var nth = i + 1 + '';
		dt.row(i).data()[3] = nth;
		//jtbl.find('>tbody>tr:nth-child(' + nth + ')>td:first-child').text(nth);
	}			
	dt.rows().draw(false);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reorderDT_ass_id(dt, jtbl){
	for (var i = 0; i < dt.rows().count(); i++){
		var
			nth = i + 1 + '',
			row = dt.row(i),
			cols = row.data(),
			ncol = cols.length
			//ass_id = parseInt(cols[ncol-2])	// a hidden one
		;
		cols[ncol-2] = nth;
	}			
	dt.rows().draw(false);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function deleteAssessment(ass_id){
	
	console.debug('deleteAssessment', 'ass_id='+ass_id);
	
	confirmDialog('Are you sure you want to delete this assessment?', function(){
		var jtbl = $('.my_datatable[dt_type=assessments]'),
			dt = jtbl.DataTable(),
			index = ass_id - 1,
			jtr = jtbl.find('tr:nth-child('+ass_id+')'),
			row = dt.row( jtr )
		;
		// REMOVE FROM DT
		console.debug(row);
		row.remove().draw();

		// POST-OPERATIONS
		//dt.data().count() ? jtbl.show() : jtbl.hide();
		//evenlyDistributeSliders(jtbl);

		// delete from the local storage
		if (g_assessments[index]){
			delete g_assessments[index];
			g_assessments.splice(index, 1);
		}
		if (!g_assessments.length){
			g_assessments = [];
		} else {
			// REORDER THE ARRAY (OTHERWISE MAY LOSE DATA)
			for (var i = 0; i < g_assessments.length; i++){
				var assessment = g_assessments[i];
				assessment.ass_id = i + 1;
			}
		}
		// REORDER THE VISIBLE NUMBER
		reorderDT_ass_id(dt, jtbl);

		closeLightBox();			
		g_saved_assessment_edit = 0;
		
	});
}

/////////////////////////////////////////////////////////////////////////////////////////

function addUsers(users, jtbl, onSuccess){
	if (!$.isArray(users)){	// not an array
		var jinput = users;
		users = getTTValue(jinput);
		jtbl = jinput.closest('table').parent().find('.dataTable');
	}
	if (!users){
		console.error('error input2');
		return;
	} else if (!users.length){
		console.error('no any users');
		return;
	}
	// check with server
	call_svrop(
		{
			type: 'check_users',
			users: users,
		},
		function (obj){
			addUsers2(obj.users, jtbl);
			// callback
			//console.debug('addusers callback', onSuccess);
			onSuccess && onSuccess();
		},
		function (obj){
			console.error('failed', obj);
		}
	)
}

/////////////////////////////////////////////////////////////////////////////////////////////
// get result from server
// added with fields like email, position and images
/////////////////////////////////////////////////////////////////////////////////////////////
function addUsers2(users, jtbl){
	//console.debug('succeeded', obj);
	var dt = jtbl.DataTable();
	for (var i = 0; i < users.length; i++){
		var user = users[i],
			user_id = user.user_id ? user.user_id : 0,
			img_id = user.img_id ? user.img_id : 0
		;
		//console.debug(user);
		// CHECK DUPLICATE
		var bRepeated = 0;
		dt.rows().every(function(){
			var cols = this.data(),
				user_id2 = parseInt(cols[0]);
			if (user_id2 && user_id2 == user_id){
				bRepeated = 1;
			}
		});
		if (bRepeated){
			console.error('repeated user_id=' + user_id);
		} else {
			var imgusername = getImgUserName(user);
			if (!user_id){
				user_id = user.email;
			}
			// ADD TO THE TABLE
			jtbl.show();
			dt
				.row
				.add( [
					imgusername,
					//user.email ? user.email : '',
					//getUserPosition(user),
					g_but_trash_user,
					user_id,
				])
				.draw();
			//console.debug(dt.column(2).data());
			//dt.column(2).sort().draw();
			//console.debug(dt.column(2).data());
			if (g_platform != 'ios' && g_platform != 'android'){
				jtbl.find('[data-toggle="tooltip"]').tooltip(); 	// render bootstrap tooltip
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////

function saveActivity(publish){
	var activity = getEditActivity();
	var act_id = activity.act_id;
	
	console.debug('SAVEACTIVITIY act_id='+act_id, 'publish='+publish, activity);
	//return; // testing
	openProgress();
	// send to server
	call_svrop(
		{
			type: 'save_activity',
			//email: g_user.email,
			user_id: g_user_id,
			pwd: g_user.pwd,
			activity: JSON.stringify(activity),
			publish: publish,
		},
		function (obj){
			// after callback, save act_id to local
			var act_id = obj.act_id;
			console.debug('saveactivity succeeded', 'act_id='+act_id, obj.uact);
			
			///////////////////////////////////////////////////////////////////////////////////
			// MODIFY LOCAL DATA
			///////////////////////////////////////////////////////////////////////////////////
			g_curr_activity = activity;
			
			// UPDATE ACTIVITY
			activity.act_id = act_id; // replace from 0 to actual act_id
			
			// MODIFY LOCAL TABLE
			$('#div_activity_edit').attr('act_id', act_id)
			
			// UPDATE USER
			if (publish){
				publishActivityToUser(obj.user_uact);
				// MY USER STAT
				updateMyUserStat();
			} else {
				updateActivityToUser(activity);
			}			

			// UPDATE PROFILE PAGE (FOR THIS ACTIVITY)
			updateMyInfoProfile('activity');
			
			// SHOW MY SKILLS OF ALL THE ACTIVITY ON HOME PAGE
			refreshMySkills();
			
			// CLOSE PAGE AND RETURN TO SEARCH
			openActivityList();
			
			// REFRESH SCHEDULE
			refreshSchedule();
			
			// CLOSE PROGRESS
			closeProgress();
			
			// show confirm
			notifyDialog('The activity is ' + (publish?'published':'saved') + '.');
		},
		function (obj){
			//console.error('saveactivity failed', obj);
		}
	);
}


///////////////////////////////////////////////////////////////////////////////////////////////////

function getUsers(jobj){
	var out_arr = [];
	var jtbl = jobj.find('.my_datatable[dt_type=users]');
	if (jtbl.length){
		var users = jtbl.DataTable().data();
		for (var i  = 0 ; i < users.length; i++){
			var user = users[i];
			var user_id = user[2];	// user_id or user_email "<!--littlekam@gmail.com--><span...
			out_arr.push(user_id);
		}
		out_arr.sort(sortByNumber);
	}
	return out_arr;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function validateBeforePublish(){
	var bSuccess = 1;
	
	return bSuccess;
}

