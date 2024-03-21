import mongoose from "mongoose";


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

const bookSchema = new mongoose.Schema<BookType>({
    userId:{type:String, required: true},
    name:{type:String, required: true},
    community:{type:String, required: true},
    city:{type:String, required: true},
    description:{type:String, required: true},
    type:{type:String, required: true},
    readerAge:[{type:String, required: true}],
    pricePerWeek:{type:Number, required: true},
    starRating: {type:Number, required: true, min: 1, max:5},
    imageUrls:[{type:String, required: true}],
    lastUpdated: {type:Date, required: true}
});

const Book = mongoose.model<BookType>("Hotel", bookSchema);
export default Book;