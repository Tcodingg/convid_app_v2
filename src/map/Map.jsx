import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { fetchedByCountries } from '../table/api';
import './style.css';
import axios from 'axios';

function Map() {
  const [viewport, setViewport] = useState({
    zoom: 2,
    width: '100%',
    height: '50vh',
  });
  const [locs, setLocs] = useState([]);
  const [responses, setResponses] = useState([]);
  const [totalActive, setTotalActive] = useState(0);
  const url =
    'https://opendata.arcgis.com/datasets/1cb306b5331945548745a5ccd290188e_2.geojson';

  let uniq = {};
  useEffect(() => {
    const countriesLocation = async () => {
      try {
        const { data } = await fetchedByCountries();
        // setLocs(
        //   data.filter(
        //     (filterNull) => filterNull.lat !== null || filterNull.long !== null
        //   )
        // );

        setTotalActive(() => {});
        setLocs(() =>
          data
            .filter(
              (obj) =>
                !uniq[obj.countryRegion] && (uniq[obj.countryRegion] = true)
            )
            .filter(
              (filterNull) =>
                filterNull.lat !== null || filterNull.long !== null
            )
        );
      } catch (error) {
        console.log(error);
      }
    };
    countriesLocation();
    // console.log(locs);
  }, []);
  function showInfo() {}
  useEffect(() => {
    const secondFetch = async () => {
      var {
        data: { features },
      } = await axios.get(url);

      // setResponses(features);
      setResponses(() =>
        features.filter(
          (a) => a.properties.Long_ !== null || a.properties.Lat !== null
          // a.properties.Active !== null
        )
      );
    };
    secondFetch();
  }, []);
  console.log(responses);

  responses.map((x) => {
    return console.log(x.properties.Active / 1000 + 'px');
  });

  // console.log(responses.properties);
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
            >
              <div
                onClick={showInfo}
                className='countryInfo'
                style={{
                  width: `"calc(${longlat.properties.Active}/1000)px"`,
                  height: `"calc(${longlat.properties.Active}/1000)px"`,
                  background: 'red',
                }}
              >
                {longlat.Country_Region}
              </div>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default Map;
