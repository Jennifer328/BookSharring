import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SearchBar = () => {

  const search = useSearchContext();
  const [city, setCity] = useState<string>(search.city);
  const [starting, setStarting] = useState<Date>(search.starting);
  const [returnDate, setReturnDate] = useState<Date>(search.returnDate);
  const [bookId, setBookId] = useState<string>(search.bookId);

  const handleSubmit = (event : FormEvent) =>{
        event.preventDefault();
        search.saveSearchValues(city, starting, returnDate);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1); // maxima date of borrowing is 1 month

  return (
    <form 
    onSubmit={handleSubmit}
    className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
       <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore  size={25} className="mr-2"/>
        <input placeholder="type a city to search" 
               className="text-xs w-full focus:outline-none"
               value={city}
               onChange={(event)=>{setCity(event.target.value)}}
               />
       </div>

       <div className="flex bg-white px-2 py-1 gap-2">
           <DatePicker 
             selected={starting} 
             onChange={(date) =>setStarting(date as Date)} 
             selectsStart
             startDate={starting}
             endDate={returnDate}
             minDate={minDate}
             maxDate={maxDate}
             placeholderText="Starting Date"
             className="text-xs min-w-full bg-white p-2 focus:outline-none"
             />
       </div>

       <div className="flex bg-white px-2 py-1 gap-2">
           <DatePicker 
             selected={returnDate} 
             onChange={(date) =>setReturnDate(date as Date)} 
             selectsStart
             startDate={returnDate}
             endDate={returnDate}
             minDate={minDate}
             maxDate={maxDate}
             placeholderText="Starting Date"
             className="text-xs min-w-full bg-white p-2 focus:outline-none"
             />
       </div>
    
    </form>
  )
}

export default SearchBar