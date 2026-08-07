import { useState } from "react";

import SearchInput from "../../../components/ui/SearchInput";

export default function CustomerSearch() {

  const [keyword, setKeyword] = useState("");

  return (

    <SearchInput

      placeholder="Search customers..."

      value={keyword}

      onChange={setKeyword}

    />

  );

}