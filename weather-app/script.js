const apiKey = "d581ee4c8d8ed3f8daa85de994afcc3d"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            errorMsg.textContent = "City not found. Please try again.";
            return;
        }

        errorMsg.textContent = "";

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent =
            `Temperature: ${data.main.temp} °C`;
        document.getElementById("description").textContent =
            `Weather: ${data.weather[0].description}`;

        const iconCode = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        errorMsg.textContent = "Error fetching data. Please try again later.";
    }
}
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorMsg = document.getElementById("errorMsg");
    const loading = document.getElementById("loading");
    const weatherBox = document.getElementById("weatherBox");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    errorMsg.textContent = "";
    loading.style.display = "block";
    weatherBox.style.animation = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        loading.style.display = "none";

        if (response.status !== 200) {
            errorMsg.textContent = "City not found!";
            return;
        }

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent =
            `Temperature: ${data.main.temp} °C`;
        document.getElementById("description").textContent =
            `Weather: ${data.weather[0].description}`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        /* Restart animation */
        void weatherBox.offsetWidth;
        weatherBox.style.animation = "fadeSlide 0.6s ease-in-out";

    } catch (error) {
        loading.style.display = "none";
        errorMsg.textContent = "Network error. Try again.";
    }
}

