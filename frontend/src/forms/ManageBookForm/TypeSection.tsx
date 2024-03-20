import { useFormContext } from "react-hook-form";
import { bookTypes } from "../../config/book-options-config";
import { BookFormData } from "./ManageBookForm";

const TypeSection = () => {

  const {register, watch, formState:{errors},} = useFormContext<BookFormData>();
  const typeWatch = watch("type");
  return (
    <div className="gap-2 max-w-lg  mx-auto">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="text-xs md:text-base grid grid-cols-3 gap-x-1 md:grid-cols-4 md:gap-x-3  gap-y-3">
        {bookTypes.map(type =>(
          <label className={
            typeWatch === type ? "cursor-pointer bg-green-400 text-sm rounded-full px-4 py-2" 
            : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 "
          }>
            <input className="hidden" type="radio" value={type} {...register("type", {required: "This field is required",})}/>
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      )}
    </div>
  )
}

export default TypeSection