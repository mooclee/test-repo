//glyphicon glyphicon-edit
function initActivity(){
	console.debug('initActivity');
	initActivityEdit();
	initActivityList();
	
	// add to featherlight else cannot resume scrollbar
	$.featherlight.defaults.afterClose = function(){
		//closeLightBox();
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

function publishActivity(act_id){
	console.debug('publishing activity','act_id=' + act_id);
	confirmDialog('Are you sure you want to publish this activity now?', function(){
		call_svrop(
			{
				type: 'publish_activity',
				act_id: act_id,
			},
			function (obj){
				console.debug('publish_activity succeeded', 'act_id='+obj.act_id);
				///////////////////////////////////////////////////////////////////////////////////
				// MODIFY LOCAL DATA
				///////////////////////////////////////////////////////////////////////////////////
				publishActivityToUser(obj.user_uact);
				
				// UPDATE PROFILE PAGE (FOR THIS ACTIVITY)
				updateMyInfoProfile('activity');
				
				// CLOSE PAGE AND RETURN TO SEARCH
				openActivityList();
				
				// MY USER STAT
				updateMyUserStat();
				
				// send invitation to the unregistered
				sendEmail_invitation();
				
				// send notification to the registered
				sendNotification();
			},
			function (obj){
				console.error('publish_activity failed', obj);
			}
		);	
	});
}
