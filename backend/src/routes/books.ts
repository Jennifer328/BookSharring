import { error } from "console";
import express ,{Request,Response} from "express";
import Book from "../models/book";
import { BookSearchResponse } from "../shared/types";


const router = express.Router();

// /api/books/search?
router.get("/search", async (req: Request, res:Response) =>{

    try{
      const query = constructSearchQuery(req.query);

      let sortOptions = {};

      switch(req.query.sortOption){
        case "starRating":
          sortOptions = {starRating: -1};
          break;

        case "pricePerWeekAsc":
          sortOptions = {pricePerWeek: 1};
          break;

        case "pricePerWeekDesc":
          sortOptions = {pricePerWeek : -1};
          break;
      }

      const pageSize = 5;
      const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1" ); //check if there is a pageNumber params if not set it to 1
      
      //number of items needed to be skipped
      const skip = (pageNumber - 1) * pageSize;

      const books = await Book.find(query).sort(sortOptions).skip(skip).limit(pageSize);

      const total = await Book.countDocuments(query);
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


const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.city) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.city, "i") },
   
    ];
  }

  if(queryParams.types){ //the user can select more than one type once
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],//check if the user input one or more types
    };
  }

  if(queryParams.stars){
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star:string) => parseInt(star))
      : parseInt(queryParams.stars);

      constructedQuery.starRating = {$in: starRatings};
  }

  if(queryParams.maxPrice){
    constructedQuery.pricePerWeek ={
      $lte: parseInt(queryParams.maxPrice).toString(),
    }
  }

  

  return constructedQuery;
};


export default router;