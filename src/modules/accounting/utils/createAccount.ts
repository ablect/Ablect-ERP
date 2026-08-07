import type {

Account

}

from "../types/Account";

export function createAccount(

code:string,

name:string,

type:

|"Asset"

|"Liability"

|"Equity"

|"Revenue"

|"Expense",

parentId?:string,

):Account{

return{

id:crypto.randomUUID(),

code,

name,

type,

parentId,

active:true,

};

}