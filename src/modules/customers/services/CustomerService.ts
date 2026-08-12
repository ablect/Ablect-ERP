import type { Customer } from "../types/Customer";
import { requireDesktopApi } from "../../../lib/desktopApi";
function mapCustomer(row:unknown):Customer{const c=row as Record<string,unknown>;return{id:String(c.id),customerCode:String(c.customerCode??c.customer_code??""),name:String(c.name??c.full_name??""),companyName:(c.companyName??c.business_name) as string|undefined,type:(c.type??(c.customer_type==="RETAIL"?"individual":"business")) as Customer["type"],phone:String(c.phone??""),email:String(c.email??""),address:String(c.address??""),city:String(c.city??""),state:String(c.state??""),status:(c.status??(c.is_active?"active":"inactive")) as Customer["status"],creditLimit:Number(c.creditLimit??c.credit_limit??0),outstandingBalance:Number(c.outstandingBalance??c.credit_balance??0),tier:(c.tier??"Standard") as Customer["tier"],loyaltyPoints:Number(c.loyaltyPoints??c.loyalty_points??0),preferredPaymentMethod:String(c.preferredPaymentMethod??"Cash"),createdAt:String(c.createdAt??c.created_at??""),updatedAt:String(c.updatedAt??c.updated_at??"")};}
export const customerService={
 async getAll():Promise<Customer[]>{return (await requireDesktopApi().erp.customers.list()).map(mapCustomer);},
 async getById(id:string):Promise<Customer|undefined>{return (await requireDesktopApi().erp.customers.list(id)).map(mapCustomer).find((customer)=>customer.id===id);},
 async create(customer:Customer):Promise<Customer[]>{return (await requireDesktopApi().erp.customers.create(customer) as unknown[]).map(mapCustomer);},
 async update(customer:Customer):Promise<Customer[]>{return (await requireDesktopApi().erp.customers.update(customer) as unknown[]).map(mapCustomer);},
 async delete(id:string):Promise<Customer[]>{return (await requireDesktopApi().erp.customers.delete(id) as unknown[]).map(mapCustomer);},
};
