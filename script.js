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



function currentOWA() {
    var query1URL =
    "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6da06b04e4767b3319293983361bca86";
    $.ajax({
      url: query1URL,
      method: "GET",
     dataType: 'json',
    }).then(function(response) {
//create link for every search
if (cities.indexOf(cityName) === -1) {
  cities
}
     cityHistory(cityName);
    });
  }

// $(api.openweathermap.org/data/2.5/forecast?q={city name}&appid={6da06b04e4767b3319293983361bca86}

  //forecast 
  function forecastOWA() {
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

  //uv index
function uviOWA() {
  var query3URL =
  "http://api.openweathermap.org/data/2.5/uvi?q=&appid=6da06b04e4767b3319293983361bca86";
  $.ajax({
    url: query3URL,
    method: "GET",
   dataType: 'json',
  }).then(function(response) {
    addTableRow(response);
  });
}

var cities = JSON.parse(windowLocalStorage.getItem(".cityList"));

