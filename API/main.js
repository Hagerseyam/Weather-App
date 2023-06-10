const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemEl = document.getElementById("current-weather-items")
const timezone = document.getElementById("time-zone");
const countryEl= document.getElementById('country');
const weatherForecastbta3kolo = document.getElementById("weather-forecast");
const nextDayWeather = document.getElementsByClassName("weather-forecast-item");
const currentTempEl = document.getElementById('current-temp');
const api_key= "57bb35e200888dc6bb2ded2c6d3bbdd0";
const icon = document.getElementById("icon");
const days = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Oct','Nov','Dec']
const Citylocation = document.getElementById("Citylocation");
let apiResponse;
let data;
const dates = document.getElementById('dates');
const nexticon = document.getElementsByClassName("nexticon");
const dayz = document.getElementsByClassName("dayz");
const dayy = document.getElementById('dayy');
const tempinc= document.getElementsByClassName("tempinc");
const discription= document.getElementById("discription");
const discriptions = document.getElementsByClassName('discription');
const searchbar = document.getElementById("search-bar");
let currentcity = "Cairo";



setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm= hour >=12? 'PM' : 'AM'
    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' '+ `<span id="am-pm>${ampm}</span>`;
    dateEl.innerHTML= days[day] + ","+ date+''+months[month];
}, 1000);


getweatherdata()

async function getweatherdata(){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentcity}&days=3`)
    data= await apiResponse.json()
    console.log(data);
    showWeatherData(data);
    showNextDay();
    }



function showWeatherData (data){
    

        let {humidity, pressure_in, sunset, wind_mph} = data.current;
    currentWeatherItemEl.innerHTML = 
        `<div class="weather-item">
        <div> Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure_in}in</div>
    </div> <div class="weather-item">
        <div>wind speed</div>
        <div>${wind_mph}mph</div>
    </div>
    <div class="weather-item">
    <div>sunset</div>
    <div>${window.moment(sunset).format("HH:mm a")}</div>
</div>`;

let time = new Date();

    dayy.innerHTML= days[time.getDay()];
    dates.innerHTML= `${time.getDate()} ${months[time.getMonth()]}`;
    tempinc.innerHTML="Temp=" + data.current.temp_c + 'C';
    discription.innerHTML= data.current.condition.text;
    icon.setAttribute("src",`http:${data.current.condition.icon}`);
    Citylocation.innerHTML= data.location.name;
    }

const datess= document.getElementsByClassName("dates");


function showNextDay(){
    for (let i=0; i<nextDayWeather.length;i++)

    {


    dayz[i].innerHTML= days[new Date(data.forecast.forecastday[i+1].date).getDay()];
    nexticon[i].setAttribute("src",`https:${data.forecast.forecastday[i+1].day.condition.icon}`)
    tempinc[i].innerHTML= data.forecast.forecastday[i+1].day.maxtemp_c + `${ " C "}`;
    discriptions[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
    datess[i].innerHTML= new Date(data.forecast.forecastday[i+1].date).getDate()  + `${ "   " }` + months[new Date(data.forecast.forecastday[i+1].date).getMonth()];
    


    }
}

searchbar.addEventListener("keyup",function(){
    currentcity= searchbar.value;
    console.log(currentcity);
    getweatherdata();
})

// searchbar.addEventListner("keyup", function(){
//     currentcity= searchbar.value;
//     console.log(currentcity);
// getweatherdata();
// })