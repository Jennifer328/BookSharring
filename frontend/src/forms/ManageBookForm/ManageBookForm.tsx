import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import ReaderAgeSection from "./ReaderAgeSection";
import ImagesSection from "./ImagesSection";

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

const ManageHotelForm = () => {

  const formMethods = useForm<BookFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection/>
        <TypeSection/>
        <ReaderAgeSection/>
        <ImagesSection />
      </form>
    </FormProvider>
    
  )
}

export default ManageHotelForm