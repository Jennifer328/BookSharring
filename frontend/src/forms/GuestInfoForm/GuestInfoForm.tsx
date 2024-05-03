import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

type Props ={
  bookId : string;
  pricePerWeek: number;
}

type GuestInfoFormData ={
  starting : Date;
  returnDate: Date;
}

const GuestInfoForm = ({bookId,pricePerWeek} : Props) => {
  
  const {watch, register, handleSubmit, setValue, formState:{errors}} = useForm<GuestInfoFormData>();
  const starting = watch("starting");
  const returnDate = watch("returnDate");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1); // maxima date of borrowing is 1 month

  return (
    <div className="flex flex-col p-4 bg-green-200 gap-4">     
         <h3 className="text-md font-bold">CAD {pricePerWeek}</h3> 
         <form action="">
               <div className="grid grid-cols-1 gap-4 items-center">
                  <div>
                  <DatePicker 
                   required
                   selected={starting} 
                   onChange={(date) => setValue("starting",date as Date)} 
                   selectsStart
                   startDate={starting}
                   endDate={returnDate}
                   minDate={minDate}
                   maxDate={maxDate}
                   placeholderText="Starting Date"
                   className="text-xs min-w-full bg-white p-2 focus:outline-none"
                   wrapperClassName="min-w-full"
                   />
                  </div>
               </div>
         </form>

    </div>
  )
}

export default GuestInfoForm