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
}