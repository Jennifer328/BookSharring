
export type UserType ={
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};



export type BookType = {
  _id: string;
  userId: string;
  name: string;
  community: string;
  city: string;
  description: string;
  type:string;
  readerAge: string;
  pricePerWeek:number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[],
};

export type BookingType = {
  _id: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  starting: Date,
  returnDate: Date,
  totalCost: number,
}

export type BookSearchResponse = {
  data: BookType[];
  pagination: {
    total: number;
    pages: number;
    page: number;
  };
};

export type paymentIntentResponse = {
  paymentIntentId: string,
  clientSecret: string,
  totalCost: number,
}
