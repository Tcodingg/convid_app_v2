import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './map/Map';
import Header from './Header';
import Rows from './Rows';
import Table from './table/Table';
import { totalPopulation } from './api/api';
import Search from './Search';
import { countryList } from './countriesList';

function App() {
  const [confirmedValue, SetConfirmedValue] = useState(0);
  const [recoveredValue, SetRecoveredValue] = useState(0);
  const [deathsValue, SetDeathsValue] = useState(0);
  const [inputVal, setInputVal] = useState('');

  const [countryInput, setCountryInput] = useState('Canada');
  const [autoCompleteData, setautoCompleteData] = useState([]);
  const [autoCompleteInput, setautoCompleteInput] = useState([]);

  //Fetching data----------------------------------
  useEffect(() => {
    const totalInfected = async () => {
      const data = await totalPopulation();
      SetConfirmedValue(data.confirmed.value);
      SetRecoveredValue(data.recovered.value);
      SetDeathsValue(data.deaths.value);
    };
    totalInfected();
  }, []);

  //Search component-function -------------------
  function handleOnKeydown(e) {
    if (e.key === 'Enter' && autoCompleteInput.length > 0) {
      setCountryInput(e.target.value);
      setautoCompleteData([]);
    }
    return;
  }

  function handleOnChange(e) {
    const textInput = e.target.value;
    setautoCompleteInput(textInput);
    setInputVal(textInput);
  }

  useEffect(() => {
    if (autoCompleteInput.length > 0) {
      setautoCompleteData(
        countryList.filter((filter) => {
          return filter
            .toLowerCase()
            .startsWith(autoCompleteInput.toLowerCase());
        })
      );
    } else {
      setautoCompleteData([]);
    }
  }, [autoCompleteInput]);
  function handleOption(e) {
    setCountryInput(e.target.value);
    setInputVal(e.target.value);
    setautoCompleteData([]);
  }

  return (
    <div className='App'>
      <Map />
      <Header />
      <div className='searchContainer'>
        <Search
          handleOnKeydown={handleOnKeydown}
          handleOnChange={handleOnChange}
          inputVal={inputVal}
        />
        <div className='options'>
          {autoCompleteData.map((country) => {
            return (
              <option onClick={handleOption} value={country}>
                {country}
              </option>
            );
          })}
        </div>
      </div>
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

      <Table countryName={countryInput} />
    </div>
  );
}

export default App;
