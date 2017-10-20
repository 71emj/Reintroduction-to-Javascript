const urlSample = new Array;

urlSample[0] = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=Ludwig_Mies_van_der_Rohe&limit=10";
urlSample[1] = "/w/api.php?action=query&format=json&maxage=0&origin=*&prop=info%7Cextracts%7Cimages&list=search&meta=&indexpageids=1&titles=Main%20Page&pageids=&callback=&inprop=url%7Cdisplaytitle&intestactions=&imlimit=2&srsearch=Ludwig%20Mies%20van%20derRohe&srnamespace=&srlimit=5";




for (let i = 0; i < urlSample.length; i++) {
	fetch(urlSample[i])
    .then(function(resp) {
        console.log(resp);
        return resp.json();
    }).then(function(data) {
        console.log(data)
    });
}
