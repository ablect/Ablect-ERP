import PageContainer

from "../../../components/ui/PageContainer";

import FixedAssetStatistics

from "../components/FixedAssetStatistics";

import FixedAssetTable

from "../components/FixedAssetTable";

export default function FixedAssetsPage(){

return(

<PageContainer>

<div className="space-y-8">

<FixedAssetStatistics/>

<FixedAssetTable/>

</div>

</PageContainer>

);

}