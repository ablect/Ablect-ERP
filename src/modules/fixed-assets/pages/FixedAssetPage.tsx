import PageContainer

from "../../../components/ui/PageContainer";

import FixedAssetHeader

from "../components/FixedAssetHeader";

import FixedAssetOverview

from "../components/FixedAssetOverview";

import CreateFixedAssetButton

from "../components/CreateFixedAssetButton";

import FixedAssetForm

from "../components/FixedAssetForm";

import FixedAssetSearch

from "../components/FixedAssetSearch";

import FixedAssetTable

from "../components/FixedAssetTable";

import FixedAssetCount

from "../components/FixedAssetCount";

import {

useLoadFixedAssets

}

from "../hooks/useLoadFixedAssets";

export default function FixedAssetPage(){

useLoadFixedAssets();

return(

<PageContainer>

<div className="space-y-8">

<FixedAssetHeader/>

<FixedAssetOverview/>

<CreateFixedAssetButton/>

<FixedAssetForm/>

<FixedAssetSearch/>

<FixedAssetTable/>

<FixedAssetCount/>

</div>

</PageContainer>

);

}