import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

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
      <form className="flex flex-col gap-5">
        <DetailsSection/>
        <TypeSection/>
      </form>
    </FormProvider>
    
  )
}

export default ManageHotelForm