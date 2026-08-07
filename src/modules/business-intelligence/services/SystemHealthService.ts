export interface SystemHealth{

database:string;

storage:string;

performance:string;

status:"Healthy"|"Warning"|"Critical";

}

export function getSystemHealth():SystemHealth{

return{

database:"Connected",

storage:"Normal",

performance:"Good",

status:"Healthy",

};

}