import axios, { AxiosResponse } from 'axios';
require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_HUE_HOST;
const username = process.env.REACT_APP_AUTH_TOKEN;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
};

export const Lights = {
  getLights: (): Promise<any> => requests.get(`api/${username}/lights`),
};

export const Groups = {
  getGroups: (): Promise<any> => requests.get(`api/${username}/groups`),
};
