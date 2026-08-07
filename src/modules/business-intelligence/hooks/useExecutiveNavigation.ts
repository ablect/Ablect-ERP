import {

useNavigate

}

from "react-router-dom";

export function useExecutiveNavigation(){

const navigate=

useNavigate();

function open(

route:string,

){

navigate(route);

}

return{

open,

};

}