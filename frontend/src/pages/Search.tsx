import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";

const Search = () => {

  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    city: search.city,
    starting: search.starting.toISOString(),
    returnDate: search.returnDate.toISOString(),
    page: page.toString(),
  };

  const { data: bookData } = useQuery(["searchBooks", searchParams], () => apiClient.searchBooks(searchParams));


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          {/*TODO FILTERS*/}

        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="felx justify-between items-center">
          <span className="text-xl font-bold">
            {bookData?.pagination.total} Books found
          {search.city ? ` in  ${search.city}` : ""}


          </span>
          {/*TODO SORT OPTIONS */}
        </div>

        {bookData?.data.map((book) => (
          <SearchResultCard book={book} />
        ))}

        <div>
          <Pagination
            page={bookData?.pagination.page || 1}
            pages={bookData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>

      </div>
    </div>
  )
}

export default Search