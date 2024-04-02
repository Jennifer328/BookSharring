import mongoose from "mongoose";
import { BookType } from "../shared/types";




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

const Book = mongoose.model<BookType>("Book", bookSchema);
export default Book;