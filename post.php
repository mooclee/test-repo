<?php
	include "common.php";
	/*
	Script for update record from X-editable.
	*/

	//delay (for debug only)
	//sleep(1); 

	/*
	You will get 'pk', 'name' and 'value' in $_POST array.
	*/
	$pk = isset($_POST['pk']) ? $_POST['pk'] : '';
	$name = isset($_POST['name']) ? $_POST['name'] : '';
	$value = isset($_POST['value']) ? $_POST['value'] : '';
	wlog('pk=' . $pk . ' name=' . $name . ' value=' . $value);
	/*
	 Check submitted value
	*/
	//if (!empty($value)) {
			/*
				If value is correct you process it (for example, save to db).
				In case of success your script should not return anything, standard HTTP response '200 OK' is enough.
				
				for example:
				$result = mysql_query('update users set '.mysql_escape_string($name).'="'.mysql_escape_string($value).'" where user_id = "'.mysql_escape_string($pk).'"');
			*/
			
			//here, for debug reason we just return dump of $_POST, you will see result in browser console
	//		print_r($_POST);

	//} else {
			/* 
			In case of incorrect value or error you should return HTTP status != 200. 
			Response body will be shown as error message in editable form.
			*/
			//header('HTTP/1.0 400 Bad Request', true, 400);
			//echo "This field is required!";
	//}
	print_r($_POST);
?>