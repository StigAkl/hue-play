import axios from 'axios'; 
import { stringify } from 'querystring';
import { API } from '../apiUris';
import { IHSL } from '../interfaces/IHSL';
import { ILight } from '../interfaces/ILight';
const dotenv = require('dotenv').config().parsed;

export const pollHueData = (setLights: any, lights: ILight[]) => {
    const url = getUrlWithAuthToken(API.FETCH_LIGHTS(process.env.REACT_APP_AUTH_TOKEN)); 
    axios.get<any>(url).then((data) => {

      let listOfLights: ILight[] = []; 

      for(let key in data.data) {

        let hsl = convertToHsl(data.data[key].state.hue, data.data[key].state.sat, data.data[key].state.bri);
        let hex = hslToHex(hsl.h, hsl.s, hsl.l); 
        data.data[key].hex = hex; 

        var state = mapToLight(data.data[key], key);

        listOfLights.push(state);
      }

      if(!arraysEqual(lights, listOfLights)) {
        setLights(listOfLights);  
      }
    });
  };

  const convertToHsl = (h: number, s: number, b: number): IHSL => {
    let newH = (h / 65535) * 360;
    let newS = (s / 254)*100;
    let newB = (b / 254)*100; 
  
    return {
      h: newH,
      s: newS,
      l: newB
    };
  }

export const toggleLight = (id: number, toggle: boolean) => {
  const url = getUrlWithAuthToken(API.PUT_LIGHT(process.env.REACT_APP_AUTH_TOKEN, id)); 
  return axios.put(url, {on:toggle});
}
  
  function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  export const createAlarm = (id: string, time: string) => {
    const commandAddress = API.PUT_LIGHT(process.env.REACT_APP_AUTH_TOKEN, id);
    const requestUri = getUrlWithAuthToken(API.CREATE_ALARM(process.env.REACT_APP_AUTH_TOKEN));
    const payload ={
      name: "Wake up",
      description: "My wake up alarm",
      autodelete: true,
      "command": {
          "address": `${commandAddress}`,
          "method": "PUT",
          "body": {
              "on": true,
              "bri": 254
          }
      },
      localtime: time.concat(":00")
    };

    return axios.post(requestUri, payload); 
  }

  export const getUrlWithAuthToken = (uri: string) => {
    const host = process.env.REACT_APP_HOST ?? '';   
    return host.concat(uri); 
  }

  function mapToLight(obj: any, id: string): ILight {
    return{
      id: id,
      name: obj.name,
      bri: obj.state.bri,
      hue: obj.state.hue,
      sat: obj.state.sat,
      effect: obj.state.effect,
      alert: obj.state.alert,
      on: obj.state.on,
      hex: obj.hex
    };
  }

  const arraysEqual = (a1: ILight[], a2: ILight[]) => {
    if(a1.length === 0 || a2.length === 0) {
      return false; 
    }

    for(let i = 0; i < a1.length; i++) {
      if(a1[i].on !== a2[i].on) {
        return false; 
      }
    }
    return true; 
  }

  //Todo: Replace the implementation above with this (need to test first)
  //https://stackoverflow.com/questions/22894498/philips-hue-convert-xy-from-api-to-hex-or-rgb
  function xyBriToRgb(x: number, y: number, bri: number) {
    let z = 1.0 - x - y;
    let Y = bri / 255.0; // Brightness of lamp
    let X = (Y / y) * x;
    let Z = (Y / y) * z;
    let r = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    let maxValue = Math.max(r,g,b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;   if (r < 0) { r = 255 };
    g = g * 255;   if (g < 0) { g = 255 };
    b = b * 255;   if (b < 0) { b = 255 };
    return {
        r :r,
        g :g,
        b :b
    }
}

function xyBriToRgbHexNotation(x: number, y: number, bri: number)
{
    let z = 1.0 - x - y;

    let Y = bri / 255.0; // Brightness of lamp
    let X = (Y / y) * x;
    let Z = (Y / y) * z;
    let r = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    let maxValue = Math.max(r,g,b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;   if (r < 0) { r = 255 };
    g = g * 255;   if (g < 0) { g = 255 };
    b = b * 255;   if (b < 0) { b = 255 };

    let rRGB = Math.round(r).toString(16);
    let gRGB = Math.round(g).toString(16);
    let bRGB = Math.round(b).toString(16);

    if (rRGB.length < 2)
        rRGB="0"+rRGB;        
    if (gRGB.length < 2)
        gRGB="0"+gRGB;        
    if (bRGB.length < 2)
        bRGB="0"+rRGB;        
    let rgb = "#"+rRGB+gRGB+bRGB;

    return rgb;             
}

export const DefaultDate = (): string => {
  const today = new Date(); 
  return `${today.getFullYear()}-${pad2(today.getMonth()+1)}-${pad2(today.getDate())}T${pad2(today.getHours())}:${pad2(today.getMinutes())}`;
}

function pad2(n: number) {  // always returns a string
  return (n < 10 ? '0' : '') + n;
  }