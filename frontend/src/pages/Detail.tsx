import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import {AiFillStar} from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";


const Detail = () => {

  const {bookId} = useParams();

  const {data: book} = useQuery("fetchBookById", ()=>
     apiClient.fetchBookById(bookId as string),{
      enabled: !!bookId,
     }
);

if(!book){
  return <></>;
}

  return (
    <div className="space-y-6">
       <div>
         <span className="flex">
          {Array.from({length: book.starRating}).map(() =>(
            <AiFillStar className="fill-yellow-400" />
          ))}
         </span>

         <h1 className="text-3xl font-bold">{book.name}</h1>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {book.imageUrls.map((image) => (
            <div className="h-[300px]">
                <img src={image} alt={book.name} className="rounded-md w-full h-full object-cover object-center" />
            </div>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
           <div className="whitespace-pre-line">{book.description}</div>
           <div className="h-fit">
             <GuestInfoForm  pricePerWeek={book.pricePerWeek} bookId={book._id}/>
           </div>
       </div>
    </div>
  )
}

export default Detail;