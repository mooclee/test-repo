var	title_arr = {
	// 0: display name
	activity: 		['Activities'],
	objectives: 	['Objectives'], //['Personal Statement and Objectives'],
	education: 		['Education'],
	work: 				['Work Experience'],
	publication: 	['Publications'],
	award: 				['Awards'],
	language:			['Languages'],
	interest: 		['Interests'],
	media:				['Photos and Videos'],
};
	
/////////////////////////////////////////////////////////////////////////////////////

var g_bHomeInited = 0;

function initHome(){
	g_bHomeInited = 1;
	
	updateUser();
	
	// tooltip
	// http://www.w3schools.com/bootstrap/bootstrap_ref_js_tooltip.asp
	$('[title]').each(function(){
		$(this).tooltip();
	});		
	
	// sharing:0,1,2
	$('.switch_share input[type=radio]').change(function(){
		var sharing = $(this).val();
		var act_id = $(this).parents('.switch_share').attr('act_id');	// in numberic
		console.debug('act_id='+act_id, 'sharing='+sharing);
		
		// REPORT TO SERVER (ADD DELAY TO CHANGE BUTTON COLOR FIRST)
		setTimeout(function(){
			call_svrop(
				{					
					type: 'activity_sharing',
					//email: g_user.email,
					user_id: g_user_id,
					act_id: act_id,
					sharing: sharing,
				},
				function (obj){
					console.debug(obj);
				},
				function (obj){
					console.error(obj);
				}
			)
		}, 10);
	});
}
///////////////////////////////////////////////////////////////////////
var g_curr_tab = -1;

function openHome(){
	console.debug('openHome');
	g_curr_tab = TAB_HOME;
	g_curr_user = 0;
	cmenu();
	
	$('#div_topmenu').show();
	
	$('.tab_page').hide();
	$('#inp_topmenu_search').val('');	
	$("#tabs").tabs("option", "active", TAB_HOME);
	$('#tab_home').show();
	
	//setTimeout(function(){
		var skills = getSkillsWithBreakdown_user(g_user);
		drawSkillCanvas('cvs_skills_home', skills, 1);
	//}, 500);
}

/////////////////////////////////////////////////////////////////////////////////////////////

function updateUser(){
	//console.debug(g_user);

	// SHOW MY SKILLS OF ALL THE ACTIVITY ON HOME PAGE
	refreshMySkills();

	// PROFILE BLOCK
	updateProfileBlock();

	// MY USER STAT
	updateMyUserStat();
}

/////////////////////////////////////////////////////////////////////////////////////////////

function updateMyInfo(){
	$('.myinfo_username').html(g_user.username);
	$('.myinfo_objectives').html(g_user.objectives);
	$('.myinfo_position').html(g_user.position);
	$('.myinfo_location').html(g_user.location);
	$('.editable[data-name=position]').attr('show_trash', 0).editable('setValue', g_user.position);
	$('.editable[data-name=location]').attr('show_trash', 0).editable('setValue', g_user.location);
}

/////////////////////////////////////////////////////////////////////////////////////////////

function hideTemporarily(){
	// HIDE NETWORK TEMPORARILY
	$('.stat_network1, .stat_network2, .stat_network3').closest('table').closest('tr').hide();
	$('#tbl_todolist').parent().hide();
	$('a[href="#tab_network"]').parent().hide();
	$('#topmenu_msg, #topmenu_notice, #topmenu_todolist, #topmenu_settings, #topmenu_lang').hide();	
}