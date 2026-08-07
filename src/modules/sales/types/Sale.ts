export type Sale = {

  id: string;

  invoiceNumber: string;

  customerId: string;

  date: string;

  total: number;

  status:
    | "Draft"
    | "Completed"
    | "Cancelled";

};