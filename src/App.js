import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Rows from './Rows';
import Table from './table/Table';
import { totalPopulation } from './api/api';
import { fetchedByCountries } from './table/api';

function App() {
  const [confirmedValue, SetConfirmedValue] = useState(0);
  const [recoveredValue, SetRecoveredValue] = useState(0);
  const [deathsValue, SetDeathsValue] = useState(0);
  const [result, setResult] = useState('');

  // useEffect(async () => {
  //   const fetchedData = await fetchData();
  //   setResult(fetchedData);
  // }, []);

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

  // useEffect(() => {
  //   const fetchedData = async () => {
  //     const data = await fetchedByCountries();
  //     setResult(data.data.data);
  //   };
  //   fetchedData();
  //   console.log(result);
  // }, []);

  return (
    <div className='App'>
      <Header />
      <input type='text' />
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

      <Table />
    </div>
  );
}

export default App;
