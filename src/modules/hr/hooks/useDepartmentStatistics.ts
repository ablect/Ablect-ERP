import {

useDepartments

}

from "./useDepartments";

export function useDepartmentStatistics(){

const{

departments,

}=

useDepartments();

const active=

departments.filter(

department=>

department.active,

).length;

return{

total:

departments.length,

active,

};

}