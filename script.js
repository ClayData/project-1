$(document).ready(function() {
    
$(document).foundation();
       
    var lat;
    var long;
    var restaurantData;
    var filteredResults = [];

    function giveLocation(geoResponse) {
        lat = geoResponse.coords.latitude;
        long = geoResponse.coords.longitude;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=1&lunit=mi&lang=en_US&latitude="+lat+"&longitude="+long,
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

    function filter(){
        filteredResults = [];
        
        for(var i = 0; i < restaurantData.data.length; i++) {
            if(restaurantData.data[i].distance != undefined && restaurantData.data[i].name != undefined) {
                if(restaurantData.data[i].distance < $(this).attr("data-distance")) {
                    filteredResults.push(restaurantData.data[i]);
                }
            }
        }
        buildOrbitSlides();
    }

    function buildOrbitSlides() {
        for(var i = 0; i < filteredResults.length; i++) {
            var element = $("<li>");
            element.attr("class", "glide__slide");

            var image = $("<img>");
            image.attr("src", "https://placehold.it/1200x600/888?text=Slide-2");
            element.append(image);

            $(".glide__slides").append(element);
        }
        new Glide('.glide').mount();
        return
    }

    navigator.geolocation.getCurrentPosition(giveLocation);

    $(".distance").on("click", filter);
});
