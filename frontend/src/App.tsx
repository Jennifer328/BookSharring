import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddBook from "./pages/AddBook";
import { useAppContext } from "./contexts/AppContext";
import MyBooks from "./pages/MyBooks";


const App = () =>{

  const {isLoggedIn} = useAppContext();

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        <Route path="/search"  element={<Layout><p>Search Page</p></Layout>}/>
        <Route path="/register"  element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in"  element={<Layout><SignIn/></Layout>}/>
        {isLoggedIn && <>
          <Route path="/addbook" element={<Layout><AddBook/></Layout>}/>
          <Route path="/mybooks" element={<Layout><MyBooks/></Layout>}/>
        </>}
        <Route path="/*"  element={<Navigate to="/"/>}/>
      </Routes>
    
    
    </BrowserRouter>

  )
}
export default App
