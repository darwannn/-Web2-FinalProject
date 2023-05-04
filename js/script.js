$(document).ready(function () {
  /* 	createToast("Dasd","error") */
  readStreamingApp();
  getSelectedCheckbox();

  $("#search").on("keyup", function (e) {
    /* searchStreamingApp(e.target.value); */
    suggestionStreamingApp(e.target.value);
  });

  $("#searchButton").on("click", function (e) {
    searchStreamingApp($("#search").val());
  });

  $("#clearButton").on("click", function (e) {
    $("#suggestion").html("");
    $("#search").val("");
    readStreamingApp();
  });

  $("#create").on("click", function () {
    getAppNames();
    $("#appName").prop("readOnly", false);
    resetFields();
    showModal("Add");
    validate();
  });

  /* 
	pag-click ng button sa modal
	*/
  $("#modalButton").on("click", function (e) {
    e.preventDefault();
    $("#modalButton").prop("disabled", true);
    createEditStreamingApps();
  });

  /*
	tuwing nagta-type sa input field na otherContent, malalagay yung value ng otherContent sa value ng checkbox others
	yung getTypeOfContent na function yung nagaappend sa lahat ng value ng checkbox na nakacheck
	*/
  $("#otherContent").on("keyup", function (e) {
    $("#others").val($("#otherContent").val());
    getTypeOfContent();
  });
});

var myModal = new bootstrap.Modal(document.getElementById("streamingAppModal"));
var appNames = [];
/* 
ididsplay lang yung streaming apps
*/
function readStreamingApp() {
  // $("#streamingAppList").accordion({
  // 	collapsible: true,
  // 	active: false
  // });
  const suggestionBox = document.getElementById("suggestion");
  const clearBtn = document.getElementById("clearButton");

  clearBtn.style.display = "none";
  suggestionBox.style.display = "none";

  http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      document.getElementById("streamingAppList").innerHTML = http.responseText;
      // $("#streamingAppList").accordion("destroy");
      // $("#streamingAppList").accordion({
      //   collapsible: true,
      //   active: false,
      // });
    } else {
      /* 
			yung das fa-spinner fa-spin ay galing sa fontawesome, loading icon lang siya na may spin animation, 
			para habang wala pang response napapakita na nagloloading pa yung server
			*/
      document.getElementById("streamingAppList").innerHTML =
        "<i class='fas fa-spinner fa-spin'></i>";
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
  // Reset the values of all relevant form fields
  $("#message").html("");
  $("#appName").val("");
  $("#basePlan").val("");
  $("#launchDate").val("");
  $("#platforms").val("");
  $("#typeOfContents").val("");
  $("#picture").val("");
  $("#otherContent").val("");
  $("#editPicture").val("");

  $("#appNameMessage").html("");
  $("#basePlanMessage").html("");
  $("#launchDateMessage").html("");
  $("#pictureMessage").html("");
  $("#platformsMessage").html("");
  $("#typeOfContentsMessage").html("");
  $(
    `#appName, #basePlan, #launchDate, #platforms, #typeOfContents, #picture`
  ).css("border", "black 1px solid");

  $("#pictureDisplay").attr("src", "img/white.jpg");
  $("#pictureText").css("opacity", "1");
  $("#otherContent").css("opacity", "0");
  $("#appName").prop("readonly", false);
  $("#appName").css("pointer-events", "auto");

  // Uncheck all checkboxes
  $('input[type="checkbox"]').prop("checked", false);
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
  const suggestionBox = document.getElementById("suggestion");
  if (toSearch.length == 0) {
    /* 
		pag walang laman yung search input field i shoshow lang ulit lahat ng streamingApps, pag wala kasi nito
		ang mananatiling naka show sa screen ay yung nagmatch lang na steaming app na tinype (hindi babalik sa dati) 
		 */
    document.getElementById("suggestion").innerHTML = "";
    /* readStreamingApp(); */
    createToast("Please provide the name of a streaming app", "error");
  } else {
    suggestionBox.style.display = "none";
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        document.getElementById("suggestion").innerHTML = "";
        document.getElementById("streamingAppList").innerHTML =
          http.responseText;
        // $("#streamingAppList").accordion("destroy");
        // $("#streamingAppList").accordion({
        //   collapsible: true,
        //   active: false,
        // });
      } else {
        document.getElementById("streamingAppList").innerHTML =
          "<i class='fas fa-spinner fa-spin'></i>";
      }
    };
    http.open("GET", `process/searchProcess.php?q=${toSearch}`, true);
    http.send();
  }
}

function suggestionStreamingApp(toSearch) {
  const clearBtn = document.getElementById("clearButton");
  const suggestionBox = document.getElementById("suggestion");
  if (toSearch.length == 0) {
    document.getElementById("suggestion").innerHTML = "";
    readStreamingApp();
    // HIDE CLEAR BUTTON IF NO INPUT
    clearBtn.style.display = "none";
    suggestionBox.style.display = "none";
  } else {
    // SHOW CLEAR BUTTON IF THERE IS INPUT
    clearBtn.style.display = "block";
    suggestionBox.style.display = "block";
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        document.getElementById("suggestion").innerHTML = http.responseText;
      } else {
        document.getElementById("suggestion").innerHTML =
          "<i class='fas fa-spinner fa-spin'></i>";
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
            document.getElementById("basePlan").value =
              streamingApp.childNodes[3].childNodes[0].nodeValue;
            document.getElementById("launchDate").value =
              streamingApp.childNodes[5].childNodes[0].nodeValue;
            document.getElementById("editPicture").value =
              streamingApp.childNodes[11].childNodes[0].nodeValue;
            document.getElementById(
              "pictureDisplay"
            ).src = `data:image;base64,${streamingApp.childNodes[11].childNodes[0].nodeValue}`;
            document.getElementById("pictureText").style.opacity = "0";
            var platforms = streamingApp.childNodes[7].childNodes[0].nodeValue;
            var typeOfContents =
              streamingApp.childNodes[9].childNodes[0].nodeValue;

            document.getElementById("platforms").value = platforms;

            /* 
						since maraming laman yung platforms at typeOfContent ginawa silang array gamit ang .split method
						*/
            var platformsArray = platforms.split(", ");
            var typeOfContentsArray = typeOfContents.split(", ");

            /* 
						magiiterate dun sa array para ichecked yung corresponding checkbox nila.
						yung _.camelCase, galing to sa lodash library. automatic niyang ginagawang camelcase lahat ng string na
						nasa loob nung parameter. ginawang camelcase kasi naka camelcase din yung format ng id ng mga checkbox sa index.php
						*/

            for (platform of platformsArray) {
              document.getElementById(
                `${_.camelCase(platform)}`
              ).checked = true;
            }

            for (typeOfContent of typeOfContentsArray) {
              /* 
							dito chinecheck kung yung current array na typeOfContent ay may corresponding checkbox
							pagwala sa otherTypeOfContent array sila malalagay, na pagasasmahin naman sa otherContent input field 
							*/
              if (document.getElementById(`${_.camelCase(typeOfContent)}`)) {
                document.getElementById(
                  `${_.camelCase(typeOfContent)}`
                ).checked = true;
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
              document.getElementById("otherContent").value =
                otherTypeOfContent.join(", ");
              document.getElementById("others").checked = true;
              document.getElementById("otherContent").readOnly = false;
              document.getElementById("otherContent").style.pointerEvents =
                "auto";
            }
            document.getElementById(
              "typeOfContents"
            ).value = `${listedTypeOfContent.join(", ")}, ${
              document.getElementById("otherContent").value
            }`;

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
  $("#appName").on("keyup blur", function () {
    validateInput(
      "appName",
      "appNameMessage",
      "This field is required",
      "unique"
    );
  });
  $("#basePlan").on("keyup blur", function () {
    validateInput(
      "basePlan",
      "basePlanMessage",
      "This field is required",
      "number"
    );
  });
  $("#launchDate").on("change blur", function () {
    validateInput(
      "launchDate",
      "launchDateMessage",
      "This field is required",
      "text"
    );
  });
  if ($("#editPicture").val().length == 0) {
    $("#picture").on("blur", function () {
      validateInput(
        "picture",
        "pictureMessage",
        "This field is required",
        "picture"
      );
    });
  }
  $("#picture").on("change", function (e) {
    $("#pictureDisplay").attr("src", URL.createObjectURL(e.target.files[0]));
    $("#pictureText").css("opacity", "0");
    validateInput(
      "picture",
      "pictureMessage",
      "This field is required",
      "picture"
    );
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
  if ($(`#${input}`).val().length === 0) {
    $(`#${element}`).html(message);
    $(`#${input}`).css("border", "red 1px solid");
  } else {
    /* 
		pag may laman, babalik sa dating kulay yung input fields
		tapos mawawala yung error message
		*/
    $(`#${element}`).html("");
    $(`#${input}`).css("border", "black 1px solid");

    /* 
		pag number yung type i vavalidate lang kung number talaga yung nakainput
		pwede nato tanggalin kung gagawing type="number" yung field pero minsan kasi may nakakalusot na letter
		*/

    if (type === "number") {
      if (isNaN($(`#${input}`).val())) {
        $(`#${input}`).css("border", "red 1px solid");
        $(`#${element}`).html("Must be a number");
      }
    }

    if (type === "picture") {
      var picture = $(`#${input}`).val();
      var dotIndex = picture.lastIndexOf(".") + 1;
      var fileType = picture.substr(dotIndex, picture.length).toLowerCase();

      /* 
			chineckeck yung allowed file type, dapat JPG JPEG at PNG lang, hindi mauupload pag iba
			 */
      if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png") {
        $(`#${input}`).css("border", "red 1px solid");
        $(`#${element}`).html("Picture must only be .jpg, .jpeg, .png");
        $(`#${input}`).val("");
        $("#pictureDisplay").attr("src", "img/white.jpg");
      } else {
        /* 
			chineckeck yung file size, pag sobra ng 5MB hindi mauupload
			 */
        var fileSize = $(`#${input}`)[0].files[0].size / 1024 / 1024;
        if (fileSize > 5) {
          $(`#${input}`).css("border", "red 1px solid");
          $(`#${element}`).html("File is too big");
          $(`#${input}`).val("");
          $("#pictureDisplay").attr("src", "img/white.jpg");
          $("#pictureText").css("opacity", "1");
        }
      }
    }

    /* 
			chineckeck kung yung appname ay unique
			pag clinick yung create, tinatawag yung function na getAppNames tapos iniistore lahat ng appname sa xml sa  array
			then dito nagiiterate sa kada array kung nag match ba yung array sa tinype ng user.
			mas better na approch yung nasa async await, Promise saka callback na try ko na ayaw parin gumana
			 */
    if (type === "unique") {
      var inputAppName = $(`#${input}`).val();
      for (appName of appNames) {
        if (appName.toLowerCase() === inputAppName.toLowerCase()) {
          $(`#${input}`).css("border", "red 1px solid");
          $(`#${element}`).html(`${appName} already exists.`);
          break;
        }
      }
    }
  }
  /* 
	para to sa button chinecheck niya kung lahat ng requirements ay na meet, 
	pag nameet na pwede nang iclick yung button, pag hindi pa naka disabled muna
	*/
  if (
    $("#appNameMessage").html().length !== 0 ||
    $("#appName").val().length === 0 ||
    $("#basePlan").val().length === 0 ||
    $("#launchDate").val().length === 0 ||
    $("#platforms").val().length === 0 ||
    ($("#typeOfContents").val().length === 0 &&
      $("#otherContent").val().length === 0) ||
    ($("#picture").val().length === 0 &&
      $("#editPicture").val().length === 0) ||
    isNaN($("#basePlan").val())
  ) {
    $("#modalButton").prop("disabled", true);
  } else {
    $("#modalButton").prop("disabled", false);
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
  };
  http.open("GET", "streamingApps.xml", true);
  http.send();
}

/* 
pinagsasama yung value ng checked checkbox tapos nilalagay siya sa hidden input field na platforms at typeOfContents
*/
function getSelectedCheckbox() {
  // Check if the checkbox 'others' is checked or unchecked
  // If checked, show the hidden input field 'otherContent' with opacity
  // If unchecked, hide the input field 'otherContent'
  $("#others").on("change", function () {
    if ($("#otherContent").css("opacity") == 0) {
      $("#otherContent")
        .css({
          opacity: 1,
          "pointer-events": "auto",
        })
        .prop("readonly", false);
    } else {
      $("#otherContent")
        .css({
          opacity: 0,
          "pointer-events": "none",
        })
        .prop("readonly", true);
    }

    if (!$("#others").prop("checked")) {
      $("#otherContent").val("");
    }
  });

  // Add change event to all elements with class 'platform'
  // When checked or unchecked, execute the code inside the event
  $(".platform").on("change", function () {
    // Get all checked elements with class 'platform' and push them to an array
    var selectedPlatform = [];
    $(".platform:checked").each(function () {
      selectedPlatform.push($(this).val());
    });

    // Join the array with ', ' separator to create a string
    $("#platforms").val(selectedPlatform.join(", "));

    // Validate the input field 'platforms'
    validateInput(
      "platforms",
      "platformsMessage",
      "This field is required",
      "text"
    );
  });

  // Add change event to all elements with class 'typeOfContent'
  // When changed, execute the function 'getTypeOfContent'
  $(".typeOfContent").on("change", function () {
    getTypeOfContent();
  });
}

function getTypeOfContent() {
  // Get all checked elements with class 'typeOfContent' and push their values to an array
  var selectedTypeOfContent = [];
  $(".typeOfContent:checked").each(function () {
    selectedTypeOfContent.push($(this).val());
  });

  // Join the array with ', ' separator to create a string
  $("#typeOfContents").val(selectedTypeOfContent.join(", "));

  // Validate the input field 'typeOfContents'
  validateInput(
    "typeOfContents",
    "typeOfContentsMessage",
    "This field is required",
    "checkbox"
  );
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

  let toastDialog = document
    .querySelector(".toastList")
    .getElementsByClassName("toastDialog");
  let toastClose = document.createElement("div");
  toastClose.classList.add("toastClose");
  toastClose.innerHTML = '<i class="fas fa-times"></i>';
  createToastDialog.appendChild(toastClose);

  toastClose.onclick = function (e) {
    createToastDialog.remove();
  };
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
