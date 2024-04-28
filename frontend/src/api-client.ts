
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {BookSearchResponse, BookType} from "../../backend/src/shared/types";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData : RegisterFormData ) =>{
      const response =  await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials : "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();
      if(!response.ok){
        throw new Error(responseBody.message);
      }
};

export const signIn = async (formData: SignInFormData) =>{
  const response = await fetch (`${API_BASE_URL}/api/auth/login`, {
     method: "POST",
     credentials: "include",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
  })

  const body = await response.json();
  if(!response.ok){
    throw new Error(body.message)
  }

  return body;
}

export const validateToken = async () =>{
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
    credentials: "include"
  })

  if(!response.ok){
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () =>{
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",  
    method: "POST"                                                                                                                                                                                                             
  });

  if(!response.ok){
    throw new Error("Error during sign out");
  }
}

export const addMyBook = async (BookFormData: FormData) =>{
   const response = await fetch(`${API_BASE_URL}/api/mybooks`, {
    method: "POST",
    credentials: "include",
    body: BookFormData,
   });

   if(!response.ok){
    throw new Error("Failed to add book");
   }

   return response.json;
}

export const fetchMyBooks = async(): Promise<BookType[]> =>{ //make frontend and backend using the same type
  const response = await fetch(`${API_BASE_URL}/api/mybooks`,{
    credentials: "include"
  });
  if(!response.ok){
    throw new Error("Error fetching books");
  }

  return response.json();
}


export const fetchMyBookById = async (bookId : string): Promise<BookType> =>{
  const response = await fetch(`${API_BASE_URL}/api/mybooks/${bookId}`,{
    credentials: "include"
  });
  if(!response.ok){
    throw new Error("Error fetching Books");
  }

  return response.json();
}

export const updateMyBookById = async (BookFormData : FormData) =>{
  const response = await fetch(`${API_BASE_URL}/api/mybooks/${BookFormData.get(`bookId`)}`, {
    credentials: "include",
    method: "PUT",
    body: BookFormData
  });

  if(!response.ok){
    throw new Error("Fail to update book");
  }

  return response.json();
};


export type SearchParams = {
  city?: string;
  starting?: string;
  returnDate?: string;
  page?: string;
}

// const {data: bookData} = useQuery(["searchBooks", searchParams], ()=> apiClient.searchBooks(searchParams));

export const searchBooks = async (searchParams: SearchParams): Promise<BookSearchResponse> =>{
  const queryParams = new URLSearchParams();
  queryParams.append("city", searchParams.city || "");
  queryParams.append("starting", searchParams.starting || "");
  queryParams.append("returnDate", searchParams.returnDate || "");
  queryParams.append("page", searchParams.page|| "");

  const response = await fetch(`${API_BASE_URL}/api/books/search?${queryParams}`);

  if(!response.ok){
    throw new Error("Error fetching books");
  }

  return response.json();
}