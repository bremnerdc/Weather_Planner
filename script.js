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
    var app = $("<li>").addClass("list-group-item").text(text);
    $(".cityList").prepend(app);
  }



function currentOWA(cityName) {
    var query1URL =
    "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6da06b04e4767b3319293983361bca86&units=imperial";
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
  var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
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
    "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6da06b04e4767b3319293983361bca86&units=imperial";
    $.ajax({
      url: query2URL,
      method: "GET",
     dataType: 'json',
    }).then(function(response) {
     

      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

  for (var i = 0; i < response.list.length; i++) {
    if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
      console.log(response.list[i].dt_txt);
  //parts from project go here
  var forecastDiv = $("<div>").addClass("col-md-2");
  var card = $("<div>").addClass("card bg-primary text-white ");
  var body = $("<div>").addClass("card-body");
  var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
  var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
  var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp);
  console.log(response.list[i].main.temp);
  var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity);

  forecastDiv.append(card.append(body.append(title, p1, p2, img, body)));
              $("#forecast .row").append(forecastDiv);

}
  }
});
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

      $("#today").append(uvi.append(button));
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