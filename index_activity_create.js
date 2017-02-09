/////////////////////////////////////////////////////////////////////////////////////////////////////

function createActivity(){
	
	console.debug('createActivity');
	g_curr_tab = TAB_ACTIVITY;
	g_curr_user = 0;
	cmenu();
	
	$('.tab_page').hide();	
	$("#tabs").tabs("option", "active", TAB_ACTIVITY);

	clearEditActivity();
	
	// SAVE BEFORE EDIT
	g_saved_activity = getEditActivity();
	
	// SHOW THE PAGE
	$('#tab_activity, #div_activity_edit').show();
}

///////////////////////////////////////////////////////////////////////////////////////////

function deleteActivity(act_id){
	console.debug('deleting activity','act_id=' + act_id);
	confirmDialog('Are you sure you want to delete this activity?', function(){
		call_svrop(
			{
				type: 'delete_activity',
				act_id: act_id,
			},
			function (obj){
				console.debug('delete_activity succeeded', 'act_id='+obj.act_id);
				///////////////////////////////////////////////////////////////////////////////////
				// MODIFY LOCAL DATA
				///////////////////////////////////////////////////////////////////////////////////
				// UPDATE ACTIVITY
				removeActivityFromUser(act_id);

				// UPDATE PROFILE PAGE (FOR THIS ACTIVITY)
				updateMyInfoProfile('activity');
							
				// CLOSE PAGE AND RETURN TO SEARCH
				openActivityList();
				
				// SHOW THE LIST AGAIN
				//createActivityList();
			},
			function (obj){
				//console.error('saveactivity failed', obj);
			}
		);	
	});
}
