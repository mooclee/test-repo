var
	g_but_view_act = '<button type="button" class="btn btn-primary btn-list-view" onclick="openActPage(getActIdFromRow(this))" data-toggle="tooltip" title="View"><i class="glyphicon glyphicon-eye-open"></i> View</button>',
		
	g_but_edit_act = '<button type="button" class="btn btn-primary btn-list-edit" onclick="editActivity(getActIdFromRow(this))" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i> Edit</button>',
	
	color_unpublished = '#CCFFFF', color_pending='#FFFFDD', color_opening='#FFDDFF', color_closed='#EEEEEE'
;
		
function initActivityList(){
	console.debug('initActivityList');
	$('#tbl_act_legend td:nth-child(2)').css('background-color', color_unpublished);
	$('#tbl_act_legend td:nth-child(3)').css('background-color', color_opening);
	$('#tbl_act_legend td:nth-child(4)').css('background-color', color_pending);
	$('#tbl_act_legend td:nth-child(5)').css('background-color', color_closed);
}

///////////////////////////////////////////////////////////////

function openActivityList(){
	console.debug('openActivityList');
	g_curr_tab = TAB_ACTIVITY;
	g_curr_user = 0;
	cmenu();
	
	if (g_platform == 'web'){
		$('#div_topmenu').show();
	} else {
		$('#div_topmenu').hide();
	}
		
	closeLightBox();
	$('#inp_topmenu_search').val('');
	$("#tabs").tabs("option", "active", TAB_ACTIVITY);
	$('.tab_page').hide();
	$('#tab_activity, #div_activity_list').show();
	
	g_saved_activity = 0;

	var jtbl = $('#dt_activity_list'), dt = jtbl.DataTable();

	// EMPTY THE ACTIVITY
	dt.clear().draw();
	
	// LOAD THE ACTIVITES
	var arr = g_user.profile.activity;
	for (var i = 0; i < arr.length; i++){
		var
			activity = arr[i],
			act_id = activity.act_id,
			timestage = getTimeStage(activity.start, activity.end),
			title = activity.title,		// + ' (' + activity.act_type + ')',
			act_type = activity.act_type,
			start = getDateWithoutTime(activity.start),
			end = getDateWithoutTime(activity.end),
			uact = getUact(act_id),
			uact_role = getHighestUactRole(uact),			// get only the most important one
			act_status = getActStatus(uact, 1),	// 1=include dt order comment
			action = activity.published ? 'View' : 'Edit',
			icon = activity.published ? 'eye-open' : 'edit'
		;
/*		
		var button = '<button type="button" class="btn btn-primary btn-list-' + action.toLowerCase() + '" onclick="openActPage(' + act_id + ')" data-toggle="tooltip" title="' + action + '"><i class="glyphicon glyphicon-' + icon + '"></i> ' + action + '</button>';
		var arr2 = [
			title
			,act_type
			,uact_role
			,act_status.desc
			,button
			//,g_but_trash_act
			,act_id
		];
*/		
		var status = act_status.desc,
				status1 = status.split('-->')[0] + '-->',
				status2 = status.split('-->')[1],
				onclick = ' onclick="openActPage(' + act_id + ')"';
				title2 = status1 + ' <span class="act_title" ' + onclick + '>' + title + ' <span class="act_title_details"">(' + act_type + ', ' + uact_role + ', ' + status2 + ')</span></span>',
				action2 = '<div class="div_but_right"><div' + onclick + ' data-toggle="tooltip" title="' + action + '"><i class="glyphicon glyphicon-chevron-right"></i></div></div>';
		;
		var arr2 = [
			title2
			,action2
			,act_id
		];
		//console.debug(arr2);
		dt.row.add(arr2)
	}

	// DESTROY FOR RESPONSIVE
	dt.destroy(false);
	
	// DRAW FOR RESPONSIVE
	var dt_opts = {
		bPaginate: false,	// show all the rows in one page
		//responsive: true,
		order: [[ 0, "asc" ]],
		dom: '',
		language:{
			emptyTable: '',
			zeroRecords: '',
		},
		autoWidth: false,
		columnDefs: [
			{ targets: '_all', orderable: false, },
			{	targets: -1,	visible: false,	searchable: false,},
			{	targets: 0,	type: 'string',	},
		],
	};	
	dt = jtbl.addClass('nowrap').DataTable(dt_opts);
	
	if (g_platform == 'android'){
		jtbl.addClass('android')
	}
	// alter the whitespace state
	openActivityList2(jtbl);
	
	// CLICK TO OPEN PAGE
	$('#dt_activity_list>tbody>tr>td:first-child').click(function(e){
		//openActivityList2(jtbl);
		e.stopPropagation();
		var
			row = dt.row(this),
			cols = row.data(),
			ncol = cols.length
			act_id = parseInt(cols[ncol-1])	// a hidden one		
		;
		openActPage(act_id);
	});
	
	//return;
/*	
	// FILL THE ROW BY THEIR STATUS
	jtbl.find('td:nth-child(1)').each(function(){
		var
			jtd = $(this),
			jtr = jtd.closest('tr')
		;
		var status = jtd.text().toLowerCase(), color = '';
		if (status.indexOf('unpublished') >= 0){
			color = color_unpublished;
		} else if (status.indexOf('to open') >= 0){
			color = color_pending;
		} else if (status.indexOf('to close') >= 0){
			color = color_opening;
		} else if (status.indexOf('closed') >= 0){
			color = color_closed;
		}
		jtr.find('td').css('background-color', color);
	});
	
	// ONCLICK ACTION
	jtbl.find('td:nth-child(2)')
		.click(function(){
			var jtr = $(this).closest('tr'),
					row = dt.row( jtr ),
					act_id = parseInt(row.data()[0]);
					jtd1 = jtr.find('td:nth-child(1)');
			;
			var status = jtd1.text().toLowerCase(), color = '';
			if (status.indexOf('unpublished') >= 0){
				editActivity(act_id);	// edit instead view for unpublished activity
			} else {
				openActPage(act_id);
			}
		});
	jtbl.find('[data-toggle=tooltip]').tooltip();
*/	
	// search bar
	$('#inp_search_activity').on( 'keyup', function (){
		dt.search( this.value ).draw();
	});	
}

////////////////////////////////////////////////////////////////////////////////////////

function openActivityList2(jtbl){
	jtbl.find('>tbody>tr>td:first-child').css('white-space', 'normal');
	//if (g_platform == 'android')
	{
		//jtbl.find('>tbody>tr>td:first-child:before').css('line-height', '10px');
		//jtbl.find('>tbody>tr>td:first-child:before').css('content', '-');
	}
}