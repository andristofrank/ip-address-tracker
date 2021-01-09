var apiKey = 'at_UVRXJWzj8rBX6SCHscWKiI1Q0nkOP';
var apiPath = 'https://geo.ipify.org/api/v1?';
var mapboxToken = 'pk.eyJ1IjoiYW5kcmV0b2YiLCJhIjoiY2tqbHJibWwyNjVocTJybGczYTY2YzVqdSJ9.bZrSA1uiEGt2BxrMkOMVKw';

var ipAddressElement = document.getElementById('ipAddress');
var locationElement = document.getElementById('location');
var timezoneElement = document.getElementById('timezone');
var ispElement = document.getElementById('isp');

var retrievedData;
var searchInputElement = document.getElementById('search-input');

var searchInput = '83.137.6.170';
var searchButton = document.getElementById('button-search').addEventListener('click', () => {
    searchInput = searchInputElement.value;
    searchIpUser();
});

$(window).on('load', () => {
    searchIpUser();
});

function searchIpUser() {
    var url = apiPath + 'apiKey=' + apiKey + '&ipAddress=' + searchInput;
    console.log(url);
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
    retrievedData = JSON.parse(request.responseText);

    locationIp = new L.LatLng(retrievedData.location.lat, retrievedData.location.lng);
    
    mymap.flyTo(locationIp, 14, {animate:  true, duration: 1});
    var marker = L.marker([retrievedData.location.lat, retrievedData.location.lng]).addTo(mymap);

    ipAddressElement.innerHTML = retrievedData.ip;
    locationElement.innerHTML = retrievedData.location.city + ', ' 
        + retrievedData.location.country 
        + retrievedData.location.postalCode;
    timezoneElement.innerHTML = 'UTC ' + retrievedData.location.timezone;
    ispElement.innerHTML = retrievedData.isp;
    };
    
    request.send();

    return url;
}

$(document).on("focus" , ".search-box" , function () {

    $(this).removeAttr('placeholder');

});
$(document).on('resize',  () => { mymap.flyTo(locationIp, 14);})
$(document).on("focusout" , ".search-box" , function () {

    if($(this).val() == ''){
        $(this).attr('placeholder' , "Search for any IP address or domain");
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
