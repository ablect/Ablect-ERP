import {

useAuthStore

}

from "../store/AuthStore";

export function useAuth(){

const{

user,

login,

logout,

}=

useAuthStore();

return{

user,

login,

logout,

};

}