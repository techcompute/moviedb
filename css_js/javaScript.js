"use strict";

/**
 * Common function to create a JS based filter on all columns of a table
 */
function search_table() {
	// Declare variables 
	var input, filter, table, tr, td;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	//console.log("search filter:" + filter);
	table = document.getElementById("movieTable");
	tr = table.getElementsByTagName("tr");

	var ratingFilter = document.getElementById("rating").value;
	//console.log("Rating filter:" + ratingFilter);

	// Loop through all table rows, and hide those who don't match the search query
	for (var i = 1; i < tr.length; i++) {
		//console.log("i:" + i);
		var isDisplay = true;//var used to drive display of a row

		td = tr[i].getElementsByTagName("td");
		//console.log("td length:" + td.length);


		//Rating filter
		if (isDisplay) {

			var tdRatingText = td[2].getElementsByTagName("p")[1].innerText;
			var tdRatingValue = tdRatingText.substring(tdRatingText.indexOf(":") + 1, tdRatingText.length);

			//console.log("Rating value:" + tdRatingValue);

			if (ratingFilter == "all") {
				//console.log("rating filter all.");
				isDisplay = true;
			}
			else if (tdRatingValue.trim() == "N/A" || tdRatingValue.length == 0 || parseFloat(tdRatingValue) < parseFloat(ratingFilter)) {
				//console.log("rating filter applied");
				isDisplay = false;
			}
		}


		//Language filter
		if (isDisplay) {
			var engCheck = document.getElementById("engCheck");
			var hinCheck = document.getElementById("hinCheck");
			var allCheck = document.getElementById("allCheck");

			var movieLangText = td[3].getElementsByTagName("p")[2].innerText;
			var movieLangValue = movieLangText.substring(movieLangText.indexOf(":") + 1, movieLangText.length);

			isDisplay = false;
			if (allCheck.checked) {
				isDisplay = true;
			} else if ((engCheck.checked && movieLangValue.toUpperCase().indexOf("ENGLISH") > -1) || (hinCheck.checked && movieLangValue.toUpperCase().indexOf("HINDI") > -1)) {
				isDisplay = true;
			}
		}

		//Genre filter
		if (isDisplay) {
			var genreSelected = document.getElementById("genre");
			var genreText = td[3].getElementsByTagName("p")[1].innerText;
			var genreValue = genreText.substring(genreText.indexOf(":") + 1, genreText.length).trim().toUpperCase();
			isDisplay = false;

			//console.log("genre value:"+genreValue);
			//console.log("options length:"+genreSelected.selectedOptions.length)

			for (var iG = 0; iG < genreSelected.selectedOptions.length; iG++) {
				//console.log("selected option:"+genreSelected.selectedOptions[iG].value);
				if (genreSelected.selectedOptions[iG].value.toUpperCase() == "ALL") {
					isDisplay = true;
					break;
				} else if (genreValue.toUpperCase().indexOf(genreSelected.selectedOptions[iG].value.toUpperCase()) > -1) {
					isDisplay = true;
				}
			}
		}


		//section for text based filter, only used if user has input a value in search
		if (isDisplay && filter.length > 0) {
			for (var j = 0; j < td.length; j++) {
				//console.log("j:" + j);
				let tdata = td[j];
				if (tdata) {
					if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
						//console.log("search term found.");
						isDisplay = true;
						break;
					}
					else {
						//console.log("search term not found.");
						isDisplay = false;
						//break;
					}

				}
			}
		}


		if (isDisplay) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
	}
}


/**
* Show/hide a section based on ID
*/
function showHide(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}
