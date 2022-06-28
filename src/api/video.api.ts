import axios, { AxiosRequestConfig } from 'axios';

export const getVideoByCharacter = async (character: string) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${process.env.API_URL}/api/videos?sort[0]=ytPublished&filters[type][$eq]=${character}`,
    headers: {},
  };
  try {
    const res = await axios(config);
    return res.data.data || { data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const getLastVideo = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${process.env.API_URL}/api/videos?sort[0]=ytPublished%3Adesc&pagination[start]=0&pagination[limit]=1`,
    headers: {},
  };
  try {
    const res = await axios(config);
    return res.data.data || { data: [] };
  } catch (err) {
    console.log(err);
  }
};
