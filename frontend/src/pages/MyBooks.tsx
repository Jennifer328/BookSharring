import { useQuery } from "react-query";
import {Link} from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";


const MyBooks = () => {


  const {data: bookData} = useQuery("fetchMyBooks", apiClient.fetchMyBooks,{
       onError: ()=>{

       }
  });

  if(!bookData){
    return <span>No Book found</span>
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold mb-3">My Books</h1>
        <Link to="/addbook" className="flex bg-green-500 text-white text-xl font-bold p-2 hover:bg-green-600">Add Book</Link>
      </span>

      <div className="grid grid-cols-1 gap -8">
        {bookData.map(book =>(
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
              <h2 className="text-2xl font-bold">{book.name}</h2>
              <div className="whitespace-pre-line">{book.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1"/>
                  {book.city},{book.community}
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1"/>
                  {book.type}
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1"/>
                  CAD{book.pricePerWeek} per week
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1"/>
                  {book.starRating}
                </div>
              
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1"/>
                  {book.readerAge}
                </div>
              </div>
              <span className="flex justify-end">
                <Link to={`/edit-book/${book._id}`} 
                className="flex bg-green-500 text-white text-xl font-bold p-2 hover:bg-green-600">
                  View Details</Link>
              </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBooks