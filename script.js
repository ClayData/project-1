$(document).ready(function() {

    var cuisineType = "";
    var price = "";
    var distance = "";
    
    var lat;
    var long;

    function giveLocation(geoResponse) {
        lat = geoResponse.coords.latitude;
        long = geoResponse.coords.longitude;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=10&lunit=mi&lang=en_US&latitude="+lat+"&longitude="+long,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "caaa1aa51cmsh34aeffc6045e01dp1cb5e9jsnff5f9d0222cc"
            }
        }
        
        $.ajax(settings).done(function (tripAdvisoresponse) {
            console.log(tripAdvisoresponse);

        
        });
    }
    
    navigator.geolocation.getCurrentPosition(giveLocation);
});
