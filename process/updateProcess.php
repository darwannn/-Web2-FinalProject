<?php
$xml = new domdocument("1.0");
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;
$xml->load("../streamingApps.xml");

$toEdit = $_REQUEST["appName"];

$basePlan = $_REQUEST["basePlan"];
$launchDate = $_REQUEST["launchDate"];
$platforms = $_REQUEST["platforms"];
$typeOfContents = $_REQUEST["typeOfContents"];
$editPicture = $_REQUEST["editPicture"];
$picture = $_FILES['picture']['tmp_name']; 
			
$streamingApps = $xml->getElementsByTagName("streamingApp");

foreach ($streamingApps as $streamingApp) {

	$appName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;

	if ($toEdit == $appName) {

		$newNode = $xml->createElement("streamingApp");
		
		$newAppName = $xml->createElement("appName", $appName);
		$newBasePlan = $xml->createElement("basePlan", $basePlan);
		$newLaunchDate = $xml->createElement("launchDate", $launchDate);
		$newPlatforms = $xml->createElement("platforms", $platforms);
		$newTypeOfContents = $xml->createElement("typeOfContents", $typeOfContents);

		/* 
		chineckeck kung may laman yung picture (input type file) pag wala kukunin niya yung editPicture(yung dati niyang picture)
		 */
		$newPicture = $xml->createElement("picture"); 
		if($picture != NULL ) {
		$cdata = $xml->createCDATASection(base64_encode(file_get_contents($picture)));
	} else {
		$cdata = $xml->createCDATASection($editPicture);
	
	}
	
	$newPicture->appendChild($cdata);
		$newNode->appendChild($newAppName);
		$newNode->appendChild($newBasePlan);
		$newNode->appendChild($newLaunchDate);
		$newNode->appendChild($newPlatforms);
		$newNode->appendChild($newTypeOfContents);
	
		
	$newNode->appendChild($newPicture);

		$oldNode = $streamingApp;

		$xml->getElementsByTagName("streamingApps")->item(0)->replaceChild($newNode, $oldNode);
		$xml->save("../streamingApps.xml");

		echo "
		Record Updated.
		";
		break;
	}
}
/* }
   
}
} */
