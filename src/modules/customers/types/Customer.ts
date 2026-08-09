export type CustomerStatus = "active" | "inactive" | "prospect";
export type CustomerType = "individual" | "business";
export type CustomerTier = "Standard" | "Loyal" | "VIP" | "Wholesale";

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
  avatarUrl?: string;
  companyName?: string;
  contactPerson?: string;
  taxId?: string;
  website?: string;
  dateOfBirth?: string;
  gender?: string;
  notes?: string;
  tags?: string[];
  tier?: CustomerTier;
  loyaltyPoints?: number;
  preferredPaymentMethod?: string;
  whatsappOptIn?: boolean;
  createdAt: string;
  updatedAt: string;
}