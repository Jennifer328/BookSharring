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
};

export type BookSearchResponse = {
  data: BookType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  }
};