import React, { useState, useEffect } from 'react';
import { fetchedByCountries } from './api';

export default function Table() {
  const [result, setResult] = useState([]);
  const [country, setCountry] = useState('');
  const [sortCol, setSortCol] = useState('descending');
  const [column, setColumn] = useState('');
  useEffect(() => {
    const fetchedData = async () => {
      const { data } = await fetchedByCountries();

      // setResult(data);
      setResult(() =>
        data.filter((region) => region.countryRegion === 'United Kingdom')
      );
    };
    fetchedData();
  }, []);
  function sortField(key) {
    if (sortCol === 'ascending') {
      const aso = [...result].sort((a, b) => {
        return b[key] - a[key];
      });
      setResult(aso);
      setSortCol('descending');
    } else if (sortCol === 'descending') {
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
