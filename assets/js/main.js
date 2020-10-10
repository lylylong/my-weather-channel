$(document).ready(function () {
  //   let cityInput = "";
  //   let cityId = "";

  $(".btn").one("click", function () {
    setTimeout(function () {
      let weatherDiv = document.getElementById("hide");
      weatherDiv.removeAttribute("id");
    }, 1000);
  });

  // click the search button to get the city input
  $("#button-addon2").on("click", function () {
    console.log("Search button is clicked!");

    // get the input city name
    let cityInput = $(this).parents().siblings("#city-input").val();
    console.log("the input is " + cityInput);
    // fetch the api to get city response
    function getCurrentWeather() {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityInput +
          "&appid=a8e17bfcb12d79725964af1dd67c506a&units=metric"
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            alert("Error: " + response.statusText);
          }
        })
        .then(function (responseJsonReturned) {
          console.log(responseJsonReturned);
          // get the city id
          let cityId = responseJsonReturned.id;
          console.log(cityId);
          let cityTitle = responseJsonReturned.name;
          console.log(cityTitle);
          // local storage the city id and city name
          localStorage.setItem(cityId, cityTitle);

          let cityList = $("#list-group");
          let cityBtn = document.createElement("button");
          cityBtn.classList = "list-group-item";
          $(cityBtn).val(localStorage.getItem(cityTitle));
          cityBtn.textContent = cityTitle;

          cityList.append(cityBtn);
          //   cityBtn.innerHTML = localStorage.getItem("cityInput");
          //   cityBtn.textContent = localStorage.getItem("cityInput");

          // get the city name display
          let cityHeader = document.querySelector("#city-title");
          cityHeader.textContent = cityTitle;
          // show current date
          let currentDay = document.querySelector("#current-day");
          currentDay.textContent = moment().format("dddd, ll");

          let currentTemp = document.querySelector("#current-temp");
          currentTemp.innerHTML =
            "&nbsp" + responseJsonReturned.main.temp + " °C";

          let currentHum = document.querySelector("#current-hum");
          currentHum.innerHTML =
            "&nbsp" + responseJsonReturned.main.humidity + " %";

          let currentWind = document.querySelector("#wind-speed");
          currentWind.innerHTML =
            "&nbsp" + responseJsonReturned.wind.speed + " m/s";

          var lat = responseJsonReturned.coord.lat;
          var lon = responseJsonReturned.coord.lon;

          fetch(
            "http://api.openweathermap.org/data/2.5/uvi?lat=" +
              lat +
              "&lon=" +
              lon +
              "&appid=a8e17bfcb12d79725964af1dd67c506a"
          )
            .then(function (response2) {
              return response2.json();
            })
            .then(function (response2JsonReturned) {
              console.log(response2JsonReturned);
              console.log(response2JsonReturned.value);
              let currentUvIndex = document.querySelector("#uv-index");
              currentUvIndex.innerHTML = "&nbsp" + response2JsonReturned.value;
            });
        });
    }

    getCurrentWeather();

    // after search, reset the input
    $(this).parents().siblings("#city-input").val("");
  });

  //   $("#list-group .list-group-item").val(localStorage.getItem("6167865"));
});
