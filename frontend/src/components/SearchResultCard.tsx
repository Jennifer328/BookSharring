import { AiFillStar } from "react-icons/ai";
import { BookType } from "../../../backend/src/shared/types";

type Props ={
  book: BookType;
}
const SearchResultCard = ({book}: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
        <div className="w-full h-[380px]">
         <img src={book.imageUrls[0]}
         className="w-full h-full object-cover object-center"/>
        </div>

        <div className="grid grid-rows-[1fr-2fr-1fr]">
          <div className="">
              <div className="flex items-center">
                <span className="flex">
                  {Array.from({length: book.starRating}).map(()=>(
                    <AiFillStar className="fill-yellow-400"/>
                  ))}
                </span>

                <span className="ml-1 text-sm">
                  {book.type}
                </span>
              </div>
              <h2 className="text-2xl font-bold cursor-pointer">{book.name}</h2>
          </div>

         <div>
             <div className="line-clamp-4"> {book.description} </div>
         </div>
      
        
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
              <div className="flex gap-1 items-center">
                  {book.city} : {book.community}
              </div>

              <div className="flex flex-col items-end gap-1">
                  <span className="font-bold">CAD {book.pricePerWeek} per week</span>
                  <button className="bg-green-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-green-400 rounded-md">View More</button>
              </div>
        </div>
         
          
        </div>
    </div>
  )
}

export default SearchResultCard