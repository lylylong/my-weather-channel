let arrayCity = JSON.parse(localStorage.getItem("arrayCity")) || [];

$(document).ready(function () {
  //   let cityInput = "";
  //   let cityId = "";

  //   arrayCity = localStorage.getItem("arrayCity");

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

          // get the current city name, date & info display
          let cityHeader = document.querySelector("#city-title");
          cityHeader.textContent = cityTitle;
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

          // fetch to get the uv index
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

          // fetch to get the forecast for future 5 days
          fetch(
            "http://api.openweathermap.org/data/2.5/forecast?q=" +
              cityInput +
              "&appid=a8e17bfcb12d79725964af1dd67c506a&units=metric"
          )
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
            })
            .then(function (response3JsonReturned) {
              console.log(response3JsonReturned);

              for (let i = 0; i < response3JsonReturned.list.length; i++) {
                if (
                  response3JsonReturned.list[i].dt_txt.indexOf("15:00:00") !==
                  -1
                ) {
                  //   let nextDates = document.querySelector(".next-date");
                  //   nextDates.innerHTML =
                  //     "&nbsp" +
                  //     response3JsonReturned.list[i].dt_txt.split(" ")[0];

                  //   let nextTemps = document.querySelector("#forecast-tempdata");
                  //   nextTemps.innerHTML =
                  //     "&nbsp" + response3JsonReturned.list[i].main.temp + " °C";
                  //   let next1Hums = document.querySelector("#forecast-humdata");
                  //   next1Hums.innerHTML =
                  //     "&nbsp" +
                  //     response3JsonReturned.list[i].main.humidity +
                  //     " %";
                  let forecastWarp = document.querySelector("#forecast-warp");

                  let forecastDivs = document.createElement("div");
                  forecastDivs.classList = "col card text-white bg-primary";
                  let forecastDivHeader = document.createElement("div");
                  forecastDivHeader.classList = "card-header next-date";
                  forecastDivHeader.textContent = response3JsonReturned.list[
                    i
                  ].dt_txt.split(" ")[0];
                  forecastDivs.appendChild(forecastDivHeader);
                  let forecastDivBody = document.createElement("div");
                  forecastDivBody.classList = "card-body forecast-details";
                  let forecastDivTemp = document.createElement("h6");
                  forecastDivTemp.classList = "card-title";
                  forecastDivTemp.textContent =
                    "Temp: " + response3JsonReturned.list[i].main.temp + " °C";

                  let forecastDivHum = document.createElement("h6");
                  forecastDivHum.classList = "card-title";
                  forecastDivHum.textContent =
                    "humidity: " +
                    response3JsonReturned.list[i].main.humidity +
                    " %";

                  forecastDivBody.appendChild(forecastDivTemp);
                  forecastDivBody.appendChild(forecastDivHum);
                  forecastDivs.appendChild(forecastDivBody);
                  forecastWarp.appendChild(forecastDivs);
                }
              }
            });

          // if the search input before
          if (arrayCity.includes(cityTitle)) {
            return;
          }

          // local storage the city id and city name
          localStorage.setItem(cityId, cityTitle);
          arrayCity.push(cityTitle);
          localStorage.setItem("arrayCity", JSON.stringify(arrayCity));

          let cityList = $("#list-group");
          let cityBtn = document.createElement("button");
          cityBtn.classList = "list-group-item";

          cityBtn.textContent = cityTitle;

          cityList.append(cityBtn);
        });
    }

    getCurrentWeather();

    // after search, reset the input
    $(this).parents().siblings("#city-input").val("");
  });
});

// initial
for (let i = 0; i < arrayCity.length; i++) {
  let cityList = $("#list-group");
  let cityBtn = document.createElement("button");
  cityBtn.classList = "list-group-item";
  cityBtn.textContent = arrayCity[i];
  cityList.append(cityBtn);
}
