<?php
$xml = new domdocument("1.0");
$xml->load("../streamingApps.xml");
$typeOfContentsBadges = array();
$platformsBadges = array();
$streamingApps = $xml->getElementsByTagName("streamingApp");

foreach ($streamingApps as $streamingApp) {

	$appName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;
	$basePlan = $streamingApp->getElementsByTagName("basePlan")->item(0)->nodeValue;
	$launchDate = $streamingApp->getElementsByTagName("launchDate")->item(0)->nodeValue;
	$platforms = $streamingApp->getElementsByTagName("platforms")->item(0)->nodeValue;
	$typeOfContents = $streamingApp->getElementsByTagName("typeOfContents")->item(0)->nodeValue;
	$picture = $streamingApp->getElementsByTagName("picture")->item(0)->nodeValue;

	$platformsBadges = explode(", ", $platforms);
	$typeOfContentsBadges = explode(", ", $typeOfContents);
	/* 
number_format para magkaron ng .00 yung number tapos lahat ng thousands mag karoon ng comma
*/
	$output = "
	<img src='data:image;base64," . $picture . "' height='100px' width='100px'>
	<div class='streamingApp'>
			
		<div class='appName'>$appName</div>
			<div class='basePlan'>PHP " . number_format($basePlan, 2, '.', ',') . " / month</div>
			<div class='launchDate'>$launchDate</div>";

	/* 
nakahiwalay yung div para yung mga platforms nasa loob ng div na may class na platformsBadge
 */
	$output .= "
			<div class='platformsBadge'>Platforms:
			";
	foreach ($platformsBadges as $platformsBadge) {
		$output .= "<div class='platformsBadges badge$platformsBadge'>$platformsBadge</div>";
	}
	$output .= "
			</div>
			";

	$output .= "
			<div class='typeOfContentsBadge'>Type of Contents:
			";
	foreach ($typeOfContentsBadges as $typeOfContentsBadge) {
		$output .= "<div class='typeOfContentsBadges badge$typeOfContentsBadge'>$typeOfContentsBadge</div>";
	}
	$output .= "
			</div>
			";

	$output .= "<button class='btn btn-secondary' onclick='deleteStreamingApp(`" . $appName . "`)'><i class='fa-solid fa-trash'></i></button>
			<button class='btn btn-secondary' onclick='getToEditStreamingApp(`" . $appName . "`); document.getElementById(`modalButton`).disabled = false;'><i class='fa-solid fa-pen-to-square'></i></button>
		</div>
			";

	echo $output;
}
