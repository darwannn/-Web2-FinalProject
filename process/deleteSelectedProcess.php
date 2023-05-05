<?php
$xml = new DOMDocument("1.0");
$xml->load("../streamingApps.xml");

$streamingApps = $xml->getElementsByTagName("streamingApp");

$toDelete = $_REQUEST["d"];
$appNamesToDelete = explode(" ", $toDelete);

foreach ($appNamesToDelete as $appName) {
	foreach ($streamingApps as $streamingApp) {
		if ($appName == $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue) {
			$xml->getElementsByTagName("streamingApps")->item(0)->removeChild($streamingApp);
			$xml->save("../streamingApps.xml");
			break;
		}
	}
}

echo "Records Deleted";
