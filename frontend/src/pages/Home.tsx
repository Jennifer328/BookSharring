import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const Home = () => {
  const {data: books} = useQuery("fetchAllBooks", ()=> apiClient.fetchAllBooks());
  const topRowBooks = books?.slice(0,2) || [];
  const bottomRowBooks = books?.slice(2) || [];

  return (
    <div className="space-y-3">
         <h2 className="text-3xl font-bold">Latest Shared Books</h2>
         <p>Most recent books added by our communities</p>
    </div>
  )
}

export default Home