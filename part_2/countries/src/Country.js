import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState({})
    const [condition, setCondition] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=a2849ae15cd645ef9aa114410190109&q=${country.capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [country.capital])

    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=a2849ae15cd645ef9aa114410190109&q=${country.capital}`)
            .then(response => {
                setCondition(response.data.current.condition)
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            <img src={country.flag} alt='flag' height='15%' width='15%'></img>
            <h2>Weather in {country.capital}</h2>
            <div><b>temperature: {weather.temp_c} °C</b></div>
            <img src={condition.icon} alt="icon"></img>
            <div><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</div>
        </div>
    );
};

export default Country;