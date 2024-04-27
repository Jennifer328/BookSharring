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

  //const [city,setCity] = useState<string>("");
  const [city, setCity] = useState<string>(
    () => sessionStorage.getItem("city") || ""
  );
  const [starting,setStarting] = useState<Date>(new Date);
  const [returnDate,setReturnDate] = useState<Date>(new Date);
  const [bookId,setBookId] = useState<string>("");
  
  const saveSearchValues = (city: string, starting: Date, returnDate: Date, bookId? :string) =>{
        setCity(city);
        setStarting(starting);
        setReturnDate(returnDate);
        if(bookId){
          setBookId(bookId);
        }
      
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