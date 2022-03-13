// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var user_lat;
var user_lng;

var page = null;
var firsttime = null;

function onDeviceReady() {

    page = getPage();
    var allowed_geo = localStorage.getItem("allowed_geo");

    if (allowed_geo == null) {
        // enseñar PopUp de ke aktives La pta LokaLisasión 
        active_pos.css("display", "flex");
    }

    load_regarding_page();



}


function getPage() {
    var page = "";
    if (location.pathname.indexOf("index.html") != -1) page = "index";
    if (location.pathname.indexOf("map.html") != -1) page = "map";
    if (location.pathname.indexOf("near.html") != -1) page = "near";
    if (location.pathname.indexOf("places.html") != -1) page = "places";
    return page;
}

var index_locations = [];
var near_locations
const get_near_locations = (lat, lng, max) => {
    $.ajax({
        type: "POST",
        url: "https://acolmenero.site/photowhere/php/get_near_locations.php",
        // url: "./php/get_near_locations.php",
        data: {
            "lat": lat,
            "lng": lng,
            "max": max
        },
        success: function (res) {

            try {

                near_locations = JSON.parse(res);

                if (page == "map") place.load_near_places(near_locations);
                if (page == "index") {
                    index_locations = index_locations.concat(near_locations);
                    load_photo_places(near_locations, "near_cont");
                }
                if (page == "near") load_photo_places(near_locations, "near_cont");



            } catch (e) {
                console.log(e);
                console.log(res);

            }
        }
    });
}


var popular_locations;
const get_popular_locations = (max) => {
    $.ajax({
        type: "POST",
        url: "https://acolmenero.site/photowhere/php/get_popular_locations.php",
        // url: "./php/get_popular_locations.php",
        data: {
            "max": max
        },
        success: function (res) {

            try {

                popular_locations = JSON.parse(res);
                load_photo_places(popular_locations, "popular_cont");
                if (page == "index") {
                    index_locations = index_locations.concat(popular_locations);
                } else {
                    index_locations = popular_locations;
                }

            } catch (e) {
                console.log(e);
                console.log(res);

            }
        }
    });
}

const get_filter_locations = () => {
    $.ajax({
        type: "POST",
        url: "https://acolmenero.site/photowhere/php/get_filter_locations.php",
        // url: "./php/get_filter_locations.php",
        data: {
            "filter": filter.filters
        },
        success: function (res) {

            try {
                index_locations = JSON.parse(res);

                if (page == "map") {
                    map.locations = index_locations;
                    map.load_locations()
                }
                if (page == "places") {
                    load_photo_places(index_locations, "places_cont");
                }


            } catch (e) {
                console.log(e);
            }
        }
    });
}