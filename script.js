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
            $("#waitingText").css("visibility", "hidden");
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
        new Glide('.glide').mount();
        return
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


        var orbitList = $("<ul>");

        for(var i = 0; i < filteredResults.length; i++) {
            var newOrbitItem = $("<li>");
            newOrbitItem.attr("class", "orbit-slide");
            newOrbitItem.attr("data-slide", JSON.stringify(i));
            //newOrbitItem.css("max-height", "666px");
            //newOrbitItem.css("position", "relative");
            //newOrbitItem.css("display", "none");

            var figure = $("<figure>");
            figure.attr("class", "orbit-figure");

            var image = $("<img>");
            image.attr("src", "https://placehold.it/1200x600/888?text=Slide-2");
            image.attr("class", "orbit-image");

            var imageCaption = $("<figcaption>");
            imageCaption.attr("class", "orbit-caption");
            imageCaption.text(i);

            figure.append(image);
            figure.append(imageCaption);

            var orbitDiv = $("<div>");
            var header = $("<h3>");
            header.attr("class", "text-center");

            var par = $("<p>");
            par.attr("class", "text-center");

            orbitDiv.append(header);
            orbitDiv.append(par);

            newOrbitItem.append(figure);
            newOrbitItem.append(orbitDiv);

            orbitList.append(newOrbitItem);
        }
        var carousel = new Foundation.Orbit(orbitList);

        $("body").append(carousel);
    }

    navigator.geolocation.getCurrentPosition(giveLocation);

    $(".distance").on("click", filter);
});
