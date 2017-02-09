// edit 

var 
		g_ref_limit = '<div data-name="ref_limit" data-mode="popup" data-type="limit" data-title="Word Limit" data-emptytext="N/A" data-showbuttons="bottom" data-placement="top" data-inputclass="editable_normal" class="editable_normal editable" show_trash="0" data-url=""></div>',
		
		g_but_edit_ass = '<button type="button" class="btn btn-sm btn_edit_ass" onclick="editAssessment(this)" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i> </button>'
		
;

var	g_saved_assessment_edit = 0,
	g_assessments = []
;

function getOpenQuestionEditable(){
	var data_type = (g_platform == 'ios' || g_platform == 'android') ? 'textarea' : 'wysihtml5';
	var style = (g_platform == 'ios' || g_platform == 'android') ? '' : ' style="width:390px" '; // min for all the html5 buttons
	var s = '<div ' + style + '><div data-name="ref_question" data-mode="inline" data-type="'+data_type+'" data-title="Enter the question" data-emptytext="(+ Question)" data-showbuttons="bottom" data-placement="bottom" data-inputclass="input_wysihtml5" class="editable_assessment_title editable" show_trash="0" data-url="" ></div></div>';
	return s;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function clearAssessment(){
	var selector = '.featherlight';
	var assessment = jsonclone(g_saved_assessment_edit ? g_saved_assessment_edit : template_assessment);
	var method = assessment.method;
	//var start = getDateString_start();
	//var end = getDateString_end();
	
	var start = g_curr_activity.start;
	var end = g_curr_activity.end;
	
	// clear data
	assessment.status = 'new';
	assessment.method = method;
	assessment.start = start;
	assessment.end = end;
	assessment.skills = [];
	assessment.panelists = jsonclone(template_panelists);
	assessment.items = [];
	// clear ui
	$(selector + ' .start_datetime').val(start);
	$(selector + ' .end_datetime').val(end);
	// clear table
	$(selector + ' table[dt_type='+method+']').DataTable().clear().draw();
	addAssessmentItem(method);
	// SET PANELISTS
	g_saved_assessment_edit = assessment;
	setPanelists(selector, [], assessment.panelists, function(){
		console.debug('cleared assessment');
		g_saved_assessment_edit = getEditAssessment();
	});
}


/////////////////////////////////////////////////////////////////////////////////////////////////

function getEditAssessment(ass_id, method, title, weight){
	//var selector = '#div_lightbox';
	//var selector = '.featherlight',
	var
			//selector = '#newwin_div',
			selector = '#div_lightbox',
			jdiv 			= $(selector),
			start 		= jdiv.find('.start_datetime').val(),
			end 			= jdiv.find('.end_datetime').val(),
			skills 		= getSkillsFromTbl(selector, 1),
			panelists = getPanelists(selector)
	;
	if (g_saved_assessment_edit){
		ass_id 		= g_saved_assessment_edit.ass_id;
		title 		= g_saved_assessment_edit.title;
		method 		= g_saved_assessment_edit.method;
		weight 		= g_saved_assessment_edit.weight;
	}
	var assessment = jsonclone(template_assessment);
	assessment.ass_id = ass_id;
	var jdesc = jdiv.find('.editable[data-name=assessment_desc]');
	assessment.desc = jdesc.editable('getValue', true);
	assessment.method = method;
	assessment.title = title;
	assessment.weight = weight;
	assessment.start = start;
	assessment.end = end;
	assessment.skills = skills;
	assessment.panelists = panelists;
	switch (method){
		case 'abs':
			// abs: no items, only desc
			//assessment.desc = getAssDesc_abs(selector);
			break;
			
		case 'prt':
			assessment.likert = parseInt(jdiv.find('.select_likert').val());
			break;
	}
	//if (method != 'abs')
	{
		assessment.items = getAssItems(selector)
	}
	//console.debug('getEditAssessment', assessment);
	return assessment;
}


/////////////////////////////////////////////////////////////////////////////////////////////////

function closeEditAssessment(){
	var assessment = getEditAssessment();
	console.debug('close assessment', assessment);

	//return;	// testing
	
	var index = parseInt(assessment.ass_id) - 1;
	g_assessments[index] = assessment;
	closeLightBox();
	g_saved_assessment_edit = 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// POST DATATABLE INITIALIATION
/////////////////////////////////////////////////////////////////////////////

function addAssessment(method, assessment){
	var jobj = 0;
	if (!method){
		jobj = $('.select_methods'),
		method = jobj.val(); 		//method = jobj.select2('val');
	}
	var method_name = method_arr[method]?method_arr[method]:'',
		bNewAssessment = 0,
		index = g_assessments.length,
		ass_id = index + 1,
		title = '',
		weight = 0
	;
	if (!assessment){
		/////////////////////////////////////////////////////////////////
		// NEW ASSESSMENT
		/////////////////////////////////////////////////////////////////
		bNewAssessment = 1;
		assessment = jsonclone(template_assessment);
		assessment.method = method;
		//assessment.start = getDateString_start();
		//assessment.end = getDateString_end();
		assessment.start = g_curr_activity.start;
		assessment.end = g_curr_activity.end;
		
	} else {
	
		/////////////////////////////////////////////////////////////////
		// OLD ASSESSMENT
		/////////////////////////////////////////////////////////////////
		title = assessment.title;
		//weight = parseInt(assessment.weight);
	}
	
	// SAVE TO LOCAL MEMORY
	assessment.ass_id = ass_id;
	g_assessments[index] = assessment;
	
	var jtbl = $('.my_datatable[dt_type=assessments]'),
			dt = jtbl.DataTable(),
			
			//button = '<button type="button" class="btn btn-sm btn-list-edit" onclick="editAssessment(this)" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i></button>',
			
			//arr = [ass_id, method,	method_name, g_editable_ass_title,	g_percent_slider,	weight,	g_but_edit_ass,	g_but_trash_ass]
			
			xtitle = '<div data-name="assessment_title" data-mode="inline" data-type="text" data-title="The title" data-emptytext="The title" data-showbuttons="bottom" data-placement="bottom" data-url="" data-inputclass="editable_assessment_title" class="editable_assessment_title editable" show_trash="0">' + title + '</div>',
			
			arr = [method_name, xtitle,	g_but_edit_ass, g_but_trash_ass, ass_id, method]
	;
	jtbl.show();
	dt
		.row
		.add(arr)
		.draw()
	;
	// POST-ADDITION OPERATIONS
	jtbl.find('.editable').editable();	
	initBasicLinked(jtbl);
	if (bNewAssessment){
	
		evenlyDistributeSliders(jtbl);
		
	} else {
	
		//var jtr = jtbl.find('>tbody>tr>td:nth-child(1):contains('+ass_id+')').closest('tr');
		// SET TITLE
		//jtr.find('>td:nth-child(3)>div').editable('setValue', title);
		// SET WEIGHT
		// http://keith-wood.name/linkedsliders.html
		// http://jqueryui.com/slider/
		// http://api.jqueryui.com/slider/
		//jtbl.find('.basicLinked').linkedSliders('destroy');
		//jtr.find('.basicLinked').slider("value", weight);
		//jtbl.find('.basicLinked').linkedSliders({policy: g_basicLinkPolicy});	// create sliders again		
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addAssessmentItem(method, item){
	var
		jtbl = $('#newwin_div table[dt_type=' + method + ']'),
		dt = jtbl.DataTable(),
		ass_id = dt.rows().count() + 1,
		weight = eval('addAssItem_' + method)(jtbl, dt, ass_id, item),
		jtr = jtbl.find('>tbody>tr:nth-child(' + ass_id + ')')
	;
	// tooltips
	if (g_platform != 'ios' && g_platform != 'android'){
		jtr.find('[data-toggle=tooltip]').tooltip(); 	// render bootstrap tooltip
	}
	// basicLinked
	if (jtbl.find('.basicLinked').length){
		initBasicLinked(jtbl);
		if (!item){
			evenlyDistributeSliders(jtbl);
		} else {
			jtbl.find('.basicLinked').linkedSliders('destroy');
			jtr.find('.basicLinked').slider("value", weight);
			jtbl.find('.basicLinked').linkedSliders({policy: g_basicLinkPolicy});	// create sliders again		
		}
	}
	return jtr;
}	


/////////////////////////////////////////////////////////////////////////////////////////////////
// get all the items from the item table
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function getItems(selector){
	var items = [];
	if (g_saved_assessment_edit){
		var method = g_saved_assessment_edit.method;
		var
			jdiv = $('.featherlight'),
			jtbl = jdiv.find('.tmp_datatable'),
			dt = jtbl.DataTable();
		;
		// LOOP FOR EVERY ROW
		jtbl.find('>tbody>tr').each(function(){
			var jtr = $(this);
			var jtds = jtr.find('>td'); 
			var item = 0;
			switch (method){
				
				case 'ref':
					var question = jtds.eq(1).find('.editable').editable('getValue', true);	// eq begins with 0
					var limit = jtds.eq(2).find('.editable').editable('getValue', true);
					if (isNaN(limit.min) || !limit.min){
						limit.min = '';
					} else {
						limit.min = parseInt(limit.min);
					}
					if (isNaN(limit.max) || !limit.max){
						limit.max = '';
					} else {
						limit.max = parseInt(limit.max);
					}					
					var weight = parseInt(jtds.eq(4).text());
					item = {
						question: question,
						min: limit.min,
						max: limit.max,
						weight: weight,
					};
					break;
					
				case 'mcq':
					var jtd1 = jtds.eq(1),
						question = jtd1.find('[data-name=mcq_question]').editable('getValue', true),
						choices = []
					;
					jtd1.find('[data-name=mcq_answer]').each(function(){
						var answer = $(this).editable('getValue', true);
						choices.push(answer);
					});
					var correct = jtd1.find("input[type=radio]:checked").val();
					var weight = parseInt(jtds.eq(3).text());
					item = {
						question: question,
						choices: choices,
						correct: correct,
						weight: weight
					};
					break;
					
				case 'prt':
					var
						item = jtds.eq(1).find('.editable').editable('getValue', true),	// eq begins with 0
						descs = []
					;
					var likert = parseInt(jdiv.find('.select_likert').val());
					for (var i = 0; i < likert; i++){
						var jobj = jtds.eq(2 + i).find('.editable');// skip num and item
						if (jobj.length){
							descs[i] = jobj.editable('getValue', true);
						}
					}
					var weight = parseInt(jtds.eq(jtds.length - 2).text());// last second
					item = {
						//likert: likert,
						item: item,
						descs: descs,
						weight: weight,
					};
					break;
			}
			if (item){
				//console.debug(item);
				items.push(item);
			}
		});
	}
	return items;
}
*/

function getAssItems(selector){
	var items = [];
	if (g_saved_assessment_edit){
		var method = g_saved_assessment_edit.method,
			jdiv = $(selector);

		var jtbl = jdiv.find('.tmp_datatable'),
			dt = jtbl.DataTable()
		;
		// LOOP FOR EVERY ROW
		jtbl.find('>tbody>tr').each(function(){
			var jtr = $(this);
			var jtds = jtr.find('>td'); 
			var item = eval('getAssItem_' + method)(jtds);
			if (item){
				items.push(item);
			}
		});
	}
	return items;
}


/////////////////////////////////////////////////////////////////////////////////////////

function editAssessment(obj){
	if (!obj) return;
	var jobj = $(obj),
			jtr = jobj.closest('tr'),
			jtbl = jobj.closest('table'),
			jtbl_id = jtbl.attr('id'),
			dt = jtbl.DataTable()
			row = dt.row( jtr ),
			cols = row.data(),
			ncol = cols.length,
			ass_id = parseInt(cols[ncol-2]),	// a hidden one
			method = cols[ncol-1],
			jdiv = jtr.find('>td:nth-child(2)>div'),
			title = jdiv.editable('getValue', true),
			weight = 0;
	;
	console.debug('editAssessment', ass_id, method);//, weight, title);//, jdiv)
	
	var index = ass_id - 1;
	if (g_assessments[index]){
		g_assessments[index].title = title;
		//g_assessments[index].weight = weight;
		var assessment = g_assessments[index];
		// CREATE ASSESSMENT DIALOG
		//open_newwin('index_newwin.php', jdiv, 'editAssessment2', assessment);
		editAssessment2(assessment);
		changeBodyView(2);
	} else {
		console.error('assessment not found', 'ass_id=' + ass_id);
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function editAssessment2(assessment){
	//$('body').css('overflow', 'hidden');	
	var
		//selector = '#newwin_div',
		selector = '#div_lightbox',
		jdiv = $(selector),
		ass_id = assessment.ass_id,
		method = assessment.method,
		weight = assessment.weight,
		index = parseInt(ass_id) - 1,
		title = assessment.title
	;
	
	jdiv.html($('#div_ass_edit_template').html());
	var html = $('#div_items_header_' + method).html();
	jdiv.find('.div_ass_items').html(html);
	jdiv.find('.tmp_assessment').html(ass_id);
	jdiv.find('.tmp_method').html(method_arr[method]);
	jdiv.find('.tmp_title').html(title);
	
	jdiv.find('.start_datetime').val(assessment.start);
	jdiv.find('.end_datetime').val(assessment.end);
	var jdesc = jdiv.find('.editable[data-name=assessment_desc]');
	//jdesc.editable();
	jdesc.editable('setValue', assessment.desc?assessment.desc:'');
	
	setDateTimePicker(jdiv);
	
	// SETUP PANELISTS
	setupPanelists(selector);
	
	//alert(1);
	setPanelists(jdiv, assessment.skills, assessment.panelists, function(){
		// SAVE WITH ITEMS AND USERS
		g_saved_assessment_edit = getEditAssessment(ass_id, method, title, weight);
	});
	
	// PLACEHOLDER
	setShortPlaceHolder(jdiv);	

	// SET EVENTS
	jdiv.find('.but_additem').click(function(){
		var method = $(this).closest('table').attr('ass_method');
		addAssessmentItem(method);
	});	
	jdiv.find('.btn_close').click(function(){
		closeEditAssessment();
	});
	jdiv.find('.btn_cancel').click(function(){
		if (!checkLoseInput('cancel all the input', function(){
			closeLightBox();
			g_saved_assessment_edit = 0;
		})){
			closeLightBox();			
			g_saved_assessment_edit = 0;
		}
	});
	jdiv.find('.btn_clear').click(function(){
		confirmDialog('Are you sure you want to clear all the input on the editing assessment?', function(){
			clearAssessment();
		});
	});
	jdiv.find('.btn_loadtmp').click(function(){
	});
	jdiv.find('.btn_savetmp').click(function(){
	});
	jdiv.find('.btn_delete').click(function(){
		deleteAssessment(ass_id);
	});	
	//////////////////////////////////////////////////////////////////////
	// ITEMS
	//////////////////////////////////////////////////////////////////////
	var jtbl = jdiv.find('.tmp_datatable');//, dt = 0;
	var dt = jtbl.DataTable();
	if (!assessment.items){
		assessment.items = [];
	}
	if (!assessment.likert){
		assessment.likert = 3;
	}
	// save without items
	g_saved_assessment_edit = assessment;	
	switch (method){
		case 'prt':
			var jselect = jdiv.find('.select_likert');
			jselect.val(assessment.likert);
			onChangeLikertScale(jselect[0]);
			break;
			
		//case 'abs':
		//	jdiv.find('.editor').html(assessment.desc);
		//	break;
	}		
	var items = assessment.items
	if (items){
		if (!items.length){
			
			// add the first item
			addAssessmentItem(method);

		} else {

			// add the old items
			for (var i = 0; i < items.length; i++){
				var item = items[i];
				addAssessmentItem(method, item);
			}
		}
		dt.destroy(false);

		// CREATE RESPONSIVE DATATABLE
		var arr = eval('getColumnDefs_' + method)(jdiv, jtbl),
			dt_opts = {
			//responsive: true,
			ordering: false,
			rowReorder: true,
			autoWidth: false,
			bPaginate: false,
			dom: '',
			language:{
				emptyTable: '',
				zeroRecords: '',
			},
			columnDefs: arr,		
		};
		jtbl.addClass('nowrap').DataTable(dt_opts);
	}
	
	/////////////////////////////////////////////////
	// post operations
	/////////////////////////////////////////////////
	if (method == 'prt'){
		onChangeLikertScale(jselect[0]);
	}
	$('#newwin_div textarea').autoGrow();
	
	// save with items
	g_saved_assessment_edit = getEditAssessment();		
}
