import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { fetchedByCountries } from '../table/api';

function Map() {
  const [viewport, setViewport] = useState({
    zoom: 2,
    width: '100%',
    height: '50vh',
  });
  const [locs, setLocs] = useState([]);
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
    console.log(locs);
    // locs.map((loc) => console.log(`${loc.long} ${loc.lat}`));
  }, []);

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
        {locs.map((longlat, index) => {
          return (
            <Marker key={index} longitude={longlat.long} latitude={longlat.lat}>
              <div style={{ fontSize: '10px', background: 'red' }}>
                {longlat.countryRegion}
              </div>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default Map;
