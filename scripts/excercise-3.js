(function() {
    "use strict";

    const verseChoose = document.querySelector('article.content-body select'),
        poemDisplay = document.querySelector('pre#text-display');

    const s = new XMLSerializer(),
        d = document.querySelector('body');

    poemDisplay.textContent = s.serializeToString(d);

    verseChoose.addEventListener('change', function(e) {
        const verse = e.target.value;
        updateDisplay(verse);
    });

    /*
	    function updateDisplay(verse) {

	        verse = verse.replace(/[^a-z]/, "");
	        verse = verse.toLowerCase();
	        const url = (`text/${verse}.txt`),
	            request = new XMLHttpRequest();
	        request.open('GET', url);
	        request.reponseType = 'text';
	        request.onload = function() {
	            poemDisplay.textContent = request.response;
	        };
	        request.send();
	    }
    */

    function updateDisplay(verse) {
        
        verse = verse.replace(/[^a-z]/, "");
        verse = verse.toLowerCase();
        const url = (`text/${verse}.txt`);
        
        console.log(fetch(url));
        console.log(typeof(fetch(url)));
        console.log();
        
        fetch(url).then(function (response) {
        	response.text().then(function (text) {
        		poemDisplay.textContent = text;
        	});
        });
    }
}());