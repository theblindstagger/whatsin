export interface IList {
  id: number,
  name: string,
  items?: IListItem[]
}

export interface IListItem {
  id: number,
  name: string,
  quantity: number
}