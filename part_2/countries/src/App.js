import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Country from './Country'

const App = () => {
    const [countries, setCountries] = useState([])
    const [entry, setEntry] = useState('')
    const [toExpand, setToExpand] = useState([])
    const toShow = countries.filter(country => country.name.toLowerCase().includes(entry.toLowerCase()))
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])


    const handleEntry = (event) => {
        setEntry(event.target.value)
        setToExpand([])
    }

    const showCountry = (country) => {
        if (!toExpand.some(existingCountry => existingCountry.name === country.name))
        setToExpand(toExpand.concat(country))
    }

    return (
        <div>
            find countries
            <input
                value={entry}
                onChange={handleEntry}
            />
            {
            toShow.length === 1 ? <Country country={toShow[0]}/>
            : toShow.length < 10 ? toShow.map(country => 
                <div key={country.name}>
                    {country.name}
                    <button onClick={() => showCountry(country)}>show</button>
                </div>)
                : entry.length === 0 ? <div></div>
                    : <div>{'Too many matches, speficy another filter'}</div>
            }
            {toExpand.map(country => <Country key={country.name} country={country}/>)}
        </div>
    );
};

export default App