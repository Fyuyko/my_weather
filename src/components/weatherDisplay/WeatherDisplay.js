import './weatherDisplay.css';

const WeatherDisplay = ({weather}) => {
   /* Получение даты */
   const getDate = (d) => {
      let months = ['January', 'February', 'March', 'April', 'Мay', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Monday', 'Tuesday ', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
   };

   return (
      (typeof weather.main != 'undefined') ? (
         <div className="weather-display">
           <div className='location-box'>
             <div className='location'>{weather.name}, {weather.sys.country}</div>
             <div className='date'>{getDate(new Date())}</div>
           </div>
           ---
           <div className='weather-box'>
             <div className='temp'>
               Temperature: {Math.round(weather.main.temp)}°c
             </div>
             <div className='temp'>
               Feels like: {Math.round(weather.main.feels_like)}°c
             </div>
             <div className='weather'>Sky: {weather.weather[0].main}</div>
           </div>
         </div>
         ) : ('Enter the city and press "Enter"')
   );
};

export default WeatherDisplay;