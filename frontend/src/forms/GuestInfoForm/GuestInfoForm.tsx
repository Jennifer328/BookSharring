import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

type Props ={
  bookId : string;
  pricePerWeek: number;
}

type GuestInfoFormData ={
  starting : Date;
  returnDate: Date;
}

const GuestInfoForm = ({bookId,pricePerWeek} : Props) => {
  const search = useSearchContext();
  const {isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    watch, 
    handleSubmit, 
    setValue, 
    } = useForm<GuestInfoFormData>({
      defaultValues : {
        starting : search.starting,
        returnDate: search.returnDate
      }
    });
  const starting = watch("starting");
  const returnDate = watch("returnDate");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1); // maxima date of borrowing is 1 month

  const onSignInClick = (data: GuestInfoFormData) =>{
    search.saveSearchValues("", data.starting, data.returnDate);
    navigate("/sign-in", {state : {from: location}});
  }

  const onSubmit = (data: GuestInfoFormData) =>{
    search.saveSearchValues("", data.starting, data.returnDate);
    navigate(`/books/${bookId}/booking`);
  }

  

  return (
    <div className="flex flex-col p-4 bg-green-100 gap-4">     
         <h3 className="text-md font-bold">CAD {pricePerWeek} Per Week</h3> 
         <form onSubmit={isLoggedIn? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
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

                  <div>
                  <DatePicker 
                   required
                   selected={returnDate} 
                   onChange={(date) => setValue("returnDate",date as Date)} 
                   selectsStart
                   startDate={starting}
                   endDate={returnDate}
                   minDate={minDate}
                   maxDate={maxDate}
                   placeholderText="Return Date"
                   className="text-xs min-w-full bg-white p-2 focus:outline-none"
                   wrapperClassName="min-w-full"
                   />
                  </div>
                  {isLoggedIn? (<button className="bg-green-600 h-full p-2 font-bold hover:bg-blue-500 text-xl"> Book Now</button>)
                    : (<button className="bg-green-600 h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to Book</button>)}
               </div>
         </form>

    </div>
  )
}

export default GuestInfoForm