import Input from "../../../components/ui/Input";

type Props = {

register: any;

};

export default function CustomerBasicInformation({

register,

}: Props){

return(

<div className="grid gap-4 md:grid-cols-2">

<Input

label="Customer Name"

{...register("name")}

/>

<Input

label="Email"

type="email"

{...register("email")}

/>

<Input

label="Phone"

{...register("phone")}

/>

<Input

label="Address"

{...register("address")}

/>

</div>

);

}