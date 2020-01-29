var lat;
var long;

function giveLocation(responce) {
    lat = responce.coords.latitude;
    long = responce.coords.longitude;
    $("body").text(lat + "  " + long);
}

navigator.geolocation.getCurrentPosition(giveLocation);
