$(document).ready(function() {
  $("#search").on("click", function(){
   var cityName = $("#search").val(); 

  $("#search").val("");

  currentOWA(cityName);
  });

  $(".cityList").on("click", function(){
    currentOWA($(this).text());
  });

  //append the list of cities
  function cityHistory(text) {
    var app = $("<li>").addClass("list-group list-group-flush").text(text);
    $(".cityList").append(app);
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
  window.localStorage.setItem("cityList", JSON.stringify(cityList));
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
  body.append(title, temp, hum, windspd);
  //call other 2 ajax calls//function
  forecastOWA(cityName);
  uviOWA(response.coord.lat, response.coord.lon);
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
      addTableRow(response);
    });
  }

  for (var i = 0; i < response.list.length; i++) {
    if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
  //parts from project go here
  var forecastDiv = $("<div>").addClass("col-md-3");
  var card = $("<div>").addClass("card bg-primary text-white ");
  var body = $("<div>").addClass("card-body");
  var img = $("<img>").attr("src", "http://openweathermap.org/img/w" + response.list[i].weather[0].icon + ".png");
  var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
  var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp);
  var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity);

  forecastDiv.append(card.append(body.append(title, p1, p2, img, body)));
              $("#forecast.row").append;

}
  }
  //uv index
function uviOWA() {
  var query3URL =
  "http://api.openweathermap.org/data/2.5/uvi?q=&appid=6da06b04e4767b3319293983361bca86" + lat + "&lon=" + lon;
  $.ajax({
    url: query3URL,
    method: "GET",
   dataType: 'json',
  }).then(function(response) {
    var uvi = $('<p>').text("UV Index: ");
    var button = $('<span>').addClass("btn btn-sm").text(response.value);
    //color changes on UV value
    if (data.value < 3){
      button.addClass("btn-success");
     } else if (data.value < 6){
        button.addClass("btn-warning");
      }
      else {
        button.addClass("btn-danger");
      }
      $("#uv").append(uvi.append(button));
    }
    )
    
    }
  
  

var cities = JSON.parse(windowLocalStorage.getItem(".cityList"));

  });