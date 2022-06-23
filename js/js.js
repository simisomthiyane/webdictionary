"use strict";
			//get all input elements
			var inputword = window.document.getElementById('word').value;

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

			//check
			
				
			function hello(){
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
								function(response){	
									try {	
									return response.json();
									} catch (error) {
										console.log("SyntaxError: JSON.parse: JSON data structure changed");
									}
								}
							).then(
								function(data){
									if(!Array.isArray(data) || data == undefined){
									//handling empty or not array responses from API 
										var p = document.createElement('p');
										window.document.getElementById('outputword').innerHTML = "Ouch!";

										p.innerHTML = "Sorry, No definitions found, for resolution click <a href='https://www.google.com/search?q="+inputword+"'>Google.com</a> or search another word.";
										outputerror.appendChild(p);
									}
									try {
										//accessing json object *********************************************
										
										try {
											//get word searched & audio
					
											data[0]?.phonetics.forEach(function(audio){
												if(!audio.audio ==""){
													outputaudio.src = audio.audio;
												}
											});
											
											if(data[0]?.word == ""){outputword.innerHTML = ""}else{
												outputword.innerHTML = data[0]?.word;
											}
										} catch (error) {
											console.log(error+"No Phonetics found.");
										}
										
				
										data[0]?.meanings.forEach(definitions =>{
											//if noun
											if(definitions.partOfSpeech == "noun"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var paranoun = document.createElement('li');
													paranoun.innerHTML = definition.definition;
													outputnoun.appendChild(paranoun);
													})										
											}//if end
				
											if(definitions.partOfSpeech == "pronoun"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var parapronoun = document.createElement('li');
													parapronoun.innerHTML = definition.definition;
													outputpronoun.appendChild(parapronoun);
													})									
											}//if end
				
											//if verb
											if(definitions.partOfSpeech == "verb"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var paraverb = document.createElement('li');
													paraverb.innerHTML = definition.definition;
													outputverb.appendChild(paraverb);
													})										
											}//if end
				
											if(definitions.partOfSpeech == "adverb"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var paraadverb = document.createElement('li');
													paraadverb.innerHTML = definition.definition;
													outputadverb.appendChild(paraadverb);
													})						
											}//if end
				
											if(definitions.partOfSpeech == "preposition"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var parapreposition = document.createElement('li');
													parapreposition.innerHTML = definition.definition;
													outputpreposition.appendChild(parapreposition);
													})	
											}//if end
				
											if(definitions.partOfSpeech == "conjunction"){
												definitions.definitions.forEach(definition=>{								
													//display output
													var paraconjunction = document.createElement('li');
													paraconjunction.innerHTML = definition.definition;
													outputconjunction.appendChild(paraconjunction);
													})	
											}//if end
				
												//if interjection
												if(definitions.partOfSpeech == "interjection"){
													definitions.definitions.forEach(definition=>{								
														//display output
														var parainterjection= document.createElement('li');
														var interjectionAndExample = definition.definition;
														//add examples
														if(!definition.example == ""){
															interjectionAndExample = interjectionAndExample + "<em><br> (e.g, "+definition.example+")</em>";
														}
														parainterjection.innerHTML = interjectionAndExample;
														outputinterjection.appendChild(parainterjection);						
														})											
												}//if end
				
											//if antonyms exist
											if(!definitions.antonyms.length == 0){							
													//display output
													definitions.antonyms.forEach(function(antonym){
														var paraantonyms= document.createElement('li');
														paraantonyms.innerHTML = antonym;
														outputantonyms.appendChild(paraantonyms);	
													});																			
											}//if end
										});
										//
										diplayOutputElements();
									} catch (error) {
										console.log(error+"No meaning found,JSON file structure might have been changed. -try catch");
									}
								}
							)//end of then
			}//end of wordMeaning function





/*on search button click*************************************************************************/			
const btnaddjson = window.document.getElementById('button').addEventListener('click',wordMeaning);
				
function wordMeaning(){
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
            const url = 'goat.json';

			fetch(url).then(
				function(response){	
					try {	
					return response.json();
					} catch (error) {
						console.log("SyntaxError: JSON.parse: JSON data structure changed");
					}
				}
			).then(
				function(data){
					if(!Array.isArray(data) || data == undefined){
						//handling empty or not array responses from API 
						var p = document.createElement('p');
						window.document.getElementById('outputword').innerHTML = "Ouch!";
						p.innerHTML = "Sorry, No definitions found, for resolution click <a href='http://www.google.com/search?q="+inputword+"'>Google.com</a> or search another word.";
						outputerror.appendChild(p);
					}
					try {
						//accessing json object *********************************************
						
						try {
							//get word searched & audio
	
							data[0]?.phonetics.forEach(function(audio){
								if(!audio.audio ==""){
									outputaudio.src = audio.audio;
								}
							});

							if(data[0]?.word ==""){outputword.innerHTML = ""}else{
							outputword.innerHTML = data[0]?.word;
							}
						} catch (error) {
							console.log(error+"No Phonetics found.");
						}
						

						data[0]?.meanings.forEach(definitions =>{
							//if noun
							if(definitions.partOfSpeech == "noun"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var paranoun = document.createElement('li');
									paranoun.innerHTML = definition.definition;
									outputnoun.appendChild(paranoun);
									})										
							}//if end

							if(definitions.partOfSpeech == "pronoun"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var parapronoun = document.createElement('li');
									parapronoun.innerHTML = definition.definition;
									outputpronoun.appendChild(parapronoun);
									})									
							}//if end

							//if verb
							if(definitions.partOfSpeech == "verb"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var paraverb = document.createElement('li');
									paraverb.innerHTML = definition.definition;
									outputverb.appendChild(paraverb);
									})										
							}//if end

							if(definitions.partOfSpeech == "adverb"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var paraadverb = document.createElement('li');
									paraadverb.innerHTML = definition.definition;
									outputadverb.appendChild(paraadverb);
									})						
							}//if end

							if(definitions.partOfSpeech == "preposition"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var parapreposition = document.createElement('li');
									parapreposition.innerHTML = definition.definition;
									outputpreposition.appendChild(parapreposition);
									})	
							}//if end

							if(definitions.partOfSpeech == "conjunction"){
								definitions.definitions.forEach(definition=>{								
									//display output
									var paraconjunction = document.createElement('li');
									paraconjunction.innerHTML = definition.definition;
									outputconjunction.appendChild(paraconjunction);
									})	
							}//if end

								//if interjection
								if(definitions.partOfSpeech == "interjection"){
									definitions.definitions.forEach(definition=>{								
										//display output
										var parainterjection= document.createElement('li');
										var interjectionAndExample = definition.definition;
										//add examples
										if(!definition.example == ""){
											interjectionAndExample = interjectionAndExample + "<em><br> (e.g, "+definition.example+")</em>";
										}
										parainterjection.innerHTML = interjectionAndExample;
										outputinterjection.appendChild(parainterjection);						
										})											
								}//if end

							//if antonyms exist
							if(!definitions.antonyms.length == 0){							
									//display output
									definitions.antonyms.forEach(function(antonym){
										var paraantonyms= document.createElement('li');
										paraantonyms.innerHTML = antonym;
										outputantonyms.appendChild(paraantonyms);	
									});																			
							}//if end
						});
						//
						diplayOutputElements();
					} catch (error) {
						console.log(error+"No meaning found,JSON file structure might have been changed. -try catch");
					}
				}
			)//end of then
}//end of wordMeaning function
/*end of on search button click*************************************************************************/			
		


function diplayOutputElements(){
	let outputAudioSrc = $('source').attr('src');
	let outputWordText = $('#outputword').text();
	let outputErrorText = $('#outputerror').text();


	if(outputAudioSrc !==""){
		$('.word-searched').show();
	}else{
		$('.word-searched').hide();
	}//end if	

	
	if(outputWordText ==""){
		$('#outputword').hide();
	}//end if

	if(outputErrorText ==""){
		$('#outputerror').hide();
	}//end if


	//<li> elements below*******************
	if($('#outputnoun').children().length == 0){
		$('.noun').hide();
	}else{
		$('.noun').show();
	}
	

	//end if

	if($('#outputpronoun').children().length == 0){
		$('.pronoun').hide();
	}//end if

	if($('#outputverb').children().length == 0){
		$('.verb').hide();
	}//end if

	if($('#outputadverb').children().length == 0){
		$('.adverb').hide();
	}//end if

	if($('#outputinterjection').children().length == 0){
		$('.interjection').hide();
	}//end if

	if($('#outputantonyms').children().length == 0){
		$('.antonyms').hide();
	}//end if

	if($('#outputpreposition').children().length == 0){
		$('.preposition').hide();
	}//end if

	if($('#outputconjunction').children().length == 0){
		$('.conjunction').hide();
	}//end if
	//<li> elements above*******************
}
