import { useFormContext } from "react-hook-form";
import { bookTypes } from "../../config/book-options-config";

const TypeSection = () => {

  const {register, watch} = useFormContext();
  const typeWatch = watch("type");
  return (
    <div className="gap-2 max-w-lg  mx-auto">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="text-xs md:text-base grid grid-cols-2 gap-x-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2  gap-y-3">
        {bookTypes.map(type =>(
          <label className={
            typeWatch === type ? "cursor-pointer bg-green-300 text-sm rounded-full px-4 py-2 font-semibold" 
            : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
          }>
            <input className="hidden" type="radio" value={type} {...register("type", {required: "This field is required",})}/>
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TypeSection