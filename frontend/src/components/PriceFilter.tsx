type Props ={
  selectedPrice?:number;
  onChange :(value?:number) => void;
}

const PriceFilter = ({selectedPrice, onChange}: Props) => {
  return (
    <div >
     <h4 className="text-md font-semibold mb-2">Max Price</h4>
     <select 
     className="p-1 border rounded-md w-full text-sm"
     value={selectedPrice}
     onChange={(event)=> onChange(event.target.value? parseInt(event.target.value) : undefined )}>
      <option value="">Select max price per week</option>
      {[3,4,5,8,10].map((price) =>(
        <option value={price}>{price}</option>
      ))}
     </select>
    </div>
  )
}

export default PriceFilter;