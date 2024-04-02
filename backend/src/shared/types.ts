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