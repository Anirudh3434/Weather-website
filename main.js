var search = document.querySelector('.btn');

search.addEventListener('click', () => {
    const APIKEY = `8ac15ec2433204ecfaac0c6cf55ccd4c`;
    const city = document.getElementById('search-box').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
        .then(response => response.json())
        .then(json => {
            var image = document.querySelector('.Wimg');
            var temp = document.querySelector('.temp');
            var humidity = document.querySelector('.humidity');
            var wind = document.querySelector('.wind');
            var sunrise = document.querySelector('.sunR');
            var sunset = document.querySelector('.sunS');
            var weatherUpdate = document.querySelector('.weatherUpdate');

            const video = document.createElement('video');
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.style.position = 'fixed';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.zIndex = '-1';

            if (json.weather && json.weather[0] && json.weather[0].main) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/sunny.png';
                        video.src = 'images/sunny.mp4'; 
                        break;
                    case 'Clouds':
                        image.src = 'images/cloudy.png';
                        video.src = 'images/cloudy.mp4'; 
                        break;
                    case 'Rain':
                        image.src = 'images/heavyRain.png';
                        video.src = 'images/rain.mp4'; 
                        break;
                    case 'Haze':
                        image.src = 'images/fog.png';
                        video.src = 'images/haze.mp4'; 
             
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        video.src = 'images/mist.mp4'; 
                        break;
                    default:
                        image.src = 'images/problem.png';
                    
                }

                
                const existingVideo = document.querySelector('video');
                if (existingVideo) {
                    document.body.removeChild(existingVideo);
                }

              
                if (video.src) {
                    document.body.appendChild(video);
                }
            } else {
                image.src = 'images/sunny.png';
            }

            var temperature = json.main.temp;
            var temperatureCelsius = Math.floor(temperature - 273.15);
            var humidityValue = json.main.humidity;
            var windSpeed = json.wind.speed;
            var sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString();
            var sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString();
            var weatherStatement = json.weather[0].main;

            temp.textContent = `${temperatureCelsius} °C`;
            humidity.textContent = `${humidityValue}%`;
            wind.textContent = `${windSpeed} m/s`;
            sunrise.textContent = `${sunriseTime}`;
            sunset.textContent = `${sunsetTime}`;
            weatherUpdate.textContent = `It's ${weatherStatement}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
