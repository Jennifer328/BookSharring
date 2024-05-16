import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestBookCard from "../components/LatestBookCard ";

const Home = () => {

  const {data: books} = useQuery("fetchAllBooks", ()=> apiClient.fetchAllBooks());

  const topRowBooks = books?.slice(0,2) || [];
  const bottomRowBooks = books?.slice(2) || [];

  return (
    <div className="space-y-3">
         <h2 className="text-3xl font-bold">Latest Shared Books</h2>
         <p>Most recent books added by our communities</p>


         <div className="grid gap-4">

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  {topRowBooks.map((book)=>(
                    <LatestBookCard  book={book}/>
                  ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
               {bottomRowBooks.map((book)=>(
                <LatestBookCard  book={book}/>
               ))}
          </div>

         </div>
    </div>
  );
};

export default Home