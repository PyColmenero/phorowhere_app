

function load_photo_places(locs, element) {

    var str = "";

    for (var x = 0; x < locs.length; x++) {
        var loc = locs[x];
        var src = "https://acolmenero.site/photowhere/img/places/" + loc.photosPlace.split("@")[0];

        style = "style='background: url(\""+src+"\") no-repeat center; background-size:cover'";
        str += "<div class='place' data-id='" + loc.idPlace + "' "+style+" ></div>";
    }

    console.log(locs.length);
    if(locs.length == 0){
        $("." + element).html("<p class='none'>Ningún resultado...</p>");
    } else {
        $("." + element).html(str);
    }


}



/*

function load_photo_places(locs, element) {

    places_str[element] = [];
    current_photos[element] = 0;
    var str = "";

    for (var x = 0; x < locs.length; x++) {

        console.log("ola?");
        var loc = locs[x];
        //var img = new Image();
        var src = "https://acolmenero.site/photowhere/img/places/" + loc.photosPlace.split("@")[0];


        img.src = src;
        img.id = loc.idPlace;
        img.title = loc.namePlace;
        img.orderIndex = x;
        img.element = element;
        img.len = locs.length;

        style = "";
        str += "<div class='place' data-id='" + loc.idPlace + "'  style='background: url(\""+src+"\") no-repeat center; background-size:cover'  >"; //style='background: url(\""+src+"\") no-repeat center; background-size:cover'
        //str += "<img src='" + src + "' style='" + style + "'>";
        str += "</div>";

        img.onload = function () {

            photos_str = ""

            var style = "";
            var ASPECT;

            if (this.width == this.height) ASPECT = "square";
            if (this.width < this.height) {
                ASPECT = "ver";
                style = ((this.height - this.width) / 2);
                style = 100 / (this.height / style);

                var new_h = (((window.innerWidth / 3) - 8) * this.height) / this.width;
                style = (new_h / 100) * style;
                if (index_b - 1 == current_photos[this.element]) style *= 2;

                style = "top:-" + style + "px";
            }
            if (this.width > this.height) {
                ASPECT = "hor";
                style = ((this.width - this.height) / 2);
                style = 100 / (this.width / style);

                var new_w = (((window.innerWidth / 3) - 8) * this.width) / this.height;
                style = (new_w / 100) * style;
                if (index_b - 1 == current_photos[this.element]) style *= 2;

                style = "left:-" + style + "px";
            }


            photos_str += "<div class='place' data-id='" + this.id + "'>";
            photos_str += "<img src='" + this.src + "' class='" + ASPECT + "' style='" + style + "'>";
            photos_str += "</div>";

            places_str[this.element][parseInt(this.orderIndex)] = photos_str;
            current_photos[this.element]++;

            //$("#places").html($("#places").html()+"<b style='color:white'>" + this.src + ": " + current_photos[this.element] + ": " + this.len + "</b>");

            
            console.log(current_photos[this.element] + ":" + this.len);
            if (current_photos[this.element] % 5 == 0) {
                $("." + element).html(places_str[this.element].join(""));
            }

        }
    }


    $("." + element).html(str);

}

*/