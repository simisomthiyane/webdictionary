/****************************************************
* Web-App Name: Personal - Version 2.0.0
* Author: https:simiso.onrender.com
* License: GNU
****************************************************/
(function () {
  "use strict";

  /**
  * Easy selector helper function
  */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Input Validation function
   */

  function inputValidation(inputword) {

    let regNumerics = /^[0-9]+$/i;
    let regAlpha = /^[a-z]+$/i;
    let regSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/;

    let regWhiteSpace = /\s/g;
    let regConsecWhiteSpace = /\s\s+/g;
    let regNumericStringChar = /\d+/g;

    //if numeric
    if (regNumerics.test(inputword)) {
      select("#info").innerHTML = "No numerics allowed, only alphabetic values allowed.";
      select("#word").focus();
      return false;
    } else if (regAlpha.test(inputword)) { //if alpha
      if (inputword.length == 1) {
        select("#info").innerHTML = "No single character value allowed, only alphabetic words allowed.";
        select("#word").focus();
        return false;
      }
    } else if (regSpecialChars.test(inputword)) { //if contain special charecters
      select("#info").innerHTML = "No special character values allowed, only alphabetic words allowed.";
      select("#word").focus();
      return false;
    } else if (inputword == "") { //if contain non
      select("#info").innerHTML = "No empty entry allowed, only alphabetic words allowed.";
      select("#word").focus();
      return false;
    } else if (regWhiteSpace.test(inputword)) { //if contain special charecters
      select("#info").innerHTML = "No white/empty space allowed, only alphabetic words allowed.";
      select("#word").focus();
      return false;
    } else if (inputword.match(regNumericStringChar)) { //if contain numerics in string
      select("#info").innerHTML = "No alpha numeric values allowed, only alphabetic words allowed.";
      select("#word").focus();
      return false;
    } else if (regConsecWhiteSpace.test(inputword)) {
      select("#info").innerHTML = "No consecutive white/empty space allowed, only alphabetic words allowed.";
      select("#word").focus();
      return false;
    } else {
      select("#info").innerHTML = "";
      select("#word").focus();
      return true;
    }
    select("#info").innerHTML = "";
    select("#word").focus();
    return true;
  }




  async function fetchLocalData() {
    const res = await fetch("assets/files/hello.json")
    return await res.json();
  }



  async function fetchApiData(word) {
    startloading();
    //const res = await fetch("assets/files/ship.json");
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word);
    //console.log(res.json());
    const response = await res.json();
    return response;
  }




  async function fetchApiJson(word) {
    fetchApiData(word).then(function (record) {
      //send to the display output function
     
      displayRecord(record);
      stoploading();
    }
    ).catch(function (error) {
  
      if(error == "TypeError: Failed to fetch"){
        displayError("You are offline, check connection.");
        stoploading();
      }else if(error == "TypeError: record.map is not a function"){
        displayError("Sorry, No definitions found, for resolution click <a href='https://www.google.com/search?q=" + word + "'>Google.com</a> or search another word.");
        stoploading();
      }else{
        displayError(error);
        stoploading();
      }
    })
  }




  /**
   * onload function
   */
  function onload() {
    const date = new Date;
    switch (date.getDay()) {
      case 1:
        fetchApiJson("hi");
        break;
      case 2:
        fetchApiJson("hello");
        break;
      case 3:
        fetchApiJson("greeting");
        break;
      case 4:
        fetchApiJson("salute");
        break;
      case 5:
        fetchApiJson("welcome");
        break;
      case 6:
        fetchApiJson("salute");
        break;
      case 7:
        fetchApiJson("greeting");
        break;   

      default:
        return false;
        break;
    }

  }




  function displayError(errorMsg) {
    clearInfo();
    const elDiv = createElement("div", "info-wrapper rounded my-3 p-3");
    const elP = createElement("P", "warning");
    elP.setAttribute("id", "text-warning");
    elP.innerHTML = errorMsg;
    elDiv.appendChild(elP);
    select('#info').appendChild(elDiv);
  }





  function clearWordDefinitions() { select('#word-difinition-wrapper').innerHTML = "" }



  function clearInfo() { select('#info').innerHTML = "" }



  function displayRecord(record) {
    clearInfo()
    clearWordDefinitions();
    record.map(function (rec) {

      select("#word").value = rec.word;

      rec.meanings.map(function (item) {
        const wrapperDiv = createElement('div', 'type-of-speech-wrapper rounded p-3 mb-2');
        const bodyDiv = createElement('div', 'type-of-speech');
        const h3 = createElement('h3', '');
        const bodyParagraph = createElement('p', 'word-meaning-body');
        const ul = createElement('ul', '');
        const elUnorderedListSynonyms = createElement('ul', '');
        const elUnorderedListAntonym = createElement('ul', '');

        const elSynonymParagraph = createElement("p", "");
        elSynonymParagraph.innerHTML = "<h5>synonym</h5>";

        const elAntonymParagraph = createElement("p", "");
        elAntonymParagraph.innerHTML = "<h5>antonym</h5>";


        h3.innerHTML = item.partOfSpeech;

        item.definitions.map(function (def) {
          const li = createElement('li', '');
          function example() {
            if (def.example == undefined) { return "" } else {
              return '<em> (e.g. ' + def.example + ')</em>';
            }
          }
          li.innerHTML = def.definition + example();
          ul.appendChild(li);
        });

        item.synonyms.map(function (syno) {
          const li = createElement('li', '');
          if (syno == "") {
            return "";
          } else {
            li.innerHTML = syno;
            elUnorderedListSynonyms.appendChild(li);
          }
        });

        item.antonyms.map(function (anto) {
          const li = createElement('li', '');
          if (anto == "") {
            return "";
          } else {
            li.innerHTML = anto;
            elUnorderedListAntonym.appendChild(li);
          }
        });
        elSynonymParagraph.appendChild(elUnorderedListSynonyms);
        elAntonymParagraph.appendChild(elUnorderedListAntonym);

        bodyParagraph.appendChild(ul);

        if (elUnorderedListAntonym.innerHTML == "") {
          elAntonymParagraph.innerHTML = "";
          bodyParagraph.appendChild(elAntonymParagraph);
        } else {
          bodyParagraph.appendChild(elAntonymParagraph);
        }

        if (elUnorderedListSynonyms.innerHTML == "") {
          elSynonymParagraph.innerHTML = "";
          bodyParagraph.appendChild(elSynonymParagraph);
        } else {
          bodyParagraph.appendChild(elSynonymParagraph);
        }

        wrapperDiv.appendChild(h3);
        wrapperDiv.appendChild(bodyParagraph);
        select('#word-difinition-wrapper').appendChild(wrapperDiv);

      })

    });

  }



  function createElement(elType, classes) {
    const el = document.createElement(elType);
    el.classList = classes;
    return el;

  }



  /**
   * Main function
  */

  onload();




  /**
 * Preloader
*/

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  function startloading() {
    select('#submit').value = "Finding, please wait...";
    select('#submit').classList.add("loading");
  };

  function stoploading() {
    select('#submit').value = "Find Meaning";
  };

  /**
  * Handling event functions
  */

/*   on('focus', '#word', function (e) {
    this.value = "";
  }) */




  on('click', '#submit', function (e) {
    //e.preventDefualt();
    if (inputValidation(select("#word").value.trim().toLowerCase())) {
    
      fetchApiJson(select("#word").value.trim().toLowerCase());
      
    }
  }
  )









})()
