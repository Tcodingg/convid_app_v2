import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Rows from './Rows';

function App() {
  const url = 'https://covid19.mathdro.id/api/deaths';
  const allProvinces = [];

  useEffect(() => {
    fetch(url)
      .then(function (respo) {
        return respo.json();
      })
      .then(function (data) {
        data.forEach((element) => {
          if (element.countryRegion !== 'US') {
            allProvinces.push(element);
          }
        });
      });
    console.log(allProvinces);
  }, []);

  return (
    <div className='App'>
      <Header />
      <input type='text' />
      <table className='tableContainer'>
        <thead>
          <tr className='tblHead'>
            <th>Provice/Country</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>

        <tbody>
          <Rows />
        </tbody>
      </table>
    </div>
  );
}

export default App;
