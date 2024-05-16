import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () =>{
  const {data: books} = useQuery(
    "fetchMyBookings", 
    apiClient.fetchMyBookings
  );

  if(!books || books.length === 0){
    return <span>No bookings found</span>;
  }

  return(
    <div className="space-y-5">
       <h1 className="text-3xl font-bold">My Orders</h1>
      {books.map((book) =>(
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
             <div className="lg:w-full lg:h-[250px]">
              <img src={book.imageUrls[0]}
                   className="w-full h-full object-cover object-center" 
              />
             </div>

             <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                <div className="text-2xl font-bold">
                   {book.name}
                   <div className="text-xs font-normal">
                       {book.community}, {book.city}
                   </div>

                </div>

                {book.bookings.map((booking) =>(
                <div>
                  <div>
                    <span className="font-bold mr-2 "> Dates:</span>
                    <span>
                      {new Date(booking.starting).toDateString()} - 
                      {new Date(booking.returnDate).toDateString()}
                    </span>
                  </div>
                </div>
            ))}
             </div>
       
        </div>
      ))}
    </div>
  )
}

export default MyBookings;