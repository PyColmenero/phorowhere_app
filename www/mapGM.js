class Mapp {
  constructor() {

    this.map;
    this.markers = [];
    this.position;
    this.isMoving;
    this.locations = [];
    this.locs_ids = [];
    this.url_id_set = false;

  }

  moveToLocation(lat, lng) {
    this.map.setCenter({ "lat": lat, "lng": lng })
  }

  set_marks() {

    var min_x = 1000;
    var min_y = 1000;
    var max_x = -1000;
    var max_y = -1000;

    for (var x = 0; x < this.locations.length; x++) {

      this.locs_ids.push(parseInt(this.locations[x].idPlace));

      var coor = {
        lat: parseFloat(this.locations[x].latitudePlace),
        lng: parseFloat(this.locations[x].longitudePlace)
      }

      if (min_x > coor.lat) min_x = coor.lat;
      if (min_y > coor.lng) min_y = coor.lng;
      if (max_x < coor.lat) max_x = coor.lat;
      if (max_y < coor.lng) max_y = coor.lng;

      const marker = new google.maps.Marker({
        position: coor,
        title: this.locations[x].namePlace,
        icon: "./img/marker.png",
        idPlace: this.locations[x].idPlace
      });

      this.markers.push(marker);

      marker.addListener('click', function () {

        var x_init = this.position.lat();
        var y_init = this.position.lng();

        place.id = this.idPlace;
        place.index_related = 0;
        place.map_marker_click(this.idPlace, x_init, y_init, true);

        draw(map.map.center.lat(), map.map.center.lng(), x_init, y_init);

      });
    }

    if (this.url_id_set) {
      var lat = parseFloat(filter.filters.lat);
      var lng = parseFloat(filter.filters.lng);
      var id = parseFloat(filter.filters.id);

      setTimeout(function () { map.map.setCenter({ "lat": lat, "lng": lng }); }, 500)
      map.map.setZoom(16);

      filter.filters = { "id": id };
      getLocations(filter.filters, "SHOWPLACE");

      filter.filters = { "near": true, "lat": lat, "lng": lng, "orderby": "viewsPlace", "orderDir": "DESC", "max": 99 };
      getLocations(filter.filters, "NEARTOMARK");
      document.getElementById("related-indected").scroll({
        left: 0,
        behavior: 'smooth'
      });
    }

    if (location.search != "") {
      if (this.locations.length != 0) {
        // si el filtro no es de loc
        if (!this.url_id_set) {
          
          setTimeout(function(){
            map.center_in_filters(min_x, min_y, max_x, max_y);
          }, 500)
        }
      } else {
        btnOpenFilter.html("<strong class='error'> NINGUN RESULTADO </strong>");
        map.map.setZoom(6);
      }
    }


    new MarkerClusterer(map.map, map.markers, {
      imagePath: "./img/ma"
    });

  }

  center_in_filters(min_x, min_y, max_x, max_y) {

    this.map.setCenter({ "lat": (min_x + max_x) / 2, "lng": (min_y + max_y) / 2 });

    console.log( (max_x - min_x) * 100 );
    console.log( (max_y - min_y) * 100 );

    if ((max_x - min_x) * 100 < 10 && (max_y - min_y) * 100 < 10) {
      map.map.setZoom(14);
    } else if ((max_x - min_x) * 100 < 50 && (max_y - min_y) * 100 < 50) {
      map.map.setZoom(10);
    } else if ((max_x - min_x) * 100 < 100 && (max_y - min_y) * 100 < 100) {
      map.map.setZoom(9);
    } else if ((max_x - min_x) * 100 < 200 && (max_y - min_y) * 100 < 200) {
      map.map.setZoom(8);
    } else if ((max_x - min_x) * 100 < 400 && (max_y - min_y) * 100 < 400) {
      map.map.setZoom(7);
    } else if ((max_x - min_x) * 100 < 1500 && (max_y - min_y) * 100 < 1500) {
      map.map.setZoom(6);
    } else {
      map.map.setZoom(5);
    }

    btnOpenFilter.text("Filtros: " + this.locations.length + " resultados.");

  }

}

let map;
var last_lat = 0;
var last_lng = 0;

function initMap() {

  map = new Mapp();
  filter = new Filter();

  map.map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: geo.lat,
      lng: geo.lng
    },
    zoom: 12,
  });

  google.maps.event.addDomListener(window, 'load', function () {

    filter.geturl_to_filter("map");

    getLocations(filter.filters, "MAP");

    //navigator.geolocation.getCurrentPosition(setUserPos, geo.showError, { enableHighAccuracy: true });
  
  });

}

function setUserPos(position) {

  clearTimeout(geo.timeOut);

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  geo.save_pos(latitude, longitude)


  map.position = {
    "lat": latitude,
    "lng": longitude
  };

  map.moveToLocation(latitude, longitude);
}


$(document).on("click", ".place_realated", function () {

  
  var lat = $(this).attr("data-lat");
  var lng = $(this).attr("data-lng");
  var id = $(this).attr("data-id");
  var index = $(this).attr("data-index");

  place.map_marker_click(id, lat, lng, false, index);

  map.map.setZoom(14);
  draw(map.map.center.lat(), map.map.center.lng(), lat, lng);

});