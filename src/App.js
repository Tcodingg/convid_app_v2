import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Rows from './Rows';

function App() {
  const [confirmedValue, SetConfirmedValue] = useState(0);
  const [recoveredValue, SetRecoveredValue] = useState(0);
  const [deathsValue, SetDeathsValue] = useState(0);

  const url = 'https://covid19.mathdro.id/api/';
  const allProvinces = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { confirmed, recovered, deaths },
        } = await axios.get(url);

        const allData = {
          confirmed,
          recovered,
          deaths,
        };
        SetConfirmedValue(confirmed.value);
        SetRecoveredValue(recovered.value);
        SetDeathsValue(deaths.value);
        console.log(deaths);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!confirmedValue) {
    return <div></div>;
  }
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
    </div>
  );
}

export default App;
