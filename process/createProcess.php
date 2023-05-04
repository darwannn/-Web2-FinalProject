<?php
$xml = new domdocument("1.0");
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;
$xml->load("../streamingApps.xml");

$appName = ucwords($_REQUEST["appName"]);
$basePlan = $_REQUEST["basePlan"];
$launchDate = $_REQUEST["launchDate"];
$platforms = $_REQUEST["platforms"];
$typeOfContents = $_REQUEST["typeOfContents"];
$picture = $_FILES['picture']['tmp_name'];

$streamingApp = $xml->createElement("streamingApp");

$newAppName = $xml->createElement("appName", $appName);
$newBasePlan = $xml->createElement("basePlan", $basePlan);
$newLaunchDate = $xml->createElement("launchDate", $launchDate);
$newPlatforms = $xml->createElement("platforms", $platforms);
$newTypeOfContents = $xml->createElement("typeOfContents", $typeOfContents);

$newPicture = $xml->createElement("picture");
$cdata = $xml->createCDATASection(base64_encode(file_get_contents($picture)));
$newPicture->appendChild($cdata);

$streamingApp->appendChild($newAppName);
$streamingApp->appendChild($newBasePlan);
$streamingApp->appendChild($newLaunchDate);
$streamingApp->appendChild($newPlatforms);
$streamingApp->appendChild($newTypeOfContents);

$streamingApp->appendChild($newPicture);

$xml->getElementsByTagName("streamingApps")->item(0)->appendchild($streamingApp);
$xml->save("../streamingApps.xml");

echo "Record Saved";
/* }
 */