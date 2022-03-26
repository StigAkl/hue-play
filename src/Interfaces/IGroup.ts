import { ILightItem } from './ILightItem';

export interface IGroup {
  id: number;
  name: string;
  lights: ILightItem[];
  checked: boolean;
}
