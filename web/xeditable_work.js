
/**
Work editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class work
@extends abstractinput
@final
@example
<a href="#" id="work" data-type="work" data-pk="1">awesome</a>
<script>
$(function(){
    $('#work').editable({
        url: '/post',
        title: 'Enter city, street and building #',
        value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
        }
    });
});
</script>
**/
(function ($) {
    "use strict";
    
    var Work = function (options) {
        this.init('work', options, Work.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Work, $.fn.editabletypes.abstractinput);

    $.extend(Work.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find('input');
        },
        
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/        
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
          */ 
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
      value2input: function(value) {
				if (!value) {
					return;
				}
				//console.debug(value);
				this.$input.filter('[name=company]').val(value.company);
				this.$input.filter('[name=title]').val(value.title);
				this.$input.filter('[name=location]').val(value.location);
				this.setMonthYear(this, 'startDateMonth', 'startDateYear', value.start);
				
				var til_now = this.$tpl.find('[name=til_now]')[0];
				if (value.end == sPresent){
					til_now.checked = 1;
					this.$tpl.find('.div_end_date').hide();
					this.$tpl.find('.div_present').show();
				} else {
					til_now.checked = 0;
					this.$tpl.find('.div_end_date').show();
					this.$tpl.find('.div_present').hide();
					this.setMonthYear(this, 'endDateMonth', 'endDateYear', value.end);
				}
				this.$tpl.find('.input_desc').html(value.desc);
      },       
       
			 /////////////////////////////////////////////////////////////////////////////
			 // get the selected month and year
			 setMonthYear: function(obj, month, year, value){
					if (value){
						var arr = value.split('-'), mval = parseInt(arr[1]), yval = parseInt(arr[0]);
						
						var jsel1 = obj.$tpl.find('[name='+month+']');
						jsel1.find("option[value=" + mval + "]").attr("selected", true);
						
						var jsel2 = obj.$tpl.find('[name='+year+']');
						jsel2.find("option[value=" + yval + "]").attr("selected", true);
			 	}
			 },

       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
				 return {
					company: 	this.$input.filter('[name=company]').val(), 
					title: 		this.$input.filter('[name=title]').val(), 
					location: this.$input.filter('[name=location]').val(),
					start: 		this.getMonthYear('startDateMonth', 'startDateYear'),
					end: 			this.$tpl.find('[name=til_now]').prop('checked') ? sPresent : this.getMonthYear('endDateMonth', 'endDateYear'),
					desc:			this.$tpl.find('.input_desc').html(),
				 };
       },        
       
			 /////////////////////////////////////////////////////////////////////////////
			 // get the selected month and year
			 getMonthYear: function(month, year){
					var
						sel1 = this.$tpl.find('[name='+month+']')[0],
						sel2 = this.$tpl.find('[name='+year+']')[0]
					;
					var str =
						sel2.options[sel2.selectedIndex].value + '-' +
						sel1.options[sel1.selectedIndex].value
					;
					//console.debug(str);
					return str;
			 },
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
            this.$input.filter('[name=company]').focus();
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
				 this.$input.keydown(function (e) {
						if (e.which === 13) {
							$(this).closest('form').submit();
						}
				 });
       },
			 
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
						//console.debug('value2html', value, element);
            if (!value) {
                $(element).empty();
                return; 
            }
						var jdiv = $('<div class="work_outer">')
									.append($('<div class="work_title">').html(value.title))
									.append($('<span class="work_company">').html(value.company))
						if (value.location){
							jdiv
									.append(',&nbsp;')
									.append($('<span class="work_location">').html(value.location))
							;
						}
						jdiv
							.append($('<div class="work_period">')
								.append($('<span>').html(this.getDateFormat(value.start)))
								.append(' - ')
								.append($('<span>').html(this.getDateFormat(value.end)))
							)
							.append(
								$('<div class="work_desc">')
									.append($('<span>').html(value.desc))
							);
						//console.debug(value.desc);
						$(element).html(jdiv);
        },
				
				////////////////////////////////////////////////
				// from yyyy-mm to mon-yyyy
				////////////////////////////////////////////////
				
				getDateFormat: function(value){
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
				
    });
		
		
		// edit interface

		
    Work.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: 
						'<div class="work_outer">' +
							'<div class="editable-work">Company*</div><div class="editable-work"><input type="text" name="company" autocomplete="off"></div>' +
							'<div class="editable-work">Title*</div><div class="editable-work"><input type="text" name="title" autocomplete="off"></div>' +
							'<div class="editable-work">Location</div><div class="editable-work"><input type="text" name="location" autocomplete="off"></div>' +
							'<div class="editable-work">Time Period*</div><div class="editable-work">' +
								'<table style="background-color:#e0e0e0"><tr>' +
									'<td>' +
										'<div class="div_start_date">' +
											'<select name="startDateMonth">' + monthopts + '</select>&nbsp;' +
											'<select name="startDateYear">' + yearopts + '</select>' +
										'</div>' +
									'</td>' +
									'<td style="padding: 4px; font-size: 16px;">-</td>' +
									'<td>' +
										'<div class="div_end_date">' +
											'<select name="endDateMonth">' + monthopts + '</select>&nbsp;' +
											'<select name="endDateYear">' + yearopts + '</select>' +
										'</div>' +
										'<div class="div_present" style="padding:6px 0px 6px 0px; display:none">' + sPresent + '</div>' +
									'</td>' +
								'</tr></table>' +
							'</div>' +
							'<div>'	+
								'<input style="width:200px" type="checkbox" name="til_now" data-labelauty="I don\'t work here now.|I work here currently."/>' +
							'</div>' +
							'<div class="editable-work">Description</div><div class="editable-work"><div contenteditable="true" class="input_desc contenteditable" autocomplete="off"></div>' + 
						'</div>',
        inputclass: '',
    });

    $.fn.editabletypes.work = Work;

}(window.jQuery));