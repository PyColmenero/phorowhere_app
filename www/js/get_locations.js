var locations = [];

const getLocations = (filters, from, index_b) => {

    $.ajax({
        type: "POST",
        url: "https://acolmenero.site/photowhere/php/get_places.php", 
        // url: "./php/get_places.php",
        data: { "filter": filters },
        success: function (res) {

            try {
                
                locations = JSON.parse(res);

            } catch (e) {
                console.log(e);
                console.log(res);
                
            }

            if (from == "MAP") {
                map.locations = locations;
                map.set_marks();
            } else if (from == "NEAR") {
                load_photo_places(locations, "near_cont");
            } else if (from == "POPULAR") {
                load_photo_places(locations, "popular_cont");
            } else if (from == "PLACES") {
                load_photo_places(locations, "places_cont");
            } else if (from == "SHOWPLACE") {
                place.show_place(locations);
            } else if (from == "SEARCH") {
                generatePlaces(locations);
            } else if (from == "NEARTOMARK") {
                place.load_near_places(locations);
            } else if (from == "USER") {
                load_photo_places(locations, "user_cont");
            }

        }
    });
}

/**
 * 
 * 
 * Arreglar IMG close filtros
 * 
 */