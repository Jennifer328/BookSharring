import { useQuery } from "react-query";
import {Link} from "react-router-dom";
import * as apiClient from "../api-client";


const MyBooks = () => {

  
  const {data: bookData} = useQuery("fetchMyBooks", apiClient.fetchMyBooks,{
       onError: ()=>{

       }
  })
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold mb-3">My Books</h1>
        <Link to="/addbook" className="flex bg-green-500 text-white text-xl font-bold p-2 hover:bg-green-600">Add Book</Link>
      </span>
    </div>
  )
}

export default MyBooks