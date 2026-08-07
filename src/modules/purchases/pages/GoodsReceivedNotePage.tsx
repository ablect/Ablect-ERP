import PageContainer

from "../../../components/ui/PageContainer";

import GoodsReceivedNoteHeader

from "../components/GoodsReceivedNoteHeader";

import GoodsReceivedNoteOverview

from "../components/GoodsReceivedNoteOverview";

import CreateGoodsReceivedNoteButton

from "../components/CreateGoodsReceivedNoteButton";

import GoodsReceivedNoteForm

from "../components/GoodsReceivedNoteForm";

import GoodsReceivedNoteSearch

from "../components/GoodsReceivedNoteSearch";

import GoodsReceivedNoteTable

from "../components/GoodsReceivedNoteTable";

import GoodsReceivedNoteCount

from "../components/GoodsReceivedNoteCount";

import {

useLoadGoodsReceivedNotes

}

from "../hooks/useLoadGoodsReceivedNotes";

export default function GoodsReceivedNotePage(){

useLoadGoodsReceivedNotes();

return(

<PageContainer>

<div className="space-y-8">

<GoodsReceivedNoteHeader/>

<GoodsReceivedNoteOverview/>

<CreateGoodsReceivedNoteButton/>

<GoodsReceivedNoteForm/>

<GoodsReceivedNoteSearch/>

<GoodsReceivedNoteTable/>

<GoodsReceivedNoteCount/>

</div>

</PageContainer>

);

}