import { useFormContext } from "react-hook-form";
import {readerAge} from "../../config/book-options-config";
import { BookFormData } from "./ManageBookForm";


const ReaderAgeSection = () => {

  const {register,formState:{errors}} = useFormContext<BookFormData>();

  return (
    <div className="gap-2 max-w-lg  mx-auto">
      <h2 className="text-2xl font-bold mb-3">Recommended For</h2>
      <div className="text-xs md:text-base grid grid-cols-2 gap-x-10  md:grid-cols-4 md:gap-x-0  gap-y-3">
      {readerAge.map(age =>(
          <label className="flex gap-1 text-sm text-gray-700">
             <input type="checkbox" value={age} {...register("readerAge",{
              validate:(readerAge)=>{
                 if(readerAge && readerAge.length > 0){
                     return true;
                 }else{
                  return "At least one recommended age is required";
                 }
              },
             })}/>
             {age}
          </label>
         
         ))}
      </div>
      {errors.readerAge && (
        <span className="text-red-500 text-sm font-bold">{errors.readerAge.message}</span>
      )}
    </div>
  );
};

export default ReaderAgeSection;


          
          
