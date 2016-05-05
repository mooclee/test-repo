///*
jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

/////////////////////////////////////////////////////////////////

function initAll(){
	
	// top buttons
	$('.svg_container').each(function(){
		var jobj = $(this),
			svg = jobj.attr('svg'),
			html = svg_obj[svg],
			jhtml = $(html);
		var svgfill = jobj.attr('svgfill'),
				svgsize = jobj.attr('svgsize')
		;
		jhtml
			.find('path,ellipse,circle,polygon')
			.attr('fill', svgfill ? svgfill : '#ffffff')
		;
		if (svgsize){
			jhtml.width(svgsize).height(svgsize)
		}
		jobj.prepend(jhtml);
		//console.debug(jobj.outerHTML());
	});
	
	// move balloon
	
	// tooltip
	$( document ).tooltip();

	// tabs
	$('#tabs').tabs();
	
	// profile blocks
	$('#profile_blocks').sortable({
		
		placeholder: 'ui-state-highlight',
		// http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
		helper: function(event, ui){
			var $clone =  $(ui).clone();
			$clone .css('position','absolute');
			return $clone.get(0);
		},		
	}).disableSelection();

	// resize
	//onSize();
	//$(window).resize(onSize);
			
	// start
	var starttab = 0;	// home
	var starttab = 1;	// profile
	var starttab = 2;	// network
	//var starttab = 3;	// ocla
	$("#tabs").tabs({active:starttab});
	
	setBalloonNumber('todolist', 3);
	setBalloonNumber('notice', 3);
	setBalloonNumber('msg', 2);
	
	$('#tbl_root').show();
}

//////////////////////////////////////////////////////////////////////

function onSize(){
 }

//////////////////////////////////////////////////////////////////////
 
 function setBalloonNumber(name, num){
	var jobj = $('#topmenu_'+name), jballoon = jobj.find('.balloon'), jtext = jobj.find('.balloon2');
	if (num){
		if (num > 99){
			num = 99;
		}
		var offset = jobj.offset(), x = offset.left, y = offset.top, w = jobj.width(), w1 = num.toString().lenth*10;
		jtext.text(num);
		jballoon.show();
	} else {
		jballoon.hide();
	}
 }
 //*/