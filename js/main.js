
	$("document").ready(function () {
		//default
		//on click sub widows
		$("#dictionaryApiLink").click(function(){
        	let sub = window.open("https://dictionaryapi.dev/","Free Web Dictionary API","toolbar=no,status=no,menubar=no,location=center,resizable=no,width=500,height=500");
        	sub.focus();
   		});

		//UI Effects
		//at input element hover
		$(".input").hover(function () {
			$(".input").animate({
				width: "15em"
			}, 200);
		});

		//data manipulation
		//get data from input element at button click
		$(".button").click(function () {
			//check if not empty
			//if ($(".input").val() != "") {
				////////////////////////////ORIGINAL//////

/* 				const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + $(".input").val().toLowerCase();
				console.log(url);

				fetch(url).then(
					function (response) {
						return response.json();
					}
				).then(
					function (data) {
						let jsonArray = JSON.parse(data);
						$(".description").text(JSON.parse(data));
					}
				) */
				////////////////////////////ORIGINAL//////.........
				


				//getting data from API////////////////////////////////////////////////

				//const word = window.document.getElementById('word');


			



				output = window.document.getElementsByClassName('description');

				// const btnaddjson = window.document.getElementById('addjson').addEventListener('click',addjson);
				function addjson() {
					//clear description div
					output.innerHTML = "";
					//get local stored json file to browser
					const url = 'word.json';

					fetch(url).then(
						function (response) {
							return response.json();
						}
					).then(
						function (data) {
							if (!Array.isArray(data)) {
								output.innerHTML = "";
								var pel = document.createElement('p');
								pel.innerHTML = "Word not found.";
								output.appendChild(pel);
							}



							window.console.log(data[0].meanings.length);
							window.console.log(data[0].meanings[0].definitions.length);

							data[0].meanings.forEach(definitions => {
								//console.log(definitions);
								//code
								definitions.definitions.forEach(definition => {
									//console.log(definition.definition);

									//display output
									var pel = document.createElement('p');
									pel.innerHTML = definition.definition;
									output.appendChild(pel);

								})
							});
						}
					)
				} //end of addjson function





				//////////////////////////////////////////////////////////////////////

				/////////////////////////
			//} else {
			//	console.log("no input here.");
			//}
		});

	});