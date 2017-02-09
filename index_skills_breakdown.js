//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE SKILLS OF ALL THE ACTIVITY ON THE PROFILE PAGE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getSkillsWithBreakdown_user(user){
	var
		skills_history = {},
		base_skills = user.skills
	;
	for (var skill_name in base_skills){
		
		// FORM A GROUP FOR THIS SKILL
		var obj = [];
		var base_skill = base_skills[skill_name];
		
		// FIND THIS SKILL IN ALL ACTIVITY
		var breakdowns = [];
		var activities = user.profile.activity;
		for (var index in activities){
			var	activity = activities[index];
			if (!activity.impression){
				console.error('wrong scheme');
				continue;
			}
			 for (var skill_name2 in activity.impression.skills){
				if (skill_name2 == skill_name){
					var skills2 = activity.impression.skills[skill_name];
					var assessors = skills2.assessors;
					for (var assr_id in assessors){
						var assessor = assessors[assr_id];
						breakdowns.push({
							assr_id:	assr_id,
							act_id:		activity.act_id,
							act_title: activity.title,
							score:		assessor.usr_assr_score,
							comments: assessor.comments,
						});
					}
					break;
				}
			}
		}
		skills_history[skill_name] = {
			show: base_skill.show,
			score: base_skill.usr_final_score,
			breakdowns: breakdowns,
		};
	}
	return skills_history;
}

///////////////////////////////////////////////////////////////////////////////
// my activitiy
function getSkillsWithBreakdown_act(activity){
	var skills_history = {}
	for (var skill_name in activity.impression.skills){
		var skill = activity.impression.skills[skill_name];
		var breakdowns = [];
		for (var assr_id in skill.assessors){
			var assessor = skill.assessors[assr_id];
			breakdowns.push({
				assr_id:	assr_id,
				act_id:		activity.act_id,
				act_title: activity.title,
				score:		assessor.usr_assr_score,
				comments: assessor.comments,
			});
		}
		skills_history[skill_name] = {
			show: 1,//skill.show,
			score: skill.usr_part_score,
			breakdowns: breakdowns,
		}
	}
	//console.debug('skills_history', skills_history);
	return skills_history;
}

///////////////////////////////////////////////////////////////////////////////

function createBreakdownList(breakdowns, info_users, num_of_assessors_shown){
	var s = '<table style="background-color:transparent" class="tbl_assessors">'
			+ '<tr>';
	var bMore = 0;
	for (var i in breakdowns){
		if (i <= num_of_assessors_shown - 1){
			var
				breakdown = breakdowns[i],
				assr_id = breakdown.assr_id,
				assessor = getUserByID(info_users, assr_id)
			;
			if (!assessor){
				console.error('missing user', assr_id);
			} else {
				s	+= '<td><img class="person_photo" img_id="' + assessor.img_id + '"/></td>';
			}
		} else {
			bMore = 1;
			break;
		}
	}
	if (bMore){
		s += '<td><a class="fa fa-chevron-right""></a></td>';
	} else {
		s += '<td style="width:10px">&nbsp;</td>';
	}
	s	+= '</tr></table>';
	return s;
}

/////////////////////////////////////////////////////////////////////////////////////

function createBreakdownList2(jtbl, skills, info_users){

	// UPDATE PHOTO
	jtbl.find('.person_photo').each(function(){
		var img_id = $(this).attr('img_id');
		if (img_id){
			updateImgPhoto($(this), img_id, 'user');
		}
	});			

	jtbl.find('.tbl_assessors').click(function(){
		var jtr = $(this).closest('table').closest('tr');
		var skill_name = jtr.find('>td:nth-child(' + (jtr.find('>td').length == 3 ? 1 : 2 ) + ')').text();
		createBreakdownList3(skills, info_users, skill_name)
	});
}

/////////////////////////////////////////////////////////////////////////////////////

function createBreakdownList3(skills, info_users, skill_name){
	//console.debug(name);
	var skill = getSkillByName(skills, skill_name);
	if (skill){
		
		// create div to be popped up
		var jdiv = $('<div/>');
		jdiv.empty();
		var s = 
			'<b style="font-size:18px">' + skill_name + '</b><br><br>' +
			'<table class="display nowrap dataTable no-footer dtr-inline collapsed tbl_skills_assessors" dt_type="skills_assessors" style="width:200px">'
					+ '<thead>'
						+ '<tr>'
							+ '<td>Assessor</td>'
							+ '<td>Activity</td>'
							+ '<td>Score</td>'
							+ '<td>Comments</td>'
						+ '</tr>'
					+ '</thead><tbody>'
		;
		// LOOP THRU ALL THE USERS
		for (var i in skill.breakdowns){
			var
				breakdown = skill.breakdowns[i],
				assr_id = breakdown.assr_id,
				act_id = breakdown.act_id,
				act_title = breakdown.act_title,
				imgusername = getImgUserName(assr_id, info_users),
				score = getStarRating(breakdown.score),
				comments = breakdown.comments
			;
			s += '<tr>'
					 + '<td>' + imgusername + '</td>'
					 + '<td onclick="openActPage(' + act_id + ')">' + act_title + '</td>'
					 + '<td>' + score + '</td>'
					 + '<td>' + comments + '</td>'
				 + '</tr>'
			;
		}
		s += '</tbody></table><br/>'
			+ '<div style="width:100%; text-align:center"><div class="btn_close btn btn-primary"><span>Close</span></div></div>'
		;
		jdiv.append(s);
		
		jdiv.find('.my_datatable').DataTable({
			//responsive: true,
			//ordering: false,	// otherwise, the list is difficult to trace
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
				{	targets: [ 3 ],	className: 'dt-center'}
			],
		});

		// RENDER THE STARS
		jdiv.find('.star_rating').starRating(g_star_opts);		
		
		// UPDATE PHOTO
		jdiv.find('.person_photo').each(function(){
			var img_id = $(this).attr('img_id');
			if (img_id){
				updateImgPhoto($(this), img_id, 'user');
			}
		});
		// ADD CLOSE BUTTON
		jdiv.find('.btn_close').click(function(){
			g_lightbox.close();
		});
		//$('body').html(jdiv);	return;
				
		return;
		
		// make it responsive
		g_lightbox = $.featherlight(jdiv, {
			afterOpen: function(){
				console.log('afterOpen');
			},			
		});
	}
}

////////////////////////////////////////////////////////////////////////////////////////////

function getAssessorsFromBreakdown(skills){
		// get assessors of the skill
	var assessors = {};
	for (var skill_name in skills){
		var	skill = skills[skill_name];
		for (var i in skill.breakdowns){
			var breakdown = skill.breakdowns[i];
			assessors[breakdown.assr_id] = 1;
		}
	}
	// convert it to array
	var assessors2 = [];
	for (var assr_id in assessors){
		assessors2.push(assr_id);
	}
	return assessors2;
}