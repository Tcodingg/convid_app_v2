import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { fetchedByCountries } from '../table/api';
import './style.css';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
function Map() {
  const [viewport, setViewport] = useState({
    zoom: 2,
    width: '100%',
    height: '50vh',
  });
  const [locs, setLocs] = useState([]);
  const [responses, setResponses] = useState([]);
  const [infected, setInfected] = useState([]);
  const [allData, setAllData] = useState([
    {
      Active: 0,
      Confirmed: 0,
      Recovered: 0,
    },
  ]);
  const url =
    'https://opendata.arcgis.com/datasets/1cb306b5331945548745a5ccd290188e_2.geojson';

  // let uniq = {};
  // useEffect(() => {
  //   const countriesLocation = async () => {
  //     try {
  //       const { data } = await fetchedByCountries();

  //       setTotalActive(() => {});
  //       setLocs(() =>
  //         data
  //           .filter(
  //             (obj) =>
  //               !uniq[obj.countryRegion] && (uniq[obj.countryRegion] = true)
  //           )
  //           .filter(
  //             (filterNull) =>
  //               filterNull.lat !== null || filterNull.long !== null
  //           )
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   countriesLocation();
  // }, []);

  useEffect(() => {
    const countriesInfo = async () => {
      const {
        data: { features },
      } = await axios.get(url);
      setResponses(() =>
        features.filter(
          (a) => a.properties.Long_ !== null || a.properties.Lat !== null
        )
      );
      // setInfected(() => responses.map((cases) => cases.properties.Active));
    };
    countriesInfo();
  }, []);

  function getColor(infects) {
    if (infects < 1000) {
      return 'blue';
    } else if (infects > 1000 && infects < 10000) {
      return 'green';
    } else if (infects > 10000 && infects < 100000) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  function getSize(size) {
    if (size > 100000) {
      return size / 5000 + 'px';
    } else {
      return size / 1000 + 'px';
    }
  }

  // responses.map((x) => {
  //   return console.log(x.properties);
  // });

  // console.log(responses.properties);
  // console.log(infected);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/dark-v10'
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {responses.map((longlat, index) => {
          return (
            <Marker
              className='marker'
              key={index}
              longitude={longlat.properties.Long_}
              latitude={longlat.properties.Lat}
              background='black'
            >
              <div className='countryInfo'>
                <p className='countryName'>
                  {' '}
                  {longlat.properties.Country_Region}{' '}
                </p>
                <table className='countriesData'>
                  <tr>
                    <th>Active</th>
                    <td>{longlat.properties.Active}</td>
                  </tr>
                  <tr>
                    <th>Recovered</th>
                    <td>{longlat.properties.Recovered}</td>
                  </tr>
                  <tr>
                    <th>Deaths</th>
                    <td>{longlat.properties.Deaths}</td>
                  </tr>
                </table>
              </div>
              <FaMapMarkerAlt
                className='mapIcons'
                color={getColor(longlat.properties.Active)}
                onClick={() => {
                  console.log(
                    `it has been clicked ${longlat.properties.Country_Region}`
                  );
                }}
              />
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default Map;
