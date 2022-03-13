$(".nav__button").click(function () {

    var attr = $(this).attr("data-url");
    window.location = "./" + attr;

});

var deepLinkingData = null;

window.handleOpenURL = function (url) {


    setTimeout(function () {

        deepLinkingData = url.substring(14);
        deepLinkingData = deepLinkingData.split("=");

        if (deepLinkingData[0] == "id") {
            window.location = "./map.html?id=" + deepLinkingData[1];
        }

    }, 0);

};