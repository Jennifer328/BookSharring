import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const Home = () => {
  const {data: books} = useQuery("fetchAllBooks", apiClient.fetchAllBooks);
  return (
    <div>THIS IS NEW Home</div>
  )
}

export default Home