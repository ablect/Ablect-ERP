import FinancialSummaryCard

from "./FinancialSummaryCard";

import ProfitAndLossCard

from "./ProfitAndLossCard";

import BalanceSheetCard

from "./BalanceSheetCard";

import TrialBalanceCard

from "./TrialBalanceCard";

import CashFlowCard

from "./CashFlowCard";

import AccountBalancesCard

from "./AccountBalancesCard";

export default function FinancialDashboard(){

return(

<div className="grid gap-4 lg:grid-cols-3">

<FinancialSummaryCard/>

<ProfitAndLossCard/>

<BalanceSheetCard/>

<TrialBalanceCard/>

<CashFlowCard/>

<AccountBalancesCard/>

</div>

);

}