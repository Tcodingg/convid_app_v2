import React, { useState, useEffect } from 'react';
import { fetchedByCountries } from './api';

export default function Table(props) {
  const [result, setResult] = useState([]);
  // const [country, setCountry] = useState('Canada');
  const [sortCol, setSortCol] = useState('descending');
  const [column, setColumn] = useState('');

  let countryInput = props.countryName;
  let country = countryInput.charAt(0).toUpperCase() + countryInput.slice(1);

  console.log(country);
  useEffect(() => {
    const fetchedData = async () => {
      const { data } = await fetchedByCountries();

      setResult(() =>
        data.filter((region) => region.countryRegion === country)
      );
    };
    fetchedData();
  }, [country]);
  function sortField(key) {
    if (sortCol === 'ascending') {
      const aso = [...result].sort((a, b) => {
        return b[key] - a[key];
      });
      setResult(aso);
      setSortCol('descending');
    } else {
      const dso = [...result].sort((a, b) => {
        return a[key] - b[key];
      });
      setResult(dso);
      setSortCol('ascending');
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Province/State</th>
          <th>
            <button
              onClick={() => {
                sortField('active');
              }}
            >
              Active
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                sortField('confirmed');
              }}
            >
              Confirmed
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                sortField('recovered');
              }}
            >
              Recovered
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                sortField('deaths');
              }}
            >
              Deaths
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {result.map((all, index) => {
          return (
            <tr key={index}>
              <th>
                {all.provinceState} {all.admin2}
              </th>
              <th>{all.active}</th>
              <th>{all.confirmed}</th>
              <th>{all.recovered}</th>
              <th>{all.deaths}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
