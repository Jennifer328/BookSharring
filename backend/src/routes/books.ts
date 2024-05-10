import { error } from "console";
import express, { Request, Response } from "express";
import Book from "../models/book";
import { BookSearchResponse, BookingType, paymentIntentResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);


const router = express.Router();



// /api/books/search?
router.get("/search", async (req: Request, res: Response) => {

  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;

      case "pricePerWeekAsc":
        sortOptions = { pricePerWeek: 1 };
        break;

      case "pricePerWeekDesc":
        sortOptions = { pricePerWeek: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1"); //check if there is a pageNumber params if not set it to 1

    //number of items needed to be skipped
    const skip = (pageNumber - 1) * pageSize;

    const books = await Book.find(query).sort(sortOptions).skip(skip).limit(pageSize);

    const total = await Book.countDocuments(query);
    const response: BookSearchResponse = {
      data: books,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// /api/books/xxxx
router.get("/:id",
     [param("id").notEmpty().withMessage("Book ID is required")], 
     async(req: Request, res:Response) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
      }

      const id = req.params.id.toString();

  try{
  const book = await Book.findById(id);
  res.json(book);
  }catch(error){
    console.log("error",error);
    res.status(500).json({message:"Error fetching book" });
  }
});




router.post(
    "/:bookId/bookings/payment-intent", 
    verifyToken, 
    async (req: Request, res: Response) =>{
  //1. totalCost
  //2. bookId
  //3. userId

  const {numberOfWeeks} = req.body;
  const bookId = req.params.bookId;

  const book = await Book.findById(bookId);
  if(!book){
    return res.status(400).json({message: "Book not found"});
  }

  const totalCost = book.pricePerWeek * numberOfWeeks;

  const paymentIntent = await stripe.paymentIntents.create({
    /*the amount property in the stripe.paymentIntents.create() method is expecting the amount to be specified in the smallest currency unit.
    totalCost represents the total cost of the book rental in dollars, multiplying it by 100 converts it to cents, which is the expected format for the amount property in the Stripe API 
    */
       amount: totalCost * 100,
       currency: "cad",
       metadata: {
        bookId,
        userId: req.userId,
       },
  });

  if(!paymentIntent.client_secret){
    return res.status(500).json({message:"Error creating payment intent"});
  }

  const response  = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);
});


router.post("/:bookId/bookings", verifyToken, async (req: Request, res: Response) =>{
  try{
   const paymentIntentId = req.body.paymentIntentId;
   const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
   if(!paymentIntent){
    return res.status(400).json({message: "Payment intent not found"});
   }
   //Check if the payment is made from the loggedin user
   if(paymentIntent.metadata.bookId !== req.params.paymentIntentId || paymentIntent.metadata.userId !== req.userId){
       return res.status(400).json({message: "payment intent mismatch"});
   }

   if(paymentIntent.status !== "succeeded"){
    return res.status(400).json({message:`Payment intent not succeeded. Status: ${paymentIntent.status}`});
   }

   const newBooking : BookingType = {
    ...req.body, 
    userId:req.userId,
   }

   const book = await Book.findOneAndUpdate({_id:req.params.bookId},{
    $push:{bookings: newBooking},
   });

   if(!book){
    return res.status(400).json({message: "Book not found"});
   }
   
   await book.save();
   res.status(200).send();

  }catch(error){
   console.log(error);
   return res.status(500).json({message: "Something went wrong"});
  }
});

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.city) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.city, "i") },

    ];
  }

  if (queryParams.types) { //the user can select more than one type once
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],//check if the user input one or more types
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerWeek = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    }
  }



  return constructedQuery;
};


export default router;