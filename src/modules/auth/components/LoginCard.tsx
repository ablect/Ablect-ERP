import Card

from "../../../components/ui/Card";

import LoginForm

from "./LoginForm";

export default function LoginCard(){

return(

<Card>

<h2 className="mb-6 text-xl font-semibold">

Sign In

</h2>

<LoginForm/>

</Card>

);

}