$(document).ready(function() {
  $("#search").on("click", function(){
   var cityName = $("#input").val(); 

  $("#input").val("");

  currentOWA(cityName);
  });

  $(".cityList").on("click", function(){
    currentOWA($(this).text());
  });

  //append the list of cities
  function cityHistory(text) {
    var app = $("<li>").addClass("list-group list-group-flush").text(text);
    $(".cityList").prepend(app);
  }



function currentOWA(cityName) {
    var query1URL =
    "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6da06b04e4767b3319293983361bca86";
    $.ajax({
      url: query1URL,
      method: "GET",
     dataType: 'json',
    }).then(function(response) {
//create link for every search
if (cities.indexOf(cityName) === -1) {
  cities.push(cityName);
  window.localStorage.setItem("cityList", JSON.stringify(cities));
  cityHistory(cityName);
}
   $("#today").empty();



   //jhtml content for daily weather
  // var card1 = $("<div>").addClass("card bg-primary text-white ");
  // var body = $("<div>").addClass("card-body");
  var img = $("<img>").attr("src", "http://openweathermap.org/img/w" + response.weather[0].icon + ".png");
  var title1 = $("<h5>").addClass("card-title").text(response.name +" (" + new Date().toLocaleDateString() + ")");
  var temp = $("<p>").addClass("card-text").text("Temp: " + response.main.temp);
  var hum = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity);
  var windspd = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed);
  var body = $("#today");
  title1.append(img);
  body.append(title1, temp, hum, windspd);
  //call other 2 ajax calls//function

  lat = response.coord.lat;
  lon = response.coord.lon;
  forecastOWA(cityName);
  uviOWA(lat, lon);

    });
  }
// $(api.openweathermap.org/data/2.5/forecast?q={city name}&appid={6da06b04e4767b3319293983361bca86}

  //forecast 
  function forecastOWA(cityName) {
    var query2URL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6da06b04e4767b3319293983361bca86";
    $.ajax({
      url: query2URL,
      method: "GET",
     dataType: 'json',
    }).then(function(response) {
     


//   for (var i = 0; i < response.list.length; i++) {
//     if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
//   //parts from project go here
//   var forecastDiv = $("<div>").addClass("col-md-3");
//   var card = $("<div>").addClass("card bg-primary text-white ");
//   var body = $("<div>").addClass("card-body");
//   var img = $("<img>").attr("src", "http://openweathermap.org/img/w" + response.list[i].weather[0].icon + ".png");
//   var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
//   var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp);
//   var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity);

//   forecastDiv.append(card.append(body.append(title, p1, p2, img, body)));
//               $("#forecast .row").append(forecastDiv);

// }
//   }
// Creating weather report div elements
var weatherReport = $("<div class='card blue-grey'>");
var cityNameEl = $("<span class='card-title'>" + location + " -  " + currentDate + "</span>");
var weatherIconEl = $("<img src=http://openweathermap.org/img/w/" + weatherIcon + ".png" + ">");
var descriptionEl = $("<p>  " + description + "</p>");
var tempEl = $("<p>Temperature: " + tempF + "°F" + "</p><br>");
var humidityEl = $("<p> Humidity: " + humidity + "%" + "</p><br>");
var windSpeedEl = $("<p> Wind Speed: " + windSpeed + " m/s" + "</p><br>");
var uvIndexEl = $("<p> UV Index: </p>");
var cardContentDiv = $("<div class='card-content white-text'>");

// Appending them to the weather report div space
weatherReport.append(cardContentDiv);
cardContentDiv.append(cityNameEl);
cardContentDiv.append(descriptionEl);
cardContentDiv.append(weatherIconEl);
cardContentDiv.append(tempEl);
cardContentDiv.append(humidityEl);
cardContentDiv.append(windSpeedEl);
uvIndexEl.append(uvIndex);
cardContentDiv.append(uvIndexEl);
$("#forecast").append(weatherReport);
});

// });
}
//uv index http://api.openweathermap.org/data/2.5/uvi?q=&appid=6da06b04e4767b3319293983361bca86=47.61&lon=47.61
function uviOWA(lat, lon) {
  var query3URL =
  "http://api.openweathermap.org/data/2.5/uvi?q=&appid=6da06b04e4767b3319293983361bca86&lat=" + lat + "&lon=" + lon;
  $.ajax({
    url: query3URL,
    method: "GET",
   dataType: 'json',
  }).then(function(response) {
    var uvi = $('<p>').text("UV Index: ");
    var button = $('<span>').addClass("btn btn-sm").text(response.value);
    //color changes on UV value
    if (response.value < 2){
      button.addClass("btn-success");
     } else if (response.value >= 3 && response.value <= 7.99){
        button.addClass("btn-warning");
      }
      else {
        button.addClass("btn-danger");
      }
      $("#uv").append(uvi.append(button));
    }
    )
    
    }
  
  

var cities = JSON.parse(window.localStorage.getItem(".cityList")) || [];

if (cities.length > 0) {
  currentOWA(cities[cities.length-1]);
}
for (var i = 0; i < cities.length; i++) {
  cityHistory(cities[i])
}
  });