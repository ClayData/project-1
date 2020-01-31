$(document).ready(function() {

    var lat;
    var long;

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
            console.log(tripAdvisoresponse);
            console.log(lat + " " + long)
        
        });
    }
    function search_restaurant() { 
    let input = document.getElementById('searchbar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('restaurants'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="in-line-block";                  
        } 
    } 
}

    navigator.geolocation.getCurrentPosition(giveLocation);
});
