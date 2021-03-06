


function getColumnDefs_sur(jdiv, jtbl){
	// 1. GET COLUMNDEFS ARRAY
	var arr = [
		{ targets: [0,1,2], orderable: false,},
		{ targets: 2, width: slider_width},
	];
	return arr;
}

function getSurType(value){
	return '<select>'
					+ '<option value="0"' + getSurType2(0,value) + '>Yes / No</option>'
					+ '<option value="1"' + getSurType2(1,value) + '>Agreed / Disagreed</option>'
					+ '<option value="2"' + getSurType2(2,value) + '>1,2,3</option>'
					+ '<option value="3"' + getSurType2(3,value) + '>1,2,3,4,5</option>'
					+ '<option value="4"' + getSurType2(4,value) + '>Strongly agree / strongly disagree</option>'
					+ '<option value="5"' + getSurType2(5,value) + '>Frequency</option>'
					+ '<option value="6"' + getSurType2(6,value) + '>Open comments</option>'
				+ '</select>'
;
}

function getSurType2(a, b){
	return a == b ? ' selected' : '';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addAssItem_sur(jtbl, dt, ass_id, item){
	
	var sur_type = item && item.sur_type ? item.sur_type : 0

	// 1. ADD NEW ROW
	var arr = [ass_id, getOpenQuestionEditable(), getSurType(sur_type), g_percent_slider, 0, g_but_trash_ass];
	dt.row.add(arr).draw(false);
	
	// 2. READ DATA AND MODIFY THIS ROW
	var jtr = jtbl.find('>tbody>tr:nth-child(' + ass_id + ')');
	var weight = 0, question = '', min = '', max = '';
	if (item){
		question = item.question;
		weight = item.weight;
	}
	jtr.find('.editable[data-name=ref_question]').html(question).editable();
	return weight;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getAssItem_sur(jtds){
	var question = jtds.eq(1).find('.editable').editable('getValue', true);	// eq begins with 0
	var sur_type = jtds.eq(2).find('select').val();
	var weight = parseInt(jtds.eq(4).text());

	return {
		question: question,
		sur_type: sur_type,
		weight: weight,
	};
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function viewAssItem_sur(assessment, uass, stage, status, tbody, role, item_id){

	var
		ass_id = assessment.ass_id
		,index = parseInt(item_id) - 1
		,act_item = assessment.items ? assessment.items[index] : 0
		,uass_item = uass.items ? uass.items[index] : 0
		,s = ''
	;
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// QUESTIONS
	///////////////////////////////////////////////////////////////////////////////////////////////
	var q = act_item.question;
/*	
	if (act_item.min && act_item.max){
		q += ' (' + act_item.min + ' - ' + act_item.max + ' words, ' + act_item.weight + '%)';
	} else if (act_item.min){
		q += ' (minimum ' + act_item.min + ' words, ' + act_item.weight + '%)';
	} else if (act_item.max){
		q += ' (maximum ' + act_item.max + ' words, ' + act_item.weight + '%)';
	} else {
		q += ' (' + act_item.weight + '%)';
	}
*/	
		q += ' (' + act_item.weight + '%)';
	s += '<tr>'
				+ '<td><div class="asspage_itemnum">' + item_id + '</div></td>'
				+ '<td class="asspage_question" data-min="' + act_item.min + '" data-max="' + act_item.max + '">' + q + '</td>'
			'</tr>'
	;
	var perform_editable = 0, mark_editable = 0;
	switch (role){
	
		//case 'coordinator':	break;
		case 'participant':
			if (stage >= TIMESTAGE_OPENING && stage < TIMESTAGE_CLOSED && !uass.marked){		
				perform_editable = 1;
			}
			break;
		
		case 'assessor':
			if (uass.performed && stage >= TIMESTAGE_OPENING && stage < TIMESTAGE_CLOSED){
				mark_editable = 1;
			}
			break;
			
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// ANSWERS
	///////////////////////////////////////////////////////////////////////////////////////////////
	var
		marked = '', commented = '', av_marks = 0, marked2 = 0,
		answer = uass_item && uass_item.answer ? uass_item.answer : ''
	;
	if (role == 'participant' && stage < TIMESTAGE_OPENING){
		// not editable now
	} else if (role == 'assessor' && !uass.performed){
		// skip showing the answer to assessor before submission
	} else {
		s += '<tr>'
					+ '<td>&nbsp;</td>'
					+ '<td><div data-item-id="' + item_id + '" class="asspage_open_answer"' + (perform_editable?' contenteditable="true"':'') + '>' + answer + '</div></td>'
				+ '</tr>'
		;
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	// MARKINGS AND COMMENTS
	///////////////////////////////////////////////////////////////////////////////////////////////
	switch (role){

		case 'coordinator':
		case 'participant':
		
			if (stage >= TIMESTAGE_OPENING && uass.marked && uass_item && uass_item.assessors){
				
				var
					part_item_marks = getMarksByID(uass_item, 'part_item_marks'),
					assessors = uass_item.assessors,
					num_of_assessors = getObjCount(assessors)
				;
				s += '<tr>'
							+ '<td>&nbsp;</td>'
							+ '<td>'
								+ '<table width="100%" cellspacing="0" cellpadding="0" class="tbl_asspage_marking">'
									+ '<tr>'
										+ '<td colspan="3">'
											+ '<span class="asspage_marks1">' + part_item_marks + ' marks</span>'
											+ '<span class="asspage_marks_expand"><button><i class="glyphicon glyphicon-plus"></i></button></span>'
										+ '</td>'
									+ '</tr>'
				;
				// SHOW ALL THE ASSESSORS MARKS AND COMMENTS
				s += '<tr style="display:none">'
						+ '<td colspan="3">'
							+ '<div class="div_asspage_marking">'
								+ '<table width="100%" class="tbl_ass_marking" border="0">'
				;
				
				s += 	'<tbody>';
				
				for (var assr_id in assessors){
					var
						 assessor = assessors[assr_id],
						 imgusername = getImgUserName(assr_id, g_curr_assessment_assessors),
						 date = getDateWithoutTime(assessor.date),
						 assr_item_marks = getMarksByID(assessor, 'assr_item_marks')
					;
					s += '<tr>'
								+ '<td>'
									+ '<b>' + imgusername + '</b> (' + date + '): ' + assessor.comments + '<span class="asspage_marks2">(' + assr_item_marks + ' marks)</span>'
								+ '</td>'
							+ '</tr>'
					;
				}
				s += 				'</tbody>'
								+ '</table>'
							+ '</div>'
						+ '</td>'
					+ '</tr>'
				;
				s +=	'</table>'
					+ '</td>'
				+ '</tr>';
			}
			break;
	
		case 'assessor':
			if (uass.performed){

				var
					assr_id = g_user_id,
					assessor = getUserByID(uass_item.assessors, assr_id)
				;
				// if no assessor yet, create it for the first time
				if (!assessor){
					assessor = jsonclone(template_assessor);
					assessor.assr_item_marks = '-';
					assessor.comments = '';
					uass_item.assessors[g_user_id] = assessor;
				}
				var
					assr_item_marks = getMarksByID(assessor, 'assr_item_marks'),
					comments = assessor.comments ? assessor.comments : ''
				;
				if (!assr_item_marks || assr_item_marks == '-') assr_item_marks = 0;
				
				s += '<tr>'
							+ '<td>&nbsp;</td>'
							+ '<td>'
								+ '<table width="100%" cellspacing="0" cellpadding="0" class="tbl_asspage_marking" data-item-id="' + item_id + '">'
								
										+ '<tr>'
											+ '<td class="asspage_text_marks">Marks</td>'
											+ '<td class="asspage_slider">'
												+ '<div class="slider ' + (mark_editable?'':'slider_disabled') + '" marks="' + assr_item_marks + '" weight="' + act_item.weight + '">'
													+ '<div class="custom-handle ui-slider-handle"></div>'
												+ '</div>'
											+ '</td>'
										+ '</tr>'
										
										+ '<tr>'
											+ '<td class="asspage_text_comments">Comments</td>'
											+ '<td style="padding:0px">'
												+ '<div class="asspage_open_comments"' + (mark_editable ? ' contenteditable="true"' : '') + '>' + comments + '</div>'
											+ '</td>'
										+ '</tr>'
										
									+ '</table>'
								+ '</td>'
						+ '</tr>';
			}
			break;

	}
	
	// APPEND NOW
	var jobj = $(s);
	tbody.append(jobj);
	//console.debug(jobj);
	
	// POST INITIALIZATION
	switch (role){
	
		case 'assessor':
			break;
			
		case 'coordinator':
		case 'participant':
			// add expand marks breakdown and each assessors' comments
			//console.error($('.asspage_marks_expand').length, $('.asspage_marks_expand'));
			var expand = jobj.find('.asspage_marks_expand');
			expand.click(function(e){
				var
					jobj2 = $(this),
					jdiv = jobj2.closest('tbody').find('>tr:nth-child(2)').find('.div_asspage_marking'),
					jtr = jdiv.parent().parent()
				;
				//console.debug('click', jtr.css('display'));
				if (jtr.css('display') == 'none'){
					jobj2.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
					jtr.show();
					jdiv.hide().slideDown();
				} else {
					jobj2.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
					jdiv.slideUp("", function(){
						jtr.hide();
					});
				}
				e.stopPropagation();
			});
			break;
	}
}

//////////////////////////////////////////////////////////////////////////

function getQuestion_sur(assessment, act_item){
	console.debug('getQuestion_ref', act_item.question);
	var q = act_item.question;
	return '<span class="asspage_question">' + q + '</span>';
}

//////////////////////////////////////////////////////////////////////////
var sur_arr = [
	['Yes', 'No'],
	['Agree', 'Disagree'],
	['1', '2', '3'],
	['1', '2', '3', '4', '5'],
	['Strongly agreed', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'],
	['Always', 'Often', 'Sometimes', 'Occationally', 'Rarely', 'Never'],
	[],	// open comments

];
function getAnswer_sur(opts, item_id, act_item, uass, uass_item, role, stage){
	
	console.debug('getAnswer_sur', opts, item_id, act_item, uass, uass_item, role, stage);

	var answer = uass_item && uass_item.answer ? uass_item.answer : '';
	
	//opts.bEditAnswer
	
	//var perform_editable = 0;
	//if (role == 'participant' && stage >= TIMESTAGE_OPENING && stage < TIMESTAGE_CLOSED && !uass.marked){
	//	perform_editable = 1;
	//}
	//return '<div data-item-id="' + item_id + '" class="asspage_open_answer"' + (perform_editable?' contenteditable="true"':'') + '>' + answer + '</div>';
	var s = '';

	if (opts.bEditAnswer || opts.bViewAnswer){
		// show survey options
		var sur_type = act_item.sur_type;
		var options = sur_arr[sur_type];
		if (options.length){
			// construct select
			if (opts.bEditAnswer){
				s += '<select>';
			} else {
				s += '<select disabled>';
			}
			for (var i = 0; i < options.length; i++){
				s += '<option value="' + i + '"' + (answer==i?' selected':'') + '>' + options[i];
			}
			s += '</select>';
			
		} else {

			// construct open answer
			if (opts.bEditAnswer){
				s += '<div class="asspage_open_answer" contenteditable="true">' + answer + '</div>';
			} else {
				s += '<div class="asspage_open_answer">' + answer + '</div>';
				
			}
		}

	}

	return s;
}
