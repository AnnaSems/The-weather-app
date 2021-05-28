import { useState } from 'react'
import './App.css';

const api = {
  API_KEY: '850179ed2538043399f4a0483428bc3a',
  BASE_URL: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      // fetch(`${api.BASE_URL}weather?q=${query}&units=metric&appid=${api.API_KEY}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // })
      //   .then(response => {
      //     response.json()
      //   })
      //   .then(result => {
      //     setQuery('');
      //     return setWeather(result);
      // })
      const response = await fetch(`${api.BASE_URL}weather?q=${query}&units=metric&appid=${api.API_KEY}`);
      if (response.ok) {
        const jsonResponse = await response.json()
        setWeather(jsonResponse);
        setQuery('');
      }
    }
  }

  const getCurrentDate = () => {
    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let daysOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();

    let currentWeek = daysOfWeek[date.getDay() - 1];
    const currentYear = date.getFullYear();
    let currentMonth = daysOfMonth[date.getMonth()];
    const currentDay = date.getDate();

    // daysOfWeek = daysOfWeek.filter((day, index) => [index + 1] === currentWeek);
    // daysOfMonth = daysOfMonth.filter((month, index) => [index + 1] === currentMonth);
    return `${currentWeek} ${currentDay} ${currentMonth} ${currentYear}`
  }

  return (
    <div className={
      (typeof weather.main !== 'undefined') ? ((weather.main.temp > 16) ? 'app' : 'app cold')
        : 'app cold'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location">
              <div className="get-city">{weather.name}, {weather.sys.country} </div>
              <div className="date">{getCurrentDate()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.floor(weather.main.temp)} ℃</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div >
  );
}

export default App;
