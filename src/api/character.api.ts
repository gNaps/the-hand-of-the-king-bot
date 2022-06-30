import axios, { AxiosRequestConfig } from 'axios';

export const getRandomCharacter = async () => {
  const random = Math.floor(Math.random() * (2138 - 1)) + 1;
  console.log(random);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://anapioficeandfire.com/api/characters/${random}`,
    headers: {},
  };
  try {
    const res = await axios(config);
    return res.data || { data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const getRandomHouse = async () => {
  const random = Math.floor(Math.random() * (444 - 1)) + 1;
  console.log(random);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://anapioficeandfire.com/api/houses/${random}`,
    headers: {},
  };
  try {
    const res = await axios(config);
    return res.data || { data: [] };
  } catch (err) {
    console.log(err);
  }
};
