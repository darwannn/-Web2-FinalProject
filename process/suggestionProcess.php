<?php

$xml = new domdocument();
$xml->load("../streamingApps.xml");


$streamingApps = $xml->getElementsByTagName("streamingApp");

$search = $_REQUEST["q"];
$suggestion = "";

foreach ($streamingApps as $streamingApp) {

    $filterAppName = $streamingApp->getElementsByTagName("appName")->item(0)->nodeValue;
    if (strtolower($search) == strtolower(substr($filterAppName, 0, strlen($search)))) {
        if ($suggestion == "") {
            $suggestion = "<div onclick='searchStreamingApp(`" . $filterAppName . "`); document.getElementById(`search`).value=`$filterAppName`' class='suggestion-result'>$filterAppName</div>";
        } else {
            $suggestion .= "<div onclick='searchStreamingApp(`" . $filterAppName . "`); document.getElementById(`search`).value=`$filterAppName`' class='suggestion-result'>$filterAppName</div>";
        }
    }
}

if ($suggestion == "") {
    echo "
    <div class='no-suggestion-result'>No results found.</div>
    ";
} else {

    echo $suggestion;
}
