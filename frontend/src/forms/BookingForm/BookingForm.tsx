import { useForm } from "react-hook-form";
import { UserType, paymentIntentResponse } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser :UserType;
  paymentIntent: paymentIntentResponse,
}

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  bookId: string;
  starting: string,
  returnDate: string;
  paymentIntentId: string,
  totalCost: number,
}

const BookingForm = ({currentUser, paymentIntent}:Props) => {

  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const {bookId} = useParams();
  const {showToast} = useAppContext();

  const {mutate: reserveBook, isLoading} = useMutation(
    apiClient.createBooking, 
    {
      onSuccess: () => {
       showToast({message: "Book Reserved!", type: "SUCCESS"});
    },
      onError: () =>{
      showToast({message: "Error reserving book!", type: "ERROR"});
    }
  });


  const {handleSubmit, register} = useForm<BookingFormData>({
    defaultValues:{
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      bookId: bookId,
      starting: search.starting.toISOString(),
      returnDate: search.returnDate.toISOString(),
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    }
  });

  const onSubmit = async (formData : BookingFormData) =>{
    if(!stripe || !elements){
      return;
    }
     const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
       payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
       },
     });

     if(result.paymentIntent?.status === "succeeded"){
      //book confirmed
      reserveBook({...formData, paymentIntentId: result.paymentIntent.id})//add the most recent updated paymentIntentId to formData
     }
  };
    
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">


        <label  className="text-gray-700 text-sm fond-bold flex-1">
          First Name
          <input 
              type="text" 
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              readOnly
              disabled
              {...register("firstName")}
                  />
        </label>

        <label  className="text-gray-700 text-sm fond-bold flex-1">
          Last Name
          <input 
              type="text" 
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              readOnly
              disabled
              {...register("lastName")}
                  />
        </label>


        <label  className="text-gray-700 text-sm fond-bold flex-1">
          Email
          <input 
              type="text" 
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              readOnly
              disabled
              {...register("email")}
                  />
        </label>
      </div>
       
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-green-200 p-4 rounded-md">
           <div className="font-semibold text-lg">
            Total Cost: CAD{paymentIntent.totalCost.toFixed()}
           </div>

           <div className="text-xs">Includes taxes and charges</div>
       </div>
      </div>
       
       <div className="space-y-2">
        <h3 className="font-semibold text-lg">Payment Details</h3>
        <CardElement id="payment-element" className="border rounded-md p-2 text-sm"/>
       </div>

       <div className="flex justify-end">
           <button 
             disabled={isLoading}
             type="submit" 
             className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-md disabled:bg-gray-500">
              {isLoading? "Saving" : "Confirm Reservation"}
           </button>
       </div>
    </form>
  )
}

export default BookingForm