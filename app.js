window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/f7524e7f89b1a1a917196c860a13689a/${lat},${long}`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature,summary, icon} = data.currently;
          // formula for celsius
          let celsius = (temperature - 32) * (5/9);
          // set dom elements from the api
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // set icon
          setIcons(icon, document.querySelector('.icon'));
          // change temperature to celsius/fahrenheit
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          })
        });
    });
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "#e6e7e8"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});