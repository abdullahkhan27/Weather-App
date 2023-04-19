//api-key = 4917bce8e2fdb242e4fec3e04e34f9c5 //

const searchInput = document.querySelector('.search input');
const searchbtn = document.querySelector('.search button');


async function getWeather(city) {
      var params = '';
      if(/\d/.test(city)){
        params = `zip=${city}`;
      } else {
        params = `q=${city}`;
      }
      console.log(city);
      console.log(params);
      var data;
      if(localStorage.getItem(city)===null){
        console.log('inside');
        var res = await fetch("https://api.openweathermap.org/data/2.5/weather?" + params + "&appid=4917bce8e2fdb242e4fec3e04e34f9c5&units=metric");
        if(res.status == 404){
          return document.querySelector('.error').style.display = "block";
        } else{
          document.querySelector('.error').style.display = "none";
        }
        data = await res.json();
      } else {
        data = JSON.parse(localStorage.getItem(city));
      }
      console.log(data);
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.weather').innerHTML = data.weather[0].main;
      document.querySelector('.celcius').innerHTML = Math.round( data.main.temp )+ "°C";
      document.querySelector('.feels').innerHTML = "Feels like" + Math.round(data.main.feels_like)+" °C";
      document.querySelector('.humid').innerHTML = "Humidity: "+Math.round( data.main.humidity )+ "%";
      document.querySelector('.winds').innerHTML = "Wind: "+Math.round(data.wind.speed) + " km/h";

      var details = '';

      if(data.weather[0].main == "Clouds"){
        details+=`<div class="col">
                    <img src="./Images/cloudss.png" alt="">
                  </div>`;
      } else if(data.weather[0].main == "Clear"){
        details+=`<div class="col">
                    <img src="./Images/clear.png" alt="">
                  </div>`;
      }else if(data.weather[0].main == "Rain"){
        details+=`<div class="col">
                    <img src="./Images/rainn.png" alt="">
                  </div>`;
      }else if(data.weather[0].main == "Drizzle"){
        details+=`<div class="col">
                    <img src="./Images/drizzlee.png" alt="">
                  </div>`;
      }else if(data.weather[0].main == "Mist"){
        details+=`<div class="col">
                    <img src="./Images/mistt.png" alt="">
                  </div>`;
      }else if(data.weather[0].main == "Haze"){
        details+=`<div class="col">
                    <img src="./Images/cloudss.png" alt="">
                  </div>`;
      }
      
      document.querySelector('.detail').innerHTML = details;
      localStorage.setItem(city, JSON.stringify(data));
}

searchbtn.addEventListener('click', ()=>{
  getWeather(searchInput.value.toLowerCase() );
})
// getWeather();