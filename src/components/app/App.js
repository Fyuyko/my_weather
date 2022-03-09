import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchForm from '../searchForm/SearchForm';
import WeatherDisplay from '../weatherDisplay/WeatherDisplay';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AboutPage from '../aboutPage/AboutPage';
import Page404 from '../Page404/Page404';

import './app.css';

const api = {
  key: 'db89d94f35a2db5c3841b47e00ee75e0',
  base: 'http://api.openweathermap.org/data/2.5/'
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /* Получение данных при нажатии Enter */
  const search = e => {
    if (e.key === 'Enter') {
      setLoading(true);
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          } else {
            console.log(res);
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
          setLoading(false);
          setError(false);
          console.log(result);})
        .catch(() => { //обрабатываем только ошибку отсутствия города
          setError(true);
          setLoading(false);
          setCity('');                    
          setWeather('');          
        });
    }
  }; 

  /* Поднимаем состояние */
  const handleChange = (value) => {
    setCity(value);
  }; 

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <WeatherDisplay weather={weather}/> : null;

  return (
    <Router>
      <div className='wrapper'>
        <Header/>
        <div className='app'>
          <Routes>
            <Route path='/'
              element={<main className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'main warm' : 'main cold') : 'main'}>       
                <SearchForm city={city} search={search} onChange={handleChange}/>
                {errorMessage}
                {spinner}
                {content}             
              </main>}
            />
          
            <Route path='/about' element={<AboutPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
        <Footer/>
        
      </div> 
    </Router>   
  );
}

export default App;
