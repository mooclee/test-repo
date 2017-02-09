
var method_arr = {
		ref: 'Reflection',	// Reflective Piece
		mcq: 'MCQ',
		prt: 'Participation',
		abs: 'Report/Essay', // Dissertation/Essay/Reviews',
		lcn: 'Learning Contract',	// Learning contract
		sur: 'Survey',
		pst: 'Poster',

//	app: 'Application',// Report',
//	blg: 'Blog',
//	css: 'Case Study',
//	map: 'Concept Map',
//	jor: 'Journal', // Daily or Weekly Logbooks',
//	por: 'Porfolio',
//	prs: 'Presentation',
//	wik: 'Wikis',
};
///////////////////////////////////////////////////////////////////////////////////////////////////

function viewAssItem(opts, assessment, uass, stage, status, tbody, role, item_id){

	var marks = 0;	// output
	
	var
		ass_id = assessment.ass_id
		,method = assessment.method
		,index = parseInt(item_id) - 1
		,act_item = 0
		,s = ''

	;

	if (!uass.items){
		uass.items = [];
	}
	if (!uass.items[index]){
		uass.items[index] = {};
	}
	var uass_item = uass.items[index];
	if (method == 'pst'){
		var w = parseInt(100/uass.items.length);
		act_item = {
			media_id: uass_item.media_id,
			weight: w,
		}
	} else {
		act_item = assessment.items ? assessment.items[index] : 0
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	// ITEM NUM & QUESTION PART
	///////////////////////////////////////////////////////////////////////////////////////////////
	
	// embrace item qna with a table
	
	s += '<table class="tbl_ass_item"><tr><td>';
	
	if (opts.bViewQuestion){
		s += '<tr>' +
						'<td>' + 
							// ITEM NUM
							'<span class="asspage_itemnum">' + item_id + '</span>' +
						'</td>' + 
						'<td>' + 
							// QUESTION
							eval('getQuestion_' + method)(assessment, act_item) +
						'</td>'
					'</tr>'
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// ANSWER PART
	///////////////////////////////////////////////////////////////////////////////////////////////
	if (opts.bViewAnswer){
		s += '<tr>'
						+ '<td>&nbsp;</td>'
						+ '<td>'
							// ANSWER
							+ eval('getAnswer_' + method)(opts, item_id, act_item, uass, uass_item, role, stage)
						+ '</td>'
					+ '</tr>'
		;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// MARKINGS AND COMMENTS
	///////////////////////////////////////////////////////////////////////////////////////////////
	if (opts.bEditMarking)
	{
		
		/////////////////////////////////////////////////
		// case 1: editable markings
		/////////////////////////////////////////////////
		$('.asspage_marks').show();

		if (!uass_item.assessors){
			uass_item.assessors = {};
		}
		
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
		
		//var mark_editable = (uass.performed && stage >= TIMESTAGE_OPENING && stage < TIMESTAGE_CLOSED);
		var mark_editable = 1;
		s += '<tr>'
					+ '<td>&nbsp;</td>'
					+ '<td>'
						+ '<table width="100%" cellspacing="0" cellpadding="0" class="tbl_asspage_marking" data-item-id="' + item_id + '">';
							
		// add marking slider
		if (method == 'mcq'){
			if (act_item.correct == uass_item.answer && uass_item.answer != ''){
				assr_item_marks = parseInt(act_item.weight);
				marks += assr_item_marks;
			}
			s += '<tr style="display:none"><td class="assr_item_marks">' + assr_item_marks + '</td></tr>';
			
		} else {
			s += '<tr>'
				+ '<td class="asspage_text_marks">Marks</td>'
				+ '<td class="asspage_slider">'
					+ '<div class="slider ' + (mark_editable?'':'slider_disabled') + '" marks="' + assr_item_marks + '" weight="' + act_item.weight + '">'
						+ '<div class="custom-handle ui-slider-handle"></div>'
					+ '</div>'
				+ '</td>'
			+ '</tr>';
			marks = assr_item_marks * parseInt(act_item.weight) / 100;
		}

		// add marking comments
		s += '<tr>'
					+ '<td class="asspage_text_comments">Comments</td>'
					+ '<td style="padding:0px">'
						+ '<div class="asspage_open_comments"' + (mark_editable ? ' contenteditable="true"' : '') + '>' + comments + '</div>'
					+ '</td>'
			+ '</tr>'
					+ '</table>'
				+ '</td>'
			+ '</tr>'
		;
		
	} else if (opts.bViewMarking){
		
		/////////////////////////////////////////////////
		// case 2: view only markings
		/////////////////////////////////////////////////
		
		$('.asspage_marks').show();
		var
			part_item_marks = getMarksByID(uass_item, 'part_item_marks'),
			assessors = uass_item.assessors,
			num_of_assessors = getObjCount(assessors)
		;		
		s += '<tr>'
					+ '<td>&nbsp;</td>'
					+ '<td>'
						+ '<table width="100%" cellspacing="0" cellpadding="0" class="tbl_asspage_marking">'

		;
		if (role != 'assessor'){
			
			s +=
									'<tr>'
									+ '<td>'			
											+	'<span class="asspage_marks1">' + part_item_marks + ' marks</span>'
											+ '<span class="asspage_marks_expand"><button><i class="glyphicon glyphicon-plus"></i></button></span>'
										+ '</td>'
									+ '</tr>'
									+ '<tr>'
										+ '<td>'
											+ '<div class="div_asspage_marking" style="display:none">'
												+ '<table width="100%" class="tbl_ass_marking" border="0">'

			;
		}

		var assr_marks = 0;
		for (var assr_id in assessors){
			
			if (role == 'assessor' && assr_id != g_user_id){

				continue;

			} else {
				
				var
					 assessor = assessors[assr_id],
					 imgusername = getImgUserName(assr_id, g_curr_assessment_assessors),
					 date = getDateWithoutTime(assessor.date),
					 assr_item_marks = 0
				;

				assr_item_marks = getMarksByID(assessor, 'assr_item_marks')

				if (role == 'assessor'){
					
					s += '<tr>'
								+ '<td>'
									+ '<span class="asspage_marks1">' + assr_item_marks + ' marks</span><br/><br/>' + assessor.comments + ' (' + assessor.date + ')'
								+ '</td>'
							+ '</tr>'
					;
					
				} else {
					
					s += '<tr>'
								+ '<td>'
									+ '<b>' + imgusername + '</b> (' + date + '): ' + assessor.comments + '<span class="asspage_marks2">(' + assr_item_marks + ' marks)</span>'
								+ '</td>'
							+ '</tr>'
					;
				}

				if (method == 'mcq'){
					marks = assr_item_marks;
				} else {
					marks = assr_item_marks * parseInt(act_item.weight) / 100;
				}
				
			}
		}
		if (role != 'assessor'){
			s += 		 '</table>'
						+ '</div>'
					+ '</td>'
				+ '</tr>'
			;
		}
		s +=	'</table>'
			+ '</td>'
		+ '</tr>';
	} else {
		/////////////////////////////////////////////////
		// case 3: no marks and comments
		/////////////////////////////////////////////////
		$('.asspage_marks').hide();
	}
	
	s += '</td></tr></table>';
	
	// APPEND NOW
	var jobj = $(s);
	tbody.append(jobj);
	//console.debug(jobj);
	
	// POST INITIALIZATION
	// add expand marks breakdown and each assessors' comments
	var expand = jobj.find('.asspage_marks_expand');
	if (expand.length){
		expand.click(function(e){
			var
				jobj2 = $(this),
				jdiv = jobj2.closest('tbody').find('>tr:nth-child(2)').find('.div_asspage_marking'),
				jtr = jdiv.parent().parent()
			;
			//console.debug('click', jtr.css('display'));
			if (jdiv.css('display') == 'none'){
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
	}
	

	return marks;
}
