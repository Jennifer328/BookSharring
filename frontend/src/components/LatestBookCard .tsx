import { BookType } from "../../../backend/src/shared/types";
import {Link} from "react-router-dom";

type Props = {
  book: BookType;
};

const LatestBookCard  = ({book}:Props) => {
  return (
    <Link 
      to={`/detail/${book._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md">

         <div className="h-[300px]">
            <img src={book.imageUrls[0]} className="w-full h-full object-cover object-center"/>
         </div>

         <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
               <span className="text-white text-md font-bold -tracking-tight md:text-lg lg:text-xl">{book.name}</span>
         </div>
    </Link>
  )
}

export default LatestBookCard 