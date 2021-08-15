const myWeatherApiKey = "230ba291a7717f927e18016f15453564";
const googleApiKey="AIzaSyDknB60wap3lXZ0Xe2jUI7t2JRef5x9Jq4";
var myInput = document.getElementsByClassName("formInput")[0];
var submitBn = document.getElementsByClassName("submitBtn")[0];
var getWeatherBtn = document.getElementsByClassName("getWeatherButton")[0];
var getMapBtn = document.getElementsByClassName("getLocationButton")[0];
const weatherDisplay = document.getElementsByClassName("weatherText")[0];

const xhttp = new XMLHttpRequest();


submitBn.addEventListener("click", function (event) {
  const myUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + myInput.value + "&appid=" + myWeatherApiKey;
  xhttp.open("GET", myUrl);
  xhttp.setRequestHeader("Accept", "applicaton/json");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      const myResult = JSON.parse(xhttp.responseText);
      let ress = "Main: " + myResult.weather[0].main + "<br>Description: " + myResult.weather[0].description + "<br>Temperature: " + (myResult.main.temp - 273).toFixed(2) + " \xB0C" + "<br>Humidity: " + myResult.main.humidity;
      weatherDisplay.innerHTML = ress;
    }
  }
  event.preventDefault();
});

getWeatherBtn.addEventListener("click", function (event) {
  // getting lattitude and longitude
  var lattitude;
  var longitude;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lattitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const myUrl2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude+"&appid="+myWeatherApiKey;
      xhttp.open("GET", myUrl2);
      xhttp.setRequestHeader("Accept", "applicaton/json");
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          const myResult2 = JSON.parse(xhttp.responseText);
          let ress = "Main: " + myResult2.weather[0].main + "<br>Description: " + myResult2.weather[0].description + "<br>Temperature: " + (myResult2.main.temp - 273).toFixed(2) + " \xB0C" + "<br>Humidity: " + myResult2.main.humidity;
          weatherDisplay.innerHTML = ress;
        }
      }

    })
  } else {
    weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
  }

  event.preventDefault();
});


getMapBtn.addEventListener("click", (evnt)=> {
  document.getElementById("showMap").style.display = "block";
  navigator.geolocation.getCurrentPosition((poss)=>{
    var lat = poss.coords.latitude;
    var lng = poss.coords.longitude;

    var coords = new google.maps.LatLng(lat,lng);
    var mapOptions = {
      zoom:15,
      center: coords
    };
     

    var map = new google.maps.Map(document.getElementById("showMap"),mapOptions);

    var marker = new google.maps.Marker({position: coords, map:map});

  }, (error) => {
    console.log(error)
  })
})