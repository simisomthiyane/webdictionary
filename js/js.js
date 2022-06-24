"use strict";
/*************************************************************************
 * the app uses this java script for all front end user JSON manipulation.
 * like api connecting,parsing,validatiion,displaying.
 * i figured using jq since it mostly a front end app.
 * 
 **************************************************************************/

//get all output elements
var outputaudio = window.document.querySelector('source');
var outputword = window.document.getElementById('outputword');
var outputerror = window.document.getElementById('outputerror');
var outputnoun = window.document.getElementById('outputnoun');
var outputverb = window.document.getElementById('outputverb');
var outputinterjection = window.document.getElementById('outputinterjection');
var outputantonyms = window.document.getElementById('outputantonyms');

var outputadverb = window.document.getElementById('outputadverb');
var outputpronoun = window.document.getElementById('outputpronoun');
var outputpreposition = window.document.getElementById('outputpreposition');
var outputconjunction = window.document.getElementById('outputconjunction');

//serch button event listen
const btnaddjson = window.document.getElementById('button').addEventListener('click', inputValidate);

//input validation
function inputValidate() {
	//get all input elements
	let inputword = window.document.getElementById('word').value.toLowerCase().trim();

	//alphanumeric /^[a-z0-9]+$/i
	//numeric /^[0-9]+$/i
	//alpha /^[a-z]+$/i
	//White Space /^\S+(?:\s+\S+)*$/;
	//Numeric string = /^[a-z0-9]+$/i;

	let regNumerics = /^[0-9]+$/i;
	let regAlpha = /^[a-z]+$/i;
	let regSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/;

	let regWhiteSpace = /\s/g;
	let regConsecWhiteSpace = /\s\s+/g;
	let regNumericStringChar = /\d+/g;

	//if numeric
	if (regNumerics.test(inputword)) {
		outputerror.innerHTML = "Ouch! only aphabetic valued word allowed, no numeric values allowed :(";
		window.document.getElementById('word').focus();
		diplayOutputElements();
	} else if (regAlpha.test(inputword)) { //if alpha
		//alert("input alpha");
		if (inputword.length > 1) {
			//get JSON	
			wordMeaning(inputword);
		} else {
			outputerror.innerHTML = "Ouch! only aphabetic valued word allowed, no single character value allowed :(";
			window.document.getElementById('word').focus();
			diplayOutputElements();
		}

	} else if (regSpecialChars.test(inputword)) { //if contain special charecters
		outputerror.innerHTML = "Ouch! only aphabetic valued word allowed, no special character values allowed :(";
		window.document.getElementById('word').focus();
		diplayOutputElements();

	} else if (inputword.match(regNumericStringChar)) { //if contain numerics in string
		outputerror.innerHTML = "Ouch! only aphabetic valued word allowed, no alpha numeric values allowed :(";
		window.document.getElementById('word').focus();
		diplayOutputElements();

	} else if (regConsecWhiteSpace.test(inputword)) {
		alert("input contains consecutive white space.");
		outputerror.innerHTML = "Ouch! only aphabetic valued word allowed, no  consecutive white/empty space allowed :(";
		window.document.getElementById('word').focus();
		diplayOutputElements();
	} else {
		//get JSON
		wordMeaning(inputword);
	}

	}

function hello() {
	//data manipulation
	//clear all output element inner html
	outputaudio.src = "";
	outputword.innerHTML = "";
	outputerror.innerHTML = "";
	outputnoun.innerHTML = "";
	outputverb.innerHTML = "";
	outputinterjection.innerHTML = "";
	outputantonyms.innerHTML = "";

	outputadverb.innerHTML = "";
	outputpronoun.innerHTML = "";
	outputpreposition.innerHTML = "";
	outputconjunction.innerHTML = "";

	//url
	const url = 'js/hello.json';

	fetch(url).then(
		function (response) {
			try {
				return response.json();
			} catch (error) {
				console.log("SyntaxError: JSON.parse: JSON data structure changed");
			}
		}
	).then(
		function (data) {
			if (!Array.isArray(data) || data == undefined) {
				//handling empty or not array responses from API 
				var p = document.createElement('p');
				window.document.getElementById('outputword').innerHTML = "Ouch!";

				p.innerHTML = "Sorry, No definitions found, for resolution click <a href='https://www.google.com/search?q=" + inputword + "'>Google.com</a> or search another word.";
				outputerror.appendChild(p);
			}
			try {
				//accessing json object *********************************************

				try {
					//get word searched & audio

					data[0]?.phonetics.forEach(function (audio) {
						if (!audio.audio == "") {
							outputaudio.src = audio.audio;
						}
					});

					if (data[0]?.word == "") {
						outputword.innerHTML = ""
					} else {
						outputword.innerHTML = data[0]?.word;
					}
				} catch (error) {
					console.log(error + "No Phonetics found.");
				}


				data[0]?.meanings.forEach(definitions => {
					//if noun
					if (definitions.partOfSpeech == "noun") {
						definitions.definitions.forEach(definition => {
							//display output
							var paranoun = document.createElement('li');
							paranoun.innerHTML = definition.definition;
							outputnoun.appendChild(paranoun);
						})
					} //if end

					if (definitions.partOfSpeech == "pronoun") {
						definitions.definitions.forEach(definition => {
							//display output
							var parapronoun = document.createElement('li');
							parapronoun.innerHTML = definition.definition;
							outputpronoun.appendChild(parapronoun);
						})
					} //if end

					//if verb
					if (definitions.partOfSpeech == "verb") {
						definitions.definitions.forEach(definition => {
							//display output
							var paraverb = document.createElement('li');
							paraverb.innerHTML = definition.definition;
							outputverb.appendChild(paraverb);
						})
					} //if end

					if (definitions.partOfSpeech == "adverb") {
						definitions.definitions.forEach(definition => {
							//display output
							var paraadverb = document.createElement('li');
							paraadverb.innerHTML = definition.definition;
							outputadverb.appendChild(paraadverb);
						})
					} //if end

					if (definitions.partOfSpeech == "preposition") {
						definitions.definitions.forEach(definition => {
							//display output
							var parapreposition = document.createElement('li');
							parapreposition.innerHTML = definition.definition;
							outputpreposition.appendChild(parapreposition);
						})
					} //if end

					if (definitions.partOfSpeech == "conjunction") {
						definitions.definitions.forEach(definition => {
							//display output
							var paraconjunction = document.createElement('li');
							paraconjunction.innerHTML = definition.definition;
							outputconjunction.appendChild(paraconjunction);
						})
					} //if end

					//if interjection
					if (definitions.partOfSpeech == "interjection") {
						definitions.definitions.forEach(definition => {
							//display output
							var parainterjection = document.createElement('li');
							var interjectionAndExample = definition.definition;
							//add examples
							if (!definition.example == "") {
								interjectionAndExample = interjectionAndExample + "<em><br> (e.g, " + definition.example + ")</em>";
							}
							parainterjection.innerHTML = interjectionAndExample;
							outputinterjection.appendChild(parainterjection);
						})
					} //if end

					//if antonyms exist
					if (!definitions.antonyms.length == 0) {
						//display output
						definitions.antonyms.forEach(function (antonym) {
							var paraantonyms = document.createElement('li');
							paraantonyms.innerHTML = antonym;
							outputantonyms.appendChild(paraantonyms);
						});
					} //if end
				});

				diplayOutputElements();
			} catch (error) {
				console.log("SyntaxError: JSON.parse: JSON data structure changed. " + error);
			}
		}
	) //end of then
} //end of wordMeaning function


/*on search button click*************************************************************************/

function wordMeaning(inputword) {
	//data manipulation
	//clear all output element inner html

	outputaudio.src = "";
	outputword.innerHTML = "";
	outputerror.innerHTML = "";
	outputnoun.innerHTML = "";
	outputverb.innerHTML = "";
	outputinterjection.innerHTML = "";
	outputantonyms.innerHTML = "";

	outputadverb.innerHTML = "";
	outputpronoun.innerHTML = "";
	outputpreposition.innerHTML = "";
	outputconjunction.innerHTML = "";

	//assign api url
	const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + inputword;

	try {
		fetch(url).then(
			function (response) {
				try {
					const data = response.json();
					return data;
				} catch (error) {
					//SyntaxError: JSON.parse: JSON data structure changed or API url not available.
					outputerror.innerHTML = "Eish! Dictionary not available right now :( <br><em>" + error + "</em>";
					diplayOutputElements();
				}
			}
		).then(
			function (data) {
				if (!Array.isArray(data) || data == undefined || data == "" || data == null) {
					//handling empty or not array responses from API 
					var p = document.createElement('p');
					window.document.getElementById('outputword').innerHTML = "Ouch!";
					p.innerHTML = "Sorry, No definitions found, for resolution click <a href='http://www.google.com/search?q=" + inputword + "'>Google.com</a> or search another word.";
					outputerror.appendChild(p);
				}
				try {
					//accessing json object *********************************************

					try {
						//get word searched & audio

						data[0]?.phonetics.forEach(function (audio) {
							if (!audio.audio == "") {
								outputaudio.src = audio.audio;
							}
						});

						if (data[0]?.word == "") {
							outputword.innerHTML = ""
						} else {
							outputword.innerHTML = data[0]?.word;
						}
					} catch (error) {
						console.log(error + "No Phonetics found.");
					}


					data[0]?.meanings.forEach(definitions => {
						//if noun
						if (definitions.partOfSpeech == "noun") {
							definitions.definitions.forEach(definition => {
								//display output
								var paranoun = document.createElement('li');
								paranoun.innerHTML = definition.definition;
								outputnoun.appendChild(paranoun);
							})
						} //if end

						if (definitions.partOfSpeech == "pronoun") {
							definitions.definitions.forEach(definition => {
								//display output
								var parapronoun = document.createElement('li');
								parapronoun.innerHTML = definition.definition;
								outputpronoun.appendChild(parapronoun);
							})
						} //if end

						//if verb
						if (definitions.partOfSpeech == "verb") {
							definitions.definitions.forEach(definition => {
								//display output
								var paraverb = document.createElement('li');
								paraverb.innerHTML = definition.definition;
								outputverb.appendChild(paraverb);
							})
						} //if end

						if (definitions.partOfSpeech == "adverb") {
							definitions.definitions.forEach(definition => {
								//display output
								var paraadverb = document.createElement('li');
								paraadverb.innerHTML = definition.definition;
								outputadverb.appendChild(paraadverb);
							})
						} //if end

						if (definitions.partOfSpeech == "preposition") {
							definitions.definitions.forEach(definition => {
								//display output
								var parapreposition = document.createElement('li');
								parapreposition.innerHTML = definition.definition;
								outputpreposition.appendChild(parapreposition);
							})
						} //if end

						if (definitions.partOfSpeech == "conjunction") {
							definitions.definitions.forEach(definition => {
								//display output
								var paraconjunction = document.createElement('li');
								paraconjunction.innerHTML = definition.definition;
								outputconjunction.appendChild(paraconjunction);
							})
						} //if end

						//if interjection
						if (definitions.partOfSpeech == "interjection") {
							definitions.definitions.forEach(definition => {
								//display output
								var parainterjection = document.createElement('li');
								var interjectionAndExample = definition.definition;
								//add examples
								if (!definition.example == "") {
									interjectionAndExample = interjectionAndExample + "<em><br> (e.g, " + definition.example + ")</em>";
								}
								parainterjection.innerHTML = interjectionAndExample;
								outputinterjection.appendChild(parainterjection);
							})
						} //if end

						//if antonyms exist
						if (!definitions.antonyms.length == 0) {
							//display output
							definitions.antonyms.forEach(function (antonym) {
								var paraantonyms = document.createElement('li');
								paraantonyms.innerHTML = antonym;
								outputantonyms.appendChild(paraantonyms);
							});
						} //if end
					});
					//
					diplayOutputElements();
				} catch (error) {
					//SyntaxError: JSON.parse: JSON data structure changed.
					outputerror.innerHTML = "Eish! Dictionary not available right now :( <br><em>" + error + "</em>";
					diplayOutputElements();
				}
			}
		) //end of then
	} catch (error) {
		outputerror.innerHTML = "Eish! Dictionary not available right now :( <br><em>" + error + "</em>";
		diplayOutputElements();
	}
} //end of wordMeaning function
/*end of on search button click*************************************************************************/



function diplayOutputElements() {
	let outputAudioSrc = $('source').attr('src');
	let outputWordText = $('#outputword').text();
	let outputErrorText = $('#outputerror').text();

	if (outputAudioSrc !== "") {
		$('.word-searched').show();
	}
	if (outputAudioSrc == "") {
		$('.word-searched').hide();
	} //end if	


	if (outputWordText == "") {
		$('#outputword').hide();
	} //end if
	if (outputWordText !== "") {
		$('#outputword').show();
	} //end if

	if (outputErrorText == "") {
		$('#outputerror').hide();
	}
	if (outputErrorText !== "") {
		$('#outputerror').show();
	} //end if


	//<li> elements below*******************
	if ($('#outputnoun').children().length == 0) {
		$('.noun').hide();
	} else {
		$('.noun').show();
	}


	//end if

	if ($('#outputpronoun').children().length == 0) {
		$('.pronoun').hide();
	} //end if

	if ($('#outputverb').children().length == 0) {
		$('.verb').hide();
	} //end if

	if ($('#outputadverb').children().length == 0) {
		$('.adverb').hide();
	} //end if

	if ($('#outputinterjection').children().length == 0) {
		$('.interjection').hide();
	} //end if

	if ($('#outputantonyms').children().length == 0) {
		$('.antonyms').hide();
	} //end if

	if ($('#outputpreposition').children().length == 0) {
		$('.preposition').hide();
	} //end if

	if ($('#outputconjunction').children().length == 0) {
		$('.conjunction').hide();
	} //end if
	//<li> elements above*******************
}
