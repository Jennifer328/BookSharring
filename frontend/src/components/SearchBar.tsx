import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";


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
    
    </form>
  )
}

export default SearchBar