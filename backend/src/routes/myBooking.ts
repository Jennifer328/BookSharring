import express, {Response, Request} from "express";
import verifyToken from "../middleware/auth";
import Book from "../models/book";
import { BookType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request,res: Response) =>{
   try{

    const books = await Book.find({
      bookings: {$elemMatch: {userId: req.userId}},
    });

    const result = books.map((book) => {
      const userBookings = book.bookings.filter((booking) => booking.userId === req.userId);
      const bookWithUserBookings:  BookType = {
         ...book.toObject(), //change mongoose book to JavaSript object
         bookings: userBookings,
      };

      return bookWithUserBookings;
    });

    res.status(200).send(res);

   }catch(error){
    console.log(error);
    res.status(500).json({messsge: "Unable to fetch orders"});
   }
});

export  default router;