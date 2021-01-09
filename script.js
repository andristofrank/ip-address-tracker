var apiKey = 'at_UVRXJWzj8rBX6SCHscWKiI1Q0nkOP';
var apiPath = 'https://geo.ipify.org/api/v1?';
var mapboxToken = 'pk.eyJ1IjoiYW5kcmV0b2YiLCJhIjoiY2tqbHJibWwyNjVocTJybGczYTY2YzVqdSJ9.bZrSA1uiEGt2BxrMkOMVKw';

var inputTest; 
var retrievedData;
var searchInputElement = document.getElementById('search-input');
searchInputElement.value = '83.137.6.170';
var searchInput;
var searchButton = document.getElementById('button-search').addEventListener('click', () => {
    searchInput = searchInputElement.value;
    searchIpUser();
});

var locationIp;

function searchIpUser() {
    var url = apiPath + 'apiKey=' + apiKey + '&ipAddress=' + searchInput;
    console.log(url);
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
    // console.log(request.responseText);
    retrievedData = JSON.parse(request.responseText);
    console.log(retrievedData);
    console.log(retrievedData.location.city);

    locationIp = new L.LatLng(retrievedData.location.lat, retrievedData.location.lng);
    console.log(locationIp);
    mymap.flyTo(locationIp, 14);
    var marker = L.marker([retrievedData.location.lat, retrievedData.location.lng]).addTo(mymap);
    };
    request.send();

    return url;
}

$(document).on("focus" , ".search-box" , function () {

    $(this).removeAttr('placeholder');

});

$(document).on("focusout" , ".search-box" , function () {

    if($(this).val() == ''){
        $(this).attr('placeholder' , "Search for any IP address or domain");
        //$(this).attr('placeholder').css({'padding-left': ''});
    }

});

var mymap = L.map('mapid');
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
mymap.setView(new L.LatLng(51.50853, -0.12574), 14);
