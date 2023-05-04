<?php
$xml = new domdocument("1.0");
$xml->load("../streamingApps.xml");
$streamingApps = $xml->getElementsByTagName("streamingApp");

$toDelete = $_REQUEST["d"];

foreach ($streamingApps as $streamingApp) {
	$appName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;

	if ($toDelete == $appName) {
		$xml->getElementsByTagName("streamingApps")->item(0)->removeChild($streamingApp);
		$xml->save("../streamingApps.xml");

		echo "Record Deleted";

		break;
	}
}
