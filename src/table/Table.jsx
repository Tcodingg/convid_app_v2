import React, { useState, useEffect } from 'react';
import { fetchedByCountries } from './api';

export default function Table() {
  const [result, setResult] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchedData = async () => {
      const respo = await fetchedByCountries();
      const allData = {};
      //   setResult(data);
      console.log(respo.data[1].countryRegion);
    };
    fetchedData();
    // console.log(result);
    console.log('finished..');
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Active</th>
          <th>Confirmed</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12</td>
          <td>12</td>
          <td>12</td>
        </tr>
      </tbody>
    </table>
  );
}
