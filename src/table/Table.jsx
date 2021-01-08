import React, { useState, useEffect } from 'react';
import { fetchedByCountries } from './api';

export default function Table() {
  const [result, setResult] = useState('');
  const [country, setCountry] = useState('United Kingdom');

  const [active, setActive] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [recovered, setRecovered] = useState('');
  const [deaths, setDeaths] = useState('');

  useEffect(() => {
    const fetchedData = async () => {
      const { data } = await fetchedByCountries();
      setResult(data);
    };
    fetchedData();
  }, []);

  if (!result) {
    return <div></div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Province/State</th>

          <th>Active</th>
          <th>Confirmed</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        {result.map((all, index) => {
          if (all.countryRegion === country) {
            return (
              <tr key={index}>
                <th>{all.provinceState}</th>
                <th>{all.active}</th>
                <th>{all.confirmed}</th>
                <th>{all.recovered}</th>
                <th>{all.deaths}</th>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}
