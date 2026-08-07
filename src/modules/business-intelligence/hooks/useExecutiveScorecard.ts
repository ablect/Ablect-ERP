import {

useRevenueSummary

}

from "./useRevenueSummary";

import {

useSalesSummary

}

from "./useSalesSummary";

import {

useInventorySummary

}

from "./useInventorySummary";

import {

useCustomerSummary

}

from "./useCustomerSummary";

import {

useSupplierSummary

}

from "./useSupplierSummary";

export function useExecutiveScorecard(){

const revenue=

useRevenueSummary();

const sales=

useSalesSummary();

const inventory=

useInventorySummary();

const customers=

useCustomerSummary();

const suppliers=

useSupplierSummary();

return{

totalRevenue:

revenue.revenue,

netProfit:

revenue.profit,

inventoryValue:

inventory.stockValue,

activeCustomers:

customers.activeCustomers,

supplierRating:

suppliers.averageRating,

cashBalance:

0,

totalOrders:

sales.totalOrders,

};

}