import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client";
import { useState } from "react";

const Search = () => {

  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    city : search.city,
    starting : search.starting.toISOString(),
    returnDate : search.returnDate.toISOString(),
    page: page.toString(),
  };

  const {data: bookData} = useQuery(["searchBooks", searchParams], ()=> apiClient.searchBooks(searchParams));
  
  return (
    <div>Search</div>
  )
}

export default Search