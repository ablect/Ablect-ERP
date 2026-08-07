import {

useEffect

}

from "react";

import {

goodsReceivedNoteService

}

from "../services/GoodsReceivedNoteService";

import {

useGoodsReceivedNoteStore

}

from "../store/GoodsReceivedNoteStore";

export function useLoadGoodsReceivedNotes(){

const{

setNotes,

}=

useGoodsReceivedNoteStore();

useEffect(()=>{

async function load(){

const notes=

await goodsReceivedNoteService.getAll();

setNotes(

notes,

);

}

load();

},[

setNotes,

]);

}