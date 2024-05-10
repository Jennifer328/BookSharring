
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";

const Booking = () => {

  const search = useSearchContext();
  const {bookId} = useParams();
  const [numberOfWeeks, setNumberOfWeeks] = useState<number>(0);

  useEffect(() =>{
    if(search.starting && search.returnDate){
      const weeks = Math.abs(search.returnDate.getTime() - search.starting.getTime())/(1000 * 60 * 60 * 24 * 7);

      setNumberOfWeeks(Math.ceil(weeks));
    }
  },[search.starting, search.returnDate]);

  const {data: book} = useQuery(
    "fetchBookById",
    ()=> apiClient.fetchBookById(bookId as string), {
    enabled: !!bookId,
  })

  const {data: currentUser} = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
   if(!book){
    return <></>;
   }
   

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary 
          starting={search.starting} 
          returnDate={search.returnDate} 
          numberOfWeeks={numberOfWeeks} 
          book={book}
      />
      
      {currentUser &&  <BookingForm  currentUser={currentUser} />}
     
    </div>
  )
}

export default Booking