import React, { useContext, useState } from "react";


type SearchContext = {
  city : string;
  starting: Date;
  returnDate: Date;
  bookId: string;
  saveSearchValues:(city: string, starting: Date, returnDate: Date) => void;

};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children : React.ReactNode;
}

export const SearchContextProvider = ({children} : SearchContextProviderProps) =>{

  const [city,setCity] = useState<string>("");
  // const [city, setCity] = useState<string>(
  //   () => sessionStorage.getItem("city") || ""
  // );
  const [starting,setStarting] = useState<Date>(new Date);
  // const [starting, setStarting] = useState<Date>(
  //   () => new Date(sessionStorage.getItem("starting") || new Date().toISOString()));

  const [returnDate,setReturnDate] = useState<Date>(new Date);
  // const [returnDate,setReturnDate] = useState<Date>( 
  //   () => new Date(sessionStorage.getItem("returnDate") || new Date().toISOString()));

  const [bookId,setBookId] = useState<string>("");

  // const [bookId,setBookId] = useState<any>(
  //   () => sessionStorage.getItem(bookId) || ""
  // );
  
  const saveSearchValues = (city: string, starting: Date, returnDate: Date, bookId? :string) =>{
        setCity(city);
        setStarting(starting);
        setReturnDate(returnDate);
        if(bookId){
          setBookId(bookId);
        }

        // sessionStorage.setItem("city", city);
        // sessionStorage.setItem("starting", starting.toISOString());
        // sessionStorage.setItem("returnDate", returnDate.toISOString());
        // if(bookId){
        //   sessionStorage.setItem("bookId", bookId);
        // }
      
  }

  return (
    <SearchContext.Provider value={{bookId,city, starting,returnDate,saveSearchValues}}>
      {children}
    </SearchContext.Provider>
  )
};


export const useSearchContext = () =>{
  const context = useContext(SearchContext);

  return context as SearchContext;
}