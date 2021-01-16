import axios from 'axios';
const url = 'https://covid19.mathdro.id/api/confirmed';

export const fetchedByCountries = async () => {
  const data = await axios.get(url);
  return data;
};
