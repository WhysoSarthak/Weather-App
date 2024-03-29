let weather = {
    "apiKey":"2f43fff68481a0f36734981eb3fe4ec5",
    fetchWeather:function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid="
        + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, main , description} = data.weather[0];
        const {temp, humidity, feels_like} = data.main;
        const {speed} = data.wind;
        let x = Math.round(temp);
        let y = Math.round(feels_like);

        document.querySelector(".city").innerText =name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".main").innerText = main;
        document.querySelector(".temp").innerText= x + " °C";
        document.querySelector(".feels_like").innerText= "Feels like: " + y + " °C";
        document.querySelector(".humidity").innerText="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText="Wind speed : " + speed + " m/s";
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"
    },
    search :function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".search button").addEventListener("click",function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key=="Enter") {
        weather.search();        
    }
});

weather.fetchWeather("Noida");