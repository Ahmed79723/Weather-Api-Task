//^ *****************************************************************getting data*********************************************************
// async function getData() {
//   let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c937c9e5e5a2444abe5215204233012&q=${q}&days=3`);
//   let response =await data.json();
//   console.log(data);
// }
function getData(q) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=c937c9e5e5a2444abe5215204233012&q=${q}&days=3`
  );
  xhr.send();
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4) {
      let weatherData = JSON.parse(xhr.response);
      console.log(weatherData);
      displayDay1Data(weatherData);
      displayDay2(weatherData.forecast.forecastday[1]);
      displayDay3(weatherData.forecast.forecastday[2]);
      // displayRestOfData(weatherData.forecast.forecastday, future.length);
    }
  });
}
getData("auto:ip");

//^ *************************************************************global vars*************************************************************
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
(function () {
  const citySearch = document.getElementById("citySearch");
  const findBtn = document.getElementById("findBtn");
  const day2 = document.getElementById("day2");
  const day3 = document.getElementById("day3");
})();
//^ *************************************************************display functions*******************************************************
citySearch.addEventListener("input", function (e) {
  getData(e.target.value);
});
findBtn.addEventListener("click", function () {
  citySearch.value = "";
});
function displayDay1Data(weatherData) {
  let box = "";
  let dateString = weatherData.current.last_updated;
  var modifiedDateString = dateString.replace(" ", "T");
  var convertedDate = new Date(modifiedDateString);
  if (weatherData) {
    box = `<div class="card-header today d-flex justify-content-between">
    <span>${days[convertedDate.getDay()]}</span>
    <span>${convertedDate.getDate()}, ${
      monthNames[convertedDate.getMonth()]
    }</span>
    </div>
    <div class="card-body">
    <p class="card-text" id="cityName">${weatherData.location.name}</p>
    <div class="main-display d-flex flex-column">
        <span id="firstDayMainDeg" class="position-relative">${
          weatherData.current.temp_c
        } <span class="bigO position-absolute">o</span>C</span>
        <img src="https:${
          weatherData.current.condition.icon
        }" width="90" alt="${weatherData.current.condition.text} weather Icon">
    </div>
    <h6 class="text-info">${weatherData.current.condition.text}</h6>
    <div class="imgs-info d-flex justify-content-between pe-5 me-5">
        <div>
            <img src="imgs/icon-umberella.png" alt="">
            <span>${weatherData.current.humidity}%</span>
        </div>
        <div>
            <img src="imgs/icon-wind.png" alt="">
            <span>${weatherData.current.wind_kph}km/h</span>
        </div>
        <div>
            <img src="imgs/icon-compass.png" alt="">
            <span>${weatherData.current.wind_dir}</span>
        </div>
    </div>
    </div>`;
    currentDay.innerHTML = box;
  } else {
    alert(weatherData.error.message);
  }
}
function displayDay2(w) {
  // var dayInfo = new Date(w.date).replace(" ", "T");
  let box = "";
  // let count = 1;
  // let c = 0;
  // for (let i = 0; i < f.length; i++) {}
  box = `<div class="card border-0 rounded-top-3 text-center text-white">
        <div class="card-header day2">
            <span>${days[new Date(w.date.replace(" ", "T")).getDay()]}</span>
        </div>
        <div class="card-body secondDay d-flex flex-column">
            <div class="my-2">
                <img src="https:${w.day.condition.icon}" alt="">
            </div>
            <div class="py-3 d-flex flex-column">
                <span class="maxDeg position-relative nums">${w.day.maxtemp_c} <span class="smallO position-absolute">o</span> C</span>
                <span class="minDeg position-relative">${w.day.mintemp_c} <span class="soSmallO position-absolute">o</span> </span>
            </div>
            <h6 class="text-info">${w.day.condition.text}</h6>
        </div>
    </div>`;
  // count++;
  // c++;
  day2.innerHTML = box;
}
function displayDay3(w) {
  var convertedDate = new Date( w.date.replace(" ", "T"));
  let box = "";
  box = `<div class="card border-0 rounded-top-3 text-center text-white">
        <div class="card-header">
            <span>${days[convertedDate.getDate()]}</span>
        </div>
        <div class="card-body d-flex flex-column">
            <div class="my-2">
                <img src="https:${w.day.condition.icon}" alt="">
            </div>
            <div class="py-3 d-flex flex-column">
                <span class="maxDeg position-relative nums">${w.day.maxtemp_c} <span class="smallO2 position-absolute">o</span> C</span>
                <span class="minDeg position-relative">${w.day.mintemp_c} <span class="soSmallO position-absolute">o</span> </span>
            </div>
            <h6 class="text-info">${w.day.condition.text}</h6>
        </div>
    </div>`;
  day3.innerHTML = box;
}
