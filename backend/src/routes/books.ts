import { error } from "console";
import express ,{Request,Response} from "express";
import Book from "../models/book";
import { BookSearchResponse } from "../shared/types";


const router = express.Router();

// /api/books/search?
router.get("/search", async (req: Request, res:Response) =>{
    try{

      const pageSize = 5;
      const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1" ); //check if there is a pageNumber params if not set it to 1
      
      //number of items needed to be skipped
      const skip = (pageNumber - 1) * pageSize;

      const books = await Book.find().skip(skip).limit(pageSize);

      const total = await Book.countDocuments();
      const response : BookSearchResponse = {
        data: books,
        pagination:{
          total,
          page: pageNumber,
          pages: Math.ceil(total/pageSize),
        },
      };

      res.json(response);
    }catch(e){
      console.log("error", error);
      res.status(500).json({message: "Something went wrong"});
    }
});

export default router;