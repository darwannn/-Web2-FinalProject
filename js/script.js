var myModal = new bootstrap.Modal(document.getElementById("streamingAppModal"));
var appNames =[];
/* 
ididsplay lang yung streaming apps
*/
function readStreamingApp() {
	http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			document.getElementById("streamingAppList").innerHTML = http.responseText;
		} else {
			/* 
			yung das fa-spinner fa-spin ay galing sa fontawesome, loading icon lang siya na may spin animation, 
			para habang wala pang response napapakita na nagloloading pa yung server
			*/
			document.getElementById("streamingAppList").innerHTML = "<i class='fas fa-spinner fa-spin'></i>";
		}
	};
	http.open("GET", `process/readProcess.php`, true);
	http.send();
}

/* 
same function ang ginamit sa pagcreate at edit,
yung value lang ng modalButton yung magdedetermine kung yung ieexecute na php file ay createProcess o  updateProcess.
yung value ng modalButton nababago siya depende sa clinick ng user
*/
function createEditStreamingApps() {
	/* 
	yung formdata ay automatic niya nang kunukuha yung mga input fields sa loob ng form (modalForm), di na kailangang isaisahin pa
	*/
	var formData = new FormData(document.getElementById("modalForm"));
	http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			/* 
			ipapakita lang sa div na may id na message yung responseText 
			*/
			document.getElementById("message").innerHTML = http.responseText;
			/* 
			ipapakita lang sa toast yung responseText 
			 */
			createToast(http.responseText, "success");
			resetFields();
			/* tinawag to para automatic nang mashow yung data na kakacreate lang */
			readStreamingApp();
			myModal.hide();
		} else {
			document.getElementById("message").innerHTML = http.responseText;
		}

	};

	/* 
	POST ginamit kasi may image tayong i-uupload 
	*/
	if (document.getElementById("modalButton").value == "Add") {
		http.open("POST", "process/createProcess.php", true);

	} else {
		http.open("POST", "process/updateProcess.php", true);
	}
	http.send(formData);
}

/* 
irereset lang yung mga element sa default state (kamuka pag unang nag load yung website)
*/
function resetFields() {
	document.getElementById("message").innerHTML = "";
	document.getElementById("appNameMessage").value = "";
	document.getElementById("appName").value = "";
	document.getElementById("basePlan").value = "";
	document.getElementById("launchDate").value = "";
	document.getElementById("platforms").value = "";
	document.getElementById("typeOfContents").value = "";
	document.getElementById("picture").value = "";
	document.getElementById("otherContent").value = "";
	document.getElementById("editPicture").value = "";
	document.getElementById("pictureDisplay").src = "img/white.jpg";
	document.getElementById("pictureText").style.opacity  = "1";
	document.getElementById("otherContent").style.opacity = "0";
	document.getElementById("appName").readOnly = false;
	document.getElementById("appName").style.pointerEvents = "auto";
	/*
	dahil maraming checkbox sa index.php, gagamit ng  querySelectorAll para makuha lahat ng checkbox then
	mag iiterate isa-isa para ma uncheck sila
	*/
	var checkboxes = document.querySelectorAll("input[type=checkbox]");
	for (var checkbox of checkboxes) {
		checkbox.checked = false;
	}
}

function deleteStreamingApp(toDelete) {
	/* may lalabas lang na conficmation bago idelete yung selcted streaming apps */
	if (confirm(`Do you really want to delete ${toDelete}?`)) {
		http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				createToast(http.responseText, "success");
				readStreamingApp();
			}
		};
		http.open("GET", `process/deleteProcess.php?d=${toDelete}`, true);
		http.send();
	}
}


function searchStreamingApp(toSearch) {
	if (toSearch.length == 0) {
		/* 
		pag walang laman yung search input field i shoshow lang ulit lahat ng streamingApps, pag wala kasi nito
		ang mananatiling naka show sa screen ay yung nagmatch lang na steaming app na tinype (hindi babalik sa dati) 
		 */
		document.getElementById("suggestion").innerHTML = "";
		readStreamingApp();
	} else {
		http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				document.getElementById("streamingAppList").innerHTML = http.responseText;
			} else {
				document.getElementById("streamingAppList").innerHTML = "<i class='fas fa-spinner fa-spin'></i>";
			}
		};
		http.open("GET", `process/searchProcess.php?q=${toSearch}`, true);
		http.send();
	}
}

function suggestionStreamingApp(toSearch) {
	if (toSearch.length == 0) {
		document.getElementById("suggestion").innerHTML = "";
		readStreamingApp();
	} else {
		http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				document.getElementById("suggestion").innerHTML = http.responseText;
			} else {
				document.getElementById("suggestion").innerHTML = "<i class='fas fa-spinner fa-spin'></i>";
			}
		};
		http.open("GET", "process/suggestionProcess.php?q=" + toSearch, true);
		http.send();
	}
}


/* 
tinatawag itong function pag clinick yung edit button,
may parameter to na toGet (yung yung appname ng streaming app na i-eedit)
*/
function getToEditStreamingApp(toGet) {
	{
		http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				var otherTypeOfContent = [];
				var listedTypeOfContent = [];
				/* 
				kinuha dito yung buong laman ng XML file para hanapin yung toGeT(appname na gustong i-edit) at makuha yung ibang information nya
				gaya ng basePlan, launchDate etc...
				 */
				xmlDocument = http.responseXML;
				streamingApps = xmlDocument.getElementsByTagName("streamingApp");
				for (streamingApp of streamingApps) {
					var appName = streamingApp.childNodes[1].childNodes[0].nodeValue;
					if (appName.toLowerCase() == toGet.toLowerCase()) {
						resetFields();
						myModal.show();

						document.getElementById("appName").value = appName;
						document.getElementById("basePlan").value = streamingApp.childNodes[3].childNodes[0].nodeValue;
						document.getElementById("launchDate").value = streamingApp.childNodes[5].childNodes[0].nodeValue;
						document.getElementById("editPicture").value = streamingApp.childNodes[11].childNodes[0].nodeValue;
						document.getElementById("pictureDisplay").src = `data:image;base64,${streamingApp.childNodes[11].childNodes[0].nodeValue}`
						document.getElementById("pictureText").style.opacity  = "0";
						var platforms = streamingApp.childNodes[7].childNodes[0].nodeValue;
						var typeOfContents = streamingApp.childNodes[9].childNodes[0].nodeValue;

						document.getElementById("platforms").value = platforms;

						/* 
						since maraming laman yung platforms at typeOfContent ginawa silang array gamit ang .split method
						*/
						var platformsArray = platforms.split(', ');
						var typeOfContentsArray = typeOfContents.split(', ');

						/* 
						magiiterate dun sa array para ichecked yung corresponding checkbox nila.
						yung _.camelCase, galing to sa lodash library. automatic niyang ginagawang camelcase lahat ng string na
						nasa loob nung parameter. ginawang camelcase kasi naka camelcase din yung format ng id ng mga checkbox sa index.php
						*/

						for (platform of platformsArray) {
							document.getElementById(`${_.camelCase(platform)}`).checked = true;
						}

						for (typeOfContent of typeOfContentsArray) {
							/* 
							dito chinecheck kung yung current array na typeOfContent ay may corresponding checkbox
							pagwala sa otherTypeOfContent array sila malalagay, na pagasasmahin naman sa otherContent input field 
							*/
							if (document.getElementById(`${_.camelCase(typeOfContent)}`)) {
								document.getElementById(`${_.camelCase(typeOfContent)}`).checked = true;
								listedTypeOfContent.push(typeOfContent);
							} else {
								otherTypeOfContent.push(typeOfContent);
							}
						}

						/* 
						ishoshow lang yung input field kung may nakalagay sa kanyang value
						*/
						if (otherTypeOfContent != "") {
							document.getElementById("otherContent").style.opacity = "1";
							document.getElementById("otherContent").value = otherTypeOfContent.join(', ');
							document.getElementById("others").checked = true;
							document.getElementById("otherContent").readOnly = false;
							document.getElementById("otherContent").style.pointerEvents = "auto";
						}
						document.getElementById("typeOfContents").value = `${listedTypeOfContent.join(', ')}, ${document.getElementById("otherContent").value}`;


						document.getElementById("appName").readOnly = true;
						document.getElementById("appName").style.pointerEvents = "none";
						showModal("Edit");
						validate();
						break;
					} else {

					}
				}
			}
		};
		http.open("GET", "streamingApps.xml", true);
		http.send();
	}
}

function validate() {
	document.getElementById("appName").addEventListener("keyup", function () {
		validateInput("appName", "appNameMessage", "This field is required", "unique");
	});
	document.getElementById("appName").addEventListener("blur", function () {
		validateInput("appName", "appNameMessage", "This field is required", "unique");
	});

	document.getElementById("basePlan").addEventListener("keyup", function () {
		validateInput("basePlan", "basePlanMessage", "This field is required", "number");

	});
	document.getElementById("basePlan").addEventListener("blur", function () {
		validateInput("basePlan", "basePlanMessage", "This field is required", "number");
	});

	document.getElementById("launchDate").addEventListener("change", function () {
		validateInput("launchDate", "launchDateMessage", "This field is required", "text");

	});
	document.getElementById("launchDate").addEventListener("blur", function () {
		validateInput("launchDate", "launchDateMessage", "This field is required", "text");
	});

	if (document.getElementById("editPicture").value.length == 0) {
		console.log(document.getElementById("editPicture").value);
		document.getElementById("picture").addEventListener("blur", function () {
			validateInput("picture", "pictureMessage", "This field is required", "picture");
		});
	}
	document.getElementById("picture").addEventListener("change", function (e) {
		document.getElementById("pictureDisplay").src = URL.createObjectURL(e.target.files[0]);
		document.getElementById("pictureText").style.opacity  = "0";
		validateInput("picture", "pictureMessage", "This field is required", "picture");
	});

}

/* 
	input = yung  id ng input
	element = yung id ng paglalagyan ng message  
	type = ginamit lang sa mga condition
	message
	 */
function validateInput(input, element, message, type) {

	/* 
	chineckeck lang kung walang laman yung mga input fields, pag wala mababago yung border ng input field
	tapos may lalabas na error message
	*/
	if (document.getElementById(`${input}`).value.length == 0) {
		document.getElementById(`${element}`).innerHTML = message;
		document.getElementById(`${input}`).style.border = "red 1px solid";
	} else {
		/* 
		pag may laman, babalik sa dating kulay yung input fields
		tapos mawawala yung error message
		*/
		document.getElementById(`${element}`).innerHTML = "";
		document.getElementById(`${input}`).style.border = "black 1px solid";

		/* 
		pag number yung type i vavalidate lang kung number talaga yung nakainput
		pwede nato tanggalin kung gagawing type="number" yung field pero minsan kasi may nakakalusot na letter
		*/

		if (type == "number") {
			if (isNaN(document.getElementById(`${input}`).value)) {
				document.getElementById(`${input}`).style.border = "red 1px solid";
				document.getElementById(`${element}`).innerHTML = "Must be a number";
			}
		}


		if (type == "picture") {
			var picture = document.getElementById(`${input}`).value;
			var dotIndex = picture.lastIndexOf(".") + 1;
			var filyType = picture.substr(dotIndex, picture.length).toLowerCase();

			/* 
			chineckeck yung allowed file type, dapat JPG JPEG at PNG lang, hindi mauupload pag iba
			 */
			if (filyType != "jpg" && filyType != "jpeg" && filyType != "png") {
				document.getElementById(`${input}`).style.border = "red 1px solid";
				document.getElementById(`${element}`).innerHTML = "Picture must only be .jpg, .jpeg, .png";
				document.getElementById(`${input}`).value = "";
				document.getElementById("pictureDisplay").value = "img/white.jpg";
			} else {
				/* 
			chineckeck yung file size, pag sobra ng 5MB hindi mauupload
			 */
				var fileSize = document.getElementById(`${input}`).files[0].size / 1024 / 1024;
				if (fileSize > 5) {
					document.getElementById(`${input}`).style.border = "red 1px solid";
					document.getElementById(`${element}`).innerHTML = "File is to big";
					document.getElementById(`${input}`).value = "";
					document.getElementById("pictureDisplay").src = "img/white.jpg";
					document.getElementById("pictureText").style.opacity  = "1";
				}
			}
		}

		/* 
			chineckeck kung yung appname ay unique
			pag clinick yung create, tinatawag yung function na getAppNames tapos iniistore lahat ng appname sa xml sa  array
			then dito nagiiterate sa kada array kung nag match ba yung array sa tinype ng user.
			mas better na approch yung nasa async await, Promise saka callback na try ko na ayaw parin gumana
			 */
		if (type == "unique") {
			var inputAppName = document.getElementById(`${input}`).value;
			for (appName of appNames) {
				if (appName.toLowerCase() == inputAppName.toLowerCase()) {
					document.getElementById(`${input}`).style.border = "red 1px solid";
					document.getElementById(`${element}`).innerHTML = `${appName} already exist.`;
					break;
				}
			}
		}
	}
	/* 
	para to sa button chinecheck niya kung lahat ng requirements ay na meet, 
	pag nameet na pwede nang iclick yung button, pag hindi pa naka disabled muna
	*/
	if (document.getElementById("appNameMessage").innerHTML.length != 0 || (document.getElementById("appName").value.length == 0) || (document.getElementById("basePlan").value.length == 0) ||
		(document.getElementById("launchDate").value.length == 0) || (document.getElementById("platforms").value.length == 0) || (
			(document.getElementById("typeOfContents").value.length == 0 && document.getElementById("otherContent").value.length == 0)) ||
		(document.getElementById("picture").value.length == 0 && document.getElementById("editPicture").value.length == 0) || (isNaN(document.getElementById("basePlan").value))) {
		document.getElementById("modalButton").disabled = true;
	} else {
		document.getElementById("modalButton").disabled = false;
	}
}


function getAppNames() {
		http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				xmlDocument = http.responseXML;
				streamingApps = xmlDocument.getElementsByTagName("streamingApp");
				for (streamingApp of streamingApps) {
					var appName = streamingApp.childNodes[1].childNodes[0].nodeValue;
					appNames.push(appName);
				}
			}
		}
		http.open("GET", "streamingApps.xml", true);
		http.send();
}

/* 
pinagsasama yung value ng checked checkbox tapos nilalagay siya sa hidden input field na platforms at typeOfContents
*/
function getSelectedCheckbox() {
	/* 
	pag chineck yung checkbox others, mashoshow yung hidden input field na otherContent, mag nauncheck mahahide 
	opacity ginamit kasi hindi nadedetect yung input field pag display none
	*/
	document.getElementById("others").addEventListener("change", function () {
		if (document.getElementById("otherContent").style.opacity == "0") {
			document.getElementById("otherContent").style.opacity = "1";
			document.getElementById("otherContent").readOnly = false;
			document.getElementById("otherContent").style.pointerEvents = "auto";

		} else {
			document.getElementById("otherContent").style.opacity = "0";
			document.getElementById("otherContent").readOnly = true;
			document.getElementById("otherContent").style.pointerEvents = "none";
		}

		if (document.getElementById("others").checked) {} else {
			document.getElementById("otherContent").value = "";
		}
	});

	/* 
	querySelectorAll parang getElementByTagName, kinukuha niya lahat ng element na may class platform
	platform.addEventListener, isa pang paraan sa paglalagay ng event sa isang element. ginamit siya sa code nato para
	lahat ng element na may class platform ay malagyan ng CHANGE EVENT.
	para pag chineck o uncheck yung mga platforms mageexecute yung code saloob nung event
	*/
	let platforms = document.querySelectorAll('.platform')
	for (var platform of platforms) {
		platform.addEventListener('change', function () {
			/* 
			kinukuha niya lahay ng element na may class platform na naka CHECK.
			since nodelist/array yung nirereturn niya, mag iterate ka isa isa sa bawat item then pagsasamahin sila sa iisang 
			array gamit yung .push (maaappend sa dulo)
			 */
			var checkedPlatforms = document.querySelectorAll('.platform:checked');
			var selectedPlatform = [];
			for (var checkedPlatform of checkedPlatforms) {
				selectedPlatform.push(checkedPlatform.value)
			}
			/* 
			selectedPlatform.join(', ') gagawin niya lang string yung array namay seperator na ", [na may one whitespace]"
			*/
			document.getElementById("platforms").value = selectedPlatform.join(', ');
			validateInput("platforms", "platformsMessage", "This field is required", "text");

		});
	};

	let typeOfContents = document.querySelectorAll('.typeOfContent')
	for (var typeOfContent of typeOfContents) {
		typeOfContent.addEventListener('change', function () {
			getTypeOfContent();
		});
	};
}


function getTypeOfContent() {
	var selectedTypeOfContent = [];
	var checkedTypeOfContents = document.querySelectorAll('.typeOfContent:checked');
	for (var checkedTypeOfContent of checkedTypeOfContents) {
		selectedTypeOfContent.push(checkedTypeOfContent.value)
	}
	document.getElementById("typeOfContents").value = selectedTypeOfContent.join(', ');
	validateInput("typeOfContents", "typeOfContentsMessage", "This field is required", "checkbox");
}

/* 
nag gegenerate ng toast
*/
function createToast(message, type) {
	let createToastDialog = document.createElement("div");
	/*
	gumagawa ng random id para automatic na madelete yung toast depende sa delay na nakalagay sa setTimeout [1000 = 1second]
	*/
	let id = Math.random().toString(36).substr(2, 10);
	createToastDialog.setAttribute("id", id);
	createToastDialog.classList.add("toastDialog", type);
	createToastDialog.innerText = message;
	document.getElementById("toastList").appendChild(createToastDialog);

	let toastDialog = document.querySelector(".toastList").getElementsByClassName("toastDialog");
	let toastClose = document.createElement("div");
	toastClose.classList.add("toastClose");
	toastClose.innerHTML = '<i class="fas fa-times"></i>';
	createToastDialog.appendChild(toastClose);

	toastClose.onclick = function (e) {
		createToastDialog.remove();

	}
	setTimeout(function () {
		for (let i = 0; i < toastDialog.length; i++) {
			if (toastDialog[i].getAttribute("id") == id) {
				toastDialog[i].remove();
				break;
			}
		}
	}, 10000);
}

function showModal(text) {
	document.getElementById("modalButton").value = text;
	
	myModal.show();
}

function closeModal() {
	resetFields();
}