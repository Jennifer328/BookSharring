import { useFormContext } from "react-hook-form"
import { BookFormData } from "./ManageBookForm";


const DetailsSection = () => {

  const {register, formState:{errors},} = useFormContext<BookFormData>();

  return (
    <div className="flex flex-col gap-2 lg:gap-4 max-w-lg justify-center mx-auto">
       <h1 className="text-3xl font-bold mb-3">Add Book</h1>
       <label className="text-gray-500 text-sm font-bold flex-1">Name
           <input className="border rounded w-full py-1 px-2 font-normal" {...register("name",{required: "This field is required"})} type="text" />
           {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
        </label>

        <div className="flex gap-4">
          <label className="text-gray-500 text-sm font-bold flex-1">City
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("city",{required: "This field is required"})} type="text" />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </label>

          <label className="text-gray-500 text-sm font-bold flex-1">Community
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("city",{required: "This field is required"})} type="text" />
            {errors.community && (
              <span className="text-red-500">{errors.community.message}</span>
            )}
          </label>
        </div>

        <label className="text-gray-500 text-sm font-bold flex-1">Description
           <textarea className="border rounded w-full py-1 px-2 font-normal" {...register("description",{required: "This field is required"})} rows={6} />
           {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
        </label>

        
          <label className="text-gray-500 text-sm font-bold max-w-[50%]">Price Per Week (CAD)
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("city",{required: "This field is required"})} type="number" min={1} />
            {errors.pricePerWeek && (
              <span className="text-red-500">{errors.pricePerWeek.message}</span>
            )}
          </label>

          <label className="text-gray-500 text-sm font-bold max-w-[50%]">Rating
            <select {...register("starRating",{required:"This field is required",})} className="border w-full rounded p-2 text-gray-700 font-normal">
                <option value="" className="text-sm font-semibold">
                  Select as Rating
                </option>
                {[1,2,3,4,5].map(r =>(
                  <option value={r}>
                    {r}
                  </option>
                ))}
            </select>
            {errors.starRating && (
              <span className="text-red-500">{errors.starRating.message}</span>
            )}
          </label>
       
    </div>
  );
};

export default DetailsSection