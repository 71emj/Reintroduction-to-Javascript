(function () {
    "use strict";

    // change blockquote text, every once in a while

    (function changingBlockQuoteText() {
        const blockQuote = document.querySelector('blockquote.blockquote'),
            blkQuoteText = document.querySelectorAll('span.blkquote-contents');

        function randomSel(randomNum) {
            return Math.floor(Math.random() * randomNum);
        }

        function capitalizedQuote(string) {
            const regExp = new RegExp(/[a-zA-Z]/),
                firstAlphabet = string.slice(string.search(regExp), string.search(regExp) + 1);
            return string = string.replace(regExp, firstAlphabet.toUpperCase());
        }

        function fadeIn(target) {
            return new Promise(function (resolve) {
                target.style.opacity = 1;
            });
        }

        function changeBlkQuote(timeOut, timeIn, prevText) {
            let curText = capitalizedQuote(
                blkQuoteText[randomSel(blkQuoteText.length)].textContent);

            while (prevText === curText) {
                curText = capitalizedQuote(
                    blkQuoteText[randomSel(blkQuoteText.length)].textContent);
            }

            blockQuote.textContent = `" ${curText} "`;

            fadeIn(blockQuote).then(setTimeout(function () {
                blockQuote.style.opacity = 0;
                // timeout is set exactly after css transisiton is executed, timeIn === 'opacity ease-in 2400ms'
                setTimeout(function () {
                    return changeBlkQuote(timeOut, timeIn, curText);
                }, timeIn); 
            }, timeOut));
        }

        changeBlkQuote(8000, 2400);

    }());

    // setting up youtube api 

    (function settingUpYoutubeAPI() {

        /* targets to manipulate in the original DOM tree*/
        const videoAlbum = document.querySelector('.video-album'),
            albumBox = document.querySelector('.album-box')

        /* setting up for youTube api */
        const scriptTag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        scriptTag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

        let player;

        // the youtube object needs to be called under the window object
        window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
            return player = new YT.Player('youtube-video', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(e) {
            console.log("hey Im ready");
            e.target.playVideo();
            e.target.mute();
        }

        function timeEvent(timing, firstTarget, secondTarget) {
            return new Promise(function(resolve) {
                resolve(
                    setTimeout(function () {
                        firstTarget.style.background = 'transparent';
                        firstTarget.style.cursor = 'pointer';
                        secondTarget.style.opacity = 0;
                    }, timing)
                );
            });
        }

        function onPlayerStateChange(e) {
            console.log("my state changed");
            console.log(e.target.getPlayerState());

            /* 1) getting the vidDuration to initiate ending event prior to video ending
               thus being able to create illusion of an infinite loop.
               2) 3 === 3000ms, the number set for css animation with a 0.6s margin */
            let vidDuration = (e.target.getDuration() - 3) * 1000;

            /* using switch statement instead of if/else here is mostly for the purpose of
               recylcling the code in the future (where I will actually need to check other 
               state of the youtube player) */
            switch (e.target.getPlayerState()) {
                case 0:
                    setTimeout(function () {
                        e.target.playVideo();
                        console.log('Another playback starts now.');
                    }, 4000);
                    break;
                case 1:
                    timeEvent(3000, albumBox, videoAlbum).then(function() {
                        setTimeout(function () {
                            videoAlbum.style.opacity = 1;
                            albumBox.style.background = '#000';
                            albumBox.style.cursor = 'initial';
                            console.log('My first successful Promise!! :)');
                        }, vidDuration);
                    });
                    break;
                default:
                    console.log('Video not playing...for some reason ;(');
            }
        }

        /* Since an invisible image is covering the video player to prevent hovering effect of 
           youtube player, this function reattached pause function to the layer */
        albumBox.addEventListener('click', function() {
            /* I replace the original piece of if/else statement 
               with simple operator */
            (player.getPlayerState() === 1 && player.pauseVideo())
                || player.playVideo();
        })

    }());

}());




/* fetch library - wiki api example snippets */
/*
fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=Ludwig_Mies_van_der_Rohe&limit=10").then(function(resp) {
    console.log(resp);
    return resp.json();
}).then(function(data) {
    console.log(data);
    console.log(typeof(data));

    for (let i = 0; i < data.length; i++) {
        let j = 0;
        while (data[i][j]) {
            if (data[i][j] !== 'https://en.wikipedia.org/wiki/Ludwig_Mies_van_der_Rohe') {
                j++;
            } else {
                var mySearch = {
                    index1: i,
                    index2: j,
                };
                break;
            }
        }
    }
    callBack(data[mySearch.index1][mySearch.index2]); // target object
})


function callBack(searchURL) {
    fetch(`${searchURL}/w/api.php?&action=query&prop=extracts`).then(function(resp) {
        console.log(resp);
    })
}


fetch(url).then(function(response) {
    response.text().then(function(text) {
        poemDisplay.textContent = text;
    });
});

*/


/*
    the process of fetching text contents to populate the page takes too long
    to respond.

    document.addEventListener('load', fetchMeText());

    function fetchMeText() {
        console.log("It's gonna be a long day~");
        fetch('text/text5.txt').then(function(resp) {
                    console.log('got it');
                    resp.text().then(function(text) {
                        document.querySelector('p.textContent').textContent = text;
                    }) })
    }
*/