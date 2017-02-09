
var g_star_opts = {
	
		readOnly: true,
    disableAfterRate: false,
		
    initialRating: 0,
		totalStars: 5,
		starSize: 14,
		strokeWidth: 3,
		strokeColor: 'black',		
		//starShape: 'straight',
		starShape: 'rounded',
		emptyColor: 'lightgray',
		hoverColor: 'salmon',
		activeColor: 'cornflowerblue',
		
		useGradient: true,
		starGradient: {
			start: '#99ccff',
			end: '#3399ff'
		},
    callback: function(currentRating, $el){
    },
    onHover: function(currentIndex, currentRating, $el){
		},
    onLeave: function(currentIndex, currentRating, $el){
    },
	}
;

/////////////////////////////////////////////////////////////////////////////////////////////////////

function viewImpression(activity, uact){

	if (!activity.impression || activity.impression.enabled == '0'){

		$('#tr_actpage_impression').hide();
	
	} else {

		$('#tr_actpage_impression').show();
		
		// load assessor information
		var
			act_panelists = activity.impression?activity.impression.panelists:0,
			uact_panelists = uact.impression?uact.impression.panelists:0,
			my_assessors = getMyAssessors(activity.coordinator_id, g_user_id, act_panelists, uact_panelists),
			my_assessees = getMyAssessees(activity.coordinator_id, g_user_id, activity.participants, act_panelists, uact_panelists)
		;
		console.debug('my_assessors', my_assessors, 'my_assessees', my_assessees);
		
		// ADD ASSESSORS TO THE TABLE
		var jtbl = $('#div_act_page .my_datatable[dt_type=actpage_impression_assessors]');
		actpage_addUsers(my_assessors, jtbl, 0, function(users){
		
			// SET AS GLOBAL
			g_curr_impression_assessors = users;

			var
				participants = activity.participants,
				iamcoordinator = activity.coordinator_id == g_user_id ? 1 : 0,
				//iamassessor = getUserByID(my_assessors, g_user_id) ? 1 : 0,
				iamassessor = my_assessees.length ? 1 : 0,
				iamparticipant = getUserByID(activity.participants?activity.participants:0, g_user_id) ? 1 : 0
			;
			
			var closed = isActClosed(g_curr_activity);
			
			// COORDINATOR
			var jtr = $('#tr_actpage_impression_coordinator');
			if (iamcoordinator){
				jtr.show();
				viewImpression_coor1(jtr.find('.my_datatable'), activity.impression.skills, participants);
			} else {
				jtr.hide();
			}
						
			// ASSESSOR
			var jtr = $('#tr_actpage_impression_assessor');
			if (iamassessor){
				jtr.show();
				viewImpression_assr1(jtr.find('.my_datatable'), activity.impression.skills, participants, closed);
			} else {
				jtr.hide();
			}
			
			// PARTICIPANTS
			var jtr = $('#tr_actpage_impression_participant');
			if (iamparticipant){
				jtr.show();
				var
					uact = getUact(activity.act_id)
					,skills = uact.impression ? uact.impression.skills : 0 
				;	// the same in activity, but more straightforward to collect all
				viewImpression_part1(jtr.find('.my_datatable'), skills);
			} else {
				jtr.hide();
			}
			jtbl.show();
		});
		
	}

}

