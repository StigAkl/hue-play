import axios, { AxiosResponse } from 'axios';
require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_HUE_HOST;
const username = process.env.REACT_APP_AUTH_TOKEN;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
 get: (url: string) => axios.get(url).then(responseBody),
 put: (url: string, body: any) => axios.put(url, body),
};

export const Lights = {
 getLights: (): Promise<any> => requests.get(`api/${username}/lights`),
 toggleLight: (id: number, state: boolean): Promise<any> =>
  requests.put(`api/${username}/lights/${id}/state`, {
   on: state,
  }),
};

export const Groups = {
 getGroups: (): Promise<any> => requests.get(`api/${username}/groups`),
 toggleGroup: (id: number, state: boolean) =>
  requests.put(`api/${username}/groups/${id}/action`, {
   on: state,
  }),
};
