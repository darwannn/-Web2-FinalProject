<?php
$xml = new domdocument("1.0");
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;
$xml->load("../streamingApps.xml");
$streamingApps = $xml->getElementsByTagName("streamingApp");
$flag = 0;
$appName = $_REQUEST["appName"];

foreach ($streamingApps as $streamingApp) {
	$filterAppName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;
	if (strtolower($filterAppName) == strtolower($appName)) {
		$flag = 1;
		echo $appName . " already exist.";
		break;
	}
}

if ($flag == 0) {
echo "unique";
}
?>