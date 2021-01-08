import React from 'react';
import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/';

export const totalPopulation = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths },
    } = await axios.get(url);

    const allData = {
      confirmed,
      recovered,
      deaths,
    };
    return allData;
  } catch (error) {
    console.log(error);
  }
};


