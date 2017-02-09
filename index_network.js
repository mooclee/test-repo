function openNetwork(){

	console.debug('openNetwork');

	$('#div_topmenu').show();
	
	$('.tab_page').hide();
	$('#tab_network').show();
	$('#tbl_ntwk').show();
	
	// send to server
	call_svrop(
		{
			type:		'get_ntwk',
			user_id:	g_user_id,
		},
		function (obj){
			//console.debug('succeeded', obj.users);
			var
				users = obj.users,
				jdiv = $('#div_ntwk_users')
			;
			$('.userstat_data.network').text(users.length);
			createUserList(jdiv, users);
			
			// hide temporarily
			//$('.userstat_data.network').closest('table').closest('tr').hide();
		},
		function (obj){
			console.error('failed', obj);
		}
	);
}
