
import * as apiClicnet from "../api-client";
import { useQuery } from "react-query";
import BookingForm from "../forms/BookingForm/BookingForm";

const Booking = () => {

  const {data: currentUser} = useQuery(
    "fetchCurrentUser",
    apiClicnet.fetchCurrentUser
  );
 
   

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <div className="bg-green-200">BOOKING DETAILS SUMMARY</div>
      {/* <BookingForm  currentUser={currentUser}/> */}
    </div>
  )
}

export default Booking