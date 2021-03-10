
//API key for OpenWeather.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

$(document).ready(function () {
    //Variables
    var searchButton = $("#searchBtn");
    var usCity = $("#cityInput");
    var austinEl = $("#austin");
    var chicagoEl = $("#chicago");
    var newYorkEl = $("#newYork");
    var orlandoEl = $("#orlando");
    var sanFranciscoEl = $("#sanFrancisco");
    var seattleEl = $("#seattle");
    var denverEl = $("#denver");
    var atlantaEl = $("#atlanta");
//this will populate the date in the weather div.
var momentDates = moment().format("MMMM Do YYYY");
$("#currentDate").append(momentDates);
$("#dateBox").append(momentDates);

for (i = 1; i < 6; i++) {
    var addDay = moment().add(i, 'days');
    console.log(addDay.format("MMMM Do YYYY"));

    $("#day" + i + "Date").append(addDay.format("MMMM Do YYYY"));

}
    //prompt for user location
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        //Imperial returns degrees F
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&units=imperial&appid=" + weatherKey,
            method: "GET"
            //next step is to produce results.
        }).then(function (response) {
            // //Log the resulting object
            // console.log(response);

            var cityEl = response.name;
            $("#cityStats").html(cityEl);
            $("#cityForecast").html("Weather Forecast: " + cityEl);

            //Produces results for current weather
            var currentTempEl = response.main.temp;
            $("#temperature").html("Current Temperature: " + currentTempEl + "&deg;F");
            $("#currentTemp").html(currentTempEl + "&deg;F");

            //specific traits
            $("#humidity").html("Humidity: " + response.main.humidity + "&#37;"); //humidity
            $("#windSpeed").html("Wind Speed: " + response.wind.speed + " mph"); //wind speed

            //current weather conditions
            var currentConditionEl = response.weather[0].description; //Icon display
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            $("#currentIcon").attr('class', flowersIcon);
    //    calls lat and long while performing another ajax function to get uv index
       $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + weatherKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
        method: "GET"
    }).then(function (responseUV) {
        // console.log(responseUV);
        $("#wikiUV").html(responseUV.value);
        //adds a link to wikipedia's page on UV ranges and their color codes, learned didn't know there were color codes.
        $("#wikiUV").attr("href", "https://en.wikipedia.org/wiki/Ultraviolet_index#Index_usage");
        $("#wikiUV").attr("target", "_blank");
// Assigns UV index color code accordingly, edits css .
        if (responseUV.value <= 2) {
            $("#wikiUV").css("background-color", "green");
        } else if ((2 < responseUV.value) && (responseUV.value <= 5)) {
            $("#wikiUV").css("background-color", "yellow");
        } else if ((5 < responseUV.value) && (responseUV.value <= 7)) {
            $("#wikiUV").css("background-color", "orange");
        } else if ((7 < responseUV.value) && (responseUV.value <= 10)) {
            $("#wikiUV").css("background-color", "red");
        } else {
            $("#wikiUV").css("background-color", "purple");
        }
    });
});
    }})
