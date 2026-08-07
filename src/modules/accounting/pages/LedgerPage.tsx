import PageContainer

from "../../../components/ui/PageContainer";

import LedgerHeader

from "../components/LedgerHeader";

import LedgerStatistics

from "../components/LedgerStatistics";

import CreateLedgerButton

from "../components/CreateLedgerButton";

import LedgerForm

from "../components/LedgerForm";

import LedgerSearch

from "../components/LedgerSearch";

import LedgerTable

from "../components/LedgerTable";

import LedgerCount

from "../components/LedgerCount";

import LedgerSummary

from "../components/LedgerSummary";

import {

useLoadLedger

}

from "../hooks/useLoadLedger";

export default function LedgerPage(){

useLoadLedger();

return(

<PageContainer>

<div className="space-y-8">

<LedgerHeader

title="General Ledger"

description="Manage accounting entries."

/>

<LedgerStatistics/>

<CreateLedgerButton/>

<LedgerForm/>

<LedgerSearch/>

<LedgerTable/>

<LedgerSummary/>

<LedgerCount/>

</div>

</PageContainer>

);

}