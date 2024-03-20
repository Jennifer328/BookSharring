import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

export type BookFormData = {
  name: string;
  community: string;
  city: string;
  description: string;
  type:string;
  readerAge: number;
  pricePerWeek:number;
  starRating: number;
  imageUrls: FileList;
}

const ManageHotelForm = () => {

  const formMethods = useForm<BookFormData>();
  return (
    <FormProvider {...formMethods}>
      <form>
        <DetailsSection/>
      </form>
    </FormProvider>
    
  )
}

export default ManageHotelForm