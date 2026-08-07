import {

useAuditLogs

}

from "../hooks/useAuditLogs";

export default function AuditLogTable(){

const{

logs,

}=

useAuditLogs();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Date</th>

<th>User</th>

<th>Module</th>

<th>Action</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{logs.map(log=>(

<tr key={log.id}>

<td>{log.timestamp}</td>

<td>{log.userName}</td>

<td>{log.module}</td>

<td>{log.action}</td>

<td>{log.status}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}