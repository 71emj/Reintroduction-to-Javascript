/*
  navigator.geolocation.getCurrentPosition(success[ , error[ , options]])
*/

/*
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

*/

(function mapInit() {
    "use strict";

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(pos) {
            const contentBody = document.querySelector('.content-body'),
                mapViewPort = contentBody.appendChild(document.createElement('div')),
                para = contentBody.insertBefore(document.createElement('p'), mapViewPort);

            mapViewPort.setAttribute('id', 'map_canvas');
            para.appendChild(document.createTextNode(
                'This is where we are right now :)'));

            const latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                myLoc = {
                    zoom: 12,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    disableDefaultUI: true
                },
                //create new google map instances
                map = new google.maps.Map(mapViewPort, myLoc),
                iconBaseUrl = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/',
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: (`https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=000000,ff000000&scale=1.0`),
                    map: map,
                });

        }, function() {
            console.log('error');
            const para = document
                .querySelector('.content-body')
                .appendChild(document.createElement('p')),
                msg = {
                    denied: 'Why do you reject me? :-(',
                    other: 'Argh, no geolocation!'
                };

            //check if the error is caused by user rejection
            para.appendChild(document.createTextNode(!(navigator.permissions.state === 'granted') ? msg.denied : msg.other));
        });

    } else { //else statement not processing
        const msg = 'It seems to me your browser don\'t have geolocation~',
            para = document
            .querySelector('.content-body')
            .appendChild(document.createElement('p'));

        para.textContent = msg;
    }
}());

