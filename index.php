<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Streaming Apps</title>

	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/fontawesome.css">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link href="css/jquery-ui.css" rel="stylesheet">




	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/jquery-ui.js"></script>

	<style>
		/* #deleteAll {
			display: none;
		}
 */
		/* para mapalitan yung value ng naka highlight */
		.ui-selected {
			background-color: #FFDB58 !important;
			font-weight: bold;
		}

		/* TOAST */
		.toastList {
			position: fixed;
			top: -10px;
			right: 13px;
			min-width: 350px;
			max-width: 350px;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			pointer-events: none;
			z-index: 1000000000000 !important;
		}

		/* 
		fill: %2321A67A
		fill yung babaguhin para maiba kulay ng SVG 
		%23 = # 
		%23+ HEX
		fill: #21A67A
		*/
		.success::after {
			content: url('data:image/svg+xml; utf8, <svg height="33" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path style="fill: %2321A67A" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>');
			position: absolute;
			top: 50%;
			left: 17px;
			transform: translate(0%, -50%);
			padding: 7px 0px 0px 8px;
			border-radius: 15px;
		}

		.success::before {
			content: url('data:image/svg+xml; utf8, <svg height="33" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path style="fill: %2321A67A" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>');
			content: "";
			position: absolute;
			top: 50%;
			left: 9px;
			transform: translate(0%, -50%);
			width: 4px;
			height: 80%;
			background-color: #21A67A;
			border-radius: 99px;
		}

		.error::after {
			content: url('data:image/svg+xml; utf8, <svg  height="33" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  style="fill: %23ED4F2B" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>');
			position: absolute;
			top: 50%;
			left: 17px;
			transform: translate(0%, -50%);
			padding: 7px 0px 0px 8px;
			border-radius: 15px;
		}

		.error::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 9px;
			transform: translate(0%, -50%);
			width: 4px;
			height: 80%;
			background-color: #ED4F2B;
			border-radius: 99px;
		}

		.neutral::after {
			content: url('data:image/svg+xml; utf8, <svg height="33" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  style="fill: %23EE9400" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>');
			position: absolute;
			top: 50%;
			left: 17px;
			transform: translate(0%, -50%);
			padding: 7px 0px 0px 8px;
			border-radius: 15px;
		}

		.neutral::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 9px;
			transform: translate(0%, -50%);
			width: 4px;
			height: 80%;
			background-color: #EE9400;
			border-radius: 99px;
		}

		.toastClose {

			color: #626262;
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translate(0%, -50%);
			font-weight: 900;
			font-size: 16px;
		}

		@keyframes showToastDialog {
			to {
				opacity: 1;
				left: 0px;
			}
		}


		@media (max-width: 400px) {
			.toastList {
				min-width: 95% !important;
				max-width: 95% !important;
				position: fixed;
				top: 49%;
				right: 50%;
				transform: translate(50%, -50%);
			}
		}
	</style>



</head>

<body>

	<div class="toastList" id="toastList"></div>

	<div id="modalBackdrop"></div>
	<div class="modal " id="streamingAppModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="streamingAppModalLabel">Add Content</h5>
					<!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->

				</div>
				<div class="modal-body">
					<form id="modalForm" method="post" enctype="multipart/form-data">
						<div id="message"></div>

						<div>
							<label class="form-label" for="appName">App Name:</label>
							<input type="text" name="appName" class="form-control" id="appName" autocomplete="off" required />
							<span class="input-message" id="appNameMessage"></span>
						</div>

						<div>
							<label class="form-label" for="basePlan">Base Plan:</label>
							<input type="text" name="basePlan" class="form-control" id="basePlan" autocomplete="off" required />
							<span class="input-message" id="basePlanMessage"></span>
						</div>

						<div>
							<label class="form-label" for="launchDate">Launch Date:</label>
							<input type="date" name="launchDate" class="form-control" id="launchDate" autocomplete="off" required />
							<span class="input-message" id="launchDateMessage"></span>
						</div>

						<div>
							<label class="form-label" class="picture">Picture: </label>

							<div style="height: 300px; ">
								<div style="width: 100%; height:100%; border:2px solid black; border-radius: 5px; position:relative" id="image_container">
									<input type="file" name="picture" id="picture" accept=".png, .jpg, .jpeg" style="position:absolute; width:100%; height:100%; opacity:0;  z-index:100;" />
									<div id="pictureText" style="position:absolute; width:100%; height:100%;z-index:50; display: flex;
									justify-content: center;
									align-items: center; flex-direction:column;"><i class="fa-solid fa-image fa-2xl"></i>Upload a Picture</div>
									<img id="pictureDisplay" src="img/white.jpg" style="position:absolute; width:100%; height:100%; object-fit:cover; z-index:10;">
								</div>
							</div>

							<span class="input-message" id="pictureMessage"></span>
						</div>


						<div class="checkbox">
							<label class="form-label" class="checkboxTitle" style="margin-bottom:0px;">Platforms: </label>
							<br><span class=" input-message" id="platformsMessage"><br></span>
							<div class="platform-checkbox-container">
								<div>
									<input type="checkbox" class="platform" id="mobile" value="Mobile"><label for="mobile">Mobile
									</label>
								</div>
								<div>
									<input type="checkbox" class="platform" id="smartTv" value="Smart TV">
									<label for="smartTv">Smart TV</label>
								</div>
								<div>
									<input type="checkbox" class="platform" id="web" value="Web">
									<label for="web">Web</label>
								</div>
							</div>

						</div>

						<div class="checkbox">
							<label class="form-label" class="checkboxTitle" style="margin-bottom:0px;">Type Of Contents: </label>
							<br><span class="input-message" id="typeOfContentsMessage"></span>
							<div class="contents-checkbox-container">
								<div>
									<input type="checkbox" class="typeOfContent" id="asianShows" value="Asian Shows">
									<label for="asianShows">Asian Shows</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="horror" value="Horror">
									<label for="horror">Horror</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="sports" value="Sports">
									<label for="sports">Sports</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="tvShows" value="TV Shows">
									<label for="tvShows">TV
										Shows</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="varietyShows" value="Variety Shows">
									<label for="varietyShows">Variety Shows</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="indieFilms" value="Indie Films">
									<label for="indieFilms">Indie Films</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="koreanDramas" value="Korean Dramas">
									<label for="koreanDramas">Korean Dramas</label>
								</div>
								<!-- <div>
									<input type="checkbox" class="typeOfContent" id="eastAsianContent" value="East Asian Content">
									<label for="eastAsianContent">East Asian Content</label>
								</div> -->
								<div>
									<input type="checkbox" class="typeOfContent" id="familyFriendlyMovies" value="Family-friendly Movies">
									<label for="familyFriendlyMovies">Family-friendly
										Movies
									</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="cartoons" value="Cartoons">
									<label for="cartoons">Cartoons</label>
								</div>
								<div>
									<input type="checkbox" class="typeOfContent" id="originalMovies" value="Original Movies">
									<label for="originalMovies">Original
										Movies</label>
								</div>
								<!-- <div>
									<input type="checkbox" class="typeOfContent" id="warnerMediaMovies" value="Warner Media Movies">
									<label for="warnerMediaMovies">Warner Media Movies</label>
								</div> -->
								<div>
									<input type="checkbox" class="typeOfContent" id="adultContent" value="Adult Content">
									<label for="adultContent">Adult Content</label>
								</div>

								<div><input type="checkbox" class="typeOfContent others" id="others" value="">
									<label for="others">Others</label>
								</div>
								<input type="text" name="otherContent" class="form-control" id="otherContent" style="opacity:0;" autocomplete="off" />
							</div>
						</div>
						<!-- 
										gamit lang to sa edit, dito malalagay yung CDATA picture ng ieedit na streaming apps
									 -->
						<div><input type="hidden" name="editPicture" id="editPicture" autocomplete="off" readonly />
						</div>

						<!-- 
										naka hide dito malalagay yung mga naka check na platforms at typeOfContents, converted to string at comma separated
									 -->
						<div><input type="hidden" name="platforms" id="platforms" autocomplete="off" required /></div>
						<div><input type="hidden" name="typeOfContents" id="typeOfContents" autocomplete="off" required /></div>
						<br />






					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn" id="modalClose">Close</button>
					<input type="submit" class="btn" value="modalButton" id="modalButton" disabled>
				</div>
			</div>
		</div>
	</div>


	<!-- <div class="btn btn-secondary" id="create">Add</div> -->


	<header>
		<div class="container">
			<div class="title-wrapper">
				<p class="h1">Streaming Apps for Legitimate Contents</p>
			</div>
			<div class="add-btn-wrapper">
				<!-- add icon from font-awesome -->
				<div id="create"> <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Content</div>
			</div>
		</div>
	</header>
	<div class="container search-box">
		<div class="search-container">
			<input type="text" name="search" class="form-control" id="search" placeholder="Search..." autocomplete="off" required />
			<button class="searchBtn" id="searchButton"><i class="fa fa-search"></i></button>
			<button class="clearBtn" id="clearButton"><i class="fa fa-close"></i></button>
		</div>
		<div id="suggestion"></div>
	</div>

	<div class="container" id="streamingAppList">







	</div>
	<div class="imageModal">
		<img id="zoomableImage">
		<div class="imageControl">
			<button class="btn zoomInImage shadow-none" id="zoomInImage"><i class="fa-solid fa-magnifying-glass-plus "></i></button>
			<button class="btn zoomIOutImage shadow-none" id="zoomOutImage"><i class="fa-solid fa-magnifying-glass-minus "></i></button>
			<button class="btn closeImage shadow-none" id="closeImage"><i class="fa fa-close fa-lg"></i></button>
		</div>
	</div>
	<button id="backToTop" class=" back-to-top ui-widget-content" role="button"><i class="fa fa-chevron-up"></i></button>

	<br><br><br>

	<script src="js/lodash.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/fontawesome.js"></script>
	<script src="js/script.js"></script>
	<script src="js/style.js"></script>



</body>


</html>