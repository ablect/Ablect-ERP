import Card

from "../../../components/ui/Card";

import {

reportDate

}

from "../utils/reportDate";

export default function ReportGeneratedAt(){

return(

<Card>

Generated:

{" "}

{reportDate()}

</Card>

);

}