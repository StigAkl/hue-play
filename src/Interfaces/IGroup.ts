import { IListItem } from "./IListItem";

export interface IGroup {
    id: number,
    name: string,
    lights: IListItem[],
    checked: boolean
}