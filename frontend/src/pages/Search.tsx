import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import BookTypesFilter from "../components/BookTypesFilter";

const Search = () => {

  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const searchParams = {
    city: search.city,
    starting: search.starting.toISOString(),
    returnDate: search.returnDate.toISOString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
  };

  const { data: bookData } = useQuery(["searchBooks", searchParams], () => apiClient.searchBooks(searchParams));

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
   const starRating = event.target.value;

   setSelectedStars((prevStars)=>
     event.target.checked
   ? [...prevStars, starRating]
   : prevStars.filter((star) => star !== starRating)
  )
  }

  const handleBookTypeChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
     const bookType = event.target.value;

     setSelectedTypes((prevTypes) => 
      event.target.checked 
      ? [...prevTypes, bookType]
      : prevTypes.filter((type) => type !== bookType)
    )
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          < StarRatingFilter  
            selectedStars={selectedStars}
            onChange={handleStarsChange}/>
          <BookTypesFilter selectedTypes={selectedTypes} onChange={handleBookTypeChange}/>

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