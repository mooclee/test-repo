

/////////////////////////////////////////////////////////////////////////////////////////////
// open ass page after publish
// coordinator:
//		view: statistics completed, marked
// participant:
//		perform:
//		review:
//		share:
// assessor:
//		mark:
//		review:
/////////////////////////////////////////////////////////////////////////////////////////////
var
	g_but_review_assessee = '<button type="button" class="btn btn-sm btn-list-edit" onclick=\'markAssessment(getIdFromRow(this),this,"review")\' data-toggle="tooltip" title="Review"><i class="glyphicon glyphicon-certificate"></i></button>',
	g_but_mark_assessee = '<button type="button" class="btn btn-sm btn-list-edit" onclick=\'markAssessment(getIdFromRow(this),this,"mark")\' data-toggle="tooltip" title="Mark"><i class="glyphicon glyphicon-check"></i></button>',
	g_curr_inline_jtr = 0,
	g_left_arrow = '<img class="leftarrow" src="./images/leftarrow_16.png" onclick="closeLightBox()"/>'
;

function initAssessment(){
}

/////////////////////////////////////////////////////////////////////////////////////////////

function getIdFromRow(obj){
	var jobj = $(obj),
			jtr = jobj.closest('tr')
	;
	if (jtr.hasClass('child')){	// for responsive table
		jtr = jtr.prev();
	}
	var jtbl = jobj.closest('table'),
			jtbl_id = jtbl.attr('id'),
			dt = jtbl.DataTable()
			row = dt.row( jtr ),
			cols = row.data(),
			id = cols[0]
	;
	return isNaN(id) ? id : parseInt(id);
}

///////////////////////////////////////////////////////////////

function getUserAssessment(user, act_id, ass_id){
	var uass = 0;
	var activities = user.profile.activity;
	for (var i = 0; i < activities.length; i++){
		var activity = activities[i];
		if (activity.act_id == act_id){
			var assessments = activity.assessments;
			for (var j = 0; j < assessments.length; j++){
				var assessment = assessments[j];
				if (assessment.ass_id == ass_id){
					uass = assessment;
					break;
				}
			}
			break;
		}
	}
	return uass;
}


///////////////////////////////////////////////////////////////

function markAssessment(user_id, obj, action){
	if (!g_curr_activity){
		console.error('no g_curr_activity');
	} else if (!g_curr_inline_jtr){
		console.error('no g_curr_inline_jtr');
	} else {
		var
			act_id = g_curr_activity.act_id,
			ass_id = parseInt(g_curr_inline_jtr.attr('ass_id')),
			jobj = $(obj),
			jtr = jobj.closest('tr'),
			jtbl = jobj.closest('table'),
			dt = jtbl.DataTable()
			row = dt.row( jtr ),
			cols = row.data(),
			user_html = cols[2]
		;
		console.debug('markAssessment', 'act_id='+act_id, 'ass_id='+ass_id, 'user_id='+user_id);
		openAssessment(ass_id, action, user_id, user_html);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////

function openAssessees_assessment(ass_id, obj){

	if (g_curr_inline_jtr){
		var ass_id2 = g_curr_inline_jtr.attr('ass_id');
		if (ass_id2 == ass_id){
			slideUpParticipantList();		
			return;
		} else {
			removeParticipantList();
		}
	}

	var
		act_id = g_curr_activity.act_id,
		index = ass_id - 1
	;
	// DEBUGGING
	console.debug('openAssessees_assessment', 'act_id='+act_id, 'ass_id='+ass_id, obj);

	// ADD ASSESSEES
	var uass = getUserAssessment(g_user, act_id, ass_id);	
	var participants = uass.participants;
	if (!participants){
		console.error('no participants');
		return;
	}

	var jtr = $(obj).parent().parent();
	//console.debug(jtr);
	var s = '<table class="my_datatable display nowrap" style="width:100%">'
					+ '<thead>'
						+ '<tr>'
							+ '<td>User ID</td>'
							+ '<td>Participant</td>'
							+ '<td>Performed</td>'
							+ '<td>Marked</td>'
							+ '<td>&nbsp;</td>'
						+ '</tr>'
					+ '</thead>'
				+ '</table>'
	;
	jtr.after('<tr act_id="' + act_id + '" ass_id="' + ass_id + '"><td colspan="10"></div><div class="div_assessors" style="display:none">' + s + '</div></td></tr>');
	var jtr2 = jtr.next();
	var jtbl = jtr2.find('.my_datatable');
	jtbl.DataTable({
		//ordering: false,	// otherwise, the list is difficult to trace
		rowReorder: true,
		autoWidth: false,
		bPaginate: false,
		dom: '',
		language:{
			emptyTable: '',
			zeroRecords: '',
		},
		columnDefs: [
			{	targets: [ 0 ],	orderable: false,	visible: false, },
			{	targets: [ 4 ],	orderable: false},
		],
	});
	var dt = jtbl.show().DataTable().clear().draw();
	for (var i = 0; i < participants.length; i++){
		var user = participants[i],
			user_id = user.user_id ? user.user_id : 0,
			imgusername = getImgUserName(user),
			button = !user.performed ? '' : user.marked ? g_but_review_assessee : g_but_mark_assessee,
			arr = [
				user_id,
				imgusername,
				user.performed,
				user.marked,
				button
		];
		//console.debug(arr);
		dt
			.row
			.add(arr);
	}
	dt.draw();
	if (g_platform != 'ios' && g_platform != 'android'){
		jtbl.find('[data-toggle="tooltip"]').tooltip(); 	// render bootstrap tooltip
	}

	// HIDE THE TBL
	var jdiv = jtbl.parent();
	jdiv.slideDown();

	// REMEMBER THE ROW
	g_curr_inline_jtr = jtr2;
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function slideUpParticipantList(){
	if (g_curr_inline_jtr){
		g_curr_inline_jtr.find('div').eq(0).slideUp('', function(){
			removeParticipantList();
		});
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function removeParticipantList(){
	if (g_curr_inline_jtr){
		var jtr = g_curr_inline_jtr.next();
		if (jtr.hasClass('tr_buttons_panel')){
		 jtr.remove();
		}
		g_curr_inline_jtr.remove();
		g_curr_inline_jtr = 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function getActAssessement(activity, ass_id){
	// FIND ASSESSMENT FROM THE MEMORY OR FROM THE DATABASE?
	var assessment = 0, index = ass_id - 1;
	if (index >= 0 && index < activity.assessment.assessments.length){
		assessment = activity.assessment.assessments[index];
	}
	if (!assessment){
		console.error('wrong assessment ass_id=' + ass_id);
	}	
	return assessment;
}

////////////////////////////////////////////////////////////////////////////////

function updateActPagePanelists(jtbl, panelists, panelists_user){
	if (!jtbl.hasClass('dataTable')){
		jtbl.DataTable({
			//ordering: false,	// otherwise, the list is difficult to trace
			rowReorder: true,
			autoWidth: false,
			bPaginate: false,
			dom: '',
			language:{
				emptyTable: '',
				zeroRecords: '',
			},
			columnDefs: [
/*			
				{	targets: [ 0 ],	orderable: false,	visible: false, },
				{	targets: [ 1 ],	orderable: false},
				{	targets: [ 2 ],	orderable: false},				
				{	targets: [ 5 ],	orderable: false, className: 'dt-center'},				
*/				
			],
		});
	}
	var dt = jtbl.show().DataTable().clear().draw();
	for (var i = 0; i < panelists.length; i++){
		var	user_id = panelists[i];
		var user = 	getUserByID(panelists_user, user_id);
		var
			//username = user.username ? user.username : '',
			//img_id = user.img_id ? user.img_id : 0,
			imgusername = getImgUserName(user_id, g_curr_assessment_assessors),
			status = user.status ? user.status : '',
			arr = [
				//user_id,
				//i + 1,
				imgusername,
				//user.email ? user.email : '',
				//getUserPosition(user),
				//status
			]
		;
		dt.row.add(arr);
	}
	dt.draw();
	//if (g_platform != 'ios' && g_platform != 'android'){
	//jtbl.find('[data-toggle="tooltip"]').tooltip(); 	// render bootstrap tooltip
	//}
};

//////////////////////////////////////////////////////////////////////////////////////////////
var
	UASSSTATUS_NEW = 0,
	UASSSTATUS_SAVED = 1,
	UASSSTATUS_PERFORMED = 2,
	UASSSTATUS_MARKED = 3
;
function getAssStatus(uass){
	var value = 0, desc = '';
	if (uass.marked){
		value = UASSSTATUS_MARKED;
		desc = 'Marked ' + uass.marked;
	} else if (uass.performed){
		value = UASSSTATUS_PERFORMED;
		desc = 'Submitted at ' + uass.performed;
	} else if (uass.saved){
		value = UASSSTATUS_SAVED;
		desc = 'Saved at ' + uass.saved;
	} else {
		value = UASSSTATUS_NEW;
		desc = 'New';
	}
	return {
		value: value,
		desc: desc,
	};
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var
	g_saved_assessment_view = 0,
	g_assr_asst_marks = 0,
	g_curr_assessment_assessors = 0;

function viewAssessment_new(activity, uact){

	if (!activity.assessment || activity.assessment.enabled == '0'){

		$('#tr_actpage_assessment').hide();
	
	} else {

		$('#tr_actpage_assessment').show();
		
		// am i the coordinator?
		var jtr = $('#tr_actpage_assessment_coordinator');
		if (uact.uact_coordinator == 1){
			jtr.show();
			viewAssessment_coor1(jtr.find('.my_datatable'), activity.assessment.assessments);
		} else {
			jtr.hide();
		}

		// am i the assessor of any assessments?
		var jtr = $('#tr_actpage_assessment_assessor');
		if (uact.uact_assessor == 1){
			jtr.show();
			viewAssessment_assr1(jtr.find('.my_datatable'), activity.assessment.assessments);
		} else {
			jtr.hide();
		}
		
		// am i one of the participant?
		var jtr = $('#tr_actpage_assessment_participant');
		if (uact.uact_participant == 1){
			jtr.show();
			viewAssessment_part1(jtr.find('.my_datatable'), activity.assessment.assessments, uact);
		} else {
			jtr.hide();
		}
		
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getAssessmentByAssID(activity, ass_id){
	return activity.assessment.assessments[parseInt(ass_id) - 1];
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getAssessmentName(assessment){
	var method = method_arr[assessment.method] ? method_arr[assessment.method] : '';
	return '<!--' + assessment.ass_id + '-->' + assessment.title + ' (' + method + ')'; //', ' + assessment.weight +  '%)';
}

//////////////////////////////////////////////////////////////////////////////////////////////
var g_curr_role = 0, g_curr_ass_id = 0, g_curr_method = '';

function openAssessment(ass_id, role, part_id){

	console.debug('openAssessment', 'ass_id=' + ass_id, 'part_id=' + part_id);
	
	if (g_platform == 'web'){
		$('#div_topmenu').show();
	} else {
		$('#div_topmenu').hide();
	}
	
	g_curr_role = role;
	g_curr_ass_id = ass_id;
	g_curr_part_id = part_id;
	
	// ACT ASSESSMENT
	var
		assessment = getActAssessement(g_curr_activity, ass_id),
		act_id = g_curr_activity.act_id,
		method = assessment.method
	;
	g_curr_method = method;
	
	if (part_id == g_user_id){
	
		openAssessment2(ass_id, role, part_id, g_user);
		
	} else {
	
		call_svrop(
			{
				type: 'get_userdoc',
				user_id: part_id,
			},
			function (obj){
				var user_doc = obj.user;
				openAssessment2(ass_id, role, part_id, user_doc);
			}
		);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////

function openAssessment2(ass_id, role, part_id, user_doc){
	var
		act_id = g_curr_activity.act_id,
		assessment = getActAssessement(g_curr_activity, ass_id),
		uass = getUserAssessment(user_doc, act_id, ass_id),
		root_panelists = assessment.panelists ? assessment.panelists : 0,
		uass_panelists = uass ? uass.panelists : 0,
		my_assessors = getMyAssessors(g_curr_activity.coordinator_id, g_user_id, root_panelists, uass_panelists),
		my_assessees = getMyAssessees(g_curr_activity.coordinator_id, g_user_id, g_curr_activity.participants, root_panelists, uass_panelists)
	;
	console.debug('my_assessors', my_assessors, 'my_assessees', my_assessees);
	
	// FIRST FIND THE PANELISTS FROM USERS
	getUsersFromDB(my_assessors, function(panelists_users){
		g_curr_assessment_assessors = panelists_users;
		openAssessment3(ass_id, role, part_id, root_panelists, uass_panelists, my_assessors, panelists_users, uass);
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////
var
	 g_repeat_perform = 1
	,g_repeat_marking = 1
;
function openAssessment3(ass_id, role, part_id, root_panelists, user_panelists, my_assessors, panelists_user, uass){
	//console.debug('openAssessment3', uass);

	var
		activity = g_curr_activity,
		act_id = activity.act_id
	;
		
	// ACT ASSESSMENT
	var
		assessment = getActAssessement(activity, ass_id),
		participant = getUserByID(g_curr_participants, part_id)
	;

	// HIDE ALL TOOLTIPS
	$('.tbl_actpage [data-toggle=tooltip]').tooltip('disable');
	
	// TIMESTAGE
	var
		timestage = getTimeStage(assessment.start, assessment.end),
		stage = timestage.stage
	;
	
	// PUT ASSESSMENT ON THE LIGHTBOX
	var selector = '#div_lightbox';
	var jdiv = $(selector).html($('#div_tmp_assessment').html());
		
	var jpopup = jdiv;
	var media_id_arr = 0;	// for pst post operations
	
	/////////////////////////////////////////////////////////////////////////////////////////
	// 1. HEADER
	/////////////////////////////////////////////////////////////////////////////////////////
	
	// TITLE
	var method = method_arr[assessment.method];
	var title = g_left_arrow + ' ' + assessment.title + ' (' + method + ')';
	jpopup.find('.asspage_title').html(title);
	
	// PERIOD
	var sPeriod = getUniformPeriod(assessment.start, assessment.end);
	//jpopup.find('.asspage_period').html('<b>Period:</b> ' + sPeriod + ' <span class="time_stage">(' + timestage.desc + ')</span>');
	jpopup.find('.asspage_period').html(
		'<b>Period:</b> <span class="time_stage">' + timestage.desc + '</span> <br/>' + assessment.start + ' - ' + assessment.end);

	// DESC
	jpopup.find('.asspage_desc').html(assessment.desc);
	
	// ROLE
	jpopup.find('.asspage_role').html('<table><tr><td><b>Role:</b> ' + capitalizeWords(role) + ' </td></tr></table>');

	// PARTICIPANTS
	jpopup.find('.asspage_participant').html('<b>Participant:</b> ' + (participant.username?participant.username:''));
	
	var status = getAssStatus(uass);
	if (status){
	
		// STATUS
		jpopup.find('.asspage_status').html('<b>Status:</b> ' + status.desc);

		// MARKS
		if (status.value == UASSSTATUS_MARKED){

			var marks = 0;
			switch (role){
				
				case 'participant':
				case 'coordinator':
					marks = getMarksByID(assessment, 'part_asst_marks', part_id)
					break;
					
				case 'assessor':
					var assr_id = g_user_id;
					marks = getMarksByID(assessment, 'assr_asst_marks', assr_id+','+part_id);
					break;
			}
			jpopup.find('.asspage_marks').html(marks + ' marks');
		}
	}
		
	/////////////////////////////////////////////////////////////////////////////////////////
	// 2. ASSESSMENT ITEMS
	/////////////////////////////////////////////////////////////////////////////////////////
	var	method = assessment.method;
	
	// find opts for view or edit
	// according to
	// 1. method
	// 2. role
	// 3. time stage
	// 4. status (saved, performed, marked)
	if (!uass.saved) uass.saved = '';
	if (!uass.performed) uass.performed = '';
	if (!uass.marked) uass.marked = '';
	
	var opts = {
		
		bViewQuestion: 1,

		bViewAnswer:  method != 'pst' ? 1 : 0,

		bEditAnswer:
			role == 'participant'
				&& method != 'prt'
				&& stage == TIMESTAGE_OPENING
				&& (g_repeat_perform || !uass.performed)
				&& !uass.marked
		,
		bEditMarking:
			
			method != 'sur'
			&&
			role == 'assessor'
			&& 
					(
						method == 'prt'
						||
						method == 'mcq'
						||
						(
							stage >= TIMESTAGE_OPENING
							&& uass.performed != ''
							&& (g_repeat_marking || !uass.marked)
						)
					)
		,
		bViewMarking:
			method != 'sur'
			&&
			(
				(
					role == 'assessor'
					&& (
						method == 'prt'
						||
						uass.marked
					)
				)
				||
				(
					role != 'assessor'
					&& uass.marked != ''
				)
			)
		,
		bEditComment:
			method != 'sur'
			&& role == 'assessor'
			&& stage >= TIMESTAGE_OPENING && (g_repeat_marking || !uass.marked)
		,
	};	
	var tbody = jpopup.find('.tbl_asspage_assessment tbody').empty();
	
	if (method == 'pst' && role == 'participant' && stage == TIMESTAGE_OPENING && !uass.performed){
		
		console.debug('show pst');
		jpopup.find('.asspage_header1,.asspage_marks').hide();
		jpopup.find('.asspage_header2').show();
		tbody.append('<tr><td><div class="uploader_gallery"></div></td></tr>');
		
	} else {
/*
		// SPECIAL HANDLING FOR POSTER
		if (method == 'pst' && uass.media){
			// convert media to items
			uass.items = [];
			for (var i = 0; i < uass.media.length; i++){
				var media_id = uass.media[i];
				var item_id = i + 1;
				uass.items[i] = {
					"ass_item_id" : item_id,
					"media_id" : media_id,
					"part_item_marks" : "-",
					"answer" : "0",
					"assessors" : {}
				};
			}
			// remove the old media
			delete uass.media;
		}
		console.debug('uass', uass);
*/
		// show the header
		jpopup.find('.asspage_header1,.asspage_marks').show();
		jpopup.find('.asspage_header2').hide();
		switch (method){
			
			case 'prt':
				// for prt it is very different
				viewAssessment_prt(opts, tbody, assessment, uass, role);
				break;
			
			case 'pst':
				media_id_arr = [];
				var total_marks = 0;
				for (var i = 0; i < uass.items.length; i++){
					var item_id = i + 1;
					total_marks += viewAssItem(opts, assessment, uass, stage, status, tbody, role, item_id);
					//media_id_arr.push(uass.items[i].media_id);
					media_id_arr.push(uass.items[i].answer);
				}
				$('.asspage_marks').text(parseInt(total_marks) + ' marks');
				break;
				
			default:
				var act_items = assessment.items;
				if (!act_items || !act_items.length){

					console.error('error no items in this assessment '+ ass_id);

				} else if (!uass){

					console.error('no uass found act_id=' + act_id, 'ass_id=' + ass_id);

				} else {		

					var total_marks = 0;
					for (var i = 0; i < assessment.items.length; i++){
						var item_id = i + 1;
						total_marks += viewAssItem(opts, assessment, uass, stage, status, tbody, role, item_id);
					}
					if (method == 'mcq' || role == 'assessor'){
						$('.asspage_marks').text(parseInt(total_marks) + ' marks');
					}
				}
				break;
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////
	// 3. SKILLS
	/////////////////////////////////////////////////////////////////////////////////////////
	var skills = assessment.skills;
	var jtbl = jpopup.find('.my_datatable[dt_type=asspage_skills]');
	if (skills){
		//console.debug('skills', skills);
		if (!jtbl.hasClass('dataTable')){
			jtbl.DataTable({
				//ordering: false,	// otherwise, the list is difficult to trace
				rowReorder: true,
				autoWidth: false,
				bPaginate: false,
				dom: '',
				language:{
					emptyTable: '',
					zeroRecords: '',
				},
				columnDefs: [
					//{	targets: [ 0 ],	orderable: false,	},
				],
			});
		}
		var dt_skills = jtbl.show().DataTable().clear().draw();
		for (var skill_name in skills){
			dt_skills.row.add([skill_name]);
		}
		dt_skills.draw();
	}
	
	//////////////////////////////////////////////////////////////////
	// 4. PANELISTS AND ASSESSORS
	//////////////////////////////////////////////////////////////////
	var panelists = assessment.panelists;
	var jtbl = jpopup.find('.my_datatable[dt_type=asspage_assessors]');
	updateActPagePanelists(jtbl, my_assessors, panelists_user);

	//////////////////////////////////////////////////////////////////
	// 5. BUTTONS
	//////////////////////////////////////////////////////////////////
	jpopup.find('.btn_close').click(function(){
		closeLightBox();
	});
	
	jpopup.find('.btn_cancel').click(function(){
		closeLightBox();
	});
	
	jpopup.find('.btn_clear').click(function(){
		clearActPageAssessment(role);
	});
	
	jpopup.find('.btn_save').click(function(){
		saveAssessment(0);
	});
	jpopup.find('.btn_submit').click(function(){
		if (validateBeforeSubmit()){
			confirmDialog('Are you sure to submit now?', function(){
				saveAssessment(1);
			});
		}
	});
	
	var btns = '.btn_close', full_btns = '.btn_close,.btn_save,.btn_clear,.btn_cancel,.btn_submit';
	
	switch (role){
		
		case 'participant':
			if (method == 'pst'){
				btns = '.btn_cancel,.btn_submit';
			} else if (opts.bEditAnswer){
				btns = '.btn_cancel,.btn_clear,.btn_save,.btn_submit';
			}
			break;

		case 'assessor':
			if (opts.bEditMarking){
				btns = '.btn_clear,.btn_cancel,.btn_submit'; // consider .btn_save
			}
			break;
			
		case 'coordinator':
			if (act_id != 0){
				btns = '.btn_close,.btn_delete';
			}
			break;
	}
	jpopup.find(full_btns).hide();
	jpopup.find(btns).show();
	var jdiv3 = jpopup;
	
	//$('html, body').css('overflow', 'auto');
	
	////////////////////////////////////////////////////////////////////
	// open lightbox
	////////////////////////////////////////////////////////////////////
/*	
	// HIDE THE BODY PAGE
	//$('html, body').css('overflow', 'hidden');
	// https://github.com/noelboss/featherlight
	g_lightbox = $.featherlight(jpopup, {
		closeOnClick: false,
		closeOnEsc:   false,
		closeIcon:		'',
		afterOpen: function(){
			//$('.featherlight .featherlight-close-icon').hide();
		},
		afterContent: function(){
			////////////////////////////////////////////////////////////////////
			// post lightbox
			////////////////////////////////////////////////////////////////////
			var jdiv3 = this.$content;
*/			
			// PEER ASSESSMENT
			var bEditable = role == 'participant' && stage == TIMESTAGE_OPENING;
			var index = ass_id - 1;
			setPeerAssessment2(jdiv3.find('.div_peer_assessment'), root_panelists, user_panelists, bEditable, act_id, ass_id);
			
			// SLIDERS FOR ASSESSOR MARKING
			var jsliders = jdiv3.find( ".slider" );
			jsliders.each(function(){
				var jslider = $(this);
				jslider.slider({
					create: function() {
						var handle = $(this).find('.custom-handle');
						handle.text( $( this ).slider( "value" ) );
					},
					slide: function( event, ui ) {
						var marks = ui.value;
						var handle = $(this).find('.custom-handle');
						handle.text( marks );
						$(this).attr('marks', marks);
						calcFinalMarks();
					}
				})
				var marks = jslider.attr('marks');
				jslider.find('.custom-handle').text(marks);
				jslider.slider('value', marks);	
				if (jslider.hasClass('slider_disabled')){
					jslider.slider( "option", "disabled", true);
				}				
			});
			
			// update gallery
			var jgallery = jdiv3.find('.uploader_gallery');
			
			// poster2: no save now, only after submission
			var jbutton = initUploader(jdiv3.find('.uploader'), jgallery,'poster2', {
					act_id: act_id, ass_id: ass_id, user_id: g_user_id
				},
				function(media_arr, media_id_arr){
					console.debug('onUpdate', media_id_arr);
					//g_curr_activity.media = media_id_arr;
				},
				'.tbl_ass_item'
			);
			
			// UPDATE THE MEDIA
			if (media_id_arr){
				var jdivs =  jdiv3.find('.div_uploader_media');
				//var jhrefs = jdiv3.find('.uploader_href');
				call_svrop(
					{
						type: 'get_media',
						media_id_arr: media_id_arr,
					},
					function (obj){
						//console.debug('succeeded', obj);
						var media_arr = obj.media_arr;
						if (media_arr){
							for (var i = 0; i < media_arr.length; i++){
								var
									media = media_arr[i],
									url =  './media/' + media.file_name,
									jdiv = jdivs.eq(i);
								;
								jbutton.uploader('createElement', jdiv, media.file_cat, media.file_id, 0, media.file_name, url, 0);
							}
						}
					},
					function (obj){
						console.error('failed', obj);
					}
				);	
			}
			
			
/*		
		}
	});
*/
	calcFinalMarks();
	
	changeBodyView(2);
	
	// SAVE FOR CHECKLOSEINPUT
	g_saved_assessment_view = getAssessmentInput(role);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAssessmentMarks(jsliders){
	var ass_marks = 0;
	jsliders.each(function(){
		var
			 marks = parseInt($(this).attr('marks')),
			 weight = parseInt($(this).attr('weight'))
		;
		//console.debug(!isNaN(marks), !isNaN(weight))
		ass_marks += (marks * (weight / 100.0)); 
	});
	//console.debug(ass_marks, typeof(ass_marks), !isNaN(ass_marks));
	ass_marks = parseInt(ass_marks+'');
	return ass_marks;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function clearActPageAssessment(){
	console.debug('clearActPageAssessment');
	if (!checkLoseInput('cancel all the input', function(){	
		clearActPageAssessment2();
	})){
		clearActPageAssessment2();
	}
	//console.debug(items);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function clearActPageAssessment2(){
	console.debug('clearActPageAssessment2');
	var jpopup = g_lightbox.$content;
	switch (g_curr_role){
		
		case 'assessor':
			jpopup.find('.slider').slider( "value", 0);	
			jpopup.find('.slider .custom-handle').text(0);
			jpopup.find('.asspage_open_comments').each(function(){
				$(this).html('');
			});
			break;
			
		case 'participant':
			jpopup.find('.asspage_open_answer').each(function(){
				$(this).html('');
			});
			break;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

function getAssessmentInput(){
	// output
	var input = {};
	//var jpopup = g_lightbox.$content;
	var jpopup = g_bodyview;
	
	switch (g_curr_role){
		
		case 'participant':
			switch (g_curr_method){
				
				case 'sur':
					// selects only
					var item_id = 1;
					jpopup.find('select, .asspage_open_answer').each(function(){
						var jobj = $(this);
						if (jobj.prop('tagName') == 'SELECT'){
							var jselect = jobj,
								val = jselect.val();
							;
							input[item_id] = val;
						} else {
							input[item_id] = jobj.html();
						}
						item_id++;
					});
					break;

				case 'mcq':
					var item_id = 1;
					jpopup.find('.tbl_mcq_answer').each(function(){
						var jobj = $(this);
						var answer = jobj.find('input:checked').val();
						input[item_id++] = answer;
					});
					break;
					
				case 'pst':
					var juploader = jpopup.find('.uploader');
					if (juploader.length){
						var media_id_arr = juploader.uploader('getMediaIDArr');
						var item_id = 1;
						for (var i in media_id_arr){
							input[item_id++] = media_id_arr[i];
						}
					}
					break;

				default:
					jpopup.find('.asspage_open_answer').each(function(){
						var item_id = $(this).attr('data-item-id');
						input[item_id] = $(this).html();
					});
					break;

			}
			break;
		
		case 'assessor':
			var item_id = 1;
			switch (g_curr_method){
				
				case 'prt':			
					jpopup.find('.tbl_asspage_prt tbody tr').each(function(){
						var tds = $(this).find('td');
						var td = $(this).find('td[data-selected=1]');
						var index = tds.index(td);
						//console.debug(index);
						input[item_id++] = index;
					});
					break;
					
				case 'mcq':
					g_assr_asst_marks = 0;
					jpopup.find('.tbl_ass_item').each(function(){
						var jobj = $(this),
							assr_item_marks = parseInt(jobj.find('.assr_item_marks').text());
							comments = jobj.find('.asspage_open_comments').html()
						;
						g_assr_asst_marks += assr_item_marks;
						input[item_id++] = {
							user_id: g_user_id,
							img_id: g_user.img_id,
							username: g_user.username,
							assr_item_marks: assr_item_marks,
							comments: comments,
							date : getDateTimeString(),	// to be replaced in the server side
						};
					});
					break;
					
				default:
					jpopup.find('.tbl_asspage_marking').each(function(){
						var jtbl = $(this),
							item_id = $(this).attr('data-item-id'),
							assr_item_marks = parseInt(jtbl.find('.ui-slider').attr('marks')),
							comments = jtbl.find('.asspage_open_comments').html()
						;
						input[item_id] = {
							user_id: g_user_id,
							img_id: g_user.img_id,
							username: g_user.username,
							assr_item_marks: assr_item_marks,
							comments: comments,
							date : getDateTimeString(),	// to be replaced in the server side
						};
					});
					break;
			}
			break;
			
	}
	//console.debug('getAssessmentInput', input);
	return input;
}


///////////////////////////////////////////////////////////////
// assessment, 'part_asst_marks', part_id
function getMarksByID(obj, name, key, bRedIfNull){
	var marks = '-';
	var obj2 = obj[name];
	if (!key){
		if (typeof(obj2) != 'undefined'){
			marks = obj2;
		}
	} else if (obj2 && typeof(obj2[key]) != 'undefined'){
		marks = obj2[key];
	}
	if (bRedIfNull && marks == '-'){
		marks = '<span style="color:red">' + marks + '</span>';
	}
	return marks;
}

///////////////////////////////////////////////////////////////

function setMarksByID(assessment, name, key, marks){
	if (!assessment || !name || !key){
		console.debug('setMarksByID error');
	} else {
		if (!assessment[name]){
			assessment[name] = {};
		}
		assessment[name][key] = marks;
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

function saveAssessment(bSubmit){
	console.debug('saveAssessment', 'submit='+bSubmit);
	
	openProgress();
	
	var
		jpopup = g_lightbox.$content,
		act_id = g_curr_activity.act_id,
		input = getAssessmentInput(),
		user_id = 0,
		assr_id = 0
	;

	if (g_curr_method != 'pst' && (!input || !getObjCount(input))){
		console.error('nothing to save');
		return;
	}
	switch (g_curr_role){
		
		case 'participant':
			user_id = g_user_id;
			break;
			
		case 'assessor':
			user_id = g_curr_part_id;
			assr_id = g_user_id;
			break;
	}
	call_svrop(
		{
			type: 'save_assessment',
			user_id: user_id,
			assr_id: assr_id,
			act_id: act_id,
			ass_id: g_curr_ass_id,
			role: g_curr_role,
			input: input,
			method: g_curr_method,
			assr_asst_marks: g_assr_asst_marks,
			submitted: bSubmit?1:0,
		},
		function (obj){
			console.debug('success', obj);
			
			closeProgress();
			notifyDialog('The assessment is ' + (!bSubmit?'saved':'submitted') + '.');
			
			closeLightBox();
						
			// POST SUBMISSION OPERATIONS
			var activity = g_curr_activity,
					assr_id = g_user_id,
					part_id = g_curr_part_id
			;
			switch (g_curr_role){
				
				case 'participant':
					////////////////////////////////////////////////////
					// write to the user
					////////////////////////////////////////////////////
					var uass = getUserAssessment(g_user, act_id, g_curr_ass_id);
					if (uass){
						// answer
						for (var item_id in input){
							// 1. update assr_item_marks
							var input_item = input[item_id],
								index = item_id - 1
							;
							if (!uass.items){
								uass.items = [];
							}
							if (!uass.items[index]){
								uass.items[index] = {};
							}
							uass.items[index].answer = input_item;
						}
						// status
						if (!bSubmit){
							uass.saved = obj.server_time;
						} else {
							uass.performed = obj.server_time;
						}
					}
					// performed 
					//if (activity.coordinator_id == g_user_id){
					//}
					// write performed to the activity?
					break;
					
				case 'assessor':
					/////////////////////////////////////////////////////////////////////////////
					// update activity in memory
					/////////////////////////////////////////////////////////////////////////////
					var	assessment = getAssessmentByAssID(activity, g_curr_ass_id),
						method = assessment.method
					;
					
					// 1. assr_asst_marks
					setMarksByID(assessment, 'assr_asst_marks', assr_id+','+part_id, obj.assr_asst_marks);
					
					// 2. part_asst_marks
					setMarksByID(assessment, 'part_asst_marks', part_id, obj.part_asst_marks);
					
					// 3. assr_asst_completed
					setCompletedByID(assessment, 'assr_asst_completed', assr_id, obj.assr_asst_completed);
					
					/////////////////////////////////////////////////////////////////////////////
					// update user profile in memory (if it is my user_id)
					/////////////////////////////////////////////////////////////////////////////
					if (part_id == g_user_id){
						var uass = getUserAssessment(g_user, act_id, g_curr_ass_id);
						if (uass){

							for (var item_id in input){

								if (!uass.items){
									uass.items = {};
								}
								if (!uass.items[index]){
									uass.items[index] = {};
								}
								if (!uass.items[index].assessors){
									uass.items[index].assessors = {};
								}

								// 1. update assr_item_marks
								var input_item = input[item_id],
									index = item_id - 1,
									part_item = uass.items[index],
									assessors = part_item.assessors,
									assessor = getUserByID(assessors, g_user_id)
								;
								if (method == 'prt'){

									assessor.selected = input_item;
									assessor.date = g_server_time;

								} else {

									assessor.assr_item_marks	= input_item.assr_item_marks;
									assessor.comments			= input_item.comments;
									assessor.date 				= input_item.date;

									// 2. update part_item_marks

									if (method == 'mcq'){
										
										part_item.part_item_marks = assessor.assr_item_marks;

									} else {
										
										var total_marks = 0, total_markers = 0;
										for (var assr_id in assessors){
											var assessor = assessors[assr_id];
											total_marks += parseInt(assessor.assr_item_marks+'');
											total_markers++;
										}										
										if (total_markers > 0){
											part_item.part_item_marks = parseInt(total_marks / total_markers);
										}
									}
								}
							}
						}
					}
					/////////////////////////////////////////////////////////////////////////////
					// update asst in memory
					/////////////////////////////////////////////////////////////////////////////
					// 1. assr_asst_marks
					if (g_curr_participant_jtr){
						g_curr_participant_jtr.find('td:nth-child(2)').text(obj.assr_asst_marks);	// g_assr_asst_marks
					}
					// 2. assr_asst_completed
					var completed = obj.assr_asst_completed;
					if (g_curr_inline_jtr){
						var jtr = g_curr_inline_jtr.prev();
						jtr.find('td:nth-child(3)').html(getCompleted(completed));
					}					
					// 3. refresh participant's view if exist
					var uact = getUact(act_id);
					if (uact.uact_participant == 1){
						var jtr = $('#tr_actpage_assessment_participant');
						viewAssessment_part1(jtr.find('.my_datatable'), activity.assessment.assessments, uact);
					}
					// 4. marked time
					if (bSubmit){
						var uass = getUserAssessment(g_user, act_id, g_curr_ass_id);
						if (uass){
							uass.marked = obj.server_time;
						}
					}
					break;
			}
		},
		function (obj){
			//console.error('saveactivity failed', obj);
		}
	);	
}

////////////////////////////////////////////////////////
function calcFinalMarks(){
	// calc final marks
	var jdiv3 = $('#div_lightbox');
	g_assr_asst_marks = getAssessmentMarks(jdiv3.find('.slider'));
	jdiv3.find('.asspage_marks').html(g_assr_asst_marks  + ' marks');
}

////////////////////////////////////////////////////////

function validateBeforeSubmit(){
	var bSuccess = 1;
	
	return bSuccess;
}