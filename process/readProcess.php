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
	$launchDate = date("F j, Y", strtotime($launchDate));
	$platforms = $streamingApp->getElementsByTagName("platforms")->item(0)->nodeValue;
	$typeOfContents = $streamingApp->getElementsByTagName("typeOfContents")->item(0)->nodeValue;
	$picture = $streamingApp->getElementsByTagName("picture")->item(0)->nodeValue;

	$platformsBadges = explode(", ", $platforms);
	$typeOfContentsBadges = explode(", ", $typeOfContents);
	/* 
number_format para magkaron ng .00 yung number tapos lahat ng thousands mag karoon ng comma
*/
	$output = "
	<div class='streamingAppWrapper anim'  data-delay='.5s'>
	<div class='streamingApp'>
		<div class='upper-content'>
		<div class = 'img-wrapper'><img src='data:image;base64," . $picture . "' height='100px' width='100px' onclick='openImage(this);'></div>
		<div class='appName'>$appName</div>";

	$output .= "
			<div class='typeOfContentsBadge'>
			";
	foreach ($typeOfContentsBadges as $typeOfContentsBadge) {
		$output .= "<div class='typeOfContentsBadges badge$typeOfContentsBadge'>$typeOfContentsBadge</div>";
	}
	$output .= "
			</div></div>
			";

	$output .= "
			<div class='main-content'>
			<div class='content-label'>Base Plan:</div>
			<div class='basePlan content-val'>" . ($basePlan == 0 ? "FREE" : "₱ " . number_format($basePlan, 2, '.', ',') . " / month") . "</div>
			<div class='content-label'>Launch Date:</div>
			<div class='launchDate content-val'>$launchDate</div>";



	/* 
nakahiwalay yung div para yung mga platforms nasa loob ng div na may class na platformsBadge
 */
	$output .= "
			<div class='platformsBadge '>
			";
	foreach ($platformsBadges as $platformsBadge) {
		$output .= "<div class='platformsBadges badge$platformsBadge'>$platformsBadge</div>";
	}
	$output .= "
			</div> </div> </div>
			";



	$output .= "<div class='action-wrapper'><button class='edit-btn' onclick='getToEditStreamingApp(`" . $appName . "`); document.getElementById(`modalButton`).disabled = false;'><i class='fa-solid fa-pen-to-square'></i></button>
	<button class='delete-btn' onclick='clickDelete(`" . $appName . "`)'><i class='fa-solid fa-trash'></i></button>
			
		</div></div>
			";

	echo $output;
}
