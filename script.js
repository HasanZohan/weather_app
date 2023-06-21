const form = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const apiKey = 'a74d9815eae04dca9c6134829232106';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = locationInput.value.trim();

    if (!location) {
        weatherResult.innerHTML = '<p>Please enter a valid location.</p>';
        return;
    }

    try {
        const weatherData = await getWeatherData(location);
        displayWeatherData(weatherData);
    } catch (error) {
        weatherResult.innerHTML = '<p>An error occurred while fetching the weather data.</p>';
        console.error(error);
    }
});

const getWeatherData = async (location) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const displayWeatherData = (data) => {
    if (data.error) {
        weatherResult.innerHTML = `<p>${data.error.message}</p>`;
    } else {
        const { name, country } = data.location;
        const { temp_c, feelslike_c, humidity, condition } = data.current;

        const weatherHtml = `
            <h3>${name}, ${country}</h3>
            <div class="weather-details">
                <div>
                    <p>Temperature: ${temp_c}°C</p>
                    <p>Feels like: ${feelslike_c}°C</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
                <div>
                    <p>Condition: ${condition.text}</p>
                    <img src="https:${condition.icon}" alt="Weather Icon" class="weather-icon">
                </div>
            </div>
        `;
        weatherResult.innerHTML = weatherHtml;
    }
};

