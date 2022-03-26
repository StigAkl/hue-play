import { ILightItem } from './Interfaces/ILightItem';
import { IGroup } from './Interfaces/IGroup';

export const mapToLightItem = (data: any): ILightItem[] => {
  const lights: ILightItem[] = [];

  for (let obj in data) {
    lights.push({
      id: parseInt(obj),
      checked: data[obj].state.on,
      name: data[obj].name,
      state: data[obj].state,
    });
  }

  return lights;
};

export const mapToGroupItem = (data: any, lights: ILightItem[]): IGroup[] => {
  const groups: IGroup[] = [];
  for (let obj in data) {
    groups.push({
      id: parseInt(obj),
      name: data[obj].name,
      checked: data[obj].state.any_on,
      lights: lights.filter((l) => data[obj].lights.includes(l.id.toString())),
    });
  }
  return groups;
};

export const initializeLights = (items: IGroup[]): string[] => {
  const lightIds: string[] = [];
  items.forEach((g) =>
    g.lights.forEach((l) => {
      if (l.checked) {
        lightIds.push(l.id.toString());
      }
    })
  );

  return lightIds;
};
