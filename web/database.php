<?php

$dbdebug = 0;
$dberr = "";

//////////////////////////////////////////////////////////////////////////////////////////////////////

function checkDatabase($manager, $database){
	global $dbdebug, $dberr;
	$dberr = 0;
	
	$listdatabases = new MongoDB\Driver\Command(["listDatabases" => 1]);
	$result = $manager->executeCommand("admin", $listdatabases);
	//print_r($result);
	$databases = current($result->toArray())->databases;
	//print_r($databases[1]);
	$found = 0;
	foreach ($databases as $el){
		if ($el->name == $database){
			$found = 1;
			break;
		}
	}
	if (!$found){	
		$dberr = "Not such database: $database";
	} else if ($dbdebug){
		echo "<br/>database found<br/>";
	}
	return $dberr;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function checkCollection($manager, $database, $collection){
	global $dbdebug, $dberr;
	$dberr = 0;
	
	$listcollections = new MongoDB\Driver\Command(["listCollections" => 1]);
	$result = $manager->executeCommand($database, $listcollections);
	$collections = $result->toArray();
	//print_r($collections);
	$found = 0;
	foreach ($collections as $el){
		if ($el->name == $collection){
			$found = 1;
			break;
		}
	}
	if (!$found){	
		$dberr = "Not such collection: $collection";
	} else if ($dbdebug){
		echo "<br/>collection found<br/>";
	}
	return $dberr;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseRead($database, $collection, $filters){
	global $dbdebug, $dberr;
	$dberr = 0;
	
	$documents = 0;
	$manager = new MongoDB\Driver\Manager("mongodb://mongodb:27017");
	if (!checkDatabase($manager, $database) && !checkCollection($manager, $database, $collection)){
		//echo "databaseRead: $database, $collection";
		
		$query = new MongoDB\Driver\Query($filters, []);	// filter, options
		try {	
			//echo "<br/>executeQuery1<br/>";
			$result = $manager->executeQuery("$database.$collection", $query);
			//echo "<br/>executeQuery2<br/>";
		} catch (MongoDB\Driver\Exception\Exception $e) {
			$filename = basename(__FILE__);
			echo "The $filename script has experienced an error.\n"; 
			echo "It failed with the following exception:\n";
			echo "Exception:", $e->getMessage(), "\n";
			echo "In file:", $e->getFile(), "\n";
			echo "On line:", $e->getLine(), "\n";       
		}		
		$documents = $result->toArray();
	}
	//print_r($filters);
	//print_r($documents);
	return $documents;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseWrite($database, $collection, $bulk){
	global $dbdebug, $dberr;
	$dberr = 0;
	
	$manager = new MongoDB\Driver\Manager("mongodb://mongodb:27017");
	if (!checkDatabase($manager, $database) && !checkCollection($manager, $database, $collection))
	{
		$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
		try {	
			//echo "<br/>write1: $database.$collection<br/>";
			$result = $manager->executeBulkWrite("$database.$collection", $bulk, $writeConcern);
			//echo "<br/>write2<br/>";
			
		} catch (MongoDB\Driver\Exception\BulkWriteException $e){
			$result = $e->getWriteResult();
			// Check if the write concern could not be fulfilled
			if ($writeConcernError = $result->getWriteConcernError()){
				printf("%s (%d): %s\n",
					$writeConcernError->getMessage(),
					$writeConcernError->getCode(),
					var_export($writeConcernError->getInfo(), true)
				);
			}
			// Check if any write operations did not complete at all
			foreach ($result->getWriteErrors() as $writeError){
				printf("Operation#%d: %s (%d)\n",
					$writeError->getIndex(),
					$writeError->getMessage(),
					$writeError->getCode()
				);
			}
		} catch (MongoDB\Driver\Exception\Exception $e){
			printf("Other error: %s\n", $e->getMessage());
		}	
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseInsert($database, $collection, $document){
	global $dbdebug, $dberr;
	$bulk = new MongoDB\Driver\BulkWrite;
	$bulk->insert($document);
	$result = databaseWrite($database, $collection, $bulk);
	return $result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// if sets = ['$set' => $sets]; set operations
// otherwise a replacement document
//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseUpdate($database, $collection, $criteria, $update){//, $createIfNone){	
	//echo "$database.$collection";
	global $dbdebug, $dberr;
	$bulk = new MongoDB\Driver\BulkWrite;
	$opts = ['multi' => TRUE, 'upsert' => FALSE];
	$bulk->update($criteria, $update, $opts);
	$result = databaseWrite($database, $collection, $bulk);
	return $result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseDelete($database, $collection, $filters){
	//global $dbdebug, $dberr;
	//$bulk = new MongoDB\Driver\BulkWrite;
	//$opts = ['multi' => FALSE, 'upsert' => FALSE];
	//$bulk->update($filters, $sets, $opts);
	//$result = databaseWrite($database, $collection, $bulk);
	//return $result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function databaseInsertOrUpdate($database, $collection, $filters, $sets){
	global $dbdebug, $dberr;
	$result = 0;
	// read if the filters exists
	$documents = databaseRead($database, $collection, $filters);
	if ($dberr != ""){
		echo "dberr=$dberr";
	} else if (sizeof($documents) == 0){
		//echo 'insert';
		$sets2 = array_merge($filters, $sets);
		$result = databaseInsert($database, $collection, $sets2);
	} else {
		//echo 'update';
		$result = databaseUpdate($database, $collection, $filters, ['$set' => $sets]);
	}
	return $result;
}
?>