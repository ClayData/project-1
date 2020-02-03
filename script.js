$(document).ready(function() {

    var lat;
    var long;
    var restaurantData;
    var finalResults = [];

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
            $(".load-wrapper").css("visibility", "hidden");
            $("button").css("visibility", "visible");

            restaurantData = tripAdvisoresponse;
        });
    }

    navigator.geolocation.getCurrentPosition(giveLocation);
    $(".button").on("click", filter);

    function filter(){
            for(var i = 0; i < restaurantData.data.length; i++) {
                if(restaurantData.data[i].distance != undefined && restaurantData.data[i].name != undefined) {
                    if(restaurantData.data[i].distance < $(this).attr("data-distance")) {
                        finalResults.push(restaurantData.data[i]);
                    }
                }
            }
            console.log(finalResults);
    }
    $(window).on("load", function(){
    $(".loader-wrapper").fadeOut("slow");
   })

});
