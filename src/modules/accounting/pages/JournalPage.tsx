import PageContainer

from "../../../components/ui/PageContainer";

import JournalHeader

from "../components/JournalHeader";

import JournalOverview

from "../components/JournalOverview";

import CreateJournalButton

from "../components/CreateJournalButton";

import JournalForm

from "../components/JournalForm";

import JournalSearch

from "../components/JournalSearch";

import JournalTable

from "../components/JournalTable";

import JournalCount

from "../components/JournalCount";

export default function JournalPage(){

return(

<PageContainer>

<div className="space-y-8">

<JournalHeader/>

<JournalOverview/>

<CreateJournalButton/>

<JournalForm/>

<JournalSearch/>

<JournalTable/>

<JournalCount/>

</div>

</PageContainer>

);

}