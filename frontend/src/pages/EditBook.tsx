import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client";
import ManageBookForm from "../forms/ManageBookForm/ManageBookForm";



const EditBook = () => {

  const {bookId} = useParams();
  const {data: book} =useQuery("fetchMyBookById",
   ()=> apiClient.fetchMyBookById(bookId || ""),{
    enabled: !!bookId, //check if the bookId is a valid value, if yes enabled will be set to true
   });

  const {mutate,isLoading} = useMutation(apiClient.fetchMyBookById,{
    onSuccess: ()=>{

    },
    onError: ()=>{

    }
  });

  const handleSave = () =>{

  }

  return (
    <ManageBookForm book={book} onSave={handleSave} isLoading={isLoading}/>
  );


};

export default EditBook


