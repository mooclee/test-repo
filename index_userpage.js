var g_userpage_uploader = 0;
var g_curr_user = 0;

function openUserPage(user_id){
	console.debug('openUserPage', user_id);
	
	g_curr_tab = TAB_PROFILE;
	g_curr_user = 0;
	
	$('#div_topmenu').show();
	
	// hide
	$.featherlight.close();
	$('.tab_page').hide();
	
	// show
	$("#tabs").tabs("option", "active", TAB_PROFILE);
	$('#tab_profile, #div_user_page').show();
	
	// load user page
	call_svrop(
		{
			type: 'get_userdoc',
			user_id: user_id,
		},
		function (obj){
			///////////////////////////////////////////////////
			// LOADED USER
			///////////////////////////////////////////////////
			//console.debug('succeeded', obj);
			var jdiv = $('#div_user_page');
			jdiv.show();
			
			// user
			var user = obj.user;
			g_curr_user = user;
			
			// user stat
			var obj = getUserStat(user);
			user.participated = obj.participated;
			user.assessed = obj.assessed;
			user.coordinated = obj.coordinated;
			$('.stat_network3').text(user.network);
			$('.stat_participated3').text(user.participated);
			$('.stat_assessed3').text(user.assessed);
			$('.stat_coordinated3').text(user.coordinated);
			
			// topmenu search
			$('#inp_topmenu_search').val(user.username);			

			refreshUserPageSkills(user);
			drawSkillCanvas('cvs_skills_userpage', user.skills, 1);
			
			// PHOTO
			jdiv.find('.photo')
				.css('visibility', 'hidden')
				.load(function(){
					$(this).css('visibility', 'visible')
				})			
				.attr('src', getUserImgSrc(user.img_id))
			;
				
			for (var key in user){
				var value = user[key];
				//console.debug(key, value);
				var jobj = jdiv.find('.' + key);
				if (jobj.length){
					jobj.html(value);
				}
			}
			
			// SECTIONS
			var jsections = jdiv.find('.sections');
			jsections.empty();
			var	order = user.profile.order,
				s = '<table width="100%">'
			;
			//console.debug(order);
			for (var key in order){
				var
					section = order[key],
					title = title_arr[section][0]
				;
				if (section == 'activity'){
					continue;	// show in another way
				}
				
				//console.debug(section);
				if (user[section] || (user.profile[section] && user.profile[section].length)){
					s += '<tr><td>'
								+ '<table class="tbl_userpage"><tr><td class="userpage_title">' + title + '</td></tr>';
								
					switch (section){
					
						case 'media':
							s += '<tr><td>'
									+ '<div class="uploader_gallery">' +
									'</td></tr>'
							;
							break;

						case 'interest':
						case 'objectives':
							s += '<tr><td class="userpage_cell">'
									+ getBrText(user.profile[section])
								+ '</td></tr>'
							;
							break;
							
						case 'language':
							s += '<tr><td class="userpage_cell">'
									+ '<table class="language_outer">'
									+ '<thead><tr>'
							;
							['', 'Spoken', 'Written', 'Remarks'].forEach(function(element, index, array){
								s	+= '<td class="span_language_header" style="border-bottom: 1px solid #e0e0e0;">' + element + '</td>';
							});
							s += '</tr></thead><tbody>';
							var arr = user.profile[section];
							arr.forEach(function(element, index, array){
								s += '<tr>'
									+ '<td class="span_language language_language">' + element.language + '</td>'
									+ '<td class="span_language language_spoken">' + prof_arr[element.spoken] + '</td>'
									+ '<td class="span_language language_written">' + prof_arr[element.written] + '</td>'
									+ '<td class="span_language language_remarks">' + element.remarks + '</td>'
									+ '</tr>'
								;
							});
							s	+= '</td></tr></table>'
								+ '</td></tr>'
							;
							break;
							
						default:
							var arr = user.profile[section];
							s += '<tr><td class="userpage_cell">';
							arr.reverse().forEach(function(element, index, array){
								switch (section){
								
									case 'publication':
										s += '<div class="publication_outer">'
												+ '<div class="award_title">' + element.title + '</div> '
												+ '<span class="publication_publisher">' + element.publisher + '</span> '
												+ '<div class="publication_date">' + getDateFormat_work(element.date) + '</div> '
												+ '<div class="publication_desc">' + element.desc + '</div> '
											+ '</div>';
											if (index != arr.length - 1){
												s += '<br/>';
											}
										;
										break;
								
									case 'award':
										s += '<div class="award_outer">'
												+ '<div class="award_title">' + element.title + '</div> '
												+ '<span class="award_issuer">' + element.issuer + '</span> '
												+ '<div class="award_date">' + getDateFormat_award(element.date) + '</div> '
												+ '<div class="award_desc">' + element.desc + '</div> '
											+ '</div>';
											if (index != arr.length - 1){
												s += '<br/>';
											}
										;
										break;
								
									case 'education':
										s += ''
											+ '<div class="education_school">' + element.school + '</div>'
											+ '<div><span class="education_degree">' + element.degree + '</span> ' + getComma(element.degree, element.field)
											+ '<span class="education_field">' + element.field + '</span></div>'
											+ '<div class="education_period">' + element.start + ' - ' + element.end + '</div>'
											if (index != arr.length - 1){
												s += '<br/>';
											}
										;
										break;
										
									case 'work':
										s += ''
											+ '<div class="work_title">' + element.title + '</div>'
											+ '<div><span class="work_company">' + element.company + '</span>, '
											+ '<span class="work_location">' + element.location + '</span></div>'
											+ '<div class="work_period">' + getDateFormat_work(element.start) + ' - ' + getDateFormat_work(element.end) + '</div>'
											if (index != arr.length - 1){
												s += '<br/>';
											}
										;
										break;
										
								}
							});
							s	+= '</td></tr>'
							;
							break
					}
					s += '</table>';
							+ '</td></tr>';
					//console.debug(user.profile[section]);
				}
			}
			s += '</table>';
			jsections.html(s);
			
			/////////////////////////////////////////////////////////////
			// POST OPERATION
			/////////////////////////////////////////////////////////////
			
			// MEDIA
			if (user.profile.media && user.profile.media.length > 0){
				call_svrop(
					{
						type: 'get_media',
						media_id_arr: user.profile.media,
					},
					function (obj){
						//console.debug('succeeded', obj);
						var media_arr = obj.media_arr;
						var jbody = $('body');
						var jgallery = jsections.find('.uploader_gallery');
						if (!g_userpage_uploader){
							var opts = {
								gallery: jgallery,
								media_arr: media_arr,
								trash: 0,
							};
							jbody.uploader(opts);
							g_userpage_uploader = 1;
						} else {
							jbody.uploader('loadGallery', media_arr, jgallery);
						}
					},
					function (obj){
						console.error('failed', obj);
					}
				);	
			}
			
			// ACTIVITIES
			//$('.tbl_user_act').hide();
			jdiv.find('.div_userpage_act').empty();
			var
				 joclx = jdiv.find('.div_userpage_oclx'),
				 jyolox = jdiv.find('.div_userpage_yolox')
			;
			var activities = user.profile.activity;
			if (activities.length){
				// add the first ul

				for (var i = 0; i < activities.length; i++){
					var
						act = activities[i],
						act_id = act.act_id;
					;
					//console.debug(act, act_id);
					
					// ACTIVITY DETAILS
					var s =
						'<li><table class="tbl_userpage_uact" onclick="openActPage(' + act_id + ')">' +
							'<tr>' +
								'<td class="uact_image"><img src="' + getImgUrl(act.img_id, 'activity') + '"/></td>' +
								'<td valign="middle"><div class="uact_title">' + act.title + '</div></td>' +
							'</tr>' +
							'<tr>' +
								'<td colspan="2"><div class="uact_desc">' + (act.desc?act.desc:'') + '</div></td>' +
							'</tr>'
					;
					// ADD ASSESSORS
					if (act.assessors && act.assessors.length){
						s += '<tr>' +
										'<td>' +
											'<table class="tbl_uact_assessors">' +
												'<tr class="tr_uact_assessors" assessors="' + (act.assessors.join(',')) + '"></tr>' +
											'</table>' +
										'</td>' +
									'</tr>'
						;
					}
					s += '</table></li>';
					switch (act.act_type){
						
						case 'OCL-X':
							if (!joclx.find('ul').length){
								joclx.append('<ul class="bxslider"/>');
							}
							joclx.find('ul').append(s);
							break;
							
						case 'YOLO-X':
							if (!jyolox.find('ul').length){
								jyolox.append('<ul class="bxslider"/>');
							}
							jyolox.find('ul').append(s);
							break;
					}
				}
				
				// add ellipsis
				jdiv.find('.uact_title').dotdotdot();
				jdiv.find('.uact_desc').dotdotdot();

				// http://bxslider.com/options
				if (g_platform != 'ios' && g_platform != 'android'){
					
					jdiv.find('.bxslider').bxSlider({
						auto: true,
						pause: 4000,
						mode: 'fade',
						video: true,
						//captions: true
						//pager: false,
						controls: false,
					});
					
				}
				
				// add assessors
				jdiv.find('.tr_uact_assessors').each(function(){
					var jtr = $(this);
					var assessors = jtr.attr('assessors').split(',');
					// check with server
					if (assessors.length){
						call_svrop(
							{
								type: 'check_users',
								users: assessors,
							},
							function (obj){
								//console.debug('check_users', obj.users);
								var assessors = obj.users,
									max_assessors = 3
								;
								for (var j = 0; j < assessors.length && j < max_assessors; j++){
									var assessor = assessors[j];
									jtr.append('<td><table class="tbl_assessor" user_id="' + assessor.user_id + '"><tr><td><img src="' + getImgUrl(assessor.img_id, 'user') + '"></td></tr><tr><td><div class="uact_assessor_username">' + assessor.username + '</div></td></tr></table></td>');
									 jtr.find('.tbl_assessor').click(function(e){
											var user_id = $(this).attr('user_id');
											openUserPage(user_id);
											e.stopPropagation();
									 });
								}
								if (assessors.length > max_assessors){
									var jtd = $('<td class="td_openlist"><span class="glyphicon glyphicon-chevron-right"></span></td>');
									jtr.append(jtd);
									jtd.click(function(e){
										var jtr2 = $(this).closest('.tr_uact_assessors');
										console.debug('popup', jtr2.attr('assessors'));
										var jdiv = $('<div/>');
										createUserList(jdiv, assessors, 'Assessors');
										$.featherlight(jdiv, {});
										e.stopPropagation();
									});
								}
						
							}
						)
					}
				});
			}
			if (!joclx.find('ul').length){
				joclx.append('<div class="div_userpage_empty">No any OCL-X activities</div>');
			}
			if (!jyolox.find('ul').length){
				jyolox.append('<div class="div_userpage_empty">No any YOLO-X activities</div>');
			}
		},
		function (obj){
			console.error('failed', obj);
		}
	);
}

/////////////////////////////////////////////////////////////////////////////////////////

function getDateFormat_work(value){
	if (value == sPresent){
		return sPresent;
	} else if (value){
		var arr = value.split('-'), mval = parseInt(arr[1]) - 1, year = arr[0];
		var month = month_arr[mval];
		return month + ' ' + year;
	} else {
		return '';
	}
}

/////////////////////////////////////////////////////////////////////////////////////////

function getDateFormat_award(value){
	var arr = value.split('-'), mval = parseInt(arr[1]) - 1, year = arr[0];
	var month = month_arr[mval];
	return month + ' ' + year;
}

/////////////////////////////////////////////////////////////////////////////////////////

function getComma(a, b){
	if (a != '' && b != ''){
		return ',&nbsp;';
	} else {
		return '';
	}
}