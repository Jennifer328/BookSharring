import express, {Request, Response} from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Book, { BookType } from "../models/book";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
});

//api/mybooks
router.post("/",
           verifyToken,
           [body("name").notEmpty().withMessage('Name is required'),
            body("community").notEmpty().withMessage('Community is required'),
            body("city").notEmpty().withMessage('City is required'),
            body("description").notEmpty().withMessage('Description is required'),
            body("type").notEmpty().withMessage('Book type is required'),
            body("description").notEmpty().withMessage('Description is required'),
            body("pricePerWeek").notEmpty().isNumeric().withMessage('Price is required and must be a number'),
            body("readerAge").notEmpty().isArray().withMessage('Reader recommended age is required and must be a number'),
            ],
           upload.array("imageFiles", 6), 
           async (req: Request, res:Response) =>{

                try{
                 const imageFiles = req.files as Express.Multer.File[];
                 const newBook: BookType = req.body;
    
               
                //upload images to cloudinary
                const imageUrls = await uploadImages(imageFiles);

                //2. if upload is successful, add the URLs to the new book
                newBook.imageUrls = imageUrls;
                newBook.lastUpdated = new Date();
                newBook.userId = req.userId;


                //3. save the new book in the database
 
                const book = new Book(newBook);
                await book.save();
                //4. return a 201 status
                res.status(201).send(book);//pass back the data to frontend if they need to do something
                }catch(e){
                  console.log("Error creating book:", e);
                  res.status(500).json({message: "Something went wrong"});
     
                }
             });

             //1. upload the images to cloudinary
            async function uploadImages(imageFiles: Express.Multer.File[]) {
              const uploadPromises = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
              });

              const imageUrls = await Promise.all(uploadPromises);
              return imageUrls;
             }


router.get("/", verifyToken, async(req : Request, res : Response) =>{
    
      
      try{
        const books = await Book.find({userId: req.userId});
        res.json(books);

      }catch(e){
        res.status(500).json({message: "Error fetching books"});
      }
})
export default router;