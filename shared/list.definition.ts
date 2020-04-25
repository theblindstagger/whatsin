import { Guid } from 'guid-typescript';

export interface IList extends IObjectWithState {
  id: Guid,
  name: string,
  items?: IListItem[]
}

export interface IListItem extends IObjectWithState {
  id: Guid,
  name: string,
  quantity: number
}

export interface IObjectWithState {
  state: ObjectState
}

export enum ObjectState {
  notchanged = 0,
  modified = 1,
  added = 2
}

export class ObjectWithState implements IObjectWithState {
  state: ObjectState;
  lastUpdated: Date;

  constructor() {
    this.state = ObjectState.notchanged;
    this.lastUpdated = new Date();
  }

  public setAsModified = () => {
    this.state = ObjectState.modified;
    this.lastUpdated = new Date();
  }

  public setAsAdded = () => {
    this.state = ObjectState.added;
    this.lastUpdated = new Date();
  }
}