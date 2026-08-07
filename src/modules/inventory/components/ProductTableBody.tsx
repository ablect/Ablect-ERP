import StatusBadge from "../../../components/ui/StatusBadge";

export default function ProductTableBody(){

return(

<tbody>

<tr>

<td>ABL001</td>

<td>100001</td>

<td>5KVA Hybrid Inverter</td>

<td>Inverter</td>

<td>Deye</td>

<td>8</td>

<td>₦450,000</td>

<td>₦520,000</td>

<td>

<StatusBadge

status="Active"

/>

</td>

</tr>

<tr>

<td>ABL002</td>

<td>100002</td>

<td>550W Solar Panel</td>

<td>Solar</td>

<td>Jinko</td>

<td>75</td>

<td>₦80,000</td>

<td>₦96,000</td>

<td>

<StatusBadge

status="Active"

/>

</td>

</tr>

<tr>

<td>ABL003</td>

<td>100003</td>

<td>Lithium Battery</td>

<td>Battery</td>

<td>Dyness</td>

<td>2</td>

<td>₦650,000</td>

<td>₦760,000</td>

<td>

<StatusBadge

status="Low Stock"

/>

</td>

</tr>

</tbody>

);

}