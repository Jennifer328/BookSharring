import { useMutation } from "react-query";
import ManageBookForm from "../forms/ManageBookForm/ManageBookForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddBook = () => {

  const {showToast} = useAppContext();

  const {mutate, isLoading} = useMutation(apiClient.addMyBook, {
    onSuccess: ()=>{
      showToast({message: "Book Saved!", type:"SUCCESS"});
    },
    onError: ()=>{
      showToast({message: "Error Saving Book", type:"ERROR"});
    }
  });

  const handleSave = (BookFormData: FormData)=>{
     mutate(BookFormData);
  }


  return (
    <ManageBookForm  onSave={handleSave} isLoading={isLoading}/>
  )
}

export default AddBook;