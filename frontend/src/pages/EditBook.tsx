import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client";
import ManageBookForm from "../forms/ManageBookForm/ManageBookForm";
import { useAppContext } from "../contexts/AppContext";



const EditBook = () => {

  const {bookId} = useParams();
  const {showToast} = useAppContext();
  const {data: book} =useQuery("fetchMyBookById",
   ()=> apiClient.fetchMyBookById(bookId || ""),{
    enabled: !!bookId, //check if the bookId is a valid value, if yes enabled will be set to true
   });

  const {mutate,isLoading} = useMutation(apiClient.updateMyBookById,{
    onSuccess: ()=>{
       showToast({message: "Book Saved!", type: "SUCCESS"});
    },
    onError: ()=>{
       showToast({message: "Error saving Book", type: "ERROR"});
    }
  });

  const handleSave = (BookFormData: FormData) =>{
   mutate(BookFormData);
  };

  return (
    <ManageBookForm book={book} onSave={handleSave} isLoading={isLoading}/>
  );


};

export default EditBook


