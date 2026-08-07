import PageContainer

from "../../../components/ui/PageContainer";

import PayrollHeader

from "../components/PayrollHeader";

import PayrollOverview

from "../components/PayrollOverview";

import CreatePayrollButton

from "../components/CreatePayrollButton";

import PayrollForm

from "../components/PayrollForm";

import PayrollSearch

from "../components/PayrollSearch";

import PayrollTable

from "../components/PayrollTable";

import PayrollCount

from "../components/PayrollCount";

import {

useLoadPayrolls

}

from "../hooks/useLoadPayrolls";

export default function PayrollPage(){

useLoadPayrolls();

return(

<PageContainer>

<div className="space-y-8">

<PayrollHeader/>

<PayrollOverview/>

<CreatePayrollButton/>

<PayrollForm/>

<PayrollSearch/>

<PayrollTable/>

<PayrollCount/>

</div>

</PageContainer>

);

}