<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Streaming Apps</title>

	<link rel="stylesheet" href="css/BSIT3EG1G1.css">
	<link rel="stylesheet" href="css/fontawesome.css">
	<link rel="stylesheet" href="css/bootstrap.css">

</head>

<body>

	<div class="toastList" id="toastList"></div>


	<div id="modalBackdrop"></div>
	<div class="modal fade" id="streamingAppModal" tabindex="-1" aria-labelledby="streamingAppModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="streamingAppModalLabel">Modal title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="form-wrapper " id="modal">
						<form id="modalForm" method="post" enctype="multipart/form-data">
							<div id="modalContent">





								<label id="message"></label>
								<div class="input-group">
									<div>
										<label for="appName">App Name:</label>
										<input type="text" name="appName" id="appName" autocomplete="off" required />
										<span id="appNameMessage"></span>
									</div>
									<div>
										<label for="basePlan">Base Plan:</label>
										<input type="text" name="basePlan" id="basePlan" autocomplete="off" required />
										<span id="basePlanMessage"></span>
									</div>

									<div>
										<label for="launchDate">Launch Date:</label>
										<input type="date" name="launchDate" id="launchDate" autocomplete="off"
											required />
										<span id="launchDateMessage"></span>
									</div>
									<div>
										<label class="picture">Picture: </label>
										<span id="pictureMessage"></span>

										<div class="form-group mt-2  mb-5" style="height: 300px;">
											<div style="width: 100%; height:100%; border:1px solid black; position:relative"
												id="image_container">
												<input type="file" name="picture" id="picture"
													accept=".png, .jpg, .jpeg"
													style="position:absolute; width:100%; height:100%; opacity:0;  z-index:100;" />

												<img id="pictureDisplay" src=""
													style="position:absolute; width:100%; height:100px; object-fit:contain;">
											</div>
										</div>


									</div>


									<div class="checkbox">

										<label class="checkboxTitle">Platforms: </label>
										<span id="platformsMessage"></span>
										<div><input type="checkbox" class="platform" id="mobile" value="Mobile"><label
												for="mobile">Mobile</label></div>
										<div><input type="checkbox" class="platform" id="smartTv"
												value="Smart TV"><label for="smartTv">Smart
												TV</label></div>
										<div><input type="checkbox" class="platform" id="web" value="Web"><label
												for="smartTv">Web
											</label></div>

									</div>

									<div class="checkbox">

										<label class="checkboxTitle">Type Of Contents: </label>
										<span id="typeOfContentsMessage"></span>
										<div><input type="checkbox" class="typeOfContent" id="asianShows"
												value="Asian Shows"><label for="asianShows">Asian Shows</label></div>
										<div><input type="checkbox" class="typeOfContent" id="horror" value="Horror">
											<label for="horror">Horror</label></div>
										<div><input type="checkbox" class="typeOfContent" id="sports" value="Sports">
											<label for="sports">Sports</label></div>
										<div><input type="checkbox" class="typeOfContent" id="tvShows" value="TV Shows">
											<label for="tvShows">TV
												Shows</label></div>
										<div><input type="checkbox" class="typeOfContent" id="varietyShows"
												value="Variety Shows"> <label for="varietyShows">Variety Shows</label>
										</div>
										<div><input type="checkbox" class="typeOfContent" id="indieFilms"
												value="Indie Films"> <label for="indieFilms">Indie Films</label></div>
										<div><input type="checkbox" class="typeOfContent" id="koreanDramas"
												value="Korean Dramas"> <label for="koreanDramas">Korean Dramas</label>
										</div>
										<div><input type="checkbox" class="typeOfContent" id="eastAsianContent"
												value="East Asian Content">
											<label for="eastAsianContent">East Asian Content</label></div>
										<div><input type="checkbox" class="typeOfContent" id="familyFriendlyMovies"
												value="Family-friendly Movies"> <label
												for="familyFriendlyMovies">Family-friendly Movies</label>
										</div>
										<div><input type="checkbox" class="typeOfContent" id="cartoons"
												value="Cartoons"> <label for="cartoons">Cartoons</label></div>
										<div><input type="checkbox" class="typeOfContent" id="originalMovies"
												value="Original Movies"> <label for="originalMovies">Original
												Movies</label></div>
										<div><input type="checkbox" class="typeOfContent" id="warnerMediaMovies"
												value="Warner Media Movies">
											<label for="warnerMediaMovies">Warner Media Movies</label></div>
										<div><input type="checkbox" class="typeOfContent" id="adultContent"
												value="Adult Content"> <label for="adultContent">Adult Content</label>
										</div>



										<div><input type="checkbox" class="typeOfContent others" id="others" value="">
											<label for="others">Others</label></div>
										<input type="text" name="otherContent" id="otherContent"
											style="opacity:0; pointer-events:none" autocomplete="off" readonly />

									</div>


									<div><input type="text" name="editPicture" id="editPicture" autocomplete="off"
											readonly /></div>
									<div><input type="text" name="platforms" id="platforms" autocomplete="off"
											required /></div>
									<div><input type="text" name="typeOfContents" id="typeOfContents" autocomplete="off"
											required /></div>
									<br />
								</div>
								<div class="action-group">
									<div id="modalClose">
										<!-- &times; -->
									</div>
									<input type="submit" value="modalButton" id="modalButton" disabled>

								</div>
							</div>
						</form>
					</div>
				</div>
				<!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->
			</div>
		</div>
	</div>

	<div class="wrapper">
		<div class="flex">
			<div class="other-functions">
				<div id="create">Add</div>
			</div>
			<input type="submit" value="Search" id="searchButton">
			<input type="text" name="search" id="search" autocomplete="off" required />
			<label for="" id="suggestion"></label>
		</div>
	</div>
	<div id="streamingAppList"></div>

	<script src="js/lodash.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/fontawesome.js"></script>
	<script src="js/script.js"></script>


	<script>
		window.addEventListener("load", function () {

			readStreamingApp();
			getSelectedCheckbox();

			document.getElementById("search").addEventListener("keyup", function (e) {
				searchStreamingApp(e.target.value);
			});

			document.getElementById("searchButton").addEventListener("click", function (e) {
				searchStreamingApp(document.getElementById("search").value);
			});


			document.getElementById("create").addEventListener("click", function () {
				document.getElementById("appName").readOnly = false;
				resetFields();
				showModal("Add");
				validate();
			});

			document.getElementById("modalButton").addEventListener("click", function (e) {
				e.preventDefault();
				document.getElementById("modalButton").disabled = true;
				createEditStreamingApps();
			});

			document.getElementById("modalClose").addEventListener("click", function () {
				closeModal();
			});

			/*
			tuwing nagtatype sa input field na otherContent, malalagay yung value ng otherContent sa value ng checkbox others
			yung getTypeOfContent na function yung nagaappend sa lahat ng value ng checkbox na nakacheck
			*/
			document.getElementById("otherContent").addEventListener("keyup", function (e) {
				document.getElementById("others").value = document.getElementById("otherContent").value;
				getTypeOfContent();
			});

		});
	</script>
</body>

</html>