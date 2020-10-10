let cityInput = "";
let cityId = "";

// click the search button to get the city input
$("#button-addon2").on("click", function () {
  console.log("Search button is clicked!");
  cityInput = $(this).parents().siblings("#city-input").val();

  console.log(cityInput);

  function getCurrentWeather() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityInput +
        "&appid=a8e17bfcb12d79725964af1dd67c506a"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJsonReturned) {
        console.log(responseJsonReturned);
        let cityId = responseJsonReturned.city.id;
        console.log(cityId);
        // local storage the city id and city name
        localStorage.setItem(cityId, cityInput);
      });
  }

  getCurrentWeather();

  // after search, reset the input
  $(this).parents().siblings("#city-input").val("");
});
