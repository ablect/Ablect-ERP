export type Sale = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  date: string;
  subtotal?: number;
  discountAmount?: number;
  taxAmount?: number;
  total: number;
  amountPaid?: number;
  balanceDue?: number;
  paymentStatus?: "Paid" | "Partially Paid" | "Unpaid";
  paymentMethod?: string;
  status: "Draft" | "Completed" | "Cancelled";
  cancelledAt?: string;
  cancelledReason?: string;
};
