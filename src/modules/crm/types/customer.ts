export type CustomerStatus = "active" | "inactive" | "prospect";

export type CustomerType = "individual" | "business";

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  type: CustomerType;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  status: CustomerStatus;
  creditLimit: number;
  outstandingBalance: number;
  createdAt: string;
  updatedAt: string;
}