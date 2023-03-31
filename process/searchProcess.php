<?php

$xml = new domdocument();
$xml->load("../streamingApps.xml");

$streamingApps = $xml->getElementsByTagName("streamingApp");

$search = $_REQUEST["q"];
$output = "";
/* $suggestion = ""; */

$typeOfContentsBadges = array();
$platformsBadges = array();

foreach ($streamingApps as $streamingApp) {

	$filterAppName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;
    if (strtolower($search) == strtolower(substr($filterAppName, 0, strlen($search)))) {
      
		$appName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;
		$basePlan = $streamingApp->getElementsByTagName("basePlan")->item(0)->nodeValue;
		$launchDate = $streamingApp->getElementsByTagName("launchDate")->item(0)->nodeValue;
		$platforms = $streamingApp->getElementsByTagName("platforms")->item(0)->nodeValue;
		$typeOfContents = $streamingApp->getElementsByTagName("typeOfContents")->item(0)->nodeValue;
		$picture = $streamingApp->getElementsByTagName("picture")->item(0)->nodeValue;

		$platformsBadges = explode(", ", $platforms);
		$typeOfContentsBadges = explode(", ", $typeOfContents);

		if ($output == "") {
			$output="
			<div class='streamingApp'>
			<img src='data:image;base64,".$picture."' height='200px' width='200px'>
				<div class='appName'>$appName</div>
				<div class='basePlan'>PHP ".number_format($basePlan, 2, '.', ',')." / month</div>
				<div class='launchDate'>$launchDate</div>";
				/* <div class='platforms'>$platforms</div> */
	
				$output.="
				<div class='platformsBadge'>
				";
				foreach ($platformsBadges as $platformsBadge) {
					$output.="<div class='badge$platformsBadge'>$platformsBadge</div>";
				}
				$output.="
				</div>
				";
	
				$output.="
				<div class='typeOfContentsBadge'>
				";
				foreach ($typeOfContentsBadges as $typeOfContentsBadge) {
					$output.="<div class='badge$typeOfContentsBadge'>$typeOfContentsBadge</div>";
				}
				$output.="
				</div>
				";
			/* <div class='typeOfContents'>$typeOfContents</div> */
			$output.="<button onclick='deleteStreamingApp(`".$appName."`)'><i class='fa-solid fa-trash'></i></button>
				<button onclick='getToEditStreamingApp(`".$appName."`); document.getElementById(`modalButton`).disabled = false;'><i class='fa-solid fa-pen-to-square'></i></button>
			</div>
				";
        } else {
			$output.="
		<div class='streamingApp'>
		<img src='data:image;base64,".$picture."' height='200px' width='200px'>
			<div class='appName'>$appName</div>
			<div class='basePlan'>PHP ".number_format($basePlan, 2, '.', ',')." / month</div>
			<div class='launchDate'>$launchDate</div>";
			/* <div class='platforms'>$platforms</div> */

			$output.="
			<div class='platformsBadge'>
			";
			foreach ($platformsBadges as $platformsBadge) {
				$output.="<div class='badge$platformsBadge'>$platformsBadge</div>";
			}
			$output.="
			</div>
			";

			$output.="
			<div class='typeOfContentsBadge'>
			";
			foreach ($typeOfContentsBadges as $typeOfContentsBadge) {
				$output.="<div class='badge$typeOfContentsBadge'>$typeOfContentsBadge</div>";
			}
			$output.="
			</div>
			";
		/* <div class='typeOfContents'>$typeOfContents</div> */
		$output.="<button onclick='deleteStreamingApp(`".$appName."`)'><i class='fa-solid fa-trash'></i></button>
			<button onclick='getToEditStreamingApp(`".$appName."`); document.getElementById(`modalButton`).disabled = false;'><i class='fa-solid fa-pen-to-square'></i></button>
		</div>
			";
		 }
			/* if ($suggestion == "") {
				$suggestion = "<div onclick='searchStreamingApp(`".$filterAppName."`); document.getElementById(`search`).value=`$filterAppName`'>$filterAppName</div>";
			} else {
				$suggestion .= "<br><div onclick='searchStreamingApp(`".$filterAppName."`); document.getElementById(`search`).value=`$filterAppName`'>$filterAppName</div>";
			} */
    }
}

if ($output == "") {
	echo "No record found...";
} else {
	/* echo $suggestion; */
    echo $output;
}
