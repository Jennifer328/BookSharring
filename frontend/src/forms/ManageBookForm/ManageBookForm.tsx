import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import ReaderAgeSection from "./ReaderAgeSection";
import ImagesSection from "./ImagesSection";
import { BookType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type BookFormData = {
  name: string;
  community: string;
  city: string;
  description: string;
  type:string;
  readerAge: string;
  pricePerWeek:number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
}


type Props = {
  book?: BookType;
  onSave: (BookFormData: FormData)=>void;
  isLoading: boolean
}

const ManageBookForm = ({onSave,isLoading, book} : Props) => {

  const formMethods = useForm<BookFormData>();
  const {handleSubmit, reset} = formMethods;

  useEffect(() =>{
      reset(book);
  },[book,reset])

  const onSubmit = handleSubmit((formDataJson: BookFormData) =>{
    //create new FormData object & call API
   
    const formData = new FormData();
    if(book){
      formData.append("bookId",book._id);
    }
    formData.append("name",formDataJson.name);
    formData.append("city",formDataJson.city);
    formData.append("community",formDataJson.community);
    formData.append("description",formDataJson.description);
    formData.append("type",formDataJson.type);
    formData.append("readerAge",formDataJson.readerAge);
    formData.append("pricePerWeek",formDataJson.pricePerWeek.toString());
    formData.append("starRating",formDataJson.starRating.toString());
    
    // formDataJson.readerAge.forEach((age, index) => {
    //   formData.append(`readerAge[${index}]`,age);
    // });

    if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url, index) =>{
        formData.append(`imageUrls[${index}]`,url);
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) =>{
         formData.append(`imageFiles`, imageFile);
    });
    console.log(formDataJson);
    onSave(formData);
  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <ReaderAgeSection/>
        <ImagesSection />
        <span className="flex justify-end">
          <button 
             disabled={isLoading}
             type="submit" 
             className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"> 
             {isLoading? "Saving..." : "Save"}
             
          </button>
        </span>
      </form>
    </FormProvider>
    
  )
}

export default ManageBookForm

