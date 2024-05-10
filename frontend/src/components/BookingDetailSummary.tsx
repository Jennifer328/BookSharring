import {BookType} from "../../../backend/src/shared/types";


type Props = {
   starting : Date;
   returnDate: Date;
   numberOfWeeks: number;
   book: BookType;

}


const BookingDetailSummary = ({starting, returnDate, numberOfWeeks, book}: Props) => {
  
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${book.community} , ${book.city}` }</div>
      </div>

      <div className="flex justify-between">
        <div>
          Pick-up Date 
          <div className="font-bold">{starting.toDateString()}</div>
        </div>

        <div>
          Return Date 
          <div className="font-bold">{returnDate.toDateString()}</div>
        </div>
      </div>

      <div className="border-t border-b py-2">
        Total Weeks:
        <div className="font-bold">{numberOfWeeks} weeks</div>
      </div>

    </div>
  );
};

export default BookingDetailSummary