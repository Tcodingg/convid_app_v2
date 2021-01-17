import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Map from './map/Map';
import Header from './Header';
import Rows from './Rows';
import Table from './table/Table';
import { totalPopulation } from './api/api';
import { fetchedByCountries } from './table/api';
import Search from './Search';

function App() {
  const [confirmedValue, SetConfirmedValue] = useState(0);
  const [recoveredValue, SetRecoveredValue] = useState(0);
  const [deathsValue, SetDeathsValue] = useState(0);
  const [result, setResult] = useState('Canada');

  //Fetching data----------------------------------
  useEffect(() => {
    const totalInfected = async () => {
      const data = await totalPopulation();
      // setResult(data);
      SetConfirmedValue(data.confirmed.value);
      SetRecoveredValue(data.recovered.value);
      SetDeathsValue(data.deaths.value);
    };
    totalInfected();
  }, []);

  //Search component-function -------------------
  function searchInputCountry(e) {
    if (e.key === 'Enter') {
      setResult(e.target.value);
      e.target.value = '';
    }
  }

  return (
    <div className='App'>
      <Map />
      <Header />
      <Search searchInput={searchInputCountry} />
      <table className='tableContainer'>
        <thead>
          <tr className='tblHead'>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          <Rows
            province={confirmedValue}
            recovered={recoveredValue}
            deaths={deathsValue}
          />
        </tbody>
      </table>

      <Table countryName={result} />
    </div>
  );
}

export default App;
