import SearchInput

from "../../../components/ui/SearchInput";

import {

useUserSearch

}

from "../hooks/useUserSearch";

export default function UserSearch(){

const{

query,

setQuery,

}=

useUserSearch();

return(

<SearchInput

value={query}

onChange={setQuery}

/>

);

}