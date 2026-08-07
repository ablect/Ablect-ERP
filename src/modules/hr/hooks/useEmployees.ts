import {

useEmployeeStore

}

from "../store/EmployeeStore";

export function useEmployees(){

return useEmployeeStore();

}