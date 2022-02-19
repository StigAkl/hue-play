export interface ILightItem {
    id: number; 
    name: string; 
    checked: boolean; 
    state?: State
}

export interface State {
    on: boolean;
    bri: number;
    hue: number; 
    sat: number; 
    effect: string;
    xy: number[]; 
    alert: string; 
    reachable: boolean; 
}