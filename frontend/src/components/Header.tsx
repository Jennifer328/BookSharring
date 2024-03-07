import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () =>{
  const {isLoggedIn} = useAppContext();
  return (
    <div className="bg-green-600 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-xl text-white font-bold tracking-tight">
              <Link to="/">BookSharring.com</Link>
            </span>

            <span className="flex space-x-2">
              {isLoggedIn ?
               <>
                <Link to="/my-lectures">My Lectures</Link>
                <Link to="/my-lectures">My Books</Link>
                <button>Sign out</button>
              </>
              :<Link to="/sign-in" className="text-xs flex items-center text-white px-3 font-bold hover:text-gray-500 ">Sign In</Link>}
               
            </span>
        </div>
  
    </div>
  )
}

export default Header;