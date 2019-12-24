export interface ICustomer {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  group_id: number;
  note: string;
  group?: IGroup;
}

export interface ICreateCustomer {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
  group_id?: number;
  note?: string;
  group?: IGroup;
}

export interface IGroup {
  id: number;
  name: string;
}
