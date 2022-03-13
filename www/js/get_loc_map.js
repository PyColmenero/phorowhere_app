function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: geo.lat,
            lng: geo.lng
        },
        zoom: 12,
        fullscreenControl: false
    });

    var coor = {
        lat: 0,
        lng: 0
      }
    marker = new google.maps.Marker({
        position: coor,
        title: "User click location",
        icon: "./img/marker.png"
    });
    marker.setMap(map);

    google.maps.event.addListener(map, 'click', function (e) {

        if (is_open) {
            //Determine the location where the user has clicked.
            loc = e.latLng;
            marker.setPosition(loc);
            
            close.attr("src", "./img/check.svg")
        }


    });

}

var marker;
var loc;
var map_div = $("#map_div");
var map_d = $("#map");
var close = $("#close");
var map_data = $("#map_data");

var is_open = false;

map_div.click(function () {

    if (!is_open) {
        map_div.attr("class", "open");
        map_d.attr("class","mapw");
        close.removeAttr("class");
        is_open = true;
    }

});
close.click(function () {
    map.setCenter(loc)
    map_div.removeAttr("class");
    map_d.removeAttr("class")
    close.attr("class", "hidden");
    is_open = false;

    if(loc != null){
        bug.lat = loc.lat()
        bug.lng = loc.lng()
        map_data.text(loc.lat() + "," + loc.lng() );
    }
})