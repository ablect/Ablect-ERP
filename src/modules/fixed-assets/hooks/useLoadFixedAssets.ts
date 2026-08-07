import {

useEffect

}

from "react";

import {

fixedAssetService

}

from "../services/FixedAssetService";

import {

useFixedAssetStore

}

from "../store/FixedAssetStore";

export function useLoadFixedAssets(){

const{

setAssets,

}=

useFixedAssetStore();

useEffect(()=>{

async function load(){

const assets=

await fixedAssetService.getAll();

setAssets(

assets,

);

}

load();

},[

setAssets,

]);

}