console.log('javascript connected!');

const carousel = new bootstrap.Carousel('#homeCarousel', {
  interval: 5000,
  pause: false
});

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
  if (faIcon.classList.contains('fa-pause')) {
    faIcon.classList.remove('fa-pause');
    faIcon.classList.add('fa-play');
    carousel.pause();
  } else {
    faIcon.classList.remove('fa-play');
    faIcon.classList.add('fa-pause');
    carousel.cycle();
  }
});

const fetchWeather = async () => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const city = 'Denver'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      displayWeather(data);
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
};

const displayWeather = (data) => {
  const iconCode = data.weather[0].icon;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  const weatherIcon = document.getElementById('weather-icon');
  const weatherTemp = document.getElementById('weather-temp');
  const weatherDesc = document.getElementById('weather-description');

  const iconImg = document.createElement('img');
  iconImg.src = `https://openweathermap.org/img/w/${iconCode}.png`;
  iconImg.alt = description;

  weatherIcon.appendChild(iconImg);
  weatherTemp.textContent = `${temp}\u00B0`;
  weatherDesc.textContent = description;
};

fetchWeather();

