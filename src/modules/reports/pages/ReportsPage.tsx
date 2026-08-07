import PageContainer

from "../../../components/ui/PageContainer";

import ReportHeader

from "../components/ReportHeader";

import ReportDashboard

from "../components/ReportDashboard";

import ProfitCard
from "../components/ProfitCard";

import InventoryValueCard
from "../components/InventoryValueCard";
import ReportDateFilter
from "../components/ReportDateFilter";

import SalesChartCard
from "../components/SalesChartCard";

import PurchaseChartCard
from "../components/PurchaseChartCard";

import InventoryChartCard
from "../components/InventoryChartCard";

import ProfitChartCard
from "../components/ProfitChartCard";
import {

useLoadReports

}

from "../hooks/useLoadReports";
import ExportToolbar
from "../components/ExportToolbar";
import ExcelExportCard

from "../components/ExcelExportCard";
import ExportInfoCard

from "../components/ExportInfoCard";
import ReportGeneratedAt

from "../components/ReportGeneratedAt";
import PdfExportCard
from "../components/PdfExportCard";
export default function ReportsPage(){

useLoadReports();

return(

<PageContainer>

<div className="space-y-8">

<ReportHeader

title="Reports"

description="Business analytics dashboard."

/>
<ExportToolbar />
<ExportInfoCard/>
<ReportGeneratedAt/>
<ExcelExportCard/>
<PdfExportCard/>
<ReportDashboard/>
<div className="grid gap-4 md:grid-cols-2">

<ProfitCard/>

<InventoryValueCard/>
<ReportDateFilter />

<div className="grid gap-6 lg:grid-cols-2">

  <SalesChartCard />

  <PurchaseChartCard />

  <InventoryChartCard />

  <ProfitChartCard />

</div>
</div>
</div>

</PageContainer>

);

}